
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
  ratio?: number;
  iphone16by9?: boolean;
}

const AspectRatio = ({ 
  className, 
  ratio = 1 / 1, 
  iphone16by9 = false,
  ...props 
}: AspectRatioProps) => {
  const aspectRatio = iphone16by9 ? 16 / 9 : ratio;
  
  return (
    <AspectRatioPrimitive.Root
      ratio={aspectRatio}
      className={cn(
        iphone16by9 && "aspect-16-9 max-h-screen-safe overflow-auto",
        className
      )}
      {...props}
    />
  );
};

export { AspectRatio }
