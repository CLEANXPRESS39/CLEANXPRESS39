import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import logoImage from '../assets/clean_xpress_logo_v2.png';

const Footer = () => {
  const socialLinks = [
    {
      name: "Snapchat",
      handle: "cleanxpress39",
      url: "https://t.snapchat.com/1PmAk97Y",
      color: "bg-yellow-500 hover:bg-yellow-600",
      icon: "S"
    },
    {
      name: "Instagram",
      handle: "cleanxpress39",
      url: "https://www.instagram.com/cleanxpress39?igsh=eWp2cmdvOHpkM2Zr",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      icon: "I"
    },
    {
      name: "TikTok",
      handle: "@cleanxpress_39",
      url: "https://www.tiktok.com/@cleanxpress_39?_t=ZN-8zJPL9b7Hs6&_r=1",
      color: "bg-black hover:bg-gray-800",
      icon: "T"
    }
  ];

  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Réseaux Sociaux", href: "/social" }
  ];

  const services = [
    "Nettoyage Intérieur",
    "Nettoyage Extérieur",
    "Lustrage Véhicule",
    "Traitement Cuir",
    "Polissage Phares"
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img src={logoImage} alt="Clean Xpress Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Service de nettoyage automobile professionnel dans le Jura. 
              Redonnez à votre véhicule tout son éclat avec notre expertise.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a 
                  href="tel:0683967427" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  06 83 96 74 27
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a 
                  href="mailto:cleanxpress39@gmail.com" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  cleanxpress39@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-slate-300">Jura (39) et environs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/login"
                  className="text-red-400 hover:text-red-300 transition-colors font-medium"
                >
                  Espace Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Nos Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-slate-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6">Suivez-nous</h3>
            <div className="space-y-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className={`w-8 h-8 ${social.color} rounded-lg flex items-center justify-center transition-colors`}>
                    <span className="text-white font-bold text-sm">{social.icon}</span>
                  </div>
                  <span className="group-hover:text-white">{social.handle}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            
            <div className="bg-slate-800 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Horaires d'ouverture</h4>
              <div className="text-sm text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span>Lun - Ven</span>
                  <span>8h - 19h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>9h - 17h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              &copy; 2024 Clean Xpress. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

