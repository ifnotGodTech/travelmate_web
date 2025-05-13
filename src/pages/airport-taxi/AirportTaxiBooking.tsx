import { useState, useEffect, ReactNode, useRef } from 'react';
import { Calendar, Clock, MapPin, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import   AuthState  from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';

// Hook to detect mobile devices
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

// Interface for MapLocation (replacing LocationItem)
interface MapLocation {
  id: number;
  name: string;
  placeId: string;
  latitude: number;
  longitude: number;
  street?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  airportCode?: string;
  isAirport: boolean;
}

interface BookingFormData {
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  end_address: string;
  end_city: string;
  end_country: string;
  end_geo_lat: number;
  end_geo_long: number;
  price_min: string;
  price_max: string;
}
// Add interface for the API payload
interface BookingPayload {
  transfer_id: string;
  passengers: number;
  child_seats: number;
  notes: string;
  customer: {
    firstName: string;
    lastName: string;
    title?: string;
    contacts: {
      email: string;
      phoneNumber?: string;
    };
  };
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  pickup_time: string;
  end_address: string;
  end_city: string;
  end_country: string;
  end_geo_lat: number;
  end_geo_long: number;
  price_min: string;
  price_max: string;
}

export default function AirportTaxiBooking(): JSX.Element {
  const API_BASE_URL = 'https://travelmate-backend-0suw.onrender.com'
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  // State for form fields
  const [pickUp, setPickUp] = useState<string>('');
  const [dropOff, setDropOff] = useState<string>('');
  const [pickUpDate, setPickUpDate] = useState<string>('');
  const [pickUpTime, setPickUpTime] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(1);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');

  // State for modals and dropdowns
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showDestinationModal, setShowDestinationModal] = useState<boolean>(false);
  const [showPickupDateModal, setShowPickupDateModal] = useState<boolean>(false);
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [showPassengersModal, setShowPassengersModal] = useState<boolean>(false);
  const [showPriceModal, setShowPriceModal] = useState<boolean>(false);

  // State for calendar and locations
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [recentSearches, setRecentSearches] = useState<MapLocation[]>([
    {
      id: 1,
      name: 'Ibadan, Oyo, Nigeria',
      placeId: '1',
      latitude: 7.3775,
      longitude: 3.9470,
      city: 'Ibadan',
      country: 'NG',
      isAirport: false,
    },
    {
      id: 2,
      name: 'Ibeju Lekki, Lagos, Nigeria',
      placeId: '2',
      latitude: 6.4696,
      longitude: 3.7043,
      city: 'Ibeju Lekki',
      country: 'NG',
      isAirport: false,
    },
  ]);
  const [apiLocations, setApiLocations] = useState<MapLocation[]>([]);
  const [filteredPickUpLocations, setFilteredPickUpLocations] = useState<MapLocation[]>([]);
  const [filteredDropOffLocations, setFilteredDropOffLocations] = useState<MapLocation[]>([
    {
      id: 1,
      name: 'Lagos, Nigeria',
      placeId: '3',
      latitude: 6.5244,
      longitude: 3.3792,
      city: 'Lagos',
      country: 'NG',
      isAirport: false,
    },
    {
      id: 2,
      name: 'Abuja, Nigeria',
      placeId: '4',
      latitude: 9.0579,
      longitude: 7.4951,
      city: 'Abuja',
      country: 'NG',
      isAirport: false,
    },
    {
      id: 3,
      name: 'Port Harcourt, Nigeria',
      placeId: '5',
      latitude: 4.8156,
      longitude: 7.0498,
      city: 'Port Harcourt',
      country: 'NG',
      isAirport: false,
    },
    {
      id: 4,
      name: 'Murtala Muhammed International Airport, Lagos, Nigeria',
      placeId: '6',
      latitude: 6.5774,
      longitude: 3.3212,
      city: 'Lagos',
      country: 'NG',
      airportCode: 'LOS',
      isAirport: true,
    },
  ]);

  // Store selected drop-off location for BookingFormData
  const [selectedDropOffLocation, setSelectedDropOffLocation] = useState<MapLocation | null>(null);

  // Detect mobile device
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Ref to manage search input focus
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Cache for API results
  const cache = useRef<{ [key: string]: MapLocation[] }>({});

  // Helper function to parse float safely
  const parseDouble = (value: string | undefined): number => {
    if (!value) return 0;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Helper function to extract airport code (simplified)
  const extractAirportCode = (displayName: string | undefined): string | undefined => {
    if (!displayName) return undefined;
    const match = displayName.match(/\b[A-Z]{3}\b/);
    return match ? match[0] : undefined;
  };

  // Function to search locations via Nominatim API
  const searchDetailedLocation = async (
    input: string,
    countryCode?: string
  ): Promise<MapLocation[]> => {
    const key = input.trim().toLowerCase();

    // Check cache
    if (cache.current[key]) {
      return cache.current[key];
    }

    try {
      // Build query parameters
      const params = new URLSearchParams({
        q: key,
        format: 'json',
        addressdetails: '1',
        limit: '20',
        featuretype: 'airport,settlement',
      });
      if (countryCode) {
        params.append('countrycodes', countryCode);
      }

      const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'TravelMateApp/1.0 (travelmate925@gmail.com)',
        },
      });
   

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      console.log('Nominatim response:', data);

      if (!Array.isArray(data) || data.length === 0) {
        return [];
      }

      const locations: MapLocation[] = data.map((item: any, index: number) => {
        const lat = parseDouble(item.lat);
        const lon = parseDouble(item.lon);
        const address = item.address || {};
        const type = item.type || '';
        const category = item.category || '';

        return {
          id: index + Date.now(), // Unique ID
          name: item.display_name || 'Unknown',
          placeId: item.osm_id?.toString() || '',
          latitude: lat,
          longitude: lon,
          street: address.road || address.pedestrian,
          city: address.city || address.town || address.village,
          postalCode: address.postcode,
          country: address.country_code?.toUpperCase(),
          airportCode: extractAirportCode(item.display_name),
          isAirport: type === 'aeroway' || category === 'aerodrome',
        };
      });

      // Store in cache
      cache.current[key] = locations;
      return locations;
    } catch (error) {
      console.error('Nominatim search failed:', error);
      return [];
    }
  };

  // Handle modal auto-close
  const closeAllModals = () => {
    setShowSearchModal(false);
    setShowDestinationModal(false);
    setShowPickupDateModal(false);
    setShowTimeModal(false);
    setShowPassengersModal(false);
    setShowPriceModal(false);
  };

  // Fetch locations from Nominatim API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const defaultQuery = 'airport'; // Default query for initial locations
        const locations = await searchDetailedLocation(defaultQuery, 'ng'); // Restrict to Nigeria
        setApiLocations(locations);
        setFilteredPickUpLocations([...recentSearches, ...locations]);
        setFilteredDropOffLocations(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  // Handle input changes for pick-up
  const handlePickUpChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickUp(value);

    // Filter locations based on input
    let filtered: MapLocation[] = [...recentSearches, ...apiLocations].filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    // If input is not empty, search Nominatim API
    if (value.trim()) {
      const searchResults = await searchDetailedLocation(value, 'ng');
      filtered = [...recentSearches, ...searchResults].filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredPickUpLocations(filtered);
  };

  // Handle input changes for drop-off
  const handleDropOffChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDropOff(value);

    // Filter locations based on input
    let filtered: MapLocation[] = apiLocations.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    // If input is not empty, search Nominatim API
    if (value.trim()) {
      const searchResults = await searchDetailedLocation(value, 'ng');
      filtered = searchResults.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredDropOffLocations(filtered);
  };

  // Handle search button click
  // Updated handleSearch function
  const handleSearch = async (): Promise<void> => {
    // Construct the booking form data
    const formattedData: BookingFormData = {
      pickup_location: pickUp,
      dropoff_location: dropOff,
      pickup_date: pickUpDate,
      pickup_time: pickUpTime,
      end_address: selectedDropOffLocation?.street || 'Unknown',
      end_city: selectedDropOffLocation?.city || 'Unknown',
      end_country: selectedDropOffLocation?.country || 'NG',
      end_geo_lat: selectedDropOffLocation?.latitude || 0,
      end_geo_long: selectedDropOffLocation?.longitude || 0,
      price_min: priceMin,
      price_max: priceMax,
    };

    // Extract customer details from auth state
    let firstName = '';
    let lastName = '';
    if (auth.user?.name) {
      const nameParts = auth.user.name.trim().split(' ');
      firstName = nameParts[0] || 'Unknown';
      lastName = nameParts.slice(1).join(' ') || 'Unknown';
    }

    // Construct the full payload
    const payload: BookingPayload = {
      ...formattedData,
      transfer_id: 'TRANS12345', // Static value from example
      passengers: passengers,
      child_seats: 1, // Static value from example
      notes: 'Arriving on Flight BA123', // Static value from example
      customer: {
        firstName,
        lastName,
        title: 'Ms', // Default value (not in authSlice)
        contacts: {
          email: auth.user?.email || 'unknown@example.com',
          phoneNumber: '+1987654321', // Placeholder (not in authSlice)
        },
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/car-bookings/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`, // Use accessToken from authSlice
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Booking successful:', result);
      // TODO: Show success message to user (e.g., toast notification)
    } catch (error) {
      console.error('Booking failed:', error);
      // TODO: Show error message to user (e.g., toast notification)
    }
  };

  // Location selection functions
  const handleLocationSelect = (location: MapLocation, type: 'pickup' | 'dropoff'): void => {
    if (type === 'pickup') {
      setPickUp(location.name);
      setRecentSearches((prev) => {
        const newSearch = { ...location, id: Date.now() };
        return [newSearch, ...prev.filter((item) => item.name !== location.name)].slice(0, 5);
      });
      setShowSearchModal(false);
    } else {
      setDropOff(location.name);
      setSelectedDropOffLocation(location); // Store full location for BookingFormData
      setShowDestinationModal(false);
    }
    closeAllModals();
  };

  // Calendar and time picker functions
  const nextMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = (): void => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateSelect = (day: number, isNextMonth: boolean): void => {
    const year = currentMonth.getFullYear();
    const month = isNextMonth ? currentMonth.getMonth() + 1 : currentMonth.getMonth();
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    const formattedDate = newDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    setPickUpDate(formattedDate);
  };

  const incrementPassengers = (): void => {
    setPassengers((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const decrementPassengers = (): void => {
    setPassengers((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePriceRangeConfirm = (): void => {
    setShowPriceModal(false);
  };

  const renderCalendar = (monthDate: Date, isNextMonth: boolean): ReactNode[] => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days: ReactNode[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer ${isSelected ? 'bg-[#FF6F1E] text-white rounded-[10px]' : 'hover:bg-[#CDCED1]'
            }`}
          onClick={() => handleDateSelect(day, isNextMonth)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const formatMonth = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const TimePicker = () => {
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(null);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

    useEffect(() => {
      const hourContainer = document.getElementById('hour-container');
      if (hourContainer) {
        const zeroHourElement = hourContainer.children[0];
        if (zeroHourElement) {
          zeroHourElement.scrollIntoView({ block: 'center' });
        }
      }
    }, []);

    const confirmTime = () => {
      if (selectedHour !== null && selectedMinute !== null) {
        handleTimeSelect(selectedHour, selectedMinute);
      }
    };

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    const handleTimeSelect = (hour: number, minute: number): void => {
      const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setPickUpTime(formattedTime);
      setShowTimeModal(false);
    };

    return (
      <div className="flex flex-col">
        <div className="flex justify-center mb-2 p-4">
          <div className="flex w-full max-w-xs">
            <div id="hour-container" className="flex-1 max-h-64 overflow-y-auto rounded-md">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`text-center p-3 cursor-pointer hover:bg-[#CDCED1] ${selectedHour === hour ? 'bg-[#F5F5F5]' : ''
                    }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {formatTime(hour)}
                </div>
              ))}
            </div>
            <div className="flex-1 max-h-64 overflow-y-auto rounded-md">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={`text-center p-3 cursor-pointer hover:bg-[#CDCED1] ${selectedMinute === minute ? 'bg-[#F5F5F5]' : ''
                    }`}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {formatTime(minute)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-[#CDCED1] w-full h-[1px] mb-1"></div>
        <div className="p-4">
          <button
            className="w-full bg-[#023E8A] text-white py-2 rounded-md disabled:bg-gray-400"
            disabled={selectedHour === null || selectedMinute === null}
            onClick={confirmTime}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Modal wrapper component for mobile and desktop
  const ModalWrapper = ({
    isOpen,
    onClose,
    children,
    includeSearch,
    searchValue,
    onSearchChange,
    title,
    isFullScreenOnMobile,
    isPopup,
    customWidth,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    includeSearch?: boolean;
    searchValue?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    isFullScreenOnMobile?: boolean;
    isPopup?: boolean;
    customWidth?: string;
  }) => {
    // Focus the search input when the modal opens with search
    useEffect(() => {
      if (isOpen && includeSearch && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, includeSearch]);

    if (!isOpen) return null;

    const modalContent = (
      <div
        className={`bg-white rounded-lg flex flex-col shadow-lg max-h-[90vh] mt-[60px] md:mt-0 overflow-y-auto ${customWidth ? customWidth : 'w-full'
          }`}
      >
        <div className="flex md:hidden justify-between items-center p-4 border-b border-[#CDCED1]">
          {title && <h2 className="text-lg font-semibold md:hidden">{title}</h2>}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-md hover:bg-gray-100 shadow-sm"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        {includeSearch && (
          <div className="p-4">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Destination"
                className="pl-10 w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchValue}
                onChange={onSearchChange}
              />
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-black" />
            </div>
          </div>
        )}
        <div className="overflow-y-auto p-4 text-gray-500">{children}</div>
      </div>
    );

    if (isPopup && !isMobile) {
      return (
        <div className="fixed md:absolute md:mt-[110%] md:w-[600px] md W-[100%] lg:-ml-[50%] lg:mt-[75%] 2xl:mt-[] inset-0 z-50 bg-black/50 flex items-center justify-center">
          {modalContent}
        </div>
      );
    }

    return isMobile && isFullScreenOnMobile ? (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">{modalContent}</div>
    ) : (
      <div className="absolute z-50 top-full mt-1 w-full flex justify-center">{modalContent}</div>
    );
  };

  return (
    <div className="w-[90%] mx-auto mt-[130px] md:mt-[150px] bg-white rounded-lg border border-[#CDCED1] shadow">
      <div className="mb-6 p-4 flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-900">Easy and Affordable Airport Taxis</h1>
        <p className="text-gray-600">Find the perfect ride from the airport to your destination.</p>
      </div>
      <div className="border-t border-gray-200 h-2 w-full"></div>
      <div className="flex flex-col md:flex-row justify-between md:items-center pt-6 p-4">
        <div className="md:w-[89%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pick Up</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Destination"
                  className="pl-10 w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  value={pickUp}
                  onChange={handlePickUpChange}
                  onClick={() => {
                    closeAllModals();
                    setShowSearchModal(true);
                    setFilteredPickUpLocations([...recentSearches, ...apiLocations]);
                  }}
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              <ModalWrapper
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                includeSearch={isMobile}
                searchValue={pickUp}
                onSearchChange={handlePickUpChange}
                title="Pick Up"
                isFullScreenOnMobile={true}
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-700 my-2">Recent Searches</h3>
                  <ul className="space-y-2">
                    {recentSearches
                      .filter((item) => item.name.toLowerCase().includes(pickUp.toLowerCase()))
                      .map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center border-b border-gray-200 py-2"
                        >
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => handleLocationSelect(item, 'pickup')}
                          >
                            <MapPin className="h-6 w-6 text-[#FF6F1E] border border-[#FF6F1E] rounded-md p-1 mr-2" />
                            <div>
                              <span>{item.name}</span>
                              <p className="text-xs text-gray-500">
                                {item.city}, {item.country} {item.isAirport ? '(Airport)' : ''}
                              </p>
                            </div>
                          </div>
                          <X className="h-4 w-4 text-gray-400 cursor-pointer" />
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 my-2">Suggested Locations</h3>
                  <ul className="space-y-2">
                    {filteredPickUpLocations.map((item) => (
                      <li
                        key={item.id}
                        className="flex border-b border-gray-200 py-2"
                        onClick={() => handleLocationSelect(item, 'pickup')}
                      >
                        <MapPin className="h-6 w-6 text-[#FF6F1E] border border-[#FF6F1E] rounded-md p-1 mr-2" />
                        <div>
                          <span>{item.name}</span>
                          <p className="text-xs text-gray-500">
                            {item.city}, {item.country} {item.isAirport ? '(Airport)' : ''}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModalWrapper>
            </div>

            <div className="relative mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Drop Off</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Destination"
                  className="pl-10 w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  value={dropOff}
                  onChange={handleDropOffChange}
                  onClick={() => {
                    closeAllModals();
                    setShowDestinationModal(true);
                    setFilteredDropOffLocations(apiLocations);
                  }}
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              <ModalWrapper
                isOpen={showDestinationModal}
                onClose={() => setShowDestinationModal(false)}
                includeSearch={isMobile}
                searchValue={dropOff}
                onSearchChange={handleDropOffChange}
                title="Drop Off"
                isFullScreenOnMobile={true}
              >
                <div>
                  <ul className="space-y-2">
                    {filteredDropOffLocations.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center cursor-pointer border-b border-gray-200 py-2"
                        onClick={() => handleLocationSelect(item, 'dropoff')}
                      >
                        <MapPin className="h-4 w-4 text-black mr-2" />
                        <div>
                          <span>{item.name}</span>
                          <p className="text-xs text-gray-500">
                            {item.city}, {item.country} {item.isAirport ? '(Airport)' : ''}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModalWrapper>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pick Up Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Date"
                  className="pl-10 w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  value={pickUpDate}
                  onClick={() => {
                    closeAllModals();
                    setShowPickupDateModal(true);
                  }}
                  readOnly
                />
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              <ModalWrapper
                isOpen={showPickupDateModal}
                onClose={() => setShowPickupDateModal(false)}
                title="Pick Up Date"
                isFullScreenOnMobile={true}
                isPopup={true}
                customWidth="w-full md:w-[] lg:w-[600px] lg:absolute "
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-center md:justify-between items-center mb-5">
                      <button
                        onClick={prevMonth}
                        className="hidden md:block p-1 shadow-sm rounded-md"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="font-medium">{formatMonth(currentMonth)}</span>
                      <div className="w-5"></div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <div key={index} className="text-center font-medium text-sm">
                          {day}
                        </div>
                      ))}
                      {renderCalendar(currentMonth, false)}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center md:justify-between items-center mb-5">
                      <div className="w-5"></div>
                      <span className="font-medium text-center">
                        {formatMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="hidden md:block p-1 shadow-sm rounded-md"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                        <div key={index} className="text-center font-medium text-sm">
                          {day}
                        </div>
                      ))}
                      {renderCalendar(
                        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
                        true
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm font-extrabold text-black mb-4">
                  {selectedDate
                    ? ` ${selectedDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}`
                    : 'Pick date'}
                </p>
                <button
                  className={`w-full py-2 rounded-md ${selectedDate ? 'bg-[#023E8A] text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  onClick={() => setShowPickupDateModal(false)}
                  disabled={!selectedDate}
                >
                  Select Date
                </button>
              </ModalWrapper>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pick Up Time</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="00:00"
                  className="pl-10 w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  value={pickUpTime}
                  onClick={() => {
                    closeAllModals();
                    setShowTimeModal(true);
                  }}
                  readOnly
                />
                <Clock className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              <ModalWrapper
                isOpen={showTimeModal}
                onClose={() => setShowTimeModal(false)}
                title="Pick Up Time"
                isFullScreenOnMobile={false}
              >
                <TimePicker />
              </ModalWrapper>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
              <div
                className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onClick={() => {
                  closeAllModals();
                  setShowPassengersModal(true);
                }}
              >
                {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
              </div>
              <ModalWrapper
                isOpen={showPassengersModal}
                onClose={() => setShowPassengersModal(false)}
                title="Passengers"
                isFullScreenOnMobile={false}
              >
                <div className="flex justify-between items-center mb-1 py-3">
                  <span>Passengers</span>
                  <div className="flex items-center border border-[#CDCED1] rounded-md">
                    <button
                      className="w-8 h-8 flex items-center justify-center"
                      onClick={decrementPassengers}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-4">{passengers}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center"
                      onClick={incrementPassengers}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-[#CDCED1] w-full h-[1px] mb-4"></div>
                <button
                  className="w-full bg-[#023E8A] text-white py-2 rounded-md"
                  onClick={() => setShowPassengersModal(false)}
                >
                  Done
                </button>
              </ModalWrapper>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div
                className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onClick={() => {
                  closeAllModals();
                  setShowPriceModal(true);
                }}
              >
                {priceMin && priceMax ? `${priceMin} - ${priceMax}` : 'Enter Minimum - Maximum price'}
              </div>
              <ModalWrapper
                isOpen={showPriceModal}
                onClose={() => setShowPriceModal(false)}
                title="Price Range"
                isFullScreenOnMobile={false}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Price
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your price"
                    className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Price
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your price"
                    className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-[#023E8A] text-white py-2 rounded-md"
                  onClick={handlePriceRangeConfirm}
                >
                  Done
                </button>
              </ModalWrapper>
            </div>
          </div>
      
         
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-[#023E8A] hover:bg-blue-900 text-white font-light py-2 px-6 rounded-md transition-colors duration-200 h-fit"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}