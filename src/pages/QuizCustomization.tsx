import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useFormData } from "../utils/hooks/useFormData";
import { Sharstra } from "../features/shastra/shastra.type";
import { useShastra } from "../features/shastra/shastra.hook";
import { Religion } from "../features/religion/religion.type";
import TalkBox from "../components/Talkbox";
import { useThemeContext } from "../ThemeContext";
import { useTranslation } from "react-i18next";

interface FormData {
  shastra: string;
  difficulty: number;
  questionCount: number;
}

export default function QuizCustomization() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedReligion = location.state as Religion;
  const questionCounts: number[] = [10, 15, 20];
  const difficultyLevels: string[] = ["easy", "medium", "hard"];
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const { data } = useShastra({
    initialLoad: true,
    religionId: selectedReligion?.religion_id || "",
  });

  const validationRules = {
    shastra: (value: string) =>
      !value || value === "-1" ? "Please select a shastra" : null,
    difficulty: (value: number) =>
      !value || value === -1 ? "Please select difficulty level" : null,
    questionCount: (value: number) =>
      value < 5 || value === -1 ? "Please select number of questions" : null,
  };

  const { formData, errors, handleChange, validate } = useFormData<FormData>(
    {
      shastra: "-1",
      difficulty: -1,
      questionCount: -1,
    },
    validationRules
  );

  const startQuiz = () => {
    if (validate()) {
      console.log("Quiz Config:", formData);
      navigate("/Quiz",{state: formData});
    }
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("common.customizeQuiz")}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl fullWidth error={!!errors.shastra} margin="normal">
          <InputLabel id="select-shastra-lbl">
            {t("common.selectShastra")}
          </InputLabel>
          <Select
            labelId="select-shastra-lbl"
            id="selectShastraCbo"
            value={formData.shastra}
            label={t("common.selectShastra")}
            onChange={(e) => handleChange("shastra", e.target.value)}
          >
            {data && (
              <MenuItem value="-1">{t("common.selectShastra")}</MenuItem>
            )}
            {data?.map((shastra: Sharstra) => (
              <MenuItem key={shastra.sacred_id} value={shastra.sacred_id}>
                {shastra.name}
              </MenuItem>
            ))}
          </Select>
          {errors.shastra && <FormHelperText>{errors.shastra}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth error={!!errors.difficulty} margin="normal">
          <InputLabel id="select-difficulty-lbl">
            {t("common.difficultyLevel")}
          </InputLabel>
          <Select
            labelId="select-difficulty-lbl"
            id="selectDifficultyCbo"
            value={formData.difficulty}
            label={t("common.difficultyLevel")}
            onChange={(e) => handleChange("difficulty", e.target.value)}
          >
            <MenuItem value="-1">{t("common.selectDifficulty")}</MenuItem>
            {difficultyLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {t(`common.${level}`, level)}
              </MenuItem>
            ))}
          </Select>
          {errors.difficulty && (
            <FormHelperText>{errors.difficulty}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={!!errors.questionCount}
          margin="normal"
          sx={{ mb: 3 }}
        >
          <InputLabel id="select-question-count-lbl">
            {t("common.numberOfQuestions")}
          </InputLabel>
          <Select
            labelId="select-question-count-lbl"
            id="selectQuestionCountCbo"
            value={formData.questionCount}
            label={t("common.numberOfQuestions")}
            onChange={(e) =>
              handleChange("questionCount", Number(e.target.value))
            }
          >
            <MenuItem value={-1}>{t("common.selectQuestions")}</MenuItem>
            {questionCounts.map((count) => (
              <MenuItem key={count} value={count}>
                {count}
              </MenuItem>
            ))}
          </Select>
          {errors.questionCount && (
            <FormHelperText>{errors.questionCount}</FormHelperText>
          )}
        </FormControl>

        <Button
          onClick={startQuiz}
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          {t("common.startQuiz")}
        </Button>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ my: 2 }}
        >
          {t("common.or")}
        </Typography>

        <Button
          onClick={() => navigate("/quiz")}
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          {t("common.surpriseMe")}
        </Button>
      </Box>
    </TalkBox>
  );
}
