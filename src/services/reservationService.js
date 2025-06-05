const STORAGE_KEY = "restaurant_reservations_v4";

class ReservationService {
  constructor() {
    // Inicialización del servicio
  }

  // Obtener todas las reservas
  async getAllReservations() {
    const reservations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return reservations.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  }

  // Guardar todas las reservas
  async saveAllReservations(reservations) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    return reservations;
  }

  // Crear nueva reserva
  async createReservation(reservationData) {
    const reservations = await this.getAllReservations();
    const newReservation = {
      ...reservationData,
      id: Date.now().toString(),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    const updatedReservations = [...reservations, newReservation];
    await this.saveAllReservations(updatedReservations);
    return newReservation;
  }

  // Cancelar reserva
  async cancelReservation(reservationId) {
    const reservations = await this.getAllReservations();
    const index = reservations.findIndex((r) => r.id === reservationId);

    if (index === -1) {
      throw new Error("Reserva no encontrada");
    }

    const cancelledReservation = {
      ...reservations[index],
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
    };

    const updatedReservations = [...reservations];
    updatedReservations[index] = cancelledReservation;

    await this.saveAllReservations(updatedReservations);
    return cancelledReservation;
  }

  // Obtener reservas activas
  async getActiveReservations() {
    const reservations = await this.getAllReservations();
    return reservations.filter((r) => r.status === "confirmed");
  }

  // Verificar disponibilidad
  async checkAvailability(date, time) {
    const reservations = await this.getAllReservations();
    const conflicting = reservations.filter(
      (r) => r.date === date && r.time === time && r.status === "confirmed"
    );
    return conflicting.length < 10; // Máximo 10 mesas
  }
}

export default new ReservationService();
