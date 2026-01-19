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
  Alert,
} from "@mui/material";
import { useThemeContext } from "../ThemeContext";
import { getBackgroundSvg } from "../utils/hooks/getBackgroundSvg";
import TalkBox from "../components/Talkbox";

export default function SignUp() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    navigate("/quiz");
  };

  return (
    <TalkBox isDarkMode={isDarkMode}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Account
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
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
          variant="outlined"
        />

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
        />

        <TextField
          fullWidth
          label="Confirm Password"
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
          Sign Up
        </Button>
      </form>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/signin"
            color="text.secondary"
            sx={{ fontWeight: 600 }}
          >
            Sign In
          </Link>
        </Typography>
      </Box>
    </TalkBox>
  );
}
