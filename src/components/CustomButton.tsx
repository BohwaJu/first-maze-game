"use client";
import React from "react";

interface BootButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  className?: string;
}

const CustomButton = ({
  onClick,
  disabled = false,
  title,
  className,
}: BootButtonProps) => {
  return (
    <button
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CustomButton;
