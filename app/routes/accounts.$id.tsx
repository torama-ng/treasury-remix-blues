import type { ActionArgs,  } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
    isRouteErrorResponse,
    useMatches,
    useParams,
    useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { requireUserId } from "~/services/session.server";
import {  AccountItemDetails } from "~/components/Accounts/AccountItemDetails";


// export const loader = async ({ params, request }: LoaderArgs) => {

//     try {
//         const userId = await requireUserId(request);
//         if (!userId) throw new Response("user Not logged in", { status: 404 });

//         invariant(params.id, "Account id not found");

//         const account = await getAccount({ id: parseInt(params.id), userId });
//         if (!account) {
//             throw new Response("Not Found", { status: 404 });
//         }
//         return account
//         // return json({ account });
//     } catch (error) {
//         console.log(error)
//         throw error
//     }

// };

export const action = async ({ params, request }: ActionArgs) => {
    const userId = await requireUserId(request);
    if (!userId) throw new Response("user Not logged in", { status: 404 });
    invariant(params.id, "Account ID not found");
    const id = +params.id;

    const formData = await request.formData();
    // const deleteButton = formData.get("delete");
    // const editButton = formData.get("edit");
    // await deleteAccount(id);

    return redirect("..");
};

export default function AccountsDetailPage() {
    // const data = useLoaderData<typeof loader>();
    // const defaultValues = data;

    // we are here (with useMatches) relying on parent loader to provide the data instead of going back
    // to the server to fetch the data again
    const matches = useMatches()
    const params = useParams()
    const id = +params.id!
    const accounts = matches.find(matches => matches.id === 'routes/accounts')?.data
    const account = accounts.accounts.find((acct: any) => acct.id === id)

    // const [name, setName] = useState("");
    // const [type, setType] = useState("");
    // console.log(data, 'data')

    return (
       <AccountItemDetails account={account} />
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


