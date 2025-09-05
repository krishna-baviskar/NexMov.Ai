import Image from "next/image";

export function Logo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="/nexmov.png"
      alt="NexMov.ai Logo"
      width={160}
      height={40}
      priority
      {...props}
    />
  );
}
