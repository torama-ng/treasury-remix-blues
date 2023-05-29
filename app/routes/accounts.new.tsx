import AccountCreation from "~/components/Accounts/AccountCreation"
import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createNote } from "~/models/note.server";
import { requireUserId } from "~/services/session.server";
import { createAccount } from "~/models/Account.server";
import { AccountType } from "@prisma/client";



export const action = async ({ request }: ActionArgs) => {
    const userId = await requireUserId(request);

    const formData = await request.formData();
    const accoutData = Object.fromEntries(formData);
    console.log(accoutData, 'accountData')

    const name = formData.get("name");
    const accountType = formData.get("accountType") as AccountType;

    if (typeof name !== "string" || name.length === 0) {
        return json(
            { errors: { Name: null, title: "Name is required" } },
            { status: 400 }
        );
    }

    if (!Object.values(AccountType).includes(accountType)) {
        throw new Error(`Invalid account type: ${accountType}`);
    }


    const account = await createAccount({ name, accountType, userId });

    return redirect("/accounts");
};

export default function NewAccountPage() {
    // const actionData = useActionData<typeof action>();
    // const nameRef = useRef<HTMLInputElement>(null);
    // const typeRef = useRef<HTMLTextAreaElement>(null);

    return (
        <>
            <h1>Create Account</h1>
            <AccountCreation />
        </>
    )
}
