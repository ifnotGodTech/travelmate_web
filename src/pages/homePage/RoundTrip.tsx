import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import FlightClassOutlinedIcon from "@mui/icons-material/FlightClassOutlined";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Divider } from "@mui/material";
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import { Link } from "react-router-dom";

interface DateRangeType {
  startDate: Date;
  endDate: Date;
  key: string;
}

type PassengerType = "adults" | "children" | "infants";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
}

const RoundTrip: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("round-trip");
  const [dateRange, setDateRange] = useState<DateRangeType[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

 

const [passengerAnchor, setPassengerAnchor] = useState<null | HTMLElement>(null);

const handlePassenger = (event: React.MouseEvent<HTMLElement>) => {
  setPassengerAnchor(passengerAnchor ? null : event.currentTarget);
};

 const handleClose = () => {
    setAnchorEl(null);
  };

const [selectedFrom, setSelectedFrom] = useState(""); // State for selected option
const [openFrom, setOpenFrom] = useState(false);
const [FromClick, setFromClick] = useState<HTMLElement | null>(null);

   const [selectedTo, setSelectedTo] = useState<string>("");
   const [openTo, setOpenTo] = useState(false);
   const [ToClick, setToClick] = useState<HTMLElement | null>(null);

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
        setSelectedFrom(option);
        setOpenFrom(false); 
      };

      const handleToOptionClick = (option: string) => {
        setSelectedTo(option);
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

  const [selectedDate, setSelectedDate] = useState<string>("");

const handleSelectDate = () => {
  const formattedDate = selectedValue === "one-way"
    ? format(dateRange[0].startDate, "dd MMM yyyy")
    : `${format(dateRange[0].startDate, "dd MMM yyyy")} - ${format(dateRange[0].endDate, "dd MMM yyyy")}`;

  setSelectedDate(formattedDate);
  handleClose(); 
};

  const [counts, setCounts] = useState<PassengerCounts>({
    adults: 0,
    children: 0,
    infants: 0,
  });

  const [passengerText, setPassengerText] = useState<string>("");

  const handleIncrement = (type: PassengerType) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

 
  const handleDecrement = (type: PassengerType) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
    }));
  };

  const handleDone = () => {
  const totalPassengers = counts.adults + counts.children + counts.infants;
  setPassengerText(`${totalPassengers} Passengers`);
  setPassengerAnchor(null); 
};

 const [flightClass, setFlightClass] = useState(false);
  const anchorRef = useRef(null);

   const [selectedClass, setSelectedClass] = useState("");
    console.log("sevdddffg", selectedValue )


    const navigate = useNavigate();

    const handleSearch = () => {
        console.log("Navigating with:", { selectedFrom, selectedTo, selectedDate, passengerText, selectedClass });
      navigate("/departure-flight", {
        state: {
          from: selectedFrom,
          to: selectedTo,
          departureDate: selectedDate,
          passengers: passengerText,
          flightClass: selectedClass
        },
      });
    };



  return (
    <FormControl sx={{
     
    }}>
      <RadioGroup
        row
        aria-labelledby="trip-type-label"
        name="trip-type"
        value={selectedValue}
        onChange={handleChange}
        className="mb-8"
      >
        <FormControlLabel value="round-trip" control={<Radio />} label="Round Trip" />
        <FormControlLabel value="one-way" control={<Radio />} label="One Way" />
        <FormControlLabel value="multi-city" control={<Radio />} label="Multi City" />
      </RadioGroup>
     {["round-trip", "one-way", "multi-city"].includes(selectedValue) && (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2}}>
        
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="from" className="mb-1">From</label>
          <TextField
            id="from"
            variant="outlined"
            size="small"
            placeholder="Search Destination"
           
            value={selectedFrom}
             onClick={handleFromClick}
            // onClick={() => handleFromOptionClick(location)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "200px",
             
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
          <label htmlFor="to" className="mb-1">To</label>
          <TextField
            id="to"
            variant="outlined"
            size="small"
            value={selectedTo}
             onClick={handleToClick}
            //  onClick={() => handleToOptionClick(location)}
            placeholder="Search Destination"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            sx={{
               width: "200px",
             
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
                value={selectedDate} 
                onClick={handleClick} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "200px",
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
                      // width: "867px", // Ensures full width
                      // height: "555px", // Ensures full height
                      overflow: "hidden", // Prevents content overflow
                      display: "flex",
                      justifyContent: "center", // Centers content
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
                        months={2} // Show 2 calendars side by side
                        direction="horizontal" // Arrange them in a row
                        showDateDisplay={false} // Optional: Hide input fields
                        className="w-full h-full" // Tailwind (if used)
                      />

                    <div className="w-[96%] m-auto">
                        <button
                            className="w-full h-[52px] rounded-[4px] font-inter text-[14px] cursor-pointer"
                            style={{
                              backgroundColor: "#023E8A",

                              color: "white",
                              marginTop: 2,
                              // "&:hover": { backgroundColor: "#012A5A" },
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

        
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="passengers" className="mb-1">Passengers</label>
          <TextField
            id="passengers"
            variant="outlined"
            size="small"
            placeholder="1 Passenger"
             value={passengerText}
            onClick={handlePassenger}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "200px",
             
              "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
            }}
          />
        


        <Popper
            open={Boolean(passengerAnchor)}
            anchorEl={passengerAnchor}
            placement="bottom-start"
            modifiers={[
              {
                name: "preventOverflow",
                options: {
                  boundary: "window",
                },
              },
            ]}
          >
            <ClickAwayListener onClickAway={() => setPassengerAnchor(null)}>
              <Paper
                elevation={3}
                sx={{
                  width: "376px",
                  borderRadius: "6px",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "16px",
                }}
              >

                <div>
    
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-[16px] text-[#181818] font-inter font-semibold">Adults</p>
                      <p className="text-[#818489] text-[14px] font-inter font-normal">Ages 16 and Above</p>
                    </div>
                    <div>
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
                  <Divider sx={{ marginBottom: "8px" }} />

                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-[16px] text-[#181818] font-inter font-semibold">Children</p>
                      <p className="text-[#818489] text-[14px] font-inter font-normal">Ages 3 - 15</p>
                    </div>
                    <div>
                      <div className="w-[95px] h-[30px] mt-1.5 rounded-[4px] border border-[#023E8A] flex justify-between gap-2 items-center px-2">
                        <RemoveOutlinedIcon
                          className="text-[#ACAEB3] cursor-pointer"
                          onClick={() => handleDecrement("children")}
                        />
                        <div>{counts.children}</div>
                        <AddOutlinedIcon
                          className="cursor-pointer"
                          onClick={() => handleIncrement("children")}
                        />
                      </div>
                    </div>
                  </div>
                  <Divider sx={{ marginBottom: "8px" }} />

                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-[16px] text-[#181818] font-inter font-semibold">Infant</p>
                      <p className="text-[#818489] text-[14px] font-inter font-normal">Ages 0 and 2</p>
                    </div>
                    <div>
                      <div className="w-[95px] h-[30px] mt-1.5 rounded-[4px] border border-[#023E8A] flex justify-between gap-2 items-center px-2">
                        <RemoveOutlinedIcon
                          className="text-[#ACAEB3] cursor-pointer"
                          onClick={() => handleDecrement("infants")}
                        />
                        <div>{counts.infants}</div>
                        <AddOutlinedIcon
                          className="cursor-pointer"
                          onClick={() => handleIncrement("infants")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button  onClick={handleDone} className="bg-[#023E8A] w-full h-[52px] text-white rounded-[6px] mt-[40px] font-infer text-[16px] cursor-pointer">Done</button>
                </div>

              </Paper>
            </ClickAwayListener>
          </Popper>


        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
         <label htmlFor="class" className="mb-1">Class</label>
          <TextField
            id="class"
            variant="outlined"
            size="small"
            placeholder="Economy"
            value={selectedClass}
            inputRef={anchorRef}
            onClick={() => setFlightClass(true)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FlightClassOutlinedIcon />
                </InputAdornment>
              ),
            }}
            sx={{
                width: "200px",
             
              "& .MuiInputBase-root": { height: "44px", borderRadius:"8px", },
            }}
          />

      <Popper open={flightClass} anchorEl={anchorRef.current} placement="bottom-start">
        <ClickAwayListener onClickAway={() => setFlightClass(false)}>
          <Paper
            elevation={3}
            sx={{
              width: "317px",
              position:"relative",
              left:"-43px",
              top:"6px",
              height:"100%",
              borderRadius: "6px",
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            
            }}
          >

             <div className="w-full pt-4 pb-4">
              <RadioGroup
                aria-labelledby="flight-class-group"
                name="flight-class"
                value={selectedClass}
                
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setFlightClass(false); 
                }}
              >
                <FormControlLabel value="Economy" control={<Radio />} label="Economy" className="pl-10" />
                <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />

                <FormControlLabel value="Business" control={<Radio />} label="Business" className="pl-10" />
                <Divider sx={{ marginTop: "16px", marginBottom: "16px" }} />

                <FormControlLabel value="First Class" control={<Radio />} label="First Class" className="pl-10" />
              </RadioGroup>
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
       </Box>


          <div onClick={handleSearch}  className="bg-[#023E8A] h-[52px] w-[138px] text-center text-white font-inter text-base rounded-[8px] pt-[14px] mt-[18px] cursor-pointer">
            <button>Search</button>
          </div>
      </Box>
      )}
    </FormControl>
  );
};

export default RoundTrip;
