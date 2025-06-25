import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import MainComponent from "./components/MainComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

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
        <Route path="/lastminute-deals" element={<LastMinuteDeals />} />
        <Route
          path="/fivehundredeuro-deals"
          element={<FivehundredEuroDeals />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <FooterComponent />
      {/* // </BrowserRouter> */}
    </>
  );
}

export default App;
