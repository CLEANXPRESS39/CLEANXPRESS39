import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Calendar, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import carWashing from '../assets/car-washing.jpg';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (user) {
      if (user.is_admin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        };
        result = await register(userData);
      }

      if (result.success) {
        alert(result.message);
        // La redirection sera gérée par l'useEffect
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Réservation en ligne",
      description: "Planifiez vos rendez-vous 24h/24"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Suivi en temps réel",
      description: "Suivez l'avancement de votre service"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Historique des services",
      description: "Retrouvez tous vos anciens rendez-vous"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Offres exclusives",
      description: "Accédez à des promotions réservées"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${carWashing})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Espace Client</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Connectez-vous pour réserver vos services et gérer vos rendez-vous
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Pourquoi créer un compte ?</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Profitez d'une expérience personnalisée et simplifiez la gestion de vos services de nettoyage automobile.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-red-600 p-3 rounded-lg flex-shrink-0 text-white">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Première réservation ?</h3>
                <p className="mb-4">Bénéficiez de 10% de réduction sur votre premier service !</p>
                <div className="text-sm opacity-90">Code promo : WELCOME10</div>
              </div>
            </div>

            {/* Login/Register Form */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
                    isLogin 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Connexion
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
                    !isLogin 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Inscription
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        Prénom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required={!isLogin}
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Nom *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required={!isLogin}
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required={!isLogin}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                        placeholder="06 XX XX XX XX"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Mot de passe *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-slate-300 text-red-600 focus:ring-red-600" />
                      <span className="ml-2 text-sm text-slate-600">Se souvenir de moi</span>
                    </label>
                    <a href="#" className="text-sm text-red-600 hover:text-red-700">
                      Mot de passe oublié ?
                    </a>
                  </div>
                )}

                {!isLogin && (
                  <div className="flex items-start">
                    <input type="checkbox" required className="mt-1 rounded border-slate-300 text-red-600 focus:ring-red-600" />
                    <span className="ml-2 text-sm text-slate-600">
                      J'accepte les{' '}
                      <a href="#" className="text-red-600 hover:text-red-700">conditions d'utilisation</a>
                      {' '}et la{' '}
                      <a href="#" className="text-red-600 hover:text-red-700">politique de confidentialité</a>
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>{isLogin ? 'Se connecter' : 'Créer mon compte'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-red-600 hover:text-red-700 font-medium"
                  >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                  </button>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500 text-center">
                  Besoin d'aide ? Contactez-nous au{' '}
                  <a href="tel:0683967427" className="text-red-600 hover:text-red-700 font-medium">
                    06 83 96 74 27
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Vous préférez réserver par téléphone ?</h2>
          <p className="text-lg text-slate-600 mb-6">
            Notre équipe est disponible pour vous accompagner dans votre réservation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0683967427"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Appeler maintenant
            </a>
            <Link 
              to="/contact"
              className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-medium"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

