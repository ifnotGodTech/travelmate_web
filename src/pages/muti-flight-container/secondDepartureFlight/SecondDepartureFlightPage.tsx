

import Navbar from '../../homePage/Navbar'
import React, { useState, useMemo,  forwardRef , Ref, ReactElement  } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import FlightClassOutlinedIcon from "@mui/icons-material/FlightClassOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Divider, IconButton, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slide, Slider } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from "react-router-dom";
import TravelmateApp from '../../homePage/TravelmateApp';
import Footer from '../../../components/2Footer';
import airlogo from "../../../assets/airlogo.svg"
import CircleIcon from '@mui/icons-material/Circle';
import Line from "../../../assets/Line.svg"
import { Stack, Pagination, Dialog, DialogContent } from '@mui/material';
import { useLocation } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import AirlineSeatReclineExtraOutlinedIcon from '@mui/icons-material/AirlineSeatReclineExtraOutlined';
import Breadcrumb from "../../BreadCrumb"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useMediaQuery } from "react-responsive";
import { TransitionProps } from "@mui/material/transitions";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';



const Transition = forwardRef<unknown, TransitionProps & { children: ReactElement }>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref as Ref<unknown>} {...props} />;
  }
);


interface Departure {
  id: number;
  planeName: string;
  image: string;
  spaceleft: string;
  class: string;
  timefrom: string;
  placefrom: string;
  duration: string;
  non: string;
  flightcode: string;
  timeto: string;
  placeto: string;
  refundable: string;
  price: string;
  passenger: string;
  tax: string;
}

interface DepartureListProps {
  departureInfo: Departure[];
}

interface Flight {
  id: number;
  from: string;
  to: string;
  date: string;
}

interface MultitripData {
 flights: Flight[],
  passengers: string;
  flightClass: string;
}


const DeparturePage: React.FC<DepartureListProps> = () => {
     const isMobile = useMediaQuery({ maxWidth: 768 });
    
     
const storedMultiData = sessionStorage.getItem("multitrip");

const multitripData: MultitripData = storedMultiData
  ? (JSON.parse(storedMultiData) as MultitripData)
  : { flights: [], passengers: "", flightClass: "" };


    const location = useLocation();

    console.log("Location state:", location.state);
    
    const [counts, setCounts] = useState({ adults: 0, children: 0, infants: 0 });

    const handleIncrement = (type: keyof typeof counts) => {
    setCounts((prevCounts) => ({
        ...prevCounts,
        [type]: prevCounts[type] + 1,
    }));
    };

        const handleDecrement = (type: keyof typeof counts) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
        }));
        };

    

    const departureInfo = useMemo(() => [
        {
          id: 1,
          image: airlogo,
          planeName: "Air Peace",
          spaceleft: "3 Left",
          class: "Economy",
          timefrom: "2:00pm",
          timeto: "4:00pm",
          duration: "2hrs",
          non: "Non Stop",
          placefrom: "Lagos (LOS)",
          placeto: "Abuja (ABV)",
          refundable: "Non-Refundable",
          flightcode: "W3-720",
          price: "₦50,000 /",
          passenger: "Passenger",
          tax: "Includes taxes & Fees",
          line: Line,
        },
        {
          id: 2,
          image: airlogo,
          planeName: "Arik Air",
          spaceleft: "3 Left",
          class: "Economy",
          timefrom: "2:00pm",
          timeto: "4:00pm",
          duration: "7hrs",
          non: "1 Stop",
          placefrom: "Lagos (LOS)",
          placeto: "Abuja (ABV)",
          refundable: "Non-Refundable",
          flightcode: "W3-720",
          price: "₦700,000 /",
          passenger: "Passenger",
          tax: "Includes taxes & Fees",
          line: Line,
        },
        {
          id: 3,
          image: airlogo,
          planeName: "Value Jet",
          spaceleft: "3 Left",
          class: "Economy",
          timefrom: "2:00pm",
          timeto: "4:00pm",
          duration: "10hrs",
          non: "1+ Stop",
          placefrom: "Lagos (LOS)",
          placeto: "Abuja (ABV)",
          refundable: "Non-Refundable",
          flightcode: "W3-720",
          price: "₦500,000 /",
          passenger: "Passenger",
          tax: "Includes taxes & Fees",
          line: Line,
        },
        {
          id: 4,
          image: airlogo,
          planeName: "United Nigeria",
          spaceleft: "3 Left",
          class: "Economy",
          timefrom: "2:00pm",
          timeto: "4:00pm",
          duration: "20hrs",
          non: "1 Stop",
          placefrom: "Lagos (LOS)",
          placeto: "Abuja (ABV)",
          refundable: "Non-Refundable",
          flightcode: "W3-720",
          price: "₦1,000,000 /",
          passenger: "Passenger",
          tax: "Includes taxes & Fees",
          line: Line,
        },
        {
          id: 5,
          image: airlogo,
          planeName: "Aero",
          spaceleft: "3 Left",
          class: "Economy",
          timefrom: "2:00pm",
          timeto: "4:00pm",
          duration: "24hrs",
          non: "Non Stop",
          placefrom: "Lagos (LOS)",
          placeto: "Abuja (ABV)",
          refundable: "Refundable",
          flightcode: "W3-720",
          price: "₦50,000 /",
          passenger: "Passenger",
          tax: "Includes taxes & Fees",
          line: Line,
        },
      ], []);



 const [page, setPage] = useState<number>(1);
  const [openClick, setOpenClick] = useState<boolean>(false);
    const [selectedDepartureId, setSelectedDepartureId] = useState<number | null>(null);
  
const handleOpen = (depart: Departure) => {
  
  setSelectedDepartureId(depart.id);
  setOpenClick(true);
};


  const handleCloseClick = () => {
  setOpenClick(false);
  setSelectedDepartureId(null);
};

const selectedDeparture = departureInfo.find((d) => d.id === selectedDepartureId);



 const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

const [activeButton, setActiveButton] = useState<number | null>(null);
 const handleButtonClick = (buttonIndex: number) => {
    setActiveButton(buttonIndex);
};

const ITEMS_PER_PAGE = 4;

const [stops, setStops] = useState<string | null>(null);
const [refundPolicy, setRefundPolicy] = useState<string | null>(null);
const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

const airlinesList = ["Aero", "Arik Air", "Value Jet", "Air Peace", "United Nigeria"];

  const [value, setValue] = React.useState<number[]>([2000, 10000000]);
  const formatNumber = (num: number) => new Intl.NumberFormat().format(num);


const [tempStops, setTempStops] = useState<string | null>(null);
const [tempRefundPolicy, setTempRefundPolicy] = useState<string | null>(null);
const [tempSelectedAirlines, setTempSelectedAirlines] = useState<string[]>([]);
const [tempValue, setTempValue] = useState<number[]>([2000, 10000000]);

const applyFilters = useMemo(() => {
  return departureInfo.filter((item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    const matchesPrice = price >= value[0] && price <= value[1];
    const stopMatch = !stops || item.non === stops;
    const refundMatch = !refundPolicy || item.refundable === refundPolicy;
    const airlineMatch = selectedAirlines.length === 0 || selectedAirlines.includes(item.planeName);

    return matchesPrice && stopMatch && refundMatch && airlineMatch;
  });
}, [departureInfo, stops, refundPolicy, selectedAirlines, value]);



 const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, ""); 
    const min = Number(rawValue);
    if (!isNaN(min)) {
        setValue([min, Math.max(min, value[1])]);
    }
};

const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/,/g, ""); 
    const max = Number(rawValue);
    if (!isNaN(max)) {
        setValue([value[0], Math.max(value[0], max)]);
    }
};


const [selectedSort, setSelectedSort] = useState("");

const handleSortedChange = (event: SelectChangeEvent<string>) => {
  setSelectedSort(event.target.value);
  setPage(1);
};


const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
};

const handleTempStopsChange = (stop: string) => setTempStops(stop);
const handleTempRefundPolicyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
  setTempRefundPolicy(event.target.checked ? event.target.name : null);

const handleTempSelectedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, checked } = event.target;

  if (name === "all") {
 
    setTempSelectedAirlines(checked ? airlinesList : []);
  } else {
   
    setTempSelectedAirlines((prev) =>
      checked ? [...prev, name] : prev.filter((airline) => airline !== name)
    );
  }
};

const handleTempSliderChange = (_event: Event, newValue: number | number[]) => {
  setTempValue(newValue as number[]);
};


  
    const sortedDepartures = useMemo(() => {
        const sortedArray = [...applyFilters];

        switch (selectedSort) {
            case "price_low":
                sortedArray.sort((a, b) => 
                    parseInt(a.price.replace(/[^0-9]/g, ""), 10) - 
                    parseInt(b.price.replace(/[^0-9]/g, ""), 10)
                );
                break;
            case "price_high":
                sortedArray.sort((a, b) => 
                    parseInt(b.price.replace(/[^0-9]/g, ""), 10) - 
                    parseInt(a.price.replace(/[^0-9]/g, ""), 10)
                );
                break;
            case "shortest_duration":
                sortedArray.sort((a, b) => 
                    parseInt(a.duration.replace(/[^0-9]/g, ""), 10) - 
                    parseInt(b.duration.replace(/[^0-9]/g, ""), 10)
                );
                break;
            case "longest_duration":
                sortedArray.sort((a, b) => 
                    parseInt(b.duration.replace(/[^0-9]/g, ""), 10) - 
                    parseInt(a.duration.replace(/[^0-9]/g, ""), 10)
                );
                break;
            default:
                break;
        }

        return sortedArray;
    }, [selectedSort, applyFilters]);


  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return sortedDepartures.slice(startIndex, startIndex + ITEMS_PER_PAGE);
}, [page, sortedDepartures]);



const handleApplyFilters = () => {
  setStops(tempStops);
  setRefundPolicy(tempRefundPolicy);
  setSelectedAirlines(tempSelectedAirlines);
  setValue(tempValue);
  
  setPage(1);
  closeDialog();
};

 const [isSortOpen, setIsSortOpen] = useState(false);
  const openSort = () => {
    setIsSortOpen(true);
  };

  const closeSort = () => {
    setIsSortOpen(false);
  };

  const [selectedSortOption, setSelectedSortOption] = useState<string>("recommended"); 
  
    const handleSorted = (sortOption: string) => {
      setSelectedSortOption(sortOption);  
    };
    
    const applySorting = () => {
      setSelectedSort(selectedSortOption); 
      setIsSortOpen(false); 
    };



  return (

    <div>

 {isMobile ? (

   <div>

  <div><Navbar/></div>
   
          <div className="">
          <Link to="/" >
          <div style={{ position: "absolute", left: "28px", top: "85px" }} className="w-[40px] h-[40px] p-[8px]  bg-white border-[0.5px] border-[#EBECED] shadow-md rounded-[4px] ">
          <ArrowBackIosNewOutlinedIcon className="font-bold " />
          </div>
          </Link>
          <p className="text-center font-semibold text-[20px]  mt-[90px]">Departure Flight 2</p>
          </div>

             <div className="border border-[#023E8A] bg-[#CCD8E81A] py-2.5 px-2 rounded-lg mt-8 w-[90%] m-auto">
               <div className="flex justify-between gap-2">
                 <div className="text-[#181818]">
                   {multitripData?.flights?.length > 0 ? (
                     <>
                       <p className="text-[16px] font-medium">
                         {multitripData.flights[1].from} to {multitripData.flights[1].to}
                       </p>
                       <p className="text-[14px] font-normal text-gray-500">
                         {multitripData.flights[1].date}, {multitripData.passengers}
                       </p>
                     </>
                   ) : (
                     <p className="text-[12px] text-center text-gray-500">No flight data available</p>
                   )}
                 </div>
                 <Link to="/">
                 <ModeEditOutlinedIcon className="text-[#023E8A] mt-3 cursor-pointer" />
                 </Link>
               </div>
             </div>


    <div className='bg-white w-full h-full pt-[20px] pb-[50px] mb-[100px]'>
  

     <div className=''>
             <div className='mb-[20px]'>
                 <div className='w-[90%] m-auto flex justify-between'>
                     
                     <div>
                     <div className=''>
                     <Box sx={{display:"flex", gap:"15px"}}>
                           
                       <TextField
                         id="filter-input"
                         variant="outlined"
                         size="small"
                         placeholder="Filter"
                         aria-readonly="true"
                         onClick={openDialog}
                         InputProps={{
                             startAdornment: (
                             <InputAdornment position="start">
                                 <TuneIcon sx={{color:"black"}} />
                             </InputAdornment>
                             ),
                             readOnly: true, 
                         }}
                         sx={{
    width: "100px",
    "& .MuiInputBase-root": {
      height: "44px",
      borderRadius: "8px",
      borderColor: "#DEDFE1",
      cursor: "pointer",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "black",
      opacity: 1, // ensures full color visibility
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  }}
                         />
   
   
                   <Dialog
                       open={isDialogOpen}
                       onClose={closeDialog}
                     TransitionComponent={Transition}
                   keepMounted
                   fullScreen
                   // onClick={handleCloseFrom}
                   sx={{
                     "& .MuiBackdrop-root": {
                       backgroundColor: "rgba(0, 0, 0, 0.3)",
                     },
                     "& .MuiPaper-root": {
                       backgroundColor: "white",
                       display: "flex",
                       flexDirection: "column",
                       animation: "slideUp 0.3s ease-out forwards",
                       width:"100%",
                       height:"884px",
                       position:"fixed",
                       borderRadius: "20px 20px 0 0",
                       bottom:"0px",
                       marginBottom:"0px",
                       marginTop:"0px",
                       paddingTop:"20px"
   
                     },
                     "@keyframes slideUp": {
                       from: { transform: "translateY(100%)" },
                       to: { transform: "translateY(0)" },
                     },
                   }}
             >
                 <DialogContent
                 //  sx={{ flex: 1, overflowY: "auto", paddingBottom: "5px" }}
                    sx={{
                         overflowY: "auto",
                         width: "100%",
                         height:"100%",
                         "&::-webkit-scrollbar": { display: "none" },
                         scrollbarWidth: "none",
                       }}
                  >
   
                     <div className="absolute z-40 top-0 left-0 right-0 bg-white border-b border-gray-300 rounded-t-[10px] pl-6 pr-4 pb-3 pt-4">
                         <div className="flex items-center justify-between">
                             <p className="text-[14px] font-semibold font-inter text-[#023E8A]">Clear All</p>
                             <p className="text-[20px] font-inter font-medium">Filter By</p>
                             <IconButton onClick={closeDialog}>
                                 <CloseOutlinedIcon className="w-[32px] h-[32px] p-[4px] font-bold bg-white border-[0.5px] border-[#EBECED] shadow-[0px_4px_4px_rgba(0,0,0,0.06)] rounded-[4px]" />
                             </IconButton>
                         </div>
                     </div>
   
                 
                 <div className="overflow-y-hidden px-2 mt-12">
                         <div className="mb-[20px] mt-[24px]">
                             <p className="text-[18px] font-inter font-medium">Price Range</p>
                               <Slider
                                 getAriaLabel={() => "Price range"}
                                 // value={value}
                                 // onChange={handleSliderChange}
                                 value={tempValue}
                                 onChange={handleTempSliderChange}
                                 min={0}
                                 max={1000000}
                                 step={1000}
                                 sx={{width:"95%", margin:"auto", marginLeft:"10px"}}
                               />
                         </div>
   
                         <Box className="flex justify-between gap-[16px]">
                             <div className="flex flex-col">
                                 <label htmlFor="from" className="mb-1 text-[16px]">Minimum</label>
                                 <TextField
                                     id="from"
                                     type="text"
                                     variant="outlined"
                                     size="small"
                                     InputProps={{ readOnly: true }} 
                                     value={formatNumber(tempValue[0])}
                                     placeholder="₦0"
                                     aria-readonly
                                     onChange={handleMinPriceChange}
                                     sx={{
                                         width: "100%",
                                         "& .MuiInputBase-root": { height: "44px", borderRadius: "8px" },
                                     }}
                                 />
                             </div>
                             <div className="flex flex-col">
                                 <label htmlFor="to" className="mb-1 text-[16px]">Maximum</label>
                                 <TextField
                                     id="to"
                                     type="text"
                                     variant="outlined"
                                     InputProps={{ readOnly: true }} 
                                     size="small"
                                     aria-readonly
                                     placeholder="₦10,000,000"
                                     value={formatNumber(tempValue[1])}
                                     onChange={handleMaxPriceChange}
                                     sx={{
                                         width: "100%",
                                         "& .MuiInputBase-root": { height: "44px", borderRadius: "8px" },
                                     }}
                                 />
                             </div>
                         </Box>
   
                         <Divider sx={{ marginBottom: "14px",  marginTop: "14px"  }} />
                         <p className="text-[18px] font-inter font-medium">Stops</p>
                         <div className="flex gap-[16px]">
                             {["Non Stop", "1 Stop", "1+ Stop"].map((label, index) => (
                                 <button
                                     key={index}
                                     className={`border border-[#DEDFE1] w-full rounded-[6px] py-[8px] text-[16px] font-inter cursor-pointer transition-all ${
                                         activeButton === index ? "bg-[#023E8A] text-white" : "bg-white text-black"
                                     }`}
                                     onClick={() => {
                                         handleButtonClick(index);
                                         handleTempStopsChange(label)
                                         // handleStopsChange(label);
                                     }}
                                 >
                                     {label}
                                 </button>
                             ))}
                         </div>
                         <Divider sx={{  marginTop: "14px"  }} />
   
                             <div className="mb-[14px] mt-[14px]">
                                 <p className="text-[18px] font-inter font-medium">Refund Policy</p>
                                 <FormGroup>
                                     <FormControlLabel control={<Checkbox   checked={tempRefundPolicy === "Refundable"} onChange={handleTempRefundPolicyChange} name="Refundable" />} label="Refundable" />
                                     <FormControlLabel control={<Checkbox    checked={tempRefundPolicy === "Non-Refundable"} onChange={handleTempRefundPolicyChange} name="Non-Refundable" />} label="Non Refundable" />
                                 </FormGroup>
                             </div>
                             <Divider />
   
                             <div className="mb-[100px] mt-[20px]">
                                 <p className="text-[18px] font-inter font-medium">Airlines</p>
                                 <FormGroup>
                                     <FormControlLabel
                                         control={
                                           <Checkbox
                                             checked={tempSelectedAirlines.length === airlinesList.length} // Check if all airlines are selected
                                             indeterminate={tempSelectedAirlines.length > 0 && tempSelectedAirlines.length < airlinesList.length} // Show partial selection
                                             onChange={handleTempSelectedChange}
                                             name="all"
                                           />
                                         }
                                         label="Select All carriers"
                                       />
                                     {["Aero", "Arik Air", "Value Jet", "Air Peace", "United Nigeria"].map((airline) => (
                                       <FormControlLabel
                                         key={airline}
                                         control={
                                           <Checkbox
                                             checked={tempSelectedAirlines.includes(airline)}
                                             onChange={handleTempSelectedChange}
                                             name={airline}
                                           />
                                         }
                                         label={airline}
                                       />
                                     ))}
                                 </FormGroup>
                             </div>
                 </div>
                 </DialogContent>
                         <div className="absolute bottom-0 border-t border-[grey] left-0 right-0 bg-white p-4 rounded-b-[10px]">
                         <button onClick={handleApplyFilters} className="w-full h-[52px] rounded-[6px] bg-[#023E8A] text-white cursor-pointer">
                             Apply
                         </button>
                     </div>
             
                   </Dialog>
   
                     <TextField
                     id="sort"
                     variant="outlined"
                     size="small"
                     placeholder="Sort"
                     // placeholder={selectedSort ? selectedSort.replace("_", " ") : "Sort"}
                     // value={selectedSort}
                     onClick={openSort}
                       InputProps={{
                       startAdornment: (
                       <InputAdornment position="start">
                       <SortIcon sx={{color:"black"}} />
                       </InputAdornment>
                       ),
                       readOnly: true, 
                       }}
                    
                         sx={{
    width: "100px",
    "& .MuiInputBase-root": {
      height: "44px",
      borderRadius: "8px",
      borderColor: "#DEDFE1",
      cursor: "pointer",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "black",
      opacity: 1, // ensures full color visibility
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  }}
                         />
                         
                       <Dialog
                         open={isSortOpen}
                         onClose={closeSort} 
                         TransitionComponent={Transition}
                         keepMounted
                         fullScreen
                         sx={{
                           "& .MuiBackdrop-root": {
                             backgroundColor: "rgba(0, 0, 0, 0.3)",
                           },
                           "& .MuiPaper-root": {
                             backgroundColor: "white",
                             display: "flex",
                             flexDirection: "column",
                             animation: "slideUp 0.3s ease-out forwards",
                             width: "100%",
                             height: "438px",
                             position: "fixed",
                             borderRadius: "20px 20px 0 0",
                             bottom: "0px",
                             paddingTop: "20px",
                           },
                           "@keyframes slideUp": {
                             from: { transform: "translateY(100%)" },
                             to: { transform: "translateY(0)" },
                           },
                         }}
                       >
                         <DialogContent
                           sx={{
                             overflowY: "auto",
                             width: "100%",
                             height: "100%",
                             "&::-webkit-scrollbar": { display: "none" },
                             scrollbarWidth: "none",
                           }}
                           className="flex flex-col"
                         >
   
                             <div className="mb-6">
                             <IconButton sx={{ position: "absolute", left: "28px", top: "15px" }} className="w-[40px] h-[40px] p-[8px] "  onClick={closeSort} >
                             <CloseOutlinedIcon className="font-bold bg-white border-[0.5px] border-[#EBECED] shadow-md rounded-[4px]" />
                             </IconButton>
                             <p className="text-center font-medium text-[20px] mt-[-20px]">Sort By</p>
                             </div>
                           <RadioGroup value={selectedSortOption} onChange={(e) => handleSorted(e.target.value)}>
                             <FormControlLabel value="recommended" control={<Radio />} label="Recommended" />
                             <FormControlLabel value="price_low" control={<Radio />} label="Price: Low to High" />
                             <FormControlLabel value="price_high" control={<Radio />} label="Price: High to Low" />
                             <FormControlLabel value="shortest_duration" control={<Radio />} label="Shortest Duration" />
                             <FormControlLabel value="longest_duration" control={<Radio />} label="Longest Duration" />
                           </RadioGroup>
   
                           <div className="mt-4">
                             <button 
                               onClick={applySorting} 
                               className="bg-[#023E8A] w-full h-[52px] text-white rounded-[6px] mt-[40px] font-infer text-[16px] cursor-pointer"
                             >
                               Apply
                             </button>
                           </div>
                         </DialogContent>
                       </Dialog>
   
                     </Box>
                     </div>
                 </div>   
                 </div>
   
                   
                 
             </div>
           
     </div>

    <div>
       <div className=' w-[90%] m-auto cursor-pointer'>
                 {paginatedItems.length > 0 ? (
                     paginatedItems.map((depart) => (
                     <div key={depart.id} className="group" onClick={() => handleOpen(depart)}>
                         <div className='w-full font-inter border mb-4 border-[#809EC4] h-[175px] rounded-[7px]  pb-[16px] pt-[16px]  pl-[16px] pr-[16px] 
                             group-hover:bg-[#CCD8E81A] group-hover:border-[#023E8A] group-hover:border-[1px] transition-all duration-300'>
       
                             <div className='flex gap-3 justify-between mb-4'>
                              <div className='flex gap-2'>
                              <div className='border-1 p-[3px] border-[#DEDFE1] bg-white h-[22px] w-[22px] rounded-lg'>
                              <img src={depart.image} alt='Airline logo' />
                              </div>
                               <div><p className=' font-medium text-[14px]'>{depart.planeName}</p></div>
                                </div>
                                 <div className='flex gap-[4px]'>
                                     <p className='text-[#D72638] text-[14px]'>{depart.spaceleft}</p>
                                     <CircleIcon className=' text-[#4E4F52] mt-[10px]' sx={{ width: "4px", height: "4px" }} />
                                     <div className="text-[14px]">{depart.class}</div>
                                 </div>
                             </div>
       
                         
                             <div className='flex justify-center gap-6'>
                                 <div className='relative left-6'>
                                     <p className="text-[14px] font-semibold">{depart.timefrom}</p>
                                     <p className="text-[14px] font-normal text-[#4E4F52] relative right-3">{depart.placefrom}</p>
                                 </div>
       
                                 <div>
                                     <div className='flex gap-[2px] justify-center'>
                                         <p className="text-[14px] font-normal text-[#4E4F52]">{depart.duration}</p>
                                         <CircleIcon className=' text-[#4E4F52] mt-[7px]' sx={{ width: "4px", height: "4px" }} />
                                         <p className="text-[14px] font-normal text-[#4E4F52]">{depart.non}</p>
                                     </div>
                                     <img className="w-[140px]"  src={depart.line} alt='' />
                                     <div className='flex justify-center text-[14px] font-normal text-[#4E4F52]'>{depart.flightcode}</div>
                                 </div>
       
                                 <div>
                                     <p  className="text-[14px] font-semibold">{depart.timeto}</p>
                                     <p className="text-[14px] font-normal text-[#4E4F52] relative right-3">{depart.placeto}</p>
                                 </div>
                             </div>
       
                           
                             <div className='flex justify-between mt-3'>
                                 <div><p className="text-[14px] font-medium mt-2 text-[#181818]" >{depart.refundable}</p></div>
                                 <div>
                                     <div className='flex gap-1'>
                                         <p className="text-[16px] font-medium text-[#181818]" >{depart.price}</p>
                                         <p className="text-[16px] font-medium text-[#181818]">{depart.passenger}</p>
                                     </div>
                                     <p className="text-[#4E4F52] text-[14px] font-normal">{depart.tax}</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 ))
                     ) : (
                         <div className="flex flex-col items-center justify-center mt-20">
                           <div >
                           <SearchOutlinedIcon sx={{width:"60px", height:"60px", color:"#67696D"}} className="w-[44px] h-[44px]" />
                           </div>
                             <p className="text-black font-semibold text-[20px] mt-4">No Flight Match your Search</p>
                             <p className="text-[#67696D] w-[80%] m-auto font-normal text-[16px] mt-4 text-center">Looks like there are no flights for your selected route and dates. Try selecting different travel dates.</p>
                         </div>
                     )}
       
       
                     <Stack spacing={2} className='mt-20'>
                         <Pagination 
                             count={Math.ceil(applyFilters.length / ITEMS_PER_PAGE)} 
                             shape='rounded' 
                             page={page} 
                             onChange={handleChange}
                             sx={{ display: 'flex', justifyContent: 'center' }}
                         />
       
                     </Stack>
       
                         <Dialog open={openClick} 
                         onClose={handleCloseClick} 
                         TransitionComponent={Transition}
                       keepMounted
                       fullScreen
                       // onClick={handleCloseFrom}
                       sx={{
                         "& .MuiBackdrop-root": {
                           backgroundColor: "rgba(0, 0, 0, 0.3)",
                         },
                         "& .MuiPaper-root": {
                           backgroundColor: "white",
                           display: "flex",
                           flexDirection: "column",
                           animation: "slideUp 0.3s ease-out forwards",
                           width:"100%",
                           height:"747px",
                           position:"fixed",
                           borderRadius: "20px 20px 0 0",
                           bottom:"0px",
                           marginBottom:"0px",
                           marginTop:"0px",
                           paddingTop:"20px"
       
                         },
                         "@keyframes slideUp": {
                           from: { transform: "translateY(100%)" },
                           to: { transform: "translateY(0)" },
                         },
                       }}
                             >
                             <DialogContent
                            sx={{
                             overflowY: "auto",
                             width: "100%",
                             height:"100%",
                             "&::-webkit-scrollbar": { display: "none" },
                             scrollbarWidth: "none",
                           }}
                         >
       
                     <div className="absolute z-40 top-0 left-0 right-0 bg-white border-b border-gray-300 rounded-t-[10px] pl-6 pr-4 pb-3 pt-4">
                         <div className="flex items-center justify-center relative">
                              
                          <div 
                             onClick={handleCloseClick} 
                             style={{position:"absolute",  left:"0px", top:"-5px"}}
                           className=" w-[32px] h-[32px]  text-center bg-white border-[0.5px] border-[#EBECED] shadow-[0px_4px_4px_rgba(0,0,0,0.06)]"
                             >
                           <CloseOutlinedIcon onClick={handleCloseClick} className=" w-[25px] font-bold " />
                         </div>
                           
                             <p className="text-[20px] font-inter font-medium ">Departure Flight 2</p>
                           
                         </div>
                     </div>
                         
                         <div className="mt-[75px] ">
                             <div className='w-full border-1 border-[#023E8A] bg-[#CCD8E81A] rounded-[6px] mb-[16px] '>
       
                                 <div className='items-center p-2'>
                                     <p className='text-[18px] text-[#181818] font-inter font-medium'>{selectedDeparture?.placefrom} to  {selectedDeparture?.placeto}</p>
                                     <p className='text-[15px] text-[#4E4F52] '>Feb 19, 1 {selectedDeparture?.passenger}</p>
       
                                 </div>
       
                             </div>
       
                                   <div>
                                     <div className="w-full border-1 border-[#DEDFE1] bd-white rounded-[6px] p-[12px]">
                                         <div>
                                         <p className="text-[19px]  font-medium text-[#181818] ">Departure Flight 2</p>
                                         <p className="text-[#181818] text-[16px] font-medium">₦50,000 </p>
                                         <p className="text-[#4E4F52] text-[16px] font-normal">Per Passenger</p>
                                         <p  className="text-[#181818] text-[16px] font-medium"><ErrorOutlineIcon />Price Includes tax & Fees</p>
       
                                         </div>
                                     </div>
                                   </div>
       
                             {selectedDeparture && (
                             <div>
                                     <div className="w-full border-1 border-[#DEDFE1] bd-white rounded-[6px] p-[12px] mt-[16px] mb-[16px]">
                                         <div className="flex flex-col gap-1">
                                             <div className='flex gap-[4px]'>
                                                 <img src={selectedDeparture?.image} alt="" className='w-[19px]' />
                                                 <p className="text-[#67696D] text-[18px] font-normal ">{selectedDeparture?.planeName}</p>
                                             </div>
                                             <p className='text-[#4E4F52] font-normal text-[16px]'><FlightClassOutlinedIcon />{selectedDeparture?.class}</p>
                                             <p className='text-[#4E4F52] font-normal text-[16px]'><CalendarMonthOutlinedIcon />Feb 19</p>
                                             <p className="text-[#4E4F52] text-[16px] font-normal"><AccessTimeIcon />{selectedDeparture?.timefrom} - {selectedDeparture?.timeto} ({selectedDeparture?.duration} {selectedDeparture?.non})</p>
                                             <p className="text-[#4E4F52] text-[16px] font-normal"><LuggageOutlinedIcon />1 Carry-on + 23kg Checked Bag</p>
                                             <p className="text-[#4E4F52] text-[16px] font-normal"><AirlineSeatReclineExtraOutlinedIcon /> Seat Selection is not allowed</p>
                                             <p className="text-[#4E4F52] text-[16px] font-normal"><CloseOutlinedIcon /> {selectedDeparture?.refundable}</p>
                                             
                                         </div>
       
                                         <div>
       
                                         </div>
                                     </div>
                                   </div>
                             )}
       
                             <div className="flex justify-between pb-[150px]">
       
                             <div>
                                 <p className='text-[#181818] text-[18px] font-medium'>Extra  Baggage</p>
                                 <p className="text-[#181818] text-[16px] font-normal">Checked Bag(Up to 23kg)</p>
                                 <p  className="text-[#4E4F52] text-[14px] font-normal">Extra ₦10,000</p>
                             </div>
                             
                             <div className="w-[95px] h-[30px] mt-1.5 rounded-[4px] border border-[#023E8A] flex justify-between gap-2 items-center px-2">
                                     <RemoveOutlinedIcon
                                       className="text-[#ACAEB3] cursor-pointer"
                                       onClick={() => handleDecrement("adults")}
                                     />
                                     <div>{counts.adults}</div>
                                     <AddOutlinedIcon
                                       className="cursor-pointer"
                                       onClick={() => handleIncrement("adults")}
                                     />
                             </div>
                             </div>
                         </div>
                         </DialogContent>
                         <Link to="/flightInfo-review-multi-way">
                         <div className="absolute bottom-0 border-t border-[grey] left-0 right-0 bg-white p-4 rounded-b-[10px]">
                         <button onClick={handleApplyFilters} className="w-full h-[52px] rounded-[6px] bg-[#023E8A] text-white cursor-pointer">
                             Select
                         </button>
                     </div>
                     </Link>
                         </Dialog>
        </div>
    </div>
   
    </div>

    <div className=''>
        <TravelmateApp />
    </div>

     <Footer />



   </div>
   
       ):(
        // web view



    <div className='w-full  bg-[#CCD8E833] mt-[73px] '>
    <div><Navbar/></div>

      <div className='w-[90%] m-auto'>
        <div className='flex gap-1 text-[15px] mb-4 pt-4'>
          <Breadcrumb/>
        </div>
    </div>

<Divider  />

    <div className='bg-white w-full h-full pt-[20px] pb-[50px] mb-[100px]'>
  
    
    

<div className=''>
    <div className='mt-[10px] mb-[26px]'>
        <div className='w-[90%] m-auto flex justify-between'>
            <p className='text-[28px] font-inter font-semibold'>Departure Flight from ABV to ENU</p>
             <div>
            <div className=''>
             <Box sx={{display:"flex", gap:"15px"}}>
                  
              <TextField
                id="filter-input"
                variant="outlined"
                size="small"
                placeholder="Filter"
                aria-readonly="true"
                onClick={openDialog}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <TuneIcon sx={{color:"black"}} />
                    </InputAdornment>
                    ),
                    readOnly: true, 
                }}
                sx={{
    width: "100px",
    "& .MuiInputBase-root": {
      height: "44px",
      borderRadius: "8px",
      borderColor: "#DEDFE1",
      cursor: "pointer",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "black",
      opacity: 1, 
    },
    "& .MuiInputBase-input": {
      color: "black",
    },
  }}
                />


          <Dialog
              open={isDialogOpen}
              onClose={closeDialog}
              fullWidth
              sx={{
            "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
            },
            "& .MuiPaper-root": {
                width: "390px",
                height: "880px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
            },
        }}
    >
        <DialogContent sx={{ flex: 1, overflowY: "auto", paddingBottom: "5px" }}>

            <div className="absolute z-40 top-0 left-0 right-0 bg-white border-b border-gray-300 rounded-t-[10px] pl-6 pr-4 pb-3 pt-4">
                <div className="flex items-center justify-between">
                    <p className="text-[14px] font-semibold font-inter text-[#023E8A]">Clear All</p>
                    <p className="text-[20px] font-inter font-medium">Filter By</p>
                    <IconButton onClick={closeDialog}>
                        <CloseOutlinedIcon className="w-[32px] h-[32px] p-[4px] font-bold bg-white border-[0.5px] border-[#EBECED] shadow-[0px_4px_4px_rgba(0,0,0,0.06)] rounded-[4px]" />
                    </IconButton>
                </div>
            </div>

        
            <div className="overflow-y-hidden px-2 mt-12">
                <div className="mb-[20px] mt-[24px]">
                    <p className="text-[18px] font-inter font-medium">Price Range</p>
                       <Slider
                        getAriaLabel={() => "Price range"}
                        value={tempValue}
                        onChange={handleTempSliderChange}
                        min={0}
                        max={1000000}
                        step={1000}
                        sx={{width:"95%", margin:"auto", marginLeft:"10px"}}
                      />
                </div>

                <Box className="flex justify-between gap-[16px]">
                    <div className="flex flex-col">
                        <label htmlFor="from" className="mb-1 text-[16px]">Minimum</label>
                        <TextField
                            id="from"
                            type="text"
                            variant="outlined"
                            size="small"
                            InputProps={{ readOnly: true }} 
                            value={formatNumber(tempValue[0])}
                            placeholder="₦0"
                            aria-readonly
                            onChange={handleMinPriceChange}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-root": { height: "44px", borderRadius: "8px" },
                            }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="to" className="mb-1 text-[16px]">Maximum</label>
                        <TextField
                            id="to"
                            type="text"
                            variant="outlined"
                            InputProps={{ readOnly: true }} 
                            size="small"
                            aria-readonly
                            placeholder="₦10,000,000"
                            value={formatNumber(tempValue[1])}
                            onChange={handleMaxPriceChange}
                            sx={{
                                width: "100%",
                                "& .MuiInputBase-root": { height: "44px", borderRadius: "8px" },
                            }}
                        />
                    </div>
                </Box>

                <Divider sx={{ marginBottom: "14px",  marginTop: "14px"  }} />
                <p className="text-[18px] font-inter font-medium">Stops</p>
                <div className="flex gap-[16px]">
                    {["Non Stop", "1 Stop", "1+ Stop"].map((label, index) => (
                        <button
                            key={index}
                            className={`border border-[#DEDFE1] w-full rounded-[6px] py-[8px] text-[16px] font-inter cursor-pointer transition-all ${
                                activeButton === index ? "bg-[#023E8A] text-white" : "bg-white text-black"
                            }`}
                            onClick={() => {
                                handleButtonClick(index);
                                handleTempStopsChange(label)
                                // handleStopsChange(label);
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <Divider sx={{  marginTop: "14px"  }} />

                    <div className="mb-[14px] mt-[14px]">
                        <p className="text-[18px] font-inter font-medium">Refund Policy</p>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox   checked={tempRefundPolicy === "Refundable"} onChange={handleTempRefundPolicyChange} name="Refundable" />} label="Refundable" />
                            <FormControlLabel control={<Checkbox    checked={tempRefundPolicy === "Non-Refundable"} onChange={handleTempRefundPolicyChange} name="Non-Refundable" />} label="Non Refundable" />
                        </FormGroup>
                    </div>
                    <Divider />

                    <div className="mb-[100px] mt-[20px]">
                        <p className="text-[18px] font-inter font-medium">Airlines</p>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tempSelectedAirlines.length === airlinesList.length}
                                    indeterminate={tempSelectedAirlines.length > 0 && tempSelectedAirlines.length < airlinesList.length} 
                                    onChange={handleTempSelectedChange}
                                    name="all"
                                  />
                                }
                                label="Select All carriers"
                              />
                            {["Aero", "Arik Air", "Value Jet", "Air Peace", "United Nigeria"].map((airline) => (
                              <FormControlLabel
                                key={airline}
                                control={
                                  <Checkbox
                                    checked={tempSelectedAirlines.includes(airline)}
                                    onChange={handleTempSelectedChange}
                                    name={airline}
                                  />
                                }
                                label={airline}
                              />
                            ))}
                        </FormGroup>
                    </div>
                </div>
        </DialogContent>
                <div className="absolute bottom-0 border-t border-[grey] left-0 right-0 bg-white p-4 rounded-b-[10px]">
                <button onClick={handleApplyFilters} className="w-full h-[52px] rounded-[6px] bg-[#023E8A] text-white cursor-pointer">
                    Apply
                </button>
            </div>
    
                </Dialog>

                    
                <Select
                        id="sort"
                        variant="outlined"
                        size="small"
                          value={selectedSort}
                          onChange={handleSortedChange}
                          displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                            <SortIcon sx={{color:"black"}} />
                            </InputAdornment>
                        }
                        MenuProps={{
                            PaperProps: {
                            sx: {
                                width: "300px",
                                maxHeight: "335px",
                                "& .MuiMenuItem-root": {
                                paddingY: "10px", 
                                margin: 0, 
                                backgroundColor: "transparent !important",
                                "&:hover": {
                                    backgroundColor: "#023E8A !important",
                                    color: "white",
                                },
                                },
                            },
                            },
                        }}
                        sx={{
                            width: "255px",
                            "& .MuiInputBase-root": {
                            height: "44px",
                            borderRadius: "8px",
                            borderColor: "#DEDFE1",
                            },
                        }}
                        >
                        <MenuItem value="" disabled>Sort by : Recommended</MenuItem>
                        <MenuItem value="recommended">Recommended</MenuItem>
                        <MenuItem value="price_low">Price: Low to High</MenuItem>
                        <MenuItem value="price_high">Price: High to Low</MenuItem>
                        <MenuItem value="shortest_duration">Shortest Duration</MenuItem>
                        <MenuItem value="longest_duration">Longest Duration</MenuItem>
                </Select>

                
            </Box>
            </div>
        </div>   
        </div>

          
        
    </div>
    <Divider />

</div>

    <div>
        <div className='mt-[24px] w-[90%] m-auto cursor-pointer'>
     

      {paginatedItems.length > 0 ? (
        paginatedItems.map((depart) => (
        <div key={depart.id} className="group" onClick={() => handleOpen(depart)}>
            <div className='w-full font-inter border mb-4 border-[#809EC4] h-[170px] rounded-[7px] pt-[16px] pd-[16px] pl-[16px] pr-[16px] 
                group-hover:bg-[#CCD8E81A] group-hover:border-[#023E8A] group-hover:border-[1px] transition-all duration-300'>

                <div className='flex gap-3 justify-between'>
                    <div className='flex gap-2'>
                        <div className='border-1 p-[3px] border-[#DEDFE1] bg-white h-[40px] w-[40px] rounded-lg'>
                            <img src={depart.image} alt='Airline logo' />
                        </div>
                        <div><p className='mt-2'>{depart.planeName}</p></div>
                    </div>
                    <div className='flex gap-[4px]'>
                        <p className='text-[#D72638]'>{depart.spaceleft}</p>
                        <CircleIcon className=' text-[#4E4F52]' sx={{ width: "4px", height: "4px" }} />
                        <div>{depart.class}</div>
                    </div>
                </div>

            
                <div className='flex justify-center gap-6'>
                    <div className='relative left-6'>
                        <p>{depart.timefrom}</p>
                        <p className='relative right-3'>{depart.placefrom}</p>
                    </div>

                    <div>
                        <div className='flex gap-[2px] justify-center'>
                            <p>{depart.duration}</p>
                            <CircleIcon className=' text-[#4E4F52]' sx={{ width: "4px", height: "4px" }} />
                            <p>{depart.non}</p>
                        </div>
                        <img src={depart.line} alt='' />
                        <div className='flex justify-center'>{depart.flightcode}</div>
                    </div>

                    <div>
                        <p>{depart.timeto}</p>
                        <p className='relative right-3'>{depart.placeto}</p>
                    </div>
                </div>

               
                <div className='flex justify-between'>
                    <div><p>{depart.refundable}</p></div>
                    <div>
                        <div className='flex gap-1'>
                            <p>{depart.price}</p>
                            <p>{depart.passenger}</p>
                        </div>
                        <p>{depart.tax}</p>
                    </div>
                </div>
            </div>
        </div>
    ))
        ) : (
        <div className="flex flex-col items-center justify-center mt-20">
        <div >
            <SearchOutlinedIcon sx={{width:"60px", height:"60px", color:"#67696D"}} className="w-[44px] h-[44px]" />
        </div>
            <p className="text-black font-semibold text-[20px] mt-4">No Flight Match your Search</p>
            <p className="text-[#67696D] w-[80%] m-auto font-normal text-[16px] mt-4 text-center">Looks like there are no flights for your selected route and dates. Try selecting different travel dates.</p>
        </div>
        )}


        <Stack spacing={2} className='mt-50'>
            <Pagination 
                count={Math.ceil(applyFilters.length / ITEMS_PER_PAGE)} 
                shape='rounded' 
                page={page} 
                onChange={handleChange}
                sx={{ display: 'flex', justifyContent: 'center' }}
            />

        </Stack>

            <Dialog open={openClick} onClose={handleCloseClick} 
                 sx={{
                "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
                "& .MuiPaper-root": {
                    width: "550px",
                    height: "880px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    
                },
            }}
                >
                <DialogContent
                sx={{
                flex: 1,
                overflowY: "auto",
                paddingBottom: "5px",
                "&::-webkit-scrollbar": {
                display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}>

         <div className="absolute z-40 top-0 left-0 right-0 bg-white border-b border-gray-300 rounded-t-[10px] pl-6 pr-4 pb-3 pt-4">
            <div className="flex items-center justify-center relative">
               
                <p className="text-[20px] font-inter font-medium ">Departure Flight 2</p>
          
             
               <IconButton 
                onClick={handleCloseClick} 
                sx={{position:"absolute",  right:"0px", top:"-5px"}}
            >
                <CloseOutlinedIcon onClick={handleCloseClick}  className="w-[32px] h-[32px] p-[4px] font-bold bg-white border-[0.5px] border-[#EBECED] shadow-[0px_4px_4px_rgba(0,0,0,0.06)] rounded-[4px]" />
            </IconButton>
              
            </div>
        </div>
            
            <div className="mt-[75px] ">
                <div className='w-full border-1 border-[#023E8A] bg-[#CCD8E81A] rounded-[6px] mb-[16px] '>

                    <div className='items-center p-2'>
                        <p className='text-[18px] text-[#181818] font-inter font-medium'>{selectedDeparture?.placefrom} to  {selectedDeparture?.placeto}</p>
                        <p className='text-[15px] text-[#4E4F52] '>Feb 19, 1 {selectedDeparture?.passenger}</p>

                    </div>

                </div>

                      <div>
                        <div className="w-full border-1 border-[#DEDFE1] bd-white rounded-[6px] p-[12px]">
                             <div>
                            <p className="text-[19px]  font-medium text-[#181818] ">Departure Flight 2</p>
                            <p className="text-[#181818] text-[16px] font-medium">₦50,000 </p>
                            <p className="text-[#4E4F52] text-[16px] font-normal">Per Passenger</p>
                            <p  className="text-[#181818] text-[16px] font-medium"><ErrorOutlineIcon />Price Includes tax & Fees</p>

                            </div>
                        </div>
                      </div>

                {selectedDeparture && (
                <div>
                        <div className="w-full border-1 border-[#DEDFE1] bd-white rounded-[6px] p-[12px] mt-[16px] mb-[16px]">
                             <div className="flex flex-col gap-1">
                                <div className='flex gap-[4px]'>
                                    <img src={selectedDeparture?.image} alt="" className='w-[19px]' />
                                    <p className="text-[#67696D] text-[18px] font-normal ">{selectedDeparture?.planeName}</p>
                                </div>
                                <p className='text-[#4E4F52] font-normal text-[16px]'><FlightClassOutlinedIcon />{selectedDeparture?.class}</p>
                                <p className='text-[#4E4F52] font-normal text-[16px]'><CalendarMonthOutlinedIcon />Feb 19</p>
                                <p className="text-[#4E4F52] text-[16px] font-normal"><AccessTimeIcon />{selectedDeparture?.timefrom} - {selectedDeparture?.timeto} ({selectedDeparture?.duration} {selectedDeparture?.non})</p>
                                <p className="text-[#4E4F52] text-[16px] font-normal"><LuggageOutlinedIcon />1 Carry-on + 23kg Checked Bag</p>
                                <p className="text-[#4E4F52] text-[16px] font-normal"><AirlineSeatReclineExtraOutlinedIcon /> Seat Selection is not allowed</p>
                                <p className="text-[#4E4F52] text-[16px] font-normal"><CloseOutlinedIcon /> {selectedDeparture?.refundable}</p>
                                
                            </div>

                            <div>

                            </div>
                        </div>
                      </div>
                )}

                <div className="flex justify-between pb-[150px]">

                <div>
                    <p className='text-[#181818] text-[18px] font-medium'>Extra  Baggage</p>
                    <p className="text-[#181818] text-[16px] font-normal">Checked Bag(Up to 23kg)</p>
                    <p  className="text-[#4E4F52] text-[14px] font-normal">Extra ₦10,000</p>
                </div>
                
                <div className="w-[95px] h-[30px] mt-1.5 rounded-[4px] border border-[#023E8A] flex justify-between gap-2 items-center px-2">
                        <RemoveOutlinedIcon
                          className="text-[#ACAEB3] cursor-pointer"
                          onClick={() => handleDecrement("adults")}
                        />
                        <div>{counts.adults}</div>
                        <AddOutlinedIcon
                          className="cursor-pointer"
                          onClick={() => handleIncrement("adults")}
                        />
                </div>
                </div>
            </div>
            </DialogContent>
            <Link to="/flightInfo-review-multi-way">
            <div className="absolute bottom-0 border-t border-[grey] left-0 right-0 bg-white p-4 rounded-b-[10px]">
            <button onClick={handleApplyFilters} className="w-full h-[52px] rounded-[6px] bg-[#023E8A] text-white cursor-pointer">
                Select
            </button>
        </div>
        </Link>
            </Dialog>
        </div>
    </div>
   
    </div>

    <div className=''>
        <TravelmateApp />
    </div>

     <Footer />

     </div>

      )}
     </div>

  )
}

export default DeparturePage