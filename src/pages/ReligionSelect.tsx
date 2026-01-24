import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { useReligion } from "../features/religion/religion.hook";
import { Religion } from "../features/religion/religion.type";
import { useThemeContext } from "../ThemeContext";
import TalkBox from "../components/Talkbox";
import Bubble from "../components/Bubble";

export default function ReligionSelect() {
  const navigate = useNavigate();
  const religion = useReligion({ initialLoad: true });
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  const handleSelect = (religionInfo: Religion) => {
    religion.saveSelectedReligion(religionInfo);
    navigate("/QuizCustomization", { state: religionInfo });
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("common.chooseReligion")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mt: 3,
        }}
      >
        {religion.data.length > 0 &&
          religion.data.map((item, index) => (
            <Bubble
              key={item.religion_id}
              text={item.name}
              shadow={true}
              bubble={index % 2 === 0 ? 1 : 2}
              isDarkMode={isDarkMode}
              onClick={() => handleSelect(item)}
            />
          ))}
      </Box>
    </TalkBox>
  );
}
