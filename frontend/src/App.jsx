import "./App.css";
import HeaderComponent from "./components/HeaderComponent.jsx";
import MainComponent from "./components/MainComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
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
        <Route path="/profile" element={<ProfilePage />} />
<<<<<<< olena2
        {/* <Route path="/lastminute-deals" element={<LastMinuteDeals />} />
=======
        <Route path="/lastminute-deals" element={<LastMinuteDeals />} />
        <Route path="/news" element={<AllNews />} /> 
>>>>>>> main
        <Route
          path="/fivehundredeuro-deals"
          element={<FivehundredEuroDeals />}
        />
<<<<<<< olena2
        <Route path="*" element={<ErrorPage />} /> */}
=======
        <Route path="*" element={<ErrorPage />} />
        <Route path="/news/:id" element={<SingleNews />} />
>>>>>>> main
      </Routes>
      <FooterComponent />
      {/* // </BrowserRouter> */}
    </>
  );
}

export default App;
