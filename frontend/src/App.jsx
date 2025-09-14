import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/protectedRoutes.jsx";
import PublicRoute from "./components/publicRoutes.jsx";
import DashboardPage from "./pages/DashboardPage/dashboard.jsx";
import AssessmentFormPage from "./pages/DashboardPage/AssessmentFormPage/assessmentform.jsx";
import Signup from "./pages/SignUpPage/signup.jsx";
import Login from "./pages/LoginPage/login.jsx";
import ForgotPasswordPage1 from "./pages/forgotPassword-1Page/forgotpassword-1.jsx";
import ChangePassword from "./pages/changePassword/changePassword.jsx";
import OtpVerificationPage from "./pages/verifyOtp/verifyOtp.jsx";
import PhysicalFitness from "./pages/DashboardPage/AssessmentFormPage/PhysicalFitness/physicalFitness.jsx";
import Lifestyle from "./pages/DashboardPage/AssessmentFormPage/Lifestyle/lifestyle.jsx";
import MentalWellBeing from "./pages/DashboardPage/AssessmentFormPage/MentalBeing/mentalBeing.jsx";
import Biomarkers from "./pages/DashboardPage/AssessmentFormPage/Biomarkers/biomarkers.jsx";
import Nutrition from "./pages/DashboardPage/AssessmentFormPage/Nutrition/nutrition.jsx";
import Blogs from "./pages/DashboardPage/Blogs/blogs.jsx";
import Cancer from "./pages/DashboardPage/Blogs/Chronic Ailments/Cancer/cancer.jsx";
import Thyroid from "./pages/DashboardPage/Blogs/Chronic Ailments/Thyroid/thyroid.jsx";
import Hypertension from "./pages/DashboardPage/Blogs/Chronic Ailments/Hypertension/hypertension.jsx";
import Asthma from "./pages/DashboardPage/Blogs/Chronic Ailments/Asthma/asthma.jsx";
import Arthritis from "./pages/DashboardPage/Blogs/Chronic Ailments/Arthritis/arthritis.jsx";
import Ayurveda from "./pages/DashboardPage/Blogs/Lifestyle/Ayurveda/ayurveda.jsx";
import Beauty from "./pages/DashboardPage/Blogs/Lifestyle/Beauty/beauty.jsx";
import Exercise from "./pages/DashboardPage/Blogs/Lifestyle/Exercise/exercise.jsx";
import FoodNutrition from "./pages/DashboardPage/Blogs/Lifestyle/Food&Nutrition/food&nutrition.jsx";
import MenHealth from "./pages/DashboardPage/Blogs/Wellness/menHealth/menhealth.jsx";
import WomenHealth from "./pages/DashboardPage/Blogs/Wellness/womenHealth/womenhealth.jsx";
import ChildCare from "./pages/DashboardPage/Blogs/Wellness/childCare/childcare.jsx";
import BoneHealth from "./pages/DashboardPage/Blogs/Wellness/boneHealth/bonehealth.jsx";
import Sleep from "./pages/DashboardPage/Blogs/Wellness/sleep/sleep.jsx";
import OralHealth from "./pages/DashboardPage/Blogs/Wellness/oralHealth/oralhealth.jsx";
import Diabetes from "./pages/DashboardPage/Blogs/Chronic Ailments/Diabetes/diabetes.jsx";
import Leaderboard from "./pages/DashboardPage/Leaderboard/leaderboard.jsx";
import AboutUs from "./pages/DashboardPage/AboutUs/aboutus.jsx";

function App() {
  const authenticatedRoutes = [
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/assessment", element: <AssessmentFormPage /> },
    { path: "/physical-fitness", element: <PhysicalFitness /> },
    { path: "/lifestyle", element: <Lifestyle /> },
    { path: "/mental-well-being", element: <MentalWellBeing /> },
    { path: "/biomarkers", element: <Biomarkers /> },
    { path: "/nutrition", element: <Nutrition /> },
    { path: "/blog", element: <Blogs /> },
    { path: "/cancer", element: <Cancer /> },
    { path: "/thyroid", element: <Thyroid /> },
    { path: "/hypertension", element: <Hypertension /> },
    { path: "/diabetes", element: <Diabetes /> },
    { path: "/asthma", element: <Asthma /> },
    { path: "/arthritis", element: <Arthritis /> },
    { path: "/ayurveda", element: <Ayurveda /> },
    { path: "/beauty", element: <Beauty /> },
    { path: "/exercise", element: <Exercise /> },
    { path: "/food&nutrition", element: <FoodNutrition /> },
    { path: "/menhealth", element: <MenHealth /> },
    { path: "/womenhealth", element: <WomenHealth /> },
    { path: "/childcare", element: <ChildCare /> },
    { path: "/bonehealth", element: <BoneHealth /> },
    { path: "/oralhealth", element: <OralHealth /> },
    { path: "/sleep", element: <Sleep /> },
    { path: "/leaderboard", element: <Leaderboard /> },
    { path: "/about-us", element: <AboutUs /> },
  ];

  return (
    <AuthProvider>
      <Router>
        <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotPassword-1"
          element={
            <PublicRoute>
              <ForgotPasswordPage1 />
            </PublicRoute>
          }
        />
        <Route
          path="/changePassword"
          element={<ChangePassword />}
        />
        <Route
          path="/verifyOtp"
          element={
            <PublicRoute>
              <OtpVerificationPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        {authenticatedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}

export default App;
