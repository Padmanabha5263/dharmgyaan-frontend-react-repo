import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { useFormData } from "../utils/hooks/useFormData";
import { Sharstra } from "../features/shastra/shastra.type";
import { useShastra } from "../features/shastra/shastra.hook";
import { Religion } from "../features/religion/religion.type";

interface FormData {
  shastra: string;
  difficulty: string;
  questionCount: number;
}

export default function QuizCustomization() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedReligion = location.state as Religion;
  const questionCounts: number[] = [10, 15, 20];
  const difficultyLevels: string[] = ["easy", "medium", "hard"];
  
  const { data } = useShastra({ 
    initialLoad: true, 
    religionId: selectedReligion?.religion_id || "" 
  });
  
  const validationRules = {
    shastra: (value: string) => !value || value === "-1" ? "Please select a shastra" : null,
    difficulty: (value: string) => !value || value === "-1" ? "Please select difficulty level" : null,
    questionCount: (value: number) => value < 5 || value === -1 ? "Please select number of questions" : null,
  };
  
  const { formData, errors, handleChange, validate } = useFormData<FormData>({
    shastra: "-1",
    difficulty: "-1",
    questionCount: -1,
  }, validationRules);

  const startQuiz = () => {
    if (validate()) {
      console.log("Quiz Config:", formData);
      navigate("/quiz");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "200px",
        display: "grid",
        bgcolor: "background.default",
        py: 2,
        px: 2,
        gap: 2,
        width: { xs: "100%", sm: 400, md: 600 },
        mx: "auto",
      }}
    >
      <h1>Customize Your Quiz</h1>
      <p>Choose your preferences, or skip and let us surprise you ✨</p>
      {/* input forms for customising the assessment experience*/}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <FormControl fullWidth error={!!errors.shastra}>
            <InputLabel 
              id="select-shastra-lbl"
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Select shastra
            </InputLabel>
            <Select
              labelId="select-shastra-lbl"
              id="selectShastraCbo"
              value={formData.shastra}
              label="Select Shastra"
              onChange={(e) => handleChange("shastra", e.target.value)}
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              {/* bind shastra data here */}
              {data && <MenuItem value="-1" >Select Shastra</MenuItem>}
              {data?.map((shastra: Sharstra) => (
                <MenuItem key={shastra.id} value={shastra.id}>
                  {shastra.name}
                </MenuItem>
              ))}
            </Select>
            {errors.shastra && <FormHelperText>{errors.shastra}</FormHelperText>}
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth error={!!errors.difficulty}>
            <InputLabel 
              id="select-difficulty-lbl"
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Difficulty Level
            </InputLabel>
            <Select
              labelId="select-difficulty-lbl"
              id="selectDifficultyCbo"
              value={formData.difficulty}
              label="Select Difficulty"
              onChange={(e) => handleChange("difficulty", e.target.value)}
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <MenuItem value="-1">Select Difficulty</MenuItem>
              {/* bind difficulty levels here */}
              {difficultyLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </MenuItem>
              ))}
            </Select>
            {errors.difficulty && <FormHelperText>{errors.difficulty}</FormHelperText>}
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth error={!!errors.questionCount}>
            <InputLabel 
              id="select-question-count-lbl"
              sx={{ color: "rgba(0, 0, 0, 0.6)" }}
            >
              Number of Questions
            </InputLabel>
            <Select
              labelId="select-question-count-lbl"
              id="selectQuestionCountCbo"
              value={formData.questionCount}
              label="Number of Questions"
              onChange={(e) => handleChange("questionCount", Number(e.target.value))}
              sx={{
                color: "rgba(0, 0, 0, 0.87)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <MenuItem value={-1}>Select Questions</MenuItem>
              {questionCounts.map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
            {errors.questionCount && <FormHelperText>{errors.questionCount}</FormHelperText>}
          </FormControl>
        </div>
        <div>
          <Button 
            onClick={startQuiz} 
            variant="contained" 
            fullWidth
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              border: "2px solid #1976d2",
              "&:hover": {
                bgcolor: "#1565c0",
                border: "2px solid #1565c0",
              },
            }}
          >
            Start Quiz
          </Button>
        </div>
        <div>OR</div>
        <div>
          <Button 
            onClick={()=>{navigate('/quiz')}} 
            variant="contained" 
            fullWidth
            sx={{
              bgcolor: "#1976d2",
              color: "white",
              border: "2px solid #1976d2",
              "&:hover": {
                bgcolor: "#1565c0",
                border: "2px solid #1565c0",
              },
            }}
          >
            Lets surprise you
          </Button>
        </div>
      </div>
    </Box>
  );
}
