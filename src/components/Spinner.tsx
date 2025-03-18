interface SpinnerProps {
    size?: string;
    borderWidth?: string;
    color?: string;
  }
  
  export default function Spinner({ size = "40px", borderWidth = "6px", color = "#2563EB" }: SpinnerProps) {
    return (
      <div
        className="rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderColor: "transparent",
          borderTopColor: color,
        }}
      ></div>
    );
  }
  