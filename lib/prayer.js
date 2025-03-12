export const generateMockPrayers = () => {
  const PRAYER_NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const PRAYER_STATUSES = ["Offer", "Missed"];

  const mockPrayers = [];
  for (let i = 0; i < 10; i++) {
    const prayerStatus = PRAYER_NAMES.map((prayerName) => ({
      prayerName,
      status:
        PRAYER_STATUSES[Math.floor(Math.random() * PRAYER_STATUSES.length)],
    }));

    mockPrayers.push({
      prayerStatus,
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Subtract 'i' days from today
    });
  }

  return mockPrayers;
};
