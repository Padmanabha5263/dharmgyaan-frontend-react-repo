import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
} from "@mui/material";
import { Login, Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";
import { Provider, useAuth } from "../features/auth";
import LanguageSwitcher from "../components/LanguageSwitcher";



export default function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  const { isDarkMode, toggleTheme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/select-religion");
  };

  const onGoogleSignInClick = async () => {
    await auth.login(Provider.GOOGLE);
    navigate("/select-religion");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <LanguageSwitcher />
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <Login sx={{ color: "primary.contrastText" }} />
            </Avatar>
          </Box>

          <Typography variant="h4" align="center" gutterBottom>
            {t('common.welcomeBack')}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {t('common.signInToContinue')}
          </Typography>

          <form onSubmit={handleSubmit}>
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
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
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
              {t('common.signIn')}
            </Button>
          </form>
          <br />
          {/* google social login start */}
          <Button
            type="submit"
            fullWidth
            onClick={onGoogleSignInClick}
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
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              style={{ width: 18, height: 18, marginRight: 10 }}
            />
            <span>{t('common.signInWithGoogle')}</span>
          </Button>
          {/* google social login end */}

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {t('common.noAccount')}{" "}
              <Link
                component={RouterLink}
                to="/signup"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {t('common.signUp')}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
