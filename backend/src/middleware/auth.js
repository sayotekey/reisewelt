import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //   console.log("Authentifizierungs-Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Kein Token vorhanden" });
  }

  // Extrahiere den Token aus dem Header
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token verifizieren
    req.user = { id: decoded.id }; // Benutzer-ID aus dem Token extrahieren
    next(); // Leite die Anfrage an den Controller weiter
  } catch (error) {
    console.error("Ungültiger Token:", error);
    res.status(401).json({ message: "Ungültiger Token" });
  }
};

export default auth;
