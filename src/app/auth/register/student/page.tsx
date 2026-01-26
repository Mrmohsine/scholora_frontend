'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function StudentSignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: '',
    email: '',
    password: '',
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response data:", data);
      if (res.ok) {
        // ✅ Succès — inscription réussie
        await Swal.fire({
          title: 'Inscription réussie 🎉',
          text: `Bienvenue ${data.user.last_name}!`,
          icon: 'success',
          confirmButtonText: 'Aller à la connexion',
        });

        router.push('/auth/login');
      } 
      else if (res.status === 422) {
        // ⚠️ Erreur de validation Laravel
        if (data.errors?.email) {
          await Swal.fire({
            title: 'Email déjà utilisé',
            text: 'Un compte existe déjà avec cet email. Veuillez vous connecter.',
            icon: 'warning',
            confirmButtonText: 'Aller à la connexion',
          });
          router.push('/auth/login');
        } else {
          // Autres erreurs de validation
          const errorMessages = Object.values(data.errors)
            .flat()
            .join('\n');
          Swal.fire({
            title: 'Erreur de validation',
            text: errorMessages,
            icon: 'error',
          });
        }
      } 
      else {
        Swal.fire({
          title: 'Erreur',
          text: data.message || 'Une erreur est survenue lors de l’inscription.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Erreur serveur',
        text: 'Impossible de se connecter au serveur. Vérifiez votre connexion.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-md relative">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Sign up as a student
            </h1>
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-red-500 font-bold">G</span>
              <span className="font-medium text-gray-700">Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-blue-600 font-bold">f</span>
              <span className="font-medium text-gray-700">Continue with Facebook</span>
            </button>
          </div>

          <div className="text-center text-gray-500 text-sm mb-6">or</div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Last name
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                placeholder="Your last name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                First name
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                placeholder="Your first name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Sign up
            </button>
          </form>

          <div className="text-center text-xs text-gray-500 mt-6">
            By clicking Continue or Sign up, you agree to Scholora{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Use
            </Link>
            , including{' '}
            <Link href="/subscription-terms" className="text-blue-600 hover:underline">
              Subscription Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </div>

          <button className="absolute bottom-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
            ?
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
