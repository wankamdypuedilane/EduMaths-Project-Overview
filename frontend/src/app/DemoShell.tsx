import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { MobileApp } from "../components/MobileApp";
import { WebApp } from "../components/WebApp";

type DemoShellProps = {
  onEnterApp: () => void;
};

export function DemoShell({ onEnterApp }: DemoShellProps) {
  const [view, setView] = useState<"mobile" | "web">("mobile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">EduMaths</h1>
              <p className="text-sm text-gray-600 mt-1">
                Vision des Maquettes - Projet Éducatif
              </p>
            </div>

            {/* Toggle View */}
            <div className="flex gap-4">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setView("mobile")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    view === "mobile"
                      ? "bg-white shadow-md text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Application Mobile</span>
                </button>
                <button
                  onClick={() => setView("web")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    view === "web"
                      ? "bg-white shadow-md text-indigo-600"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                  <span className="font-medium">Site Web</span>
                </button>
              </div>

              <button
                onClick={onEnterApp}
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
        {view === "mobile" ? <MobileApp /> : <WebApp />}
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
