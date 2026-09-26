import { prisma } from "../../config/prisma.ts";

interface CreateUserData {
  firstname: string;
  middlename?: string | undefined;
  lastname: string;
  email: string;
  country: string;
  state: string;
  password: string;
}

class UserRepository {
  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async createUser(data: CreateUserData) {
    return await prisma.user.create({
      data: {
        firstname: data.firstname,
        middlename: data.middlename || '',
        lastname: data.lastname,
        email: data.email,
        country: data.country,
        state: data.state,
        password: data.password,
      },
      
    });
  }

  static async findUserById(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstname: true,
      middlename: true,
      lastname: true,
      image:true,
      email: true,
      country: true,
      state: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
}

export default UserRepository;