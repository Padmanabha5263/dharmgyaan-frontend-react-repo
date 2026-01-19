import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { ChevronRight, AccessTime } from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";
import { useQuestions } from "../features/questions/question.hook";
import TalkBox from "../components/Talkbox";

export default function Quiz() {
  const navigate = useNavigate();
  const questions = useQuestions();

  const { isDarkMode } = useThemeContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    (async () => {
      await questions.loadData({
        religion_id: "0gsLHqAZBc1dQgbToesy",
        sacred_id: "3JHcoCBx3epx61PXFOzB",
        level: 2,
        limit: 10,
      });
    })();
  }, [questions.loadData]);

  const handleNext = async () => {
    if (selectedOption) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: selectedOption,
      });

      if (currentQuestion < questions.data.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(selectedAnswers[currentQuestion + 1] || "");
      } else {
        navigate("/results", {
          state: {
            answers: { ...selectedAnswers, [currentQuestion]: selectedOption },
            totalQuestions: questions.data.length,
          },
        });
      }
    }
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      {/* Progress Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime color="success" />
          <Typography>
            Question {currentQuestion + 1} of {questions.data.length}
          </Typography>
        </Box>
        <Typography color="success.main" fontWeight={600}>
          {Math.round(((currentQuestion + 1) / questions.data.length) * 100)}%
        </Typography>
      </Box>

      {/* QUESTION */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          align="center"
          fontWeight={600}
          color="text.primary"
          sx={{
            fontSize: {
              xs: "1.1rem", // mobile
              sm: "1.3rem", // tablet
              md: "1.5rem", // desktop
            },
          }}
        >
          {questions.data[currentQuestion]?.question}
        </Typography>
      </Box>

      {/* OPTIONS */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr", // mobile → 1 per row
                sm: "1fr 1fr", // tablet & up → 2 per row
              },
              gap: 2,
            }}
          >
            {[
              questions?.data?.[currentQuestion]?.optA,
              questions?.data?.[currentQuestion]?.optB,
              questions?.data?.[currentQuestion]?.optC,
              questions?.data?.[currentQuestion]?.optD,
            ].map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={
                  <Radio
                    sx={{
                      alignSelf: "center", // ✅ vertical center
                      "&.Mui-checked": {
                        color: "success.main",
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    fontWeight={600}
                    color="text.primary"
                    sx={{
                      fontSize: {
                        xs: "0.95rem", // mobile
                        sm: "1.05rem", // tablet
                        md: "1.2rem", // desktop
                      },
                      lineHeight: 1.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {option}
                  </Typography>
                }
                sx={{
                  m: 0,
                  p: 1.5,
                  display: "flex",
                  alignItems: "center", // ✅ centers radio + text together
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              />
            ))}
          </Box>
        </RadioGroup>
      </FormControl>

      {/* NEXT BUTTON */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        disabled={!selectedOption}
        endIcon={<ChevronRight />}
        sx={{
          width:'40%',
          py: 1.5,
          bgcolor: "success.main",
          "&:hover": {
            bgcolor: "success.dark",
          },
        }}
      >
        {currentQuestion < questions.data.length - 1
          ? "Next Question"
          : "Submit Exam"}
      </Button>
    </TalkBox>
  );
}
