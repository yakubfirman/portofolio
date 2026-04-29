"use client";

import { useMemo } from "react";

interface AgeDisplayProps {
  birthdate: string; // format: YYYY-MM-DD
  className?: string;
}

export default function AgeDisplay({ birthdate, className = "" }: AgeDisplayProps) {
  const age = useMemo(() => {
    const birth = new Date(birthdate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      years--;
    }
    return years;
  }, [birthdate]);

  return <span className={className}>{age} tahun</span>;
}
