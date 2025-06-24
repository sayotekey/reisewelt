import React from "react";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import LastSearch from "../components/LastSearch";
import LastMinute from "../components/LastMinute";
import TopTravelDestinations from "../components/TopTravelDestinations";
import TravelNews from "../components/TravelNews";
import ContactBanner from "../components/ContactBanner";
import AboutUs from "../components/AboutUs";
import CustomerRating from "../components/CustomerRating";
import OurAdvantages from "../components/OurAdvantages";

import "react-datepicker/dist/react-datepicker.css"; /////!!

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
