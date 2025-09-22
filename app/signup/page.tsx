import { Notebook } from "lucide-react";

import { SignUpForm } from "@/components/signup-form";
import Logo from "@/components/logo";

export default function SignUpPage() {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <Logo />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
