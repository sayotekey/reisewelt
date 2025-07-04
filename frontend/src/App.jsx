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

function App() {
  return (
    <>
      {/* // <BrowserRouter>/ */}
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
        <Route
          path="/fivehundredeuro-deals"
          element={<FivehundredEuroDeals />}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/news/:id" element={<SingleNews />} />
      </Routes>
      <FooterComponent />
      {/* // </BrowserRouter> */}
    </>
  );
}

export default App;
