const PersonalDaten = ({ user }) => {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">Persönliche Daten</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Registriert am:</strong>
        {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </section>
  );
};

export default PersonalDaten;
