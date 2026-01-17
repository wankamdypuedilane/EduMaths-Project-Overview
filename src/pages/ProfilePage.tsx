import { useState } from "react";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const [name, setName] = useState("Marie Jeanne");
  const [email, setEmail] = useState("marie.jeanne@email.com");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useAuth();

  const handleSave = () => {
    // TODO: Sauvegarder dans Supabase
    alert("Modifications enregistrées !");
  };

  return (
    <AppLayout activePage="profile">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mon Profil</h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et paramètres
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="bg-indigo-100 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-600">
              {user?.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {user?.name}
              </h2>
              <p className="text-gray-600 mb-3">{user?.email}</p>
              <button className=" cursor-pointer text-indigo-600 font-semibold hover:text-indigo-700">
                Modifier la photo
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" cursor-pointer w-full bg-gray-50 border border-gray-300 rounded-lg h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className=" cursor-pointer w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all mb-6"
        >
          Enregistrer les modifications
        </button>

        {/* Settings */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Paramètres</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Notifications</p>
                <p className="text-sm text-gray-600">
                  Recevoir des rappels quotidiens
                </p>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={` cursor-pointer w-12 h-6 rounded-full relative transition-all ${
                  notificationsEnabled ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    notificationsEnabled ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">Mode sombre</p>
                <p className="text-sm text-gray-600">Activer le thème sombre</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={` cursor-pointer w-12 h-6 rounded-full relative transition-all ${
                  darkMode ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    darkMode ? "right-1" : "left-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* Delete Account Button */}
        <button className=" cursor-pointer w-full bg-white border-2 border-red-600 text-red-600 h-12 rounded-xl font-semibold hover:bg-red-50 transition-all">
          Supprimer mon compte
        </button>
      </div>
    </AppLayout>
  );
}
