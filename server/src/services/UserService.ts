import { hash } from "bcryptjs";
import { User } from "../models/User";
import { validateEmail } from "../utils/validateEmail";
import { db } from "../database/db";
import { CustomError } from "../utils/customError";

type UserRequest = {
  name: string;
  email: string;
  password: string;
};

class UserService {
  async store({
    name,
    email,
    password
  }: UserRequest): Promise<User | CustomError> {
    try {
      if ([name, email, password].some((i) => i == undefined || i == null)) {
        return new CustomError(400, "Missing data");
      }

      const existUser = await db("users").where("email", "=", email).first();

      if (existUser) {
        return new CustomError(409, "User already exists");
      }

      if (!validateEmail(email)) {
        return new CustomError(400, "Email is not valid");
      }

      if (name.length <= 3) {
        return new CustomError(
          400,
          "Name field must have more than 3 caracteres"
        );
      }

      if (password.length <= 3) {
        return new CustomError(
          400,
          "Password field must have more than 3 caracteres"
        );
      }

      const passwordHash = await hash(password, 8);

      const userRole = await db("roles").where("name", "=", "user").first();

      const newUser = new User(name, email, passwordHash, userRole.id);

      await db("users").insert(newUser);

      return newUser;
    } catch (error) {
      console.error(error);
      return new CustomError(500, "Error trying to register user");
    }
  }
}

export default new UserService();
