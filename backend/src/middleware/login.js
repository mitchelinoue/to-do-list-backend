import jwt from 'jsonwebtoken';

export async function loginVerify(req, res, next) {
  try {
    const segredo = "segredoJWT";
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, segredo);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send({ "message": "Authentication failed" })
  }

}