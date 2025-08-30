import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Car, Sparkles, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import carDetailing1 from '../assets/car-detailing-1.jpg';
import carDetailing2 from '../assets/car-detailing-2.jpg';
import carDetailing3 from '../assets/car-detailing-3.jpg';
import carWashing from '../assets/car-washing.jpg';

const Services = () => {
  const services = [
    {
      title: "Traitement Cuir",
      price: "25€",
      description: "Nettoyage et protection du cuir avec des produits spécialisés",
      details: [
        "Nettoyage en profondeur des sièges en cuir",
        "Application de produits de protection",
        "Hydratation du cuir",
        "Finition brillante et douce"
      ],
      icon: <Shield className="w-8 h-8" />,
      image: carDetailing2,
      duration: "30 min"
    },
    {
      title: "Traitement à la Vapeur",
      price: "30€",
      description: "Nettoyage écologique et en profondeur à la vapeur haute température",
      details: [
        "Désinfection complète sans produits chimiques",
        "Élimination des bactéries et allergènes",
        "Nettoyage des tissus et plastiques",
        "Séchage rapide"
      ],
      icon: <Sparkles className="w-8 h-8" />,
      image: carWashing,
      duration: "45 min"
    },
    {
      title: "Nettoyage des Sièges",
      price: "35€",
      description: "Nettoyage complet et détaillé de tous les sièges",
      details: [
        "Aspiration approfondie",
        "Traitement des taches tenaces",
        "Nettoyage des coutures et recoins",
        "Désodorisation"
      ],
      icon: <Car className="w-8 h-8" />,
      image: carDetailing3,
      duration: "40 min"
    },
    {
      title: "Lustrage du Véhicule",
      price: "120€",
      description: "Lustrage professionnel complet pour une carrosserie éclatante",
      details: [
        "Préparation de la surface",
        "Application de cire haute qualité",
        "Polissage manuel et machine",
        "Protection longue durée"
      ],
      icon: <Star className="w-8 h-8" />,
      image: carDetailing1,
      duration: "2h"
    }
  ];

  const packages = [
    {
      title: "Pack Intérieur Complet",
      price: "80€",
      originalPrice: "90€",
      description: "Nettoyage complet de l'habitacle",
      services: ["Nettoyage sièges", "Traitement cuir", "Aspiration complète", "Désodorisation"],
      image: carDetailing3,
      popular: false
    },
    {
      title: "Pack Extérieur Premium",
      price: "150€",
      originalPrice: "170€",
      description: "Remise à neuf de l'extérieur",
      services: ["Lavage carrosserie", "Lustrage complet", "Nettoyage jantes", "Protection peinture"],
      image: carDetailing1,
      popular: true
    },
    {
      title: "Pack Complet VIP",
      price: "200€",
      originalPrice: "250€",
      description: "Service premium intérieur + extérieur",
      services: ["Tous les services intérieur", "Tous les services extérieur", "Traitement vapeur", "Garantie 30 jours"],
      image: carWashing,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${carDetailing1})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Nos Services</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services de nettoyage automobile professionnel
            </p>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Services Individuels</h2>
            <p className="text-lg text-slate-600">Chaque service est réalisé avec soin et expertise</p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {service.duration}
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-red-600">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{service.title}</h3>
                      <div className="text-3xl font-bold text-red-600">{service.price}</div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-600">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/login"
                    className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <span>Réserver ce service</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Forfaits Avantageux</h2>
            <p className="text-lg text-slate-600">Économisez avec nos packs combinés</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 overflow-hidden ${pkg.popular ? 'ring-2 ring-red-600' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-b-lg text-sm font-medium">
                    Le plus populaire
                  </div>
                )}
                
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${pkg.image})` }}>
                  <div className="h-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-3xl font-bold text-red-600">{pkg.price}</span>
                      <span className="text-lg text-slate-500 line-through">{pkg.originalPrice}</span>
                    </div>
                    <p className="text-slate-600">{pkg.description}</p>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {pkg.services.map((service, idx) => (
                      <li key={idx} className="flex items-center text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to="/login"
                    className={`w-full block text-center py-3 rounded-lg transition-colors font-medium ${
                      pkg.popular 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Choisir ce forfait
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Conditions Particulières</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center text-slate-700">
                <Clock className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                Poils d'animaux +20€
              </div>
              <div className="flex items-center text-slate-700">
                <Clock className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                Véhicule très sale +20€
              </div>
              <div className="flex items-center text-slate-700">
                <Clock className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                Dégourdonnage +20€
              </div>
              <div className="flex items-center text-slate-700">
                <Clock className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                Nettoyage utilitaire +60€
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

