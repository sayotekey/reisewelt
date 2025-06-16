import React from "react";
import HeroSection from "./HeroSection.jsx";
import SearchBar from "./SearchBar.jsx";
import LastSearch from "./LastSearch.jsx";
import LastMinute from "./LastMinute.jsx";
import TopTravelDestinations from "./TopTravelDestinations.jsx";
import TravelNews from "./TravelNews.jsx";
import ContactBanner from "./ContactBanner.jsx";
import AboutUs from "./AboutUs.jsx";
import CustomerRating from "./CustomerRating.jsx";
import OurAdvantages from "./OurAdvantages.jsx";
import 'react-datepicker/dist/react-datepicker.css'; /////!!


const MainComponent = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <LastSearch />
      <LastMinute />
      <TopTravelDestinations />
      <TravelNews />
      <ContactBanner />
      <AboutUs />
      <CustomerRating />
      <OurAdvantages />
    </>
  );
};

export default MainComponent;
