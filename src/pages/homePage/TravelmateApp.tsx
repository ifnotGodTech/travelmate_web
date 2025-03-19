// import React, {  } from "react";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import InputAdornment from "@mui/material/InputAdornment";
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import playstore from "../../assets/playstore.svg"
// import googleplay from "../../assets/googleplay.svg"
// import scan from "../../assets/scan.svg"




// const TravelmateApp = () => {
//   return (
//     <div>
//         <div className='w-[90%] m-auto'>
//         <div className='bg-white mt-[95px] w-full h-[100%] pt-10 pr-8 pb-10 pl-8 border border-[#CDCED1] rounded-[6px] shadow-md shadow-[#00000014] mb-[96px]'>
// <div className="flex justify-between gap-4">
//     <div>
//     <p className="text-[24px] font-semibold font-inter text-[#181818]">
//         Get the TravelMate App Now!
//     </p>
//     <p className="font-normal text-[#4E4F52] font-inter ">
//         Discover hotel, flight and rental car deals exclusively in the app.
//     </p>

//      <p className="font-normal text-[#4E4F52] font-inter ">
//         Download today to stay connected with important trip details.
//     </p>

//      <div className="flex gap-4 mt-[40px]">
//                 <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
//                 <TextField
//                     id="from"
//                     variant="outlined"
//                     size="small"
//                     placeholder="Enter Email Address"
//                     InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                         <EmailOutlinedIcon />
//                         </InputAdornment>
//                     ),
//                     }}
//                     sx={{
//                     width: "100%",
//                     maxWidth: "28rem",
//                     "& .MuiInputBase-root": { height: "44px" },
//                     "& .MuiOutlinedInput-input": { fontSize: "14px" },
//                     "& .MuiInputAdornment-root svg": { fontSize: "20px" },
//                     "@media (max-width: 1200px)": { maxWidth: "24rem" },
//                     "@media (max-width: 900px)": { maxWidth: "20rem" },
//                     "@media (max-width: 600px)": { maxWidth: "100%" },
//                     }}
//                 />
//                 </Box>


//                         <div className="bg-[#023E8A] cursor-pointer h-[42px] w-[120px] text-center text-white font-inter text-base rounded-[8px] pt-[9px] ">
//                             <button className="text-[14px] font-inter cursor-pointer">Send Link</button>
//                         </div>
//     </div>
//     </div>


//     <div className="flex gap-[24px]">

//         <div> 
//             <img src={googleplay} alt="" className="mb-[24px]" />
//             <img src={playstore} alt="" />
        
//         </div>

//          <div> 
//             <img src={scan} alt="" />
        
//         </div>

//     </div>
//    </div>
//     </div>

//     </div>
//     </div>
//   )
// }

// export default TravelmateApp

import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import playstore from "../../assets/playstore.svg";
import googleplay from "../../assets/googleplay.svg";
import scan from "../../assets/scan.svg";

const TravelmateApp = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="bg-white mt-24 w-full h-auto p-8 border border-[#CDCED1] rounded-md shadow-md shadow-[#00000014] mb-24">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Left Section */}
          <div className="w-full md:w-1/2">
            <p className="text-2xl font-semibold font-inter text-[#181818]">
              Get the TravelMate App Now!
            </p>
            <p className="text-[#4E4F52] font-inter mt-2">
              Discover hotel, flight, and rental car deals exclusively in the app.
            </p>
            <p className="text-[#4E4F52] font-inter mt-2">
              Download today to stay connected with important trip details.
            </p>

            {/* Input & Button */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Box sx={{ width: "100%" }}>
                <TextField
                  id="from"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": { height: "44px" },
                    "& .MuiOutlinedInput-input": { fontSize: "14px" },
                    "& .MuiInputAdornment-root svg": { fontSize: "20px" },
                  }}
                />
              </Box>

            <button className="bg-[#023E8A] w-full sm:w-40 h-[44px] px-6 text-white font-inter text-sm rounded-md">
            Send Link
            </button>

            </div>
          </div>

          {/* Right Section - Images */}
          <div className="flex flex-col sm:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col items-center sm:items-start mt-5">
              <img src={googleplay} alt="Google Play" className="max-w-[150px] sm:max-w-[180px] w-full h-[66px] mb-4" />
              <img src={playstore} alt="Play Store" className="max-w-[150px] sm:max-w-[180px] w-full h-[66px]" />
            </div>

            <div>
              <img src={scan} alt="QR Code" className="max-w-[120px] mt-4 sm:max-w-[150px] w-full h-[156px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelmateApp;
