

import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Popper, ClickAwayListener, Paper, Typography, Divider, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { DateRange, RangeKeyDict } from 'react-date-range';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOn";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useLocation } from "react-router-dom";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Navbar from '../../homePage/Navbar'
import CarList from "./CarList";
import TravelmateApp from "../../homePage/TravelmateApp";
import Footer from "../../../components/2Footer";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DisplayCars = () => {
     const isMobile = useMediaQuery({ maxWidth: 768 });
     const [dateRange, setDateRange] = useState<DateRangeType[]>([
            {
              startDate: new Date(),
              endDate: addDays(new Date(), 7),
              key: "selection",
            },
          ]);
          const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        
          const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          };
        
         const handleClose = () => {
            setAnchorEl(null);
          };
        
    
            const [FromClick, setFromClick] = useState<HTMLElement | null>(null);
            const [ToClick, setToClick] = useState<HTMLElement | null>(null);
    
        
                const [openFrom, setOpenFrom] = useState(false);
                const [openTo, setOpenTo] = useState(false);
                    
            const handleToClick = (event: React.MouseEvent<HTMLElement>) => {
              setOpenTo((prev) => !prev);
              setToClick(event.currentTarget);
            };
        
                 const handleCloseTo = () => {
                 setOpenTo(false);
                };
        
        
            const handleFromClick = (event: React.MouseEvent<HTMLElement>) => {
              setOpenFrom((prev) => !prev);
              setFromClick(event.currentTarget);
            };
        
        
              const handleFromOptionClick = (option: string) => {
                setFrom(option);
                setOpenFrom(false); 
              };
        
              const handleToOptionClick = (option: string) => {
                setTo(option);;
                setOpenTo(false); 
              };
        
        
              const handleCloseFrom = () => {
                setOpenFrom(false);
              };
        
          const open = Boolean(anchorEl);
          const id = open ? "date-range-popper" : undefined;
          
        
        const [locations, setLocations] = useState(["Ibadan, Oyo", "Abuja", "Port Harcourt"]);
        
        const handleRemoveOption = (locationToRemove: string) => {
          setLocations(locations.filter(location => location !== locationToRemove));
        };



const location = useLocation();
const state = location.state || {};
const { 
    from: stateFrom, 
    to: stateTo, 
    departureDate: stateDepartureDate, 
    times: stateTimes = {},
    priceRange,
} = state;

const [from, setFrom] = useState(stateFrom || "");
const [to, setTo] = useState(stateTo || "");
// const [price, setPrice] = useState(priceRange || "");
const [departureDate, setDepartureDate] = useState(stateDepartureDate || "");


const handleSelectDate = () => {
  if (!dateRange || !dateRange[0]) return; 

  const formattedDate =
    dateRange[0].startDate === dateRange[0].endDate
      ? format(dateRange[0].startDate, "dd MMM yyyy")
      : `${format(dateRange[0].startDate, "dd MMM yyyy")} - ${format(dateRange[0].endDate, "dd MMM yyyy")}`;

  setDepartureDate(formattedDate); 
  handleClose();
};

// const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);



const [times, setTimes] = useState({
    pickUpTime: stateTimes?.pickUpTime || "",
    dropOffTime: stateTimes?.dropOffTime || "",
});

const [timePeriod, setTimePeriod] = useState(state?.timePeriod || "AM");
const [timePeriodPM, setTimePeriodPM] = useState(state?.timePeriodPM || "PM");


const handleTimePeriodChange = (event: SelectChangeEvent<string>) => {
    setTimePeriod(event.target.value);
};

const handleTimePeriodChangePM = (event: SelectChangeEvent<string>) => {
    setTimePeriodPM(event.target.value);
};

useEffect(() => {
    setFrom(stateFrom || "");
    setTo(stateTo || "");
    setDepartureDate(stateDepartureDate || "");
    setTimes({
        pickUpTime: stateTimes?.pickUpTime || "",
        dropOffTime: stateTimes?.dropOffTime || "",
    });
}, [location.state, stateDepartureDate, stateFrom, stateTimes?.dropOffTime, stateTimes?.pickUpTime, stateTo]);


const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => setFrom(e.target.value);
const handleToChange = (e: ChangeEvent<HTMLInputElement>) => setTo(e.target.value);

const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimes((prevTimes) => ({ ...prevTimes, [event.target.name]: event.target.value }));
};
        
  return (

    <div>
    <div><Navbar /></div>
    {isMobile ? (
    <div>
        <div>
          <div className="mb-6 ">
            <Link to="/" >
                <div style={{ position: "absolute", left: "28px", top: "76px" }} className="w-[40px] h-[40px] p-[8px]  bg-white border-[0.5px] border-[#EBECED] shadow-md rounded-[4px] ">
                <ArrowBackIosNewOutlinedIcon className="font-bold " />
                </div>
            </Link>
                <p className="text-center font-medium text-[20px]  mt-[80px]">Choose Your Car</p>
            </div>

                <div className='mb-[32px] mt-[25px] w-[90%] m-auto'>
            
                <div className='border-1  border-[#023E8A] w-full bg-[#CCD8E81A] pt-[16px] pb-[16px] pr-[12px] pl-[12px] rounded-[8px]'>
            
                <div className='flex gap-2 justify-between'>
                
                <div className='text-[#181818]'>
                    <p>{from} to {to}</p>
                     <p>{departureDate}, {times.pickUpTime} {timePeriod}</p>
                     <p>{priceRange}</p>
                </div>

                <div>
                    <div><ModeEditOutlinedIcon className=' text-[#023E8A]' /></div>
                </div>
                
                </div>
            
            </div>
            </div>
        </div>

         <div>
            <CarList departureInfo={[]} />
        </div>


        <Footer />
    </div>

    ) : (


    <div  className='bg-[#F5F5F5] w-full h-full'>
       
    
        <div className="pt-30 w-[90%] m-auto mb-10">
            
            <div className="flex flex-col md:flex-row md:justify-between md:gap-[24px] lg:gap-[24px] md:flex-wrap lg:flex-wrap lg:flex-row lg:justify-between">

            <div>
            <div className="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-wrap lg:flex-row lg:justify-between gap-[24px]">
                
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="from" className="mb-1">Pick Up</label>
                <TextField
                    id="from"
                    variant="outlined"
                    size="small"
                    placeholder="Search Destination"
                    value={from}
                    onChange={handleFromChange}
                    onClick={handleFromClick}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LocationOnOutlinedIcon />
                        </InputAdornment>
                    ),
                    }}
                    className="md:w-[23vw] lg:w-[23vw] w-full"
                    sx={{
                    "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
                    }}
                />
                <Popper id="from-popper" open={openFrom} anchorEl={FromClick} placement="bottom-start">
                <ClickAwayListener onClickAway={handleCloseFrom}>
                    <Paper
                    elevation={3}
                    sx={{
                        width: "317px",
                        borderRadius: "6px",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        paddingBottom:"25px",
                    }}
                    >
                    <Typography variant="subtitle1" className="font-inter text-[#343537] text-lg pl-[24px] pt-[24px] pr-[24px]">
                        Recent Searches
                    </Typography>
        
                        {locations.length === 0 ? (
                        <Typography sx={{ textAlign: "center", padding: "20px", color: "#777" }} className="font-inter">
                            No recent searches
                        </Typography>
                        ) : (
                        locations.map((location, index) => (
                        <React.Fragment key={location}>
                            <div className="flex justify-between pl-[24px] pt-[24px] pr-[24px] cursor-pointer">
                            <div className="flex gap-[8px]" onClick={() => handleFromOptionClick(location)}>
                                <div className="h-[28px] w-[28px] rounded-[4px] border border-[#FF6F1E] bg-[#FF6F1E0A] text-center">
                                <RoomOutlinedIcon className="text-[#FF6F1E]" sx={{ fontSize: "16px" }} />
                                </div>
                                <p>{location}</p>
                            </div>
        
                        
                            <CloseOutlinedIcon
                                onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveOption(location);
                                }}
                                className="cursor-pointer"
                                sx={{ color: "gray" }}
                            />
                            </div>
        
                            {index !== locations.length - 1 && <Divider sx={{ marginTop: "15px" }} />}
                        </React.Fragment>
                        ))
                    )}
        
                    </Paper>
                </ClickAwayListener>
                </Popper>
                </Box>
        
                
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="to" className="mb-1">Drop Off</label>
                <TextField
                    id="to"
                    variant="outlined"
                    size="small"
                    //  onClick={}
                    value={to}
                    onChange={handleToChange}
                    onClick={handleToClick}
                    placeholder="Search Destination"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <LocationOnOutlinedIcon />
                        </InputAdornment>
                    ),
                    }}
                    className="md:w-[23vw] lg:w-[23vw] w-full"
                    sx={{
                    
                    "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
                    }}
                />
        
            <Popper id="from-popper" open={openTo} anchorEl={ToClick} placement="bottom-start">
            <ClickAwayListener onClickAway={handleCloseTo}>
                <Paper
                elevation={3}
                sx={{
                    width: "317px",
                    borderRadius: "6px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    paddingBottom:"25px",
                }}
                >
                <Typography variant="subtitle1" className="font-inter text-[#343537] text-lg pl-[24px] pt-[24px] pr-[24px]">
                    Recent Searches
                </Typography>
        
                    {locations.length === 0 ? (
                    <Typography sx={{ textAlign: "center", padding: "20px", color: "#777" }} className="font-inter">
                        No recent searches
                    </Typography>
                    ) : (
                    locations.map((location, index) => (
                    <React.Fragment key={location}>
                        <div className="flex justify-between pl-[24px] pt-[24px] pr-[24px] cursor-pointer">
                        <div className="flex gap-[8px]"  onClick={() => handleToOptionClick(location)}>
                            <div className="h-[28px] w-[28px] rounded-[4px] border border-[#FF6F1E] bg-[#FF6F1E0A] text-center">
                            <RoomOutlinedIcon className="text-[#FF6F1E]" sx={{ fontSize: "16px" }} />
                            </div>
                            <p>{location}</p>
                        </div>
        
                    
                        <CloseOutlinedIcon
                            onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveOption(location);
                            }}
                            className="cursor-pointer"
                            sx={{ color: "gray" }}
                        />
                        </div>
        
                        {index !== locations.length - 1 && <Divider sx={{ marginTop: "15px" }} />}
                    </React.Fragment>
                    ))
                )}
        
                </Paper>
            </ClickAwayListener>
            </Popper>
                </Box>
        
        
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="departure-date" className="mb-1">Date</label>
                    <TextField
                        id="departure-date"
                        variant="outlined"
                        size="small"
                        placeholder="Select Date"
                        value={departureDate} 
                        onClick={handleClick}
                        InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <CalendarMonthOutlinedIcon />
                            </InputAdornment>
                        ),
                        }}
                        className="md:w-[23vw] lg:w-[23vw] w-full"
                        sx={{
                        
                        "& .MuiInputBase-root": { height: "44px", borderRadius:"8px" },
                        "& .MuiOutlinedInput-input": { padding: "8px 10px", cursor: "pointer" },
                        }}
                    />
        
        
        
                    <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                        <ClickAwayListener onClickAway={handleClose}>
                        <Paper
                            elevation={3}
                            sx={{
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom:"20px",
                            }}
                        >
                            <div style={{ width: "100%", height: "100%" }}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item: RangeKeyDict) => {
                                setDateRange([
                                    {
                                    startDate: item.selection.startDate ?? new Date(),
                                    endDate: item.selection.endDate ?? new Date(),
                                    key: item.selection.key ?? "selection", 
                                    },
                                ]);
                                }}
        
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                                rangeColors={["#FF6F1E"]}
                                months={2} 
                                direction="horizontal" 
                                showDateDisplay={false} 
                                className="w-full h-full"
                            />
        
                            <div className="w-[96%] m-auto">
                                <button
                                    className="w-full h-[52px] rounded-[4px] font-inter text-[14px] cursor-pointer"
                                    style={{
                                    backgroundColor: "#023E8A",
        
                                    color: "white",
                                    marginTop: 2,
                                    }}
                                    onClick={handleSelectDate}
                                >
                                    Select Date
                                </button>
                            </div>
                            </div>
        
                        </Paper>
                        </ClickAwayListener>
                    </Popper>
        
                </Box>
            </div>

            <div  className="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-wrap lg:flex-row lg:justify-between gap-[24px] mt-[24px]">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="pick-up-time" className="mb-1">Pick Up Time</label>
                <TextField
                    id="pick-up-time"
                    name="pickUpTime"
                    type="time"
                    variant="outlined"
                    size="small"
                    value={times.pickUpTime}
                    onChange={handleTimeChange}
                    placeholder="00 : 00"
                    className="md:w-[27.7vw] lg:w-[27.7vw] w-full"
                    sx={{
                    "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
                    }}
                />
        
                </Box>

                <Select
                labelId="time-period-label"
                value={timePeriod}
                onChange={handleTimePeriodChange}
                displayEmpty
                className="md:w-[6vw] lg:w-[6vw] w-full md:mt-[28px] lg:mt-[28px] mt-[7px]"
                sx={{
                    height: "44px",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                    height: "44px",
                    borderRadius: "8px",
                    padding: "0px",
                    },
                    "& .MuiSelect-select": {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px", 
                    },
                }}

                >
              
                <MenuItem value="AM">AM</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
                </Select>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="drop-off-time" className="mb-1">Drop Off Time</label>
                <TextField
                    id="drop-off-time"
                    name="dropOffTime"
                    type="time"
                    variant="outlined"
                    size="small"
                    value={times.dropOffTime}
                    onChange={handleTimeChange}
                    placeholder="00 : 00"
                    className="md:w-[27.7vw] lg:w-[27.7vw] w-full"
                    sx={{
                    "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
                    }}
                />
        
                </Box>

            <Select
                labelId="time-period-label"
                value={timePeriodPM}
                onChange={handleTimePeriodChangePM}
                displayEmpty
                className="md:w-[6vw] lg:w-[6vw] w-full md:mt-[28px] lg:mt-[28px] mt-[7px]"

                sx={{
                    height: "44px",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                    height: "44px",
                    borderRadius: "8px",
                    padding: "0px",
                    },
                    "& .MuiSelect-select": {
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px", 
                    },
                }}

                >
                <MenuItem value="AM">PM</MenuItem>
                <MenuItem value="PM">AM</MenuItem>
                </Select>
            </div>
            </div>
        
            <div 
            // onClick={handleSearch}  
            className="bg-[#023E8A] h-[52px] md:w-[138px] lg:w-[138px]  w-full text-center text-white font-inter text-base rounded-[8px] pt-[14px] mt-14 cursor-pointer">
                <button>Update</button>
            </div>
            
            </div>
        </div>

        <div>
            <CarList departureInfo={[]} />
        </div>
        
         <div>
        <TravelmateApp />
         </div>

         <div className="mt-[150px]">
            <Footer />
         </div>

    </div>
    )}
    </div>
  )
}

export default DisplayCars