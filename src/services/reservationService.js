const STORAGE_KEY = "restaurant_reservations";

const reservationService = {
  async getAllReservations() {
    const reservations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return reservations.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  },

  async cancelReservation(reservationId) {
    const reservations = await this.getAllReservations();
    const index = reservations.findIndex((r) => r.id === reservationId);

    if (index === -1) {
      throw new Error("Reserva no encontrada");
    }

    const updatedReservation = {
      ...reservations[index],
      status: "cancelled",
      cancelledAt: new Date().toISOString(),
    };

    const updatedReservations = [...reservations];
    updatedReservations[index] = updatedReservation;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));
    return updatedReservation;
  },

  async getActiveReservations() {
    const reservations = await this.getAllReservations();
    return reservations.filter((r) => r.status === "confirmed");
  },
};

export default reservationService;
