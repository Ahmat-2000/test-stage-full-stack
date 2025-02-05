"use client"
import LoadingSpin from "@/components/LoadingSpin";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text: string;
  loadingText?: string;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const ButtonUI = ({ 
  type = "button", 
  text, 
  loadingText = "Processing...", 
  isLoading = false, 
  onClick = () => {}, 
  className = "", 
  disabled = false 
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`p-2 rounded-md transition-all duration-300 ${
        isLoading || disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"
      } ${className}`}
    >
      {isLoading ? <LoadingSpin text={loadingText} /> : text}
    </button>
  );
};

export default ButtonUI;
