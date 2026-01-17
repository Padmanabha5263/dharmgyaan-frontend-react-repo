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
import { Login, Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../ThemeContext";
import { Provider, useAuth } from "../features/auth";



export default function SignIn() {
  const navigate = useNavigate();
  const auth = useAuth();

  const { isDarkMode, toggleTheme } = useThemeContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/quiz");
  };

  const onGoogleSignInClick = async () => {
    await auth.login(Provider.GOOGLE);
    navigate("/quiz");
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
        </Paper>
      </Container>
    </Box>
  );
}
