import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, User, Phone, Mail, MapPin, Plus, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import carWashing from '../assets/car-washing.jpg';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    vehicle_type: '',
    service_type: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    } else if (user && user.is_admin) {
      navigate('/admin');
    } else if (user) {
      fetchUserAppointments();
    }
  }, [user, loading, navigate]);

  const fetchUserAppointments = async () => {
    try {
      const response = await fetch('/api/appointments/user', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Déterminer le prix du service
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
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      email: user.email,
      ...formData,
      service_price: servicePrice
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
        setShowBookingForm(false);
        setFormData({
          appointment_date: '',
          appointment_time: '',
          vehicle_type: '',
          service_type: '',
          address: '',
          notes: ''
        });
        fetchUserAppointments(); // Rafraîchir la liste des rendez-vous
      } else {
        alert(`Erreur: ${data.error || 'Quelque chose s\'est mal passé'}`);
      }
    } catch (error) {
      console.error('Erreur réseau ou serveur:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchUserAppointments(); // Rafraîchir la liste
      } else {
        alert(`Erreur: ${data.error || 'Impossible d\'annuler le rendez-vous'}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmé';
      case 'pending': return 'En attente';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // La redirection sera gérée par useEffect
  }

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Bonjour {user.first_name} !</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Gérez vos rendez-vous et réservez vos services de nettoyage automobile
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 p-3 rounded-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Nouveau rendez-vous</h3>
                    <p className="text-slate-600">Réservez votre prochain service</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full mt-4 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Réserver maintenant
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Mes rendez-vous</h3>
                    <p className="text-slate-600">{appointments.length} rendez-vous au total</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 p-3 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Mon profil</h3>
                    <p className="text-slate-600">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Nouveau rendez-vous</h2>
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
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
                        <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-2">
                          Adresse du service *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                          placeholder="Adresse complète où effectuer le service"
                        />
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
                          Notes / Détails supplémentaires
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors"
                          placeholder="Informations complémentaires..."
                        ></textarea>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setShowBookingForm(false)}
                          className="flex-1 border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Réserver
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Mes rendez-vous</h2>
              
              {appointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-slate-600 mb-2">Aucun rendez-vous</h3>
                  <p className="text-slate-500 mb-6">Vous n'avez pas encore de rendez-vous programmé.</p>
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Réserver maintenant
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="bg-red-100 p-2 rounded-lg">
                              <Car className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">{appointment.service_type}</h3>
                              <p className="text-slate-600">{appointment.vehicle_type}</p>
                            </div>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(appointment.appointment_date).toLocaleDateString('fr-FR')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{appointment.appointment_time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{appointment.service_price}€</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                            <button
                              onClick={() => deleteAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Annuler le rendez-vous"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

