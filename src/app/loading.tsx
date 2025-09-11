import { ThreeDLoader } from '@/components/ui/3d-loader'; 

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ThreeDLoader />
    </div>
  );
}
