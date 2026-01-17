import { useState, useRef } from "react";
import { AppLayout } from "../components/AppLayout";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Obtenir les initiales
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModifyPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    // TODO: Sauvegarder dans Supabase
    updateUser({ name, email });
    alert("Modifications enregistrées !");
  };

  const handleChangePassword = () => {
    // TODO: Changer le mot de passe avec Supabase
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    alert("Mot de passe modifié avec succès !");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
            <div className="bg-indigo-100 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-600 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(name)
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{name}</h2>
              <p className="text-gray-600 mb-3">{email}</p>
              <button
                onClick={handleModifyPhoto}
                className="cursor-pointer text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Modifier la photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
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
                className="w-full bg-gray-50 border border-gray-300 rounded-lg h-12 px-4 outline-none focus:ring-2 focus:ring-indigo-600"
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

        {/* Security Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm mb-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
            Sécurité
          </h2>
          <div className="space-y-4">
            {[
              {
                label: "Mot de passe actuel",
                val: currentPassword,
                set: setCurrentPassword,
                show: showCurrentPassword,
                setShow: setShowCurrentPassword,
              },
              {
                label: "Nouveau mot de passe",
                val: newPassword,
                set: setNewPassword,
                show: showNewPassword,
                setShow: setShowNewPassword,
              },
              {
                label: "Confirmer le mot de passe",
                val: confirmPassword,
                set: setConfirmPassword,
                show: showConfirmPassword,
                setShow: setShowConfirmPassword,
              },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {field.label}
                </label>
                <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                  <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type={field.show ? "text" : "password"}
                    value={field.val}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent flex-1 outline-none text-gray-700 focus:ring-0"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleChangePassword}
              className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer shadow-md shadow-indigo-100 transition-all mt-2"
            >
              Modifier le mot de passe
            </button>
          </div>
        </div>

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
