import { cn } from "@/lib/utils";

export function ThreeDLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-16 h-16", className)} {...props}>
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-faces">
            <div className="cube-face shadow"></div>
            <div className="cube-face bottom"></div>
            <div className="cube-face top"></div>
            <div className="cube-face left"></div>
            <div className="cube-face right"></div>
            <div className="cube-face back"></div>
            <div className="cube-face front"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
