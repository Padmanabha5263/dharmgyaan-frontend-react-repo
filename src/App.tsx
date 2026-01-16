import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}