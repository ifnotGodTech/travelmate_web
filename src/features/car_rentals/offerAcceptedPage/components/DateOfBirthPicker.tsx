import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { GuestInfoProps } from "../../../stays/slice";
// import { GuestInfoProps } from "../../slice";

// 1. Define a constraint: T must at least have dateOfBirth as a string
interface BaseFormData {
  dateOfBirth: string;
}

// 2. Make the Props Generic <T>
interface DateOfBirthPickerProps<T> {
  formData?: GuestInfoProps;
  setFormData: (data: GuestInfoProps) => void;
  errors: {
    dateOfBirth?: string;
    [key: string]: any;
  };
  clearErrors?: (field: keyof T) => void;
}

const orangeTheme = createTheme({
  palette: {
    primary: {
      main: "#FF6F1E",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
        },
      },
    },
  },
});

// 3. Define the component as Generic
const DateOfBirthPicker = <T extends BaseFormData>({
  formData,
  setFormData,
  errors,
  clearErrors,
}: DateOfBirthPickerProps<T>) => {
  const maxDateAllowed: Dayjs = dayjs().subtract(18, "year");

  const handleDateChange = (newValue: Dayjs | null) => {
    const formattedDate = newValue ? newValue.format("YYYY-MM-DD") : "";

    setFormData({
      ...formData!,
      dateOfBirth: formattedDate,
    });
    console.log(formattedDate);

    if (errors.dateOfBirth && clearErrors) {
      clearErrors("dateOfBirth" as keyof T);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full col-span-1 md:col-span-2">
      <p className="font-semibold text-base">Date of Birth</p>

      <ThemeProvider theme={orangeTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label=""
            maxDate={maxDateAllowed}
            value={formData?.dateOfBirth ? dayjs(formData?.dateOfBirth) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                error: !!errors.dateOfBirth,
                helperText: errors.dateOfBirth,
                sx: {
                  "& .MuiInputBase-input": {
                    padding: "8px 12px",
                    height: "auto",
                  },
                  "& .MuiOutlinedInput-root": {
                    height: "44px",
                  },
                },
              },
            }}
            sx={{ padding: "2px" }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default DateOfBirthPicker;
