import Image from "next/image";

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/icons/plus.svg"
      alt=""
      width={24}
      height={24}
      className={className}
    />
  );
}
