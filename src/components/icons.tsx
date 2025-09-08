export function Logo(
  props: Omit<React.ComponentProps<'img'>, 'src' | 'alt'>
) {
  return (
    <img
      src="/nexmov.png"
      alt="NexMov.ai Logo"
      width={40}
      height={40}
      {...props}
    />
  );
}