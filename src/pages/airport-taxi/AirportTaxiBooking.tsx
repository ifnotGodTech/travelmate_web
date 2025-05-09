import { useState, useEffect, ReactNode } from 'react';
import { Calendar, Clock, MapPin, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

interface LocationItem {
  id: number;
  location: string;
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

export default function AirportTaxiBooking(): JSX.Element {
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
  const [recentSearches, setRecentSearches] = useState<LocationItem[]>([
    { id: 1, location: 'Ibadan, Oyo' },
    { id: 2, location: 'Ibeju Lekki' },
  ]);
  const [apiLocations, setApiLocations] = useState<LocationItem[]>([]);
  const [filteredPickUpLocations, setFilteredPickUpLocations] = useState<LocationItem[]>([]);
  const [filteredDropOffLocations, setFilteredDropOffLocations] = useState<LocationItem[]>([]);

  // Handle modal auto-close
  const closeAllModals = () => {
    setShowSearchModal(false);
    setShowDestinationModal(false);
    setShowPickupDateModal(false);
    setShowTimeModal(false);
    setShowPassengersModal(false);
    setShowPriceModal(false);
  };

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch('https://api.example.com/locations');
        const data = await response.json();
        const locations = data.map((loc: string, index: number) => ({
          id: index + 3,
          location: loc,
        }));
        setApiLocations(locations);
        setFilteredPickUpLocations(locations);
        setFilteredDropOffLocations(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  // Handle input changes for pick-up
  const handlePickUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPickUp(value);
    setShowSearchModal(true);

    // Filter locations based on input
    const filtered = [...recentSearches, ...apiLocations].filter((item) =>
      item.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPickUpLocations(filtered);
  };

  // Handle input changes for drop-off
  const handleDropOffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDropOff(value);
    setShowDestinationModal(true);

    // Filter locations based on input
    const filtered = apiLocations.filter((item) =>
      item.location.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDropOffLocations(filtered);
  };

  // Handle search button click
  const handleSearch = (): void => {
    const formattedData: BookingFormData = {
      pickup_location: pickUp,
      dropoff_location: dropOff,
      pickup_date: pickUpDate,
      pickup_time: pickUpTime,
      end_address: 'Avenue Anatole France, 5',
      end_city: 'Paris',
      end_country: 'FR',
      end_geo_lat: 48.859466,
      end_geo_long: 2.2976965,
      price_min: priceMin,
      price_max: priceMax,
    };
    console.log(formattedData);
  };

  // Location selection functions
  const handleLocationSelect = (location: string, type: 'pickup' | 'dropoff'): void => {
    if (type === 'pickup') {
      setPickUp(location);
      setRecentSearches((prev) => {
        const newSearch = { id: Date.now(), location };
        return [newSearch, ...prev.filter((item) => item.location !== location)].slice(0, 5);
      });
      setShowSearchModal(false);
    } else {
      setDropOff(location);
      setShowDestinationModal(false);
    }
    closeAllModals();
  };

  // Other unchanged functions (calendar, time picker, passengers, price range, etc.)
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

  const handleDateSelect = (day: number): void => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    const formattedDate = newDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setPickUpDate(formattedDate);
  };

  const handleTimeSelect = (hour: number, minute: number): void => {
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    setPickUpTime(formattedTime);
    setShowTimeModal(false);
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

  const renderCalendar = (monthDate: Date): ReactNode[] => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days: ReactNode[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      // const date = new Date(year, month, day);
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer ${
            isSelected ? 'bg-[#FF6F1E] text-white rounded-[10px]' : 'hover:bg-[#CDCED1]'
          }`}
          onClick={() => handleDateSelect(day)}
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

    return (
      <div className="">
        <h2 className="text-lg font-semibold mb-4 text-center p-4">Pick Up Time</h2>
        <div className='bg-[#CDCED1] w-full h-[1px] mb-4'></div>
        <div className="flex justify-center mb-2 p-4">
          <div className="flex w-full max-w-xs">
            <div id="hour-container" className="flex-1 max-h-64 overflow-y-auto rounded-md">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`text-center p-3 cursor-pointer hover:bg-[#CDCED1] ${
                    selectedHour === hour ? 'bg-[#F5F5F5]' : ''
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
                  className={`text-center p-3 cursor-pointer hover:bg-[#CDCED1] ${
                    selectedMinute === minute ? 'bg-[#F5F5F5]' : ''
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
        <div className='p-4'>
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
                  onFocus={() => {
                    closeAllModals();
                    setShowSearchModal(true);
                    setFilteredPickUpLocations([...recentSearches, ...apiLocations]);
                  }}
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              {showSearchModal && (
                <div className="absolute w-full z-50 top-full mt-1">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 my-2">Recent Searches</h3>
                        <ul className="space-y-2">
                          {recentSearches
                            .filter((item) =>
                              item.location.toLowerCase().includes(pickUp.toLowerCase())
                            )
                            .map((item) => (
                              <li
                                key={item.id}
                                className="flex justify-between items-center border-b border-gray-200 py-2"
                              >
                                <div
                                  className="flex items-center cursor-pointer"
                                  onClick={() => handleLocationSelect(item.location, 'pickup')}
                                >
                                  <MapPin className="h-6 w-6 text-[#FF6F1E] border border-[#FF6F1E] rounded-md p-1 mr-2" />
                                  <span>{item.location}</span>
                                </div>
                                <X className="h-4 w-4 text-gray-400 cursor-pointer" />
                              </li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 my-2">Other Locations</h3>
                        <ul className="space-y-2">
                          {filteredPickUpLocations.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center cursor-pointer"
                              onClick={() => handleLocationSelect(item.location, 'pickup')}
                            >
                              <MapPin className="h-4 w-4 text-black mr-2" />
                              <span>{item.location}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  onFocus={() => {
                    closeAllModals();
                    setShowDestinationModal(true);
                    setFilteredDropOffLocations(apiLocations);
                  }}
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-black" />
              </div>
              {showDestinationModal && (
                <div className="absolute w-full z-50 top-full mt-1">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 my-2">Popular Destinations</h3>
                        <ul className="space-y-2">
                          {filteredDropOffLocations.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center cursor-pointer"
                              onClick={() => handleLocationSelect(item.location, 'dropoff')}
                            >
                              <MapPin className="h-4 w-4 text-black mr-2" />
                              <span>{item.location}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
              {showPickupDateModal && (
                <div className="absolute w-[600px] z-50 top-full mt-1 -ml-[140px]">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <button onClick={prevMonth} className="p-1 shadow-sm rounded-md">
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
                            {renderCalendar(currentMonth)}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <div className="w-5"></div>
                            <span className="font-medium">
                              {formatMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                            </span>
                            <button onClick={nextMonth} className="p-1 shadow-sm rounded-md">
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="grid grid-cols-7 gap-2 mb-4">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                              <div key={index} className="text-center font-medium text-sm">
                                {day}
                              </div>
                            ))}
                            {renderCalendar(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`w-full py-2 rounded-md ${
                          selectedDate ? 'bg-[#023E8A] text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => setShowPickupDateModal(false)}
                        disabled={!selectedDate}
                      >
                        Select Date
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
              {showTimeModal && (
                <div className="absolute w-full z-50 top-full mt-1">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <TimePicker />
                  </div>
                </div>
              )}
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
              {showPassengersModal && (
                <div className="absolute w-full z-50 top-full mt-1">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <div className="">
                      <h2 className="text-lg font-semibold mb-4 text-center">Passengers</h2>
                      <div className="bg-[#CDCED1] w-full h-[1px] mb-1"></div>
                      <div className="flex justify-between items-center mb-1 p-4">
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
                      <div className="bg-[#CDCED1] w-full h-[1px] mb-1"></div>
                      <div className="p-4">
                        
                      <button
                        className="w-full bg-[#023E8A] text-white py-2 rounded-md"
                        onClick={() => setShowPassengersModal(false)}
                      >
                        Done
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              )}
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
              {showPriceModal && (
                <div className="absolute w-full z-50 top-full mt-1">
                  <div className="bg-white rounded-lg shadow-lg w-full">
                    <div className="">
                      <h2 className="text-lg font-semibold mb-1 text-center p-4">Price Range</h2>
                      <div className="bg-[#CDCED1] w-full h-[1px] mb-1"></div>
                      <div className=" p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price</label>
                        <input
                          type="text"
                          placeholder="Enter your price"
                          className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                        />
                      </div>
                      <div className=" p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum price</label>
                        <input
                          type="text"
                          placeholder="Enter your price"
                          className="w-full border border-[#CDCED1] rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                        />
                      </div>
                      <div className="bg-[#CDCED1] w-full h-[1px] mb-1"></div>
                      <div className="p-4">
                      <button
                        className="w-full bg-[#023E8A] text-white py-2 rounded-md"
                        onClick={handlePriceRangeConfirm}
                      >
                        Done
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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