import UserRepository from "../../repositories/user/user.repositories.ts";
import ApiError from "../../utils/apiError.ts";
import { hashPassword, comparePassword } from "../../utils/bcrypt.ts";
import { generateTokens } from "../../utils/jwt.ts";
import { type Register } from "./auth.types.ts";

class AuthService {
  static async register(data: Register) {
    const { firstname, middlename, lastname, email, country, state, password } =
      data;

    const user = await UserRepository.findUserByEmail(email);

    if (user) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await hashPassword(password);

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

    const { password: _password, ...safeUser } = newUser;

    const { accessToken, refreshToken } = generateTokens({
      userId: newUser.id,
      role: newUser.role,
    });

    return {
      safeUser,
      accessToken,
      refreshToken,
    };
  }

  static async login(data: { email: string; password: string }) {
    const { email, password } = data;
    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(400, "Invalid user credentials");
    }

    const isPasswordMatch = comparePassword(user.password, password);

    if (!isPasswordMatch) {
      throw new ApiError(400, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: user.id,
      role: user.role,
    });

    const { password: _password, ...safeUser } = user;

    return {
      safeUser,
      accessToken,
      refreshToken,
    };
  }
}

export default AuthService;
