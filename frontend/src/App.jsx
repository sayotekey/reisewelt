import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import MainComponent from "./components/MainComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import LastMinuteDeals from "./pages/LastMinuteDeals.jsx";
import FivehundredEuroDeals from "./pages/FivehundredEuroDeals.jsx";
import SingleNews from "./pages/SingleNews.jsx";
import AllNews from "./pages/AllNews.jsx";
// Legal pages
import Privacy from "./pages/Privacy.jsx";
import Imprint from "./pages/Imprint.jsx";
import Terms from "./pages/Terms.jsx";
import Cookies from "./pages/Cookies.jsx";
// Theme context
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      {/* // <BrowserRouter>/ */}
      <div className="main-content">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lastminute-deals" element={<LastMinuteDeals />} />
          <Route path="/news" element={<AllNews />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route
            path="/fivehundredeuro-deals"
            element={<FivehundredEuroDeals />}
          />
          {/* Legal pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <FooterComponent />
      {/* // </BrowserRouter> */}
    </ThemeProvider>
  );
}

export default App;
