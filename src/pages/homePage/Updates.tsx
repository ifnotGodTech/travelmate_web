// import React, { } from "react";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import InputAdornment from "@mui/material/InputAdornment";
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
// import BeachSide from "../../assets/image.svg";


// const Updates = () => {
//   return (
//     <div>
//         <div className='bg-[#CCD8E833] w-full h-[100%] mb-[150px] pb-10'>
//             <div className='w-[90%] m-auto'>
//             <div className=" flex justify-between gap-4">
//                 <div className='pt-[113px]'>
//                     <p className="text-[24px] font-semibold font-inter text-[#181818] mt-[12px]">Get Updates & Exclusive Offers</p>
//                     <p className="font-normal text-[#4E4F52] font-inter mb-[40px]">Subscribe to our newsletter and never miss out on great deals</p>


//                     <div className="flex gap-4">
//                     <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
//                         <TextField
//                             id="from"
//                             variant="outlined"
//                             size="small"
//                             placeholder="Enter Email Address"
//                             InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                 <EmailOutlinedIcon /> 
//                                 </InputAdornment>
//                             ),
//                             }}
//                                sx={{
//                                 width: "100%",
//                                 maxWidth: "28rem",
//                                 "& .MuiInputBase-root": { height: "44px" },
//                                 "& .MuiOutlinedInput-input": { fontSize: "14px" },
//                                 "& .MuiInputAdornment-root svg": { fontSize: "20px" },
//                                 "@media (max-width: 1200px)": { maxWidth: "24rem" },
//                                 "@media (max-width: 900px)": { maxWidth: "20rem" },
//                                 "@media (max-width: 600px)": { maxWidth: "100%" },
//                                 }}
//                         />
//                         </Box>


//                         <div className="bg-[#023E8A] h-[42px] w-[120px] text-center text-white font-inter text-base rounded-[8px] pt-[9px] ">
//                             <button className="text-[14px] font-inter">Subscribe</button>
//                         </div>
//                     </div>
//                 </div>
//                 <div>

//                     <img src={BeachSide} alt="" className="pt-10" />

//                 </div>
//             </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Updates


import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BeachSide from "../../assets/beachside.svg";

const Updates = () => {
  return (
    <div className="bg-[#CCD8E833] w-full h-auto pb-10 mb-24">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">

          {/* Left Section - Text & Input */}
          <div className="pt-16 md:pt-28 text-center md:text-left w-full md:w-1/2">
            <p className="text-2xl font-semibold font-inter text-[#181818] mt-3">
              Get Updates & Exclusive Offers
            </p>
            <p className="text-[#4E4F52] font-inter mb-6">
              Subscribe to our newsletter and never miss out on great deals.
            </p>

            {/* Input & Button */}
            <div className="flex flex-col sm:flex-row gap-4">
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

              <button className="bg-[#023E8A] h-[44px] px-6 text-white font-inter text-sm rounded-md">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="w-full mt-6 mt:0 md:w-1/2 flex justify-center md:justify-end">
            <img src={BeachSide} alt="Beach Side" className="w-full h-auto md:max-w-[400px]" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Updates;
