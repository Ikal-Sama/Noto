import { AlertTriangle } from "lucide-react";
import React from "react";

export const FormError = ({ error }: { error: string }) => {
  return (
    <div className="bg-destructive/10 p-2 rounded-md flex text-sm items-center gap-2">
      <AlertTriangle className="size-4 text-red-500" />
      <p className="text-red-500">{error}</p>
    </div>
  );
};
