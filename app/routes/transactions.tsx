import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { SideBar } from "~/components/SideBar";

import { listAllAccounts } from "~/models/Account.server";
import { getTransactionsByAccountAndUser, listAllTransactions } from "~/models/Transaction.server";
import { requireUserId } from "~/services/session.server";
import { useUser } from "~/utils/utils";

export let loader: LoaderFunction = async ({ request, params }) => {
    // Retrieve the currently authenticated user's ID
    let userId = await requireUserId(request);

    // Get the accountId from the route params and convert to number
    let accountId = params.accountId ? parseInt(params.accountId) : undefined;

    // Check if accountId is valid
    if (accountId === undefined || isNaN(accountId)) {
        // Return an error response
        return json({ error: 'Invalid accountId' }, { status: 400 });
    }


    // Get the transactions
    let transactions = await getTransactionsByAccountAndUser({ userId, accountId });

    // Return the transactions as JSON
    return json(transactions);
};

export default function AccountsPage() {
    const data = useLoaderData<typeof loader>();
    const user = useUser();

    return (
        <>
            <SideBar />
            <div className="flex h-full min-h-screen flex-col ml-10">
                <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                    <h1 className="text-3xl font-bold">
                        <Link to=".">Accounts</Link>
                    </h1>
                    <p>{user.email}</p>
                    <Form action="/logout" method="post">
                        <button
                            type="submit"
                            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                        >
                            Logout
                        </button>
                    </Form>
                </header>

                <main className="flex h-full">
                    <div className="h-full w-80 border-r">
                        <Link to="new" className="block p-4 text-xl text-blue-500">
                            + New Accounts
                        </Link>

                        <hr />

                        {data.transactions.length === 0 ? (
                            <p className="p-4">No Accounts yet</p>
                        ) : (
                            <ol>
                                    {data.transactions.map((acct: any) => (
                                    <li key={acct.id}>
                                        <NavLink to={typeof acct.id}
                                            className={({ isActive }) =>
                                                `block border-b p-4 text-xl ${isActive ? "light:bg-white dark:bg-gray-900" : ""}`
                                            }

                                        >
                                            {acct.amount}
                                        </NavLink>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>

                    <div className="flex-1 p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>

    );
}
