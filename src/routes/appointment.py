from flask import Blueprint, request, jsonify, session
from datetime import datetime
from src.models.user import db, User
from src.models.appointment import Appointment

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/appointments', methods=['POST'])
def create_appointment():
    """Créer un nouveau rendez-vous"""
    try:
        data = request.get_json()
        
        # Vérifier si l'utilisateur est connecté
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        # Validation des données requises
        required_fields = ['service_type', 'service_price', 'appointment_date', 
                          'appointment_time', 'vehicle_type', 'address']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Le champ {field} est requis'}), 400
        
        # Récupérer les informations de l'utilisateur connecté
        user = User.query.get(session['user_id'])
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
        
        # Créer le rendez-vous
        appointment = Appointment(
            user_id=session['user_id'],
            service_type=data['service_type'],
            service_price=float(data['service_price']),
            appointment_date=datetime.fromisoformat(data['appointment_date']),
            appointment_time=data['appointment_time'],
            vehicle_type=data['vehicle_type'],
            vehicle_brand=data.get('vehicle_brand', ''),
            vehicle_model=data.get('vehicle_model', ''),
            address=data['address'],
            phone=user.phone,  # Utiliser le téléphone de l'utilisateur connecté
            notes=data.get('notes', ''),
            status='pending'
        )
        
        db.session.add(appointment)
        db.session.commit()
        
        return jsonify({
            'message': 'Rendez-vous créé avec succès',
            'appointment': appointment.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/appointments', methods=['GET'])
def get_appointments():
    """Récupérer tous les rendez-vous (admin seulement)"""
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        user = User.query.get(session['user_id'])
        if not user or not user.is_admin:
            return jsonify({'error': 'Accès non autorisé'}), 403
        
        appointments = Appointment.query.order_by(Appointment.appointment_date.desc()).all()
        
        return jsonify({
            'appointments': [appointment.to_dict() for appointment in appointments]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/appointments/user', methods=['GET'])
def get_user_appointments():
    """Récupérer les rendez-vous de l'utilisateur connecté"""
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        appointments = Appointment.query.filter_by(user_id=session['user_id']).order_by(Appointment.appointment_date.desc()).all()
        
        return jsonify({
            'appointments': [appointment.to_dict() for appointment in appointments]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/appointments/<int:appointment_id>', methods=['PUT'])
def update_appointment_status():
    """Mettre à jour le statut d'un rendez-vous (admin seulement)"""
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        user = User.query.get(session['user_id'])
        if not user or not user.is_admin:
            return jsonify({'error': 'Accès non autorisé'}), 403
        
        data = request.get_json()
        appointment = Appointment.query.get(appointment_id)
        
        if not appointment:
            return jsonify({'error': 'Rendez-vous non trouvé'}), 404
        
        if 'status' in data:
            appointment.status = data['status']
            appointment.updated_at = datetime.utcnow()
            db.session.commit()
        
        return jsonify({
            'message': 'Rendez-vous mis à jour avec succès',
            'appointment': appointment.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/appointments/<int:appointment_id>', methods=['DELETE'])
def delete_appointment():
    """Supprimer un rendez-vous"""
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        user = User.query.get(session['user_id'])
        appointment = Appointment.query.get(appointment_id)
        
        if not appointment:
            return jsonify({'error': 'Rendez-vous non trouvé'}), 404
        
        # Vérifier que l'utilisateur peut supprimer ce rendez-vous
        if appointment.user_id != session['user_id'] and not user.is_admin:
            return jsonify({'error': 'Accès non autorisé'}), 403
        
        db.session.delete(appointment)
        db.session.commit()
        
        return jsonify({'message': 'Rendez-vous supprimé avec succès'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/admin/stats', methods=['GET'])
def get_admin_stats():
    """Récupérer les statistiques pour l'admin"""
    try:
        if 'user_id' not in session:
            return jsonify({'error': 'Utilisateur non connecté'}), 401
        
        user = User.query.get(session['user_id'])
        if not user or not user.is_admin:
            return jsonify({'error': 'Accès non autorisé'}), 403
        
        total_appointments = Appointment.query.count()
        pending_appointments = Appointment.query.filter_by(status='pending').count()
        confirmed_appointments = Appointment.query.filter_by(status='confirmed').count()
        completed_appointments = Appointment.query.filter_by(status='completed').count()
        total_users = User.query.count()
        
        # Revenus du mois en cours
        current_month = datetime.now().month
        current_year = datetime.now().year
        monthly_revenue = db.session.query(db.func.sum(Appointment.service_price)).filter(
            db.extract('month', Appointment.appointment_date) == current_month,
            db.extract('year', Appointment.appointment_date) == current_year,
            Appointment.status == 'completed'
        ).scalar() or 0
        
        return jsonify({
            'total_appointments': total_appointments,
            'pending_appointments': pending_appointments,
            'confirmed_appointments': confirmed_appointments,
            'completed_appointments': completed_appointments,
            'total_users': total_users,
            'monthly_revenue': float(monthly_revenue)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

