import React from "react";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import LastSearch from "../components/LastSearch";
import LastMinuteComponent from "../components/LastMinuteComponent";
import TopTravelDestinations from "../components/TopTravelDestinations";
import TravelNews from "../components/TravelNews";
import ContactBanner from "../components/ContactBanner";
import AboutUs from "../components/AboutUs";
import CustomerReviews from "../components/CustomerReviews";
import OurAdvantages from "../components/OurAdvantages";

import "react-datepicker/dist/react-datepicker.css"; /////!!

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchBar />
      <LastSearch />
      <LastMinuteComponent />
      <TopTravelDestinations />
      <TravelNews />
      <ContactBanner />
      <AboutUs />
      <CustomerReviews />
      <OurAdvantages />
    </div>
  );
};

export default Home;
