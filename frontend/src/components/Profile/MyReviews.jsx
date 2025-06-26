import AddReviewForm from "../AddReviewForm";

const MyReviews = ({ user, loadUser }) => {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Bewertungen</h2>
      {/*Bewertugsliste*/}
      <div>
        {!user.reviews ? (
          <p>Loading...</p>
        ) : user.reviews.length === 0 ? (
          <p>Noch keine Bewertungen abgegeben.</p>
        ) : (
          <ul className="space-y-2">
            {user.reviews.map((review) => (
              <li key={review._id} className="border p-4">
                <p>
                  <strong>Reise:</strong>
                  {review.hotelId?.title || "Unbekannt"}
                </p>
                <p>
                  <strong>Bewertung:</strong> {review.rating} ⭐
                </p>
                <p>
                  <strong>Kommentar:</strong> {review.comment}
                </p>
                <p>
                  <strong>Abgegeben am:</strong>
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bewertungen hinzufügen */}
      <div className="space-y-2">
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
    </section>
  );
};

export default MyReviews;
