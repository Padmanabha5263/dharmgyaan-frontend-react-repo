import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  Cancel,
  EmojiEvents,
  Home,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useThemeContext } from '../ThemeContext';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { answers, totalQuestions } = location.state || {};

  useEffect(() => {
    if (!answers || !totalQuestions) {
      navigate('/quiz');
    }
  }, [answers, totalQuestions, navigate]);

  if (!answers || !totalQuestions) {
    return null;
  }

  const correctAnswers = Object.keys(answers).length > 3 ? 4 : 2;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= 60;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // bgcolor: 'background.default',
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

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: passed ? 'success.main' : 'error.main',
                mb: 2,
              }}
            >
              {passed ? (
                <EmojiEvents sx={{ fontSize: 48, color: 'primary.contrastText' }} />
              ) : (
                <Cancel sx={{ fontSize: 48, color: 'primary.contrastText' }} />
              )}
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {passed ? 'Congratulations!' : 'Try Again'}
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              {passed
                ? 'You have successfully passed the exam'
                : 'You need more practice to pass the exam'}
            </Typography>
          </Box>

          {/* Score Display */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h2" color="success.main" gutterBottom>
                {percentage}%
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your Score
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    {totalQuestions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Questions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" gutterBottom>
                    {correctAnswers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Correct
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main" gutterBottom>
                    {totalQuestions - correctAnswers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Incorrect
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Answer Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Answer Summary
            </Typography>
            <List>
              {Object.entries(answers).map(([questionIndex, answer], index) => {
                const isCorrect = index % 2 === 0 || index === 3;
                return (
                  <ListItem
                    key={questionIndex}
                    sx={{
                      bgcolor: 'action.hover',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon>
                      {isCorrect ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Cancel color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={`Question ${parseInt(questionIndex) + 1}`}
                      secondary={answer as string}
                    />
                    <Typography
                      variant="body2"
                      color={isCorrect ? 'success.main' : 'error.main'}
                      fontWeight="600"
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Actions */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate('/quiz')}
                sx={{
                  py: 1.5,
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Try Again
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/signin"
                startIcon={<Home />}
                sx={{
                  py: 1.5,
                  borderColor: 'text.secondary',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'text.primary',
                    bgcolor: 'action.hover',
                  },
                }}
              >
                Go Home
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
