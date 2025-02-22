import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({error: 'Acceso denegado. No hay token'})
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
    req.user = decoded
    next() // Continuar con la petición
  } catch (error) {
    return res.status(401).json({error: 'Token inválido o expirado'})
  }
}
