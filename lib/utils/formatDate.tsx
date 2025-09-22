"use client";

interface FormattedDateProps {
  date: Date;
  format?: string;
}

export default function FormattedDate({
  date,
  format = "en-US",
}: FormattedDateProps) {
  return <>{new Date(date).toLocaleDateString(format)}</>;
}
