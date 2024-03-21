// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
      <div className="flex justify-around items-center">
        {/* <Link to="/" className="hover:text-gray-300">
          Home
        </Link> */}
        <Link to="/profile" className="hover:text-gray-300">
          Profile
        </Link>
        <Link to="/community" className="hover:text-gray-300">
          Community
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

// eslint-disable-next-line no-unused-vars
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./Contexts/AuthContext";
// import PrivateRoute from "./Contexts/PrivateRoute";
// import MealPlanPage from "./pages/MealPlanPage";
// import MealPointsPage from "./pages/MealPointsPage";
// import MealHistoryPage from "./pages/MealHistoryPage";
// import "./App.css";
// import ReferralPage from "./pages/ReferralPage";
// import Onboarding from "./pages/Onboarding";
// import PreviewPage from "./pages/Previewmeal";
// import MealDetailsPage from "./pages/MealFullDetails";
// import SignUp from "./pages/SignUp";
// import RecommendedMeal from "./pages/RecommendedMeal";
// import SignIn from "./pages/SignIn";
// import Footer from "./pages/Footer";
// import CommunityPage from "./pages/CommunityPage";
// import ProfilePage from "./pages/ProfilePage";

// function App() {
//   return (
//     <div className="font-[Manrope]">
//       <Router>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Onboarding />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/community" element={<CommunityPage />} />
//             <Route path="/profile" element={<ProfilePage />} />

//             <Route
//               path="/MealPoint"
//               element={
//                 <PrivateRoute>
//                   <MealPointsPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/mealplan"
//               element={
//                 <PrivateRoute>
//                   <MealPlanPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/history"
//               element={
//                 <PrivateRoute>
//                   <MealHistoryPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/preview"
//               element={
//                 <PrivateRoute>
//                   <PreviewPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/MealDetails"
//               element={
//                 <PrivateRoute>
//                   <MealDetailsPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/referral"
//               element={
//                 <PrivateRoute>
//                   <ReferralPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="/Recommended" element={<RecommendedMeal />} />
//           </Routes>
//           <Footer />
//         </AuthProvider>
//       </Router>
//     </div>
//   );
// }

// export default App;
