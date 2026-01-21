import { ReactNode } from "react";
import { Box, Container } from "@mui/material";
import { getBackgroundSvg } from "../utils/hooks/getBackgroundSvg";

type TalkBoxProps = {
  children: ReactNode;
  isDarkMode: boolean;
};

export default function TalkBox({ children, isDarkMode }: TalkBoxProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        "@media (min-width: 768px)": {
          pr: "40vw",
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          backgroundImage: getBackgroundSvg(
            isDarkMode ? "#0C1220" : "#FFF7E3",
            isDarkMode ? "#435663" : "#BBC863"
          ),
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        
        <Box
          sx={{
            px: 4,
            py: 6,
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
}
