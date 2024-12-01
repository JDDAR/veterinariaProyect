const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  //Extraer token del encabezado Autorizado
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    //Continuar al siguiente middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Token no valido o expirado" });
  }
};
