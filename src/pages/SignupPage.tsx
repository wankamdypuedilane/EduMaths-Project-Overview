import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calculator, Mail, Lock, User } from 'lucide-react';

export function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'inscription avec Supabase
    navigate('/terms');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h1>
            <p className="text-gray-600">Rejoignez EduMaths gratuitement</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Nom complet</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Prénom & Nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="email" 
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Mot de passe</label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg h-12 flex items-center px-4">
                <Lock className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-gray-700"
                  required
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white h-12 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg mt-6">
              Continuer
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-600">Déjà un compte ? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}