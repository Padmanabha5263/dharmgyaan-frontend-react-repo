import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ReligionSelect from "./pages/ReligionSelect";
import BackgroundVideo from "./components/BackgroundVideo";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import QuizCustomization from './pages/QuizCustomization';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BackgroundVideo>
          <Router>
            <ThemeToggle/>
            <LanguageToggle/>
            <Routes>
              <Route path="/" element={<Navigate to="/signin" replace />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Quiz" element={<Quiz />} />
              <Route path="/Results" element={<Results />} />
              <Route path="/ReligionSelect" element={<ReligionSelect />} />
              <Route path="/QuizCustomization" element={<QuizCustomization />} />
            </Routes>
          </Router>
        </BackgroundVideo>
      </ThemeProvider>
    </Provider>
  );
}
