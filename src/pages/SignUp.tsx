import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';
import { PersonAdd, Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeContext } from '../ThemeContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('common.passwordsDoNotMatch'));
      return;
    }
    setError('');
    navigate('/quiz');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <LanguageSwitcher />
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <PersonAdd sx={{ color: 'primary.contrastText' }} />
            </Avatar>
          </Box>

          <Typography variant="h4" align="center" gutterBottom>
            {t('common.createAccount')}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            {t('common.signUpToContinue')}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t('common.fullName')}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label={t('common.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label={t('common.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label={t('common.confirmPassword')}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              margin="normal"
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              {t('common.signUp')}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('common.haveAccount')}{' '}
              <Link
                component={RouterLink}
                to="/signin"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {t('common.signIn')}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
