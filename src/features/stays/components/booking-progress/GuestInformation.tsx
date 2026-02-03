import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCaretDown,
  FaPhoneAlt,
  FaCity,
} from "react-icons/fa";
// Make sure this path matches where your interfaces are defined
import { GuestInfoProps } from "../../slice";
import { FormControlLabel, Switch } from "@mui/material";
import CountryCodeModal from "../modals/CountryCodeModal";
import { MdLocationOn } from "react-icons/md";
import { PiSignpostFill } from "react-icons/pi";
import DateOfBirthPicker from "./date-of-birth-picker";

interface GuestInformationProps {
  onGuestInfoChange: (info: GuestInfoProps) => void;
  formData: GuestInfoProps;
  errors: Partial<GuestInfoProps>;
  clearErrors?: (field: keyof GuestInfoProps) => void;
}

const GuestInformation: React.FC<GuestInformationProps> = ({
  onGuestInfoChange,
  formData,
  errors,
  clearErrors,
}) => {
  const [useProfileInfo, setUseProfileInfo] = useState(false);
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };

    // 1. Update Parent State
    onGuestInfoChange(newData);

    // 2. Clear error for this field if function exists
    if (clearErrors) clearErrors(name as keyof GuestInfoProps);
  };

  const handleProfileSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseProfileInfo(!useProfileInfo);
    const checked = e.target.checked;
    setState((prev: any) => ({ ...prev, jason: checked }));

    // We don't call handleChange(e) here because the switch event
    // doesn't carry the form data values we need.
    // Instead, we fetch profile data directly.

    const userInfo = JSON.parse(localStorage.getItem("persist:root") || "{}");
    // specific parsing logic...
    const profileStr = userInfo.profile || "{}";

    type Profile = {
      first_name: string;
      last_name: string;
      date_of_birth: string;
      email: string;
      mobile_number: string;
    };

    let profile: Profile = {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      mobile_number: "",
    };

    try {
      if (typeof profileStr === "string") {
        profile = JSON.parse(profileStr);
      } else {
        profile = profileStr; // handle case where it's already an object
      }
    } catch {
      // keep defaults
    }

    if (checked) {
      onGuestInfoChange({
        ...formData, // Keep existing fields if needed, or overwrite completely
        firstName: profile?.first_name || "",
        lastName: profile?.last_name || "",
        dateOfBirth: profile?.date_of_birth || "",
        email: profile?.email || "",
        phone: profile?.mobile_number || "",
      });
    } else {
      // Optional: Clear fields when unchecked, or leave them as is
      onGuestInfoChange({
        ...formData,
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div>
      {modal && (
        <CountryCodeModal
          closeDialog={() => setModal(false)}
          formData={formData}
          setFormData={onGuestInfoChange}
        />
      )}
      <div className="w-full">
        {/* Profile Info Toggle */}
        <div className="flex justify-between items-center">
          <div className="flex-1 py-4">
            <p className="font-semibold text-left text-lg ">
              Use my profile information
            </p>
            <p className="text-sm text-gray-600 text-left">
              This field will be automatically filled based on your information
              with us.
            </p>
          </div>
          {/* Toggle Switch */}
          <div className="">
            <FormControlLabel
              className="w-full "
              control={
                <Switch
                  checked={state.jason}
                  onChange={handleProfileSwitch}
                  name="jason"
                />
              }
              label=""
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-[1px] border-gray-300 rounded-lg p-6">
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base">First Name</p>
              <div
                className={`flex items-center border  ${
                  errors.firstName ? `border-red-600` : `border-gray-300`
                }  p-2 rounded-lg`}
              >
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="w-full outline-none bg-transparent placeholder:text-xs"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base">Last Name</p>
              <div
                className={`flex items-center border  ${
                  errors.lastName ? `border-red-600` : `border-gray-300`
                }  p-2 rounded-lg`}
              >
                <FaUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  className="w-full outline-none bg-transparent placeholder:text-xs"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName}</p>
              )}
            </div>

            {/* Date of Birth (Using the new Component) */}
            <DateOfBirthPicker
              formData={formData}
              errors={errors}
              setFormData={onGuestInfoChange}
              {...(clearErrors ? { clearErrors } : {})}
            />
          </div>

          <div className="mt-5">
            <h5 className="py-4 font-bold text-lg">Contact Details</h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-[1px] border-gray-300 rounded-lg p-6">
              {/* Email Address */}
              <div className="flex flex-col gap-2  lg:col-span-2">
                <p className="font-semibold text-base">Email Address</p>
                <div
                  className={`flex items-center border  ${
                    errors.email ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full outline-none bg-transparent"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </div>
                {errors.email && <p className="text-red-600">{errors.email}</p>}
              </div>

              {/* Country Code  */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-base">Country Code</p>
                <div
                  className={`flex items-center border  ${
                    errors.countryCode ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <input
                    type="text"
                    placeholder="Select"
                    className="w-full outline-none bg-transparent cursor-pointer"
                    value={formData.countryCode}
                    name="countryCode"
                    onChange={handleChange}
                    onClick={() => setModal(true)} // changed onFocus to onClick for better mobile exp
                    required
                    readOnly
                  />
                  <FaCaretDown />
                </div>
                {errors.countryCode && (
                  <p className="text-red-600">{errors.countryCode}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-base">Phone Number</p>
                <div
                  className={`flex items-center border  ${
                    errors.phone ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <FaPhoneAlt className="text-gray-500 mr-2" />
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="w-full outline-none bg-transparent"
                    value={formData.phone}
                    name="phone"
                    onChange={handleChange}
                    required
                    pattern="^\+?[0-9]{10,15}$"
                  />
                </div>
                {errors.phone && <p className="text-red-600">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5 className="py-4 font-bold text-lg">Address Details</h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-[1px] border-gray-300 rounded-lg p-6">
              {/* Residential Address */}
              <div className="flex flex-col gap-2  lg:col-span-2">
                <p className="font-semibold text-base">Residential Address</p>
                <div
                  className={`flex items-center border  ${
                    errors.address ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <MdLocationOn className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter Permanent Address"
                    className="w-full outline-none bg-transparent capitalize"
                    value={formData.address}
                    name="address"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.address && (
                  <p className="text-red-600">{errors.address}</p>
                )}
              </div>

              {/* City  */}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-base">City</p>
                <div
                  className={`flex items-center border  ${
                    errors.city ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <FaCity className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="e.g Paris"
                    className="w-full outline-none bg-transparent capitalize placeholder:lowercase"
                    value={formData.city}
                    name="city"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.city && <p className="text-red-600">{errors.city}</p>}
              </div>

              {/* Postal Code*/}
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-base">Postal Code</p>
                <div
                  className={`flex items-center border  ${
                    errors.postal ? `border-red-600` : `border-gray-300`
                  }  p-2 rounded-lg`}
                >
                  <PiSignpostFill className="text-gray-500 mr-2" />
                  <input
                    type="number"
                    placeholder="Enter Postal Code"
                    className="w-full outline-none bg-transparent"
                    value={formData.postal}
                    name="postal"
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.postal && (
                  <p className="text-red-600">{errors.postal}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestInformation;
