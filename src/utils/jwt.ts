import jwt from "jsonwebtoken";

const secret = "supersecret";

export const generateToken = (id: number) => {
  return jwt.sign({ id }, secret, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
