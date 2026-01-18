import { Navigate, Route, Routes } from "react-router-dom";

// Auth pages
import { LoginPage } from "../pages/auth/LoginPage";
import { SignupPage } from "../pages/auth/SignupPage";
import { TermsPage } from "../pages/auth/TermsPage";
import { WelcomePage } from "../pages/auth/WelcomePage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";

// Learning pages
import { ChaptersPage } from "../pages/learning/ChaptersPage";
import { FormulasPage } from "../pages/learning/FormulasPage";
import { ExercisesPage } from "../pages/learning/ExercisesPage";
import { ExercisePage } from "../pages/learning/ExercisePage";
import { SolutionPage } from "../pages/learning/SolutionPage";

// Profile pages
import { ProfilePage } from "../pages/profile/ProfilePage";

// Onboarding & Other
import { SplashPage } from "../pages/SplashPage";
import { ClassSelectionPage } from "../pages/ClassSelectionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ProgressionPage } from "../pages/ProgressionPage";
import { TutorPage } from "../pages/TutorPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/class-selection" element={<ClassSelectionPage />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/classes/:classeId/chapters" element={<ChaptersPage />} />
      <Route path="/chapters/:chapterId/formulas" element={<FormulasPage />} />
      <Route
        path="/chapters/:chapterId/exercises"
        element={<ExercisesPage />}
      />
      <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
      <Route
        path="/exercises/:exerciseId/solution"
        element={<SolutionPage />}
      />
      <Route path="/progression" element={<ProgressionPage />} />
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
