import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  IconButton,
} from '@mui/material';
import { ChevronRight, AccessTime, Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../ThemeContext';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
  },
  {
    id: 3,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
  },
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: ['Van Gogh', 'Picasso', 'Da Vinci', 'Rembrandt'],
  },
  {
    id: 5,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
  },
];

export default function Quiz() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: selectedOption,
      });

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(selectedAnswers[currentQuestion + 1] || '');
      } else {
        navigate('/results', {
          state: {
            answers: { ...selectedAnswers, [currentQuestion]: selectedOption },
            totalQuestions: questions.length,
          },
        });
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Progress Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime color="success" />
              <Typography color="text.primary">
                Question {currentQuestion + 1} of {questions.length}
              </Typography>
            </Box>
            <Typography color="success.main" fontWeight="600">
              {Math.round(progress)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 1,
              bgcolor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'success.main',
              },
            }}
          />
        </Paper>

        {/* Question Card */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            {questions[currentQuestion].question}
          </Typography>

          <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
            <RadioGroup value={selectedOption} onChange={handleOptionChange}>
              {questions[currentQuestion].options.map((option, index) => (
                <Paper
                  key={index}
                  elevation={selectedOption === option ? 2 : 0}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: 2,
                    borderColor: selectedOption === option ? 'success.main' : 'divider',
                    bgcolor: selectedOption === option ? 'action.hover' : 'transparent',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'success.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <FormControlLabel
                    value={option}
                    control={
                      <Radio
                        sx={{
                          color: 'text.secondary',
                          '&.Mui-checked': {
                            color: 'success.main',
                          },
                        }}
                      />
                    }
                    label={option}
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!selectedOption}
            endIcon={<ChevronRight />}
            sx={{
              py: 1.5,
              bgcolor: 'success.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'success.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled',
              },
            }}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Exam'}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
