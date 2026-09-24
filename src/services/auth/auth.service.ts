import { prisma } from "../../config/prisma.ts";
import UserRepository from "../../repositories/user/user.repositories.ts";
import ApiError from "../../utils/apiError.ts";
import { hashPassword } from "../../utils/bcrypt.ts";
import { type Register } from "./auth.types.ts";

class AuthService {
  static async register(data: Register) {
    const { firstname, middlename, lastname, email, country, state, password } =
      data;

    const user = await UserRepository.findUserByEmail(email);

    if (user) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword =  await hashPassword(password);

    // Create user
    const newUser = await UserRepository.createUser({
      firstname,
      middlename,
      lastname,
      email,
      country,
      state,
      password: hashedPassword,
    });

    //also have to attach the token as well

    const { password:_password, ...safeUser } = newUser;
    return safeUser;
  }
}

export default AuthService;
