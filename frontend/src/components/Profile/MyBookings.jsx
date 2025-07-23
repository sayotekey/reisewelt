import { useAuth } from "../../context/useAuth";

const MyBookings = () => {
  const { user } = useAuth();

  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Buchungen</h2>
      {!user ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : !user.bookings || user.bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Buchungen</h3>
            <p className="text-gray-500 text-sm">
              Sie haben noch keine Hotelbuchungen getätigt. Starten Sie Ihre nächste Reise!
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2">
          {user.bookings.map((booking) => (
            <li key={booking._id} className="flex justify-between items-center">
              <p>
                <strong>Reise:</strong>
                {booking.hotelId?.title || "Unbekannt"}
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
