import AddReviewForm from "../AddReviewForm";

const MyReviews = ({ user, loadUser }) => {
  return (
    <section className="space-y-6">
      {/* Bewertungen hinzufügen */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Bewertung hinzufügen</h2>
        {/* Formular für Backend*/}
        {/*
        {Array.isArray(user.bookings) &&
          user.bookings.map(
            (booking) =>
              booking.hotelId && (
                <AddReviewForm
                  key={booking._id}
                  hotelId={booking.hotelId._id}
                  onReviewAdded={loadUser} // Aktualisiere die Benutzerdaten nach dem Hinzufügen einer Bewertung
                />
              )
          ) }
              */}
        <AddReviewForm hotelId="dummy-hotel-id" onReviewAdded={() => {}} />
      </div>

      {/*Bewertugsliste*/}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Ihre Bewertungen</h2>
        {!user ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : !user.reviews || user.reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-sm mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Bewertungen</h3>
              <p className="text-gray-500 text-sm">
                Sie haben noch keine Hotelbewertungen abgegeben. Teilen Sie Ihre Erfahrungen mit anderen Reisenden!
              </p>
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {user.reviews.map((review) => (
              <li
                key={review._id}
                className="border p-4 rounded-md shadow-2xl review-list"
              >
                <p>
                  <strong>Reise:</strong>
                  {review.hotelId?.title || " — "}
                </p>
                <p>
                  <strong>Bewertung:</strong> {"⭐".repeat(review.rating)}
                </p>
                <p>
                  <strong>Kommentar:</strong> {review.text}
                </p>
                <p>
                  <strong>Abgegeben am:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MyReviews;
