import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import AuthForm from "~/components/auth/AuthForm";
// import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
// import { Sign } from "crypto";
// import { useEffect, useRef } from "react";

import { createFireUser, createUser, getUserByEmail, loginUserByEmail, signUpUserByEmail, verifyLogin } from "~/models/user.server";
// import LoginPage from "~/pages/LoginPage";
// import SignUpPage from "~/pages/SignupPage";
import { HttpError } from "~/utils/utils";
import { createUserSession, getUserId } from "~/services/session.server";
import { safeRedirect, validateEmail } from "~/utils/utils";

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await getUserId(request);

    if (userId) return redirect("/");
    return json({});
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
    const searchParams = new URL(request.url).searchParams;
    const authType = searchParams.get("type");
    const authMode = searchParams.get("mode");
    const remember = formData.get("remember") === "on" ? true : false;
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    // google login and signup
    if (authType && authType === 'google') {
        const user = JSON.parse(formData.get("user") as string)
        let email = user.email;
        let firebaseUID = user.uid;
        let displayName = user.displayName;
        let photoURL = user.photoURL;

        if (!validateEmail(email)) {
            return json(
                { errors: { email: "Email is invalid", password: null } },
                { status: 400 }
            );
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser && !existingUser.firebaseUID) {
            return json(
                {
                    errors: {
                        email: "A user with that email exists. Login with your  email and password",
                        password: null,
                    },
                },
                { status: 400 }
            );
        }

        if (existingUser && existingUser.firebaseUID) {
            return createUserSession({
                redirectTo,
                remember: false,
                request,
                userId: existingUser.id,

            });
        }

        // new firebase user
        const userNew = await createFireUser({ email, firebaseUID, displayName, photoURL });

        return createUserSession({
            redirectTo,
            remember: false,
            request,
            userId: userNew.id,
        });

    }

    // email/password login
    if ((authType && authType === 'email') && authMode === 'login') {

        const user = await getUserByEmail(email);
        if (user && user.firebaseUID) {
            return json(
                {
                    errors: {
                        email: "A social user with that email exists. Login with your google account",
                        password: null,
                    },
                },
                { status: 400 }
            );


        }

        return loginUserByEmail({ email, password, request, remember, redirectTo })

    }

    // email/password signup
    if ((authType && authType === 'email') && authMode === 'signup') {

        return signUpUserByEmail({ email, password, request, redirectTo, remember })
    }

    const error = new HttpError(
        "Could not log you in, please check the provided credentials.",
        401
    );
    return error;

};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function AuthJoin() {
    const actionData = useActionData<typeof action>();
    const [searchParams] = useSearchParams()
    // const authType = searchParams.get("type");
    const authMode = searchParams.get("mode")

    return (
        <div className="container mx-auto">
            <AuthForm />
            {/* {authMode && authMode === 'signup' ? <SignUpPage /> : <div className="text-center text-2xl"><LoginPage /> </div>} */}

        </div>

    );
}
