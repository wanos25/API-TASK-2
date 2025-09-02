import jwt from "jsonwebtoken"

export const generateToken = (id: number) => {
    return jwt.sign({ id }, "secretkey", { expiresIn: "7d" })
}
