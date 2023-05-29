import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { AccountItem } from "~/components/Accounts/AccountItem";
import { NavBar } from "~/components/NavBar";
import { SideBar } from "~/components/SideBar";

import { listAllAccounts } from "~/models/Account.server";
import { requireUserId } from "~/services/session.server";
import { useUser } from "~/utils/utils";

export const loader = async ({ request }: LoaderArgs) => {
    const userId = await requireUserId(request);

    const accounts = await listAllAccounts(userId as string);
    return json({ accounts });
};



export default function AccountsPage() {
    const data = useLoaderData<typeof loader>();
    const user = useUser();

    return (
        <>
            <SideBar />
            <div className="flex w-full h-full min-h-screen flex-col ml-10">
                {/* <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                    <h1 className="text-3xl font-bold">
                        <Link to=".">Accounts</Link>
                    </h1>
                    <p>{user.email}</p>
                    {user && <Form action="/logout" method="post">
                        <button
                            type="submit"
                            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                        >
                            Logout
                        </button>
                    </Form>}
                </header> */}
                <NavBar />

                <main className="flex h-full">
                    <div className="h-full w-80 border-r">
                        <div className="flex items-center">
                            <div >
                                <Link to="new" className="block hover:text-blue-400 p-2 text-xl text-blue-500">
                                    + New Accounts
                                </Link>
                            </div>
                            <div >
                                ({data.accounts.length})
                            </div>
                        </div>


                        <hr />

                        {data.accounts.length === 0 ? (
                            <p className="p-4">No Accounts yet</p>
                        ) : (
                            <ol>
                                {data.accounts.map((acct) => (
                                    <AccountItem key={acct.id} account={acct} />
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



export function Index() {
    return (
        <div>

            <AccountsPage />
        </div>
    );
}