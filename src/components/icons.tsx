import Image from "next/image";
import type { SVGProps } from "react";

export function Logo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="/nexmov.png"
      alt="NexMov.ai Logo"
      width={32}
      height={32}
      {...props}
    />
  );
}
