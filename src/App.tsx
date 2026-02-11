import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomeSection from "./pages/HomeSection";
import ReviewsPage from "./pages/Reviews";
import HowItWorks from "./pages/HowItWorks";
import Featured from "./pages/Featured";
import AllCategories from "./components/AllCategories";

import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050815]">
      <NavBar onOpenSignIn={() => setSignInOpen(true)} />

      <Routes>
        <Route path="/" element={<HomeSection />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/features" element={<Featured />} />
        <Route path="/categories" element={<AllCategories />} />
        <Route path="/categories/:category" element={<CategoryPage />} />

      </Routes>
      <Footer />

      <SignInModal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        onOpenSignUp={() => setSignUpOpen(true)}
      />

      <SignUpModal
        open={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onOpenSignIn={() => setSignInOpen(true)}
      />
    </div>
  );
}
