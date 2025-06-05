const STORAGE_KEY = "restaurant_reservations_v2";

export default {
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  },

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
