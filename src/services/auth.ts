"use server";

import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

type CreateUserParams = {
  email: string;
  username: string;
  password: string;
};
export async function CreateUser({ ...params }: CreateUserParams) {
  try {
    await prisma.user.create({
      data: {
        username: params.username,
        password: await bcrypt.hash(params.password, 10),
        email: params.email,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create User.");
  }
}
