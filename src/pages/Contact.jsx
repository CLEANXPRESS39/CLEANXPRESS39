import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import carWashing from '../assets/car-washing.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    appointment_date: '',
    appointment_time: '',
    vehicle_type: '',
    service_type: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Déterminer le prix du service en fonction du service_type sélectionné
    let servicePrice = 0;
    switch (formData.service_type) {
      case "Traitement cuir": servicePrice = 25; break;
      case "Traitement à la vapeur": servicePrice = 30; break;
      case "Nettoyage des sièges": servicePrice = 35; break;
      case "Lustrage du véhicule": servicePrice = 120; break;
      case "Nettoyage intérieur": servicePrice = 30; break;
      case "Nettoyage extérieur": servicePrice = 45; break;
      case "Polissage phares": servicePrice = 45; break;
      default: servicePrice = 0; break;
    }

    const dataToSend = {
      ...formData,
      service_price: servicePrice,
      address: 'Adresse non spécifiée (via formulaire contact)' // Placeholder, à améliorer si l'adresse est collectée
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // Réinitialiser le formulaire après succès
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          appointment_date: '',
          appointment_time: '',
          vehicle_type: '',
          service_type: '',
          notes: ''
        });
      } else {
        alert(`Erreur: ${data.error || 'Quelque chose s\'est mal passé'}`);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    }
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et réserver votre créneau
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Parlons de votre véhicule</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Notre équipe est disponible pour vous conseiller et vous proposer le service le plus adapté à vos besoins.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Téléphone</h3>
                    <a 
                      href="tel:0683967427" 
                      className="text-red-600 hover:text-red-700 transition-colors text-lg font-medium"
                    >
                      06 83 96 74 27
                    </a>
                    <p className="text-slate-600 mt-1">Disponible 7j/7 de 8h à 20h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Email</h3>
                    <a 
                      href="mailto:cleanxpress39@gmail.com" 
                      className="text-red-600 hover:text-red-700 transition-colors text-lg font-medium"
                    >
                      cleanxpress39@gmail.com
                    </a>
                    <p className="text-slate-600 mt-1">Réponse sous 24h</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Zone d'intervention</h3>
                    <p className="text-slate-700 text-lg">Jura (39) et environs</p>
                    <p className="text-slate-600 mt-1">Service à domicile ou sur site</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-red-600 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Horaires</h3>
                    <div className="space-y-1 text-slate-700">
                      <p>Lundi - Vendredi : 8h - 19h</p>
                      <p>Samedi : 8h - 18h</p>
                      <p>Dimanche : 9h - 17h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Demande de devis gratuit</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                    placeholder="06 XX XX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="appointment_date" className="block text-sm font-medium text-slate-700 mb-2">
                    Date du rendez-vous *
                  </label>
                  <input
                    type="date"
                    id="appointment_date"
                    name="appointment_date"
                    required
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="appointment_time" className="block text-sm font-medium text-slate-700 mb-2">
                    Heure du rendez-vous *
                  </label>
                  <input
                    type="time"
                    id="appointment_time"
                    name="appointment_time"
                    required
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="vehicle_type" className="block text-sm font-medium text-slate-700 mb-2">
                    Type de véhicule *
                  </label>
                  <select
                    id="vehicle_type"
                    name="vehicle_type"
                    required
                    value={formData.vehicle_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  >
                    <option value="">Sélectionnez votre véhicule</option>
                    <option value="citadine">Citadine</option>
                    <option value="berline">Berline</option>
                    <option value="suv">SUV</option>
                    <option value="break">Break</option>
                    <option value="utilitaire">Utilitaire</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-slate-700 mb-2">
                    Service souhaité *
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                  >
                    <option value="">Choisissez un service</option>
                    <option value="Traitement cuir">Traitement cuir (25€)</option>
                    <option value="Traitement à la vapeur">Traitement à la vapeur (30€)</option>
                    <option value="Nettoyage des sièges">Nettoyage des sièges (35€)</option>
                    <option value="Lustrage du véhicule">Lustrage du véhicule (120€)</option>
                    <option value="Nettoyage intérieur">Nettoyage intérieur (30€)</option>
                    <option value="Nettoyage extérieur">Nettoyage extérieur (45€)</option>
                    <option value="Polissage phares">Polissage phares (45€)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
                    Notes / Détails supplémentaires
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                    placeholder="Décrivez vos besoins ou posez vos questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Envoyer ma demande de rendez-vous</span>
                </button>
              </form>

              <p className="text-sm text-slate-500 mt-4 text-center">
                * Champs obligatoires. Nous vous contacterons pour confirmer votre rendez-vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-slate-600">Trouvez rapidement les réponses à vos questions</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Combien de temps dure un nettoyage complet ?</h3>
              <p className="text-slate-600">Un nettoyage complet (intérieur + extérieur) prend généralement entre 2h et 3h selon l'état du véhicule.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Vous déplacez-vous à domicile ?</h3>
              <p className="text-slate-600">Oui, nous nous déplaçons dans tout le Jura (39) et les environs. Le service à domicile est inclus dans nos tarifs.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Quels moyens de paiement acceptez-vous ?</h3>
              <p className="text-slate-600">Nous acceptons les espèces, les chèques, les virements bancaires et les paiements par carte bancaire.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Proposez-vous une garantie sur vos services ?</h3>
              <p className="text-slate-600">Oui, nous garantissons la qualité de nos prestations. Si vous n'êtes pas satisfait, nous repassons gratuitement dans les 48h.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

