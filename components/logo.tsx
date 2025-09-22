import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 self-center font-medium">
      <Image src="/logo.png" alt="Logo" width={30} height={30} />
      <p className="text-2xl">Nōto</p>
    </div>
  );
}
