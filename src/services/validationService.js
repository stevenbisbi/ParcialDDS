const validationService = {
  validateBusinessHours(time) {
    const hour = parseInt(time.split(":")[0]);
    if (hour < 11 || hour >= 23) {
      throw new Error("El restaurante está cerrado a esta hora");
    }
  },

  validateCapacity(guests) {
    if (guests > 8) {
      throw new Error(
        "Para grupos mayores a 8 personas, por favor llame al restaurante"
      );
    }
  },
};

export default validationService;
