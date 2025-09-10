import { cn } from "@/lib/utils";
import "./3d-loader.css";

export function ThreeDLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("cube-wrapper", className)} {...props}>
      <div className="cube" style={{ '--cube-size': 'min(10rem, 40vw)' } as React.CSSProperties}>
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
  );
}
