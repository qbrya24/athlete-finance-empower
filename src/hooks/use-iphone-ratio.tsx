
import * as React from "react"

export function useIphone16by9Ratio() {
  const [isIphone16by9, setIsIphone16by9] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkRatio = () => {
      const ratio = window.innerWidth / window.innerHeight;
      const isIphone = /iPhone/.test(navigator.userAgent);
      const is16by9 = Math.abs(ratio - (16/9)) < 0.1;
      
      setIsIphone16by9(isIphone && is16by9);
    };

    checkRatio();
    window.addEventListener('resize', checkRatio);
    
    return () => window.removeEventListener('resize', checkRatio);
  }, []);

  return isIphone16by9;
}
