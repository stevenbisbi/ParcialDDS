const TimeSlotPicker = ({ value, onChange }) => {
  const timeSlots = [];

  // Generar slots cada 30 minutos desde las 11:00 hasta las 22:30
  for (let hour = 11; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 22 && minute > 0) break;
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeSlots.push(time);
    }
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="time-slot-picker"
    >
      {timeSlots.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default TimeSlotPicker;
