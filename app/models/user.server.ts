import type { Password, User } from "@prisma/client";
import { createUserSession } from "~/services/session.server";
import { validateEmail } from "~/utils/utils";
import bcrypt from "bcryptjs";
import { json } from "@remix-run/node";
import { prisma } from "~/services/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      authType: "email",
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function createFireUser({
  email,
  firebaseUID,
  displayName,
  photoURL,
}: any) {
  // export async function createFireUser(email: User["email"], password: string) {
  // const hashedPassword = await bcrypt.hash(password, 10);
  //  get user details from token and store
  // const firebaseUID = "";
  // const displayName = "";
  // const photoURL = "";
  const authType = "social";

  return prisma.user.create({
    data: {
      email,
      firebaseUID,
      displayName,
      photoURL,
      authType,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function loginUserByEmail(props: {
  email: User["email"];
  password: Password["hash"];
  request: Request;
  redirectTo?: string;
  remember?: boolean;
}) {
  const { email, password, request, redirectTo = "/" } = props;

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Email or password is invalid", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
}

export async function signUpUserByEmail(props: {
  email: User["email"];
  password: Password["hash"];
  request: Request;
  redirectTo?: string;
  remember?: boolean;
}) {
  const { email, password, request, redirectTo = "/" } = props;
  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email:
            "A user with that email exists. Login with your  email and password",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  // new  user
  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
}
