import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Car, Sparkles, Shield, Clock, ArrowRight } from 'lucide-react';
import carDetailing1 from '../assets/car-detailing-1.jpg';
import carDetailing2 from '../assets/car-detailing-2.jpg';
import carDetailing3 from '../assets/car-detailing-3.jpg';
import carWashing from '../assets/car-washing.jpg';

const Home = () => {
  const services = [
    {
      title: "Traitement Cuir",
      price: "25€",
      description: "Nettoyage et protection du cuir",
      icon: <Shield className="w-6 h-6" />,
      image: carDetailing2
    },
    {
      title: "Traitement à la Vapeur",
      price: "30€",
      description: "Nettoyage en profondeur à la vapeur",
      icon: <Sparkles className="w-6 h-6" />,
      image: carWashing
    },
    {
      title: "Nettoyage des Sièges",
      price: "35€",
      description: "Nettoyage complet des sièges",
      icon: <Car className="w-6 h-6" />,
      image: carDetailing3
    },
    {
      title: "Lustrage du Véhicule",
      price: "120€",
      description: "Lustrage professionnel complet",
      icon: <Star className="w-6 h-6" />,
      image: carDetailing1
    }
  ];

  const packages = [
    {
      title: "Nettoyage Intérieur",
      price: "30€",
      features: ["Aspirateur complet", "Nettoyage des surfaces", "Désodorisant"],
      image: carDetailing3
    },
    {
      title: "Nettoyage Extérieur",
      price: "45€",
      features: ["Lavage carrosserie", "Nettoyage jantes", "Séchage microfibre"],
      image: carWashing
    },
    {
      title: "Polissage Phares",
      price: "45€",
      features: ["Rénovation phares", "Protection UV", "Finition brillante"],
      image: carDetailing2
    }
  ];

  const conditions = [
    "Poils d'animaux +20€",
    "Véhicule très sale +20€",
    "Dégourdonnage +20€",
    "Nettoyage utilitaire +60€"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${carDetailing1})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Clean Xpress
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 text-blue-100">
              Service de nettoyage automobile professionnel
            </p>
            <p className="text-base md:text-lg mb-8 text-slate-300 max-w-2xl mx-auto">
              Redonnez à votre véhicule tout son éclat avec nos services de nettoyage haut de gamme. 
              Expertise, qualité et rapidité garanties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 font-medium text-base md:text-lg flex items-center justify-center space-x-2"
              >
                <span>Réserver maintenant</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/services" 
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-all font-medium text-base md:text-lg"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Services</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Des prestations complètes pour l'entretien de votre véhicule
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }}>
                  <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="text-2xl font-bold text-red-600">{service.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="tarifs" className="py-16 md:py-20 bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Forfaits</h2>
            <p className="text-lg md:text-xl text-slate-600">Choisissez le forfait qui correspond à vos besoins</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }}>
                  <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                      <div className="text-3xl font-bold text-red-400">{pkg.price}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-slate-700">
                        <Star className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/login"
                    className="w-full block text-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Choisir ce forfait
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Conditions */}
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Conditions Particulières</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center text-slate-700">
                  <Clock className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  {condition}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à redonner vie à votre véhicule ?</h2>
          <p className="text-lg md:text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour réserver votre créneau de nettoyage professionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login"
              className="bg-white text-red-600 px-8 py-4 rounded-lg hover:bg-red-50 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
            >
              <span>Réserver en ligne</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-red-600 transition-colors font-medium text-lg"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

