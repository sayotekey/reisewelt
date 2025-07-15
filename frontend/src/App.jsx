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
import Privacy from "./pages/Privacy.jsx"; // Legal pages
import Imprint from "./pages/Imprint.jsx"; // Legal pages
import Terms from "./pages/Terms.jsx"; // Legal pages
import Cookies from "./pages/Cookies.jsx"; // Legal pages
import { ThemeProvider } from "./context/ThemeContext.jsx"; // Theme context
import { I18nProvider } from "./context/I18nContext.jsx"; //translation context
import HamburgHotelsPage from "./pages/HamburgHotelsPage.jsx";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
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
            <Route path="/hamburg-hotels" element={<HamburgHotelsPage />} />
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
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
