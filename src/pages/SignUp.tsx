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
  Alert,
} from "@mui/material";
import { useThemeContext } from "../ThemeContext";
import TalkBox from "../components/Talkbox";

export default function SignUp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('common.passwordsDoNotMatch'));
      return;
    }
    setError("");
    navigate("/quiz");
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      <Typography variant="h4" align="center" gutterBottom>
        {t('common.createAccount')}
      </Typography>
      {/* <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Sign up to start your exam
          </Typography> */}

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
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
          }}
        >
          {t('common.signUp')}
        </Button>
      </form>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {t('common.haveAccount')}{" "}
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
    </TalkBox>
  );
}
