const MyBookings = () => {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Buchungen</h2>
      {!user.bookings ? (
        <p>Loading...</p>
      ) : user.bookings.length === 0 ? (
        <p>Keine Buchungen </p>
      ) : (
        <ul className="space-y-2">
          {user.bookings.map((booking) => (
            <li key={booking._id} className="flex justify-between items-center">
              <p>
                <strong>Reise:</strong>
                {booking.tripId?.title || "Unbekannt"}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <p>
                <strong>Gebucht am:</strong>
                {new Date(booking.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MyBookings;
