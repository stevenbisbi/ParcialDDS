class Reservation {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.date = data.date;
    this.time = data.time;
    this.guests = data.guests;
    this.name = data.name;
    this.phone = data.phone;
    this.status = "confirmed"; // 'confirmed' o 'cancelled'
  }

  cancel() {
    this.status = "cancelled";
    return this;
  }
}

export default Reservation;
