import React from 'react';
import { ExternalLink, Users, Heart, Share2, Camera, Play } from 'lucide-react';
import carDetailing1 from '../assets/car-detailing-1.jpg';
import carDetailing2 from '../assets/car-detailing-2.jpg';
import carDetailing3 from '../assets/car-detailing-3.jpg';

const Social = () => {
  const socialPlatforms = [
    {
      name: "Instagram",
      handle: "@cleanxpress39",
      url: "https://www.instagram.com/cleanxpress39?igsh=eWp2cmdvOHpkM2Zr",
      description: "Suivez nos réalisations quotidiennes et découvrez nos avant/après spectaculaires",
      color: "from-purple-600 to-pink-600",
      icon: "I",
      followers: "500+",
      content: "Photos & Stories",
      image: carDetailing1
    },
    {
      name: "Snapchat",
      handle: "cleanxpress39",
      url: "https://t.snapchat.com/1PmAk97Y",
      description: "Découvrez nos coulisses et nos techniques de nettoyage en temps réel",
      color: "from-yellow-400 to-yellow-600",
      icon: "S",
      followers: "200+",
      content: "Stories exclusives",
      image: carDetailing2
    },
    {
      name: "TikTok",
      handle: "@cleanxpress_39",
      url: "https://www.tiktok.com/@cleanxpress_39?_t=ZN-8zJPL9b7Hs6&_r=1",
      description: "Vidéos satisfaisantes de nettoyage et astuces pour l'entretien de votre véhicule",
      color: "from-black to-gray-800",
      icon: "T",
      followers: "1K+",
      content: "Vidéos courtes",
      image: carDetailing3
    }
  ];

  const benefits = [
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Avant/Après exclusifs",
      description: "Découvrez nos transformations les plus impressionnantes"
    },
    {
      icon: <Play className="w-6 h-6" />,
      title: "Techniques professionnelles",
      description: "Apprenez nos secrets de nettoyage automobile"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Communauté passionnée",
      description: "Rejoignez une communauté qui aime les belles voitures"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Conseils gratuits",
      description: "Recevez nos meilleurs conseils d'entretien"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Suivez-nous</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Rejoignez notre communauté sur les réseaux sociaux et ne manquez aucune de nos réalisations
            </p>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Réseaux Sociaux</h2>
            <p className="text-lg text-slate-600">Choisissez votre plateforme préférée pour nous suivre</p>
          </div>

          <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden shadow-lg group">
                    <img 
                      src={platform.image} 
                      alt={platform.name}
                      className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${platform.color} opacity-80`}>
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-slate-900">{platform.icon}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-2xl font-bold">{platform.followers}</div>
                        <div className="text-sm opacity-90">Abonnés</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">{platform.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{platform.name}</h3>
                      <p className="text-slate-600">{platform.handle}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-slate-600">{platform.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{platform.followers} abonnés</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4" />
                      <span>{platform.content}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r ${platform.color} text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-medium`}
                  >
                    <span>Suivre sur {platform.name}</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi nous suivre ?</h2>
            <p className="text-lg text-slate-600">Découvrez tous les avantages de notre communauté</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-red-600 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Rejoignez notre communauté</h2>
          <p className="text-lg md:text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Plus de 1000 personnes nous font déjà confiance. Rejoignez-les et découvrez nos secrets de nettoyage !
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center space-x-2"
              >
                <span className="font-bold">{platform.icon}</span>
                <span>{platform.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Une question ? Un projet ?</h2>
          <p className="text-lg text-slate-600 mb-6">
            N'hésitez pas à nous contacter directement pour discuter de vos besoins
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0683967427"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Appeler maintenant
            </a>
            <a 
              href="mailto:cleanxpress39@gmail.com"
              className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-600 hover:text-white transition-colors font-medium"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Social;

