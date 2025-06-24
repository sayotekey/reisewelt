// import React, { useState, useRef, useEffect } from "react";
// import { NavLink, Outlet } from "react-router-dom";

// import euroSign from "../icons/euro-sign-solid-black.svg";
// // import euroSign from "../icons/euro-sign-solid-white.svg";
// import sterlingSign from "../icons/sterling-sign-solid-black.svg";
// // import sterlingSign from "../icons/sterling-sign-solid-white.svg";
// import liraSign from "../icons/turkish-lira-sign-solid-black.svg";
// // import liraSign from "../icons/turkish-lira-sign-solid-white.svg";
// import rubleSign from "../icons/ruble-sign-solid-black.svg";
// // import rubleSign from "../icons/ruble-sign-solid-white.svg";

// import germany from "../images/germany.png";
// import unitedStates from "../images/united-states.png";
// import ukraine from "../images/ukraine.png";
// import france from "../images/france.png";
// import turkey from "../images/turkey.png";

// const languages = [
//   { value: "de", img: germany },
//   { value: "en", img: unitedStates },
//   { value: "uk", img: ukraine },
//   { value: "fr", img: france },
//   { value: "tr", img: turkey },
// ];

//const HeaderComponent = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
//   const dropdownRef = useRef(null);
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//  return (
//     <header className="w-full">
//       <div className="flex items-center justify-between w-full">
//         <nav className="flex items-center gap-4">
//           <NavLink to="/">Logo/Home</NavLink>
//           <NavLink to="/contact">Kontakt</NavLink>
//           {/* hier später Pfad anpassen auf Login-Pfad des Benutzers!! */}
//           <NavLink to="/account/wishlist">Merkliste</NavLink>
//           <NavLink to="/account/wishlist">Login</NavLink>
//           <div className="relative w-auto" ref={dropdownRef}>
//             <div
//               className="flex items-center bg-transparent border h-8 border-transparent px-3 py-2 cursor-pointer rounded"
//               onClick={() => setOpen((prev) => !prev)}
//               tabIndex={0}
//               role="button"
//             >
//               <img
//                 src={selected.img}
//                 alt={selected.value}
//                 className="w-6 h-6"
//               />
//             </div>
//             {open && (
//               <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 h-50 w-auto ">
//                 {languages.map((lang) => (
//                   <div
//                     key={lang.value}
//                     className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${
//                       selected.value === lang.value ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => {
//                       setSelected(lang);
//                       setOpen(false);
//                       // Optional: Sprache wechseln
//                     }}
//                   >
//                     <img src={lang.img} alt={lang.label} className="w-6 h-6" />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div
//             className="relative w-auto"
//             // ref={languageDropdownRef}
//           >
//             <div
//               className="flex items-center border h-9 border-transparent px-3 py-2 cursor-pointer rounded"
//               onClick={() => setOpenLanguage((prev) => !prev)}
//               tabIndex={0}
//               role="button"
//             >
//               <img
//                 src={selectedLanguage.img}
//                 alt={selectedLanguage.value}
//                 className="w-7 h-7"
//               />
//             </div>
//             {openLanguage && (
//               <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-xl z-10 h-50 w-auto ">
//                 {languages.map((lang) => (
//                   <div
//                     key={lang.value}
//                     className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-300 ${
//                       selectedLanguage.value === lang.value ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedLanguage(lang);
//                       setOpenLanguage(false);
//                       // Optional: Sprache wechseln
//                     }}
//                   >
//                     <img
//                       src={lang.img}
//                       alt={`${lang.value} flag`}
//                       className="w-6 h-6"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="relative w-auto" ref={currencyDropdownRef}>
//             <div
//               className="flex items-center border h-9 border-transparent px-3 py-2 cursor-pointer rounded"
//               onClick={() => setOpenCurrency((prev) => !prev)}
//               tabIndex={0}
//               role="button"
//             >
//               <img
//                 src={selectedCurrency.img}
//                 alt={selectedCurrency.value}
//                 className="w-7 h-7"
//               />
//             </div>
//             {openCurrency && (
//               <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-xl z-10 h-50 w-auto ">
//                 {currency.map((curr) => (
//                   <div
//                     key={curr.value}
//                     className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-300 ${
//                       selectedCurrency.value === curr.value ? "bg-gray-100" : ""
//                     }`}
//                     onClick={() => {
//                       setSelectedCurrency(curr);
//                       setOpenCurrency(false);
//                       // Optional: Währung wechseln
//                     }}
//                   >
//                     <img
//                       src={curr.img}
//                       alt={`${curr.value} flag`}
//                       className="w-6 h-6"
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </nav>
//       </div>
//     </header>
//  );
//};
const HeaderComponent = () => {
  return (
    <>
      <h1>Test HEader</h1>
    </>
  );
};
export default HeaderComponent;
