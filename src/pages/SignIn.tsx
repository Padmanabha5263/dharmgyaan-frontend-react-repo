import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { useThemeContext } from "../ThemeContext";
import { Provider, useAuth } from "../features/auth";
import { getBackgroundSvg } from "../utils/hooks/getBackgroundSvg";
import TalkBox from "../components/Talkbox";

export default function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();

  const { isDarkMode } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/select-religion");
  };

  const onGoogleSignInClick = async () => {
    await auth.login(Provider.GOOGLE);
    navigate("/select-religion");
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome Back
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Sign in to continue your exam
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Password"
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
          Sign In
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
        <span>Sign in with Google</span>
      </Button>
      {/* google social login end */}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
    </TalkBox>
  );
}
