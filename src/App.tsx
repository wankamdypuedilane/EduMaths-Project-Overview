import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

// Import pages
import { SplashPage } from './pages/SplashPage';
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { TermsPage } from './pages/TermsPage';
import { ClassSelectionPage } from './pages/ClassSelectionPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { FormulasPage } from './pages/FormulasPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { ExercisePage } from './pages/ExercisePage';
import { SolutionPage } from './pages/SolutionPage';
import { ProgressionPage } from './pages/ProgressionPage';
import { TutorPage } from './pages/TutorPage';
import { ProfilePage } from './pages/ProfilePage';

// Import demo components
import { MobileApp } from './components/MobileApp';
import { WebApp } from './components/WebApp';

export default function App() {
  const [demoMode, setDemoMode] = useState(true);
  const [view, setView] = useState<'mobile' | 'web'>('mobile');

  // Mode démo pour visualiser les maquettes
  if (demoMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-indigo-600">EduMaths</h1>
                <p className="text-sm text-gray-600 mt-1">Vision des Maquettes - Projet Éducatif</p>
              </div>
              
              {/* Toggle View */}
              <div className="flex gap-4">
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setView('mobile')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      view === 'mobile'
                        ? 'bg-white shadow-md text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span className="font-medium">Application Mobile</span>
                  </button>
                  <button
                    onClick={() => setView('web')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      view === 'web'
                        ? 'bg-white shadow-md text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                    <span className="font-medium">Site Web</span>
                  </button>
                </div>
                
                <button
                  onClick={() => setDemoMode(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all"
                >
                  Mode Application
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {view === 'mobile' ? <MobileApp /> : <WebApp />}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
            <p>EduMaths - Plateforme éducative 6e à Terminale</p>
            <p className="mt-1">Projet de développement web & mobile</p>
          </div>
        </footer>
      </div>
    );
  }

  // Mode application avec routing dynamique
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SplashPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/class-selection" element={<ClassSelectionPage />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/classes/:classeId/chapters" element={<ChaptersPage />} />
        <Route path="/chapters/:chapterId/formulas" element={<FormulasPage />} />
        <Route path="/chapters/:chapterId/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:exerciseId" element={<ExercisePage />} />
        <Route path="/exercises/:exerciseId/solution" element={<SolutionPage />} />
        <Route path="/progression" element={<ProgressionPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}