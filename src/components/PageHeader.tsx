"use client";
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div>
      <h1 className="page-title fade-in-slide-up">{title}</h1>
      {subtitle && (
        <h2 className="page-subtitle fade-in-slide-up">{subtitle}</h2>
      )}
    </div>
  );
};

export default PageHeader;
