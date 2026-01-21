import { ReactNode } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  Home,
  TrendingUp,
  MessageSquare,
  UserCircle,
  LogOut,
  Calculator,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface AppLayoutProps {
  children: ReactNode;
  activePage: string;
}

export function AppLayout({ children, activePage }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Gestion de l'état de chargement pour éviter le flash
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Redirection si non authentifié
  if (!user) {
    return <Navigate to="/login" />;
  }

  const menuItems = [
    { id: "dashboard", label: "Accueil", icon: Home, path: "/dashboard" },
    {
      id: "progression",
      label: "Progression",
      icon: TrendingUp,
      path: "/progression",
    },
    { id: "tutor", label: "Tuteur IA", icon: MessageSquare, path: "/tutor" },
    { id: "profile", label: "Profil", icon: UserCircle, path: "/profile" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">EduMaths</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activePage === item.id || location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
