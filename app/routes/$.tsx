import type { LoaderArgs, } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/node'

// SPLAT ROUTE catch all    
export async function loader({ params }: LoaderArgs) {
    console.log(params["*"]);

    if (params["*"] === "exp") {
        return redirect("/expenses");
    }

    if (params["*"] === "login") {
        return redirect("/auth?mode=login&type=email");
    }


    if (params["*"] === "signup") {
        return redirect("/auth?mode=signup&type=email");
    }
    if (params["*"] === "join") {
        return redirect("/auth?mode=signup&type=email");
    }

    throw new Response('404 - path not found  ', { status: 404 });
}

