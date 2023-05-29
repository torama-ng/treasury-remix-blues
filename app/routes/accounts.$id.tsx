import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    Form,
    isRouteErrorResponse,
    useLoaderData,
    useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { deleteAccount, getAccount } from "~/models/Account.server";

import { requireUserId } from "~/services/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    const userId = await requireUserId(request);
    if (!userId) throw new Response("user Not logged in", { status: 404 });

    invariant(params.id, "Account id not found");

    const account = await getAccount({ id: parseInt(params.id), userId });
    if (!account) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ account });
};

export const action = async ({ params, request }: ActionArgs) => {
    const userId = await requireUserId(request);
    if (!userId) throw new Response("user Not logged in", { status: 404 });
    invariant(params.id, "Account ID not found");
    const id = +params.id;

    await deleteAccount(id );

    return redirect("/accounts");
};

export default function NoteDetailsPage() {
    const data = useLoaderData<typeof loader>();
    console.log(data, 'data')

    return (
        <div >
            <div className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                <h3 className="text-2xl font-bold">{data.account.name}</h3>
                <p className="py-2">{data.account.accountNumber}</p>
                <p className="py-2">{data.account.accountType}</p>
                <p className="py-2">Balance: {data.account.balance}</p>
            </div>
            
            <hr className="my-4" />
            <Form method="post">
                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Delete
                </button>
            </Form>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (error instanceof Error) {
        return <div>An unexpected error occurred: {error.message}</div>;
    }

    if (!isRouteErrorResponse(error)) {
        return <h1>Unknown Error</h1>;
    }

    if (error.status === 404) {
        return <div>Note not found</div>;
    }

    return <div>An unexpected error occurred: {error.statusText}</div>;
}
