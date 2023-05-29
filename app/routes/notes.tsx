import type { LoaderArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import type { SetStateAction } from "react";
import { SideBar } from "~/components/SideBar";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/services/session.server";
import { useUser } from "~/utils/utils";

export const loader = async ({ request }: LoaderArgs) => {

  const userId = await requireUserId(request);

  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <>
      <SideBar  />
      <div className="flex h-full min-h-screen flex-col ml-10">
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
          <h1 className="text-3xl font-bold">
            <Link to=".">Notes</Link>
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
              + New Note
            </Link>

            <hr />

            {data.noteListItems.length === 0 ? (
              <p className="p-4">No notes yet</p>
            ) : (
              <ol>
                {data.noteListItems.map((note) => (
                  <li key={note.id}>
                    <NavLink
                      className={({ isActive }) =>
                        `block border-b p-4 text-xl ${isActive ? "light:bg-white dark:bg-gray-900" : ""}`
                      }
                      to={note.id}
                    >
                      📝 {note.title}
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
