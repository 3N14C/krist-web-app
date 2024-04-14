import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const isMobile = useMediaQuery({maxWidth: 768})

  return {
    isMobile
  }
};
