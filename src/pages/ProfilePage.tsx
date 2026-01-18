import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabaseClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export function ProfilePage() {
  const { user, updateUser, updatePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.avatarUrl || null,
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update state when user changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.avatarUrl || null);
    }
  }, [user]);

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

  const handleSave = async () => {
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Prepare updates
      const updates: any = { name, email };

      // If there's a new image, upload it first
      if (profileImage && profileImage.startsWith("data:") && user) {
        const file = await fetch(profileImage).then((r) => r.blob());
        const fileName = `${user.id}-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        updates.avatarUrl = urlData?.publicUrl;
      }

      await updateUser(updates);
      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      setErrorMessage(error.message || "Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setSavingPassword(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!currentPassword) {
        setErrorMessage("Veuillez entrer votre mot de passe actuel");
        setSavingPassword(false);
        return;
      }

      if (!newPassword || !confirmPassword) {
        setErrorMessage("Veuillez remplir tous les champs");
        setSavingPassword(false);
        return;
      }

      if (newPassword.length < 8) {
        setErrorMessage("Le mot de passe doit faire au moins 8 caractères");
        setSavingPassword(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas !");
        setSavingPassword(false);
        return;
      }

      await updatePassword(currentPassword, newPassword);

      setSuccessMessage("Mot de passe modifié avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      setErrorMessage(
        error.message || "Erreur lors du changement de mot de passe",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setErrorMessage(
        "Une erreur est survenue lors de la suppression du compte",
      );
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
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

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}

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
          disabled={saving}
          className="cursor-pointer w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all mb-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving && <Loader className="w-4 h-4 animate-spin" />}
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>

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
                  <button
                    type="button"
                    onClick={() => field.setShow(!field.show)}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                  >
                    {field.show ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleChangePassword}
              disabled={savingPassword}
              className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer shadow-md shadow-indigo-100 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {savingPassword && <Loader className="w-4 h-4 animate-spin" />}
              {savingPassword ? "Modification..." : "Modifier le mot de passe"}
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
                className={`cursor-pointer w-12 h-6 rounded-full relative transition-all ${
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
                className={`cursor-pointer w-12 h-6 rounded-full relative transition-all ${
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
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="cursor-pointer w-full bg-white border-2 border-red-600 text-red-600 h-12 rounded-xl font-semibold hover:bg-red-50 transition-all"
        >
          Supprimer mon compte
        </button>

        {/* Delete Account Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer votre compte ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Toutes vos données (progression,
                exercices, statistiques) seront définitivement supprimées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? "Suppression..." : "Supprimer définitivement"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppLayout>
  );
}
