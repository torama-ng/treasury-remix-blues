import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import type { SetStateAction } from "react";
import { NavBar } from "~/components/NavBar";
import { SideBar } from "~/components/SideBar";

import { useOptionalUser } from "~/utils/utils";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

function MainContent() {
  const user = useOptionalUser();
  return (
    <div className="h-[calc(100vh_-_2rem)] w-full overflow-y-scroll ml-6">
      <NavBar />
      <header className="flex items-center justify-between light:bg-gray-100  p-4 ">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>
        <p>{user?.email}</p>
        {!user && <Link to="/auth?mode=login&type=email" className="rounded  px-4 py-2  hover:bg-blue-500 active:bg-blue-600">
          Login
        </Link>}
        {user && <Link to="/logout" className="rounded  px-4 py-2  hover:bg-blue-500 active:bg-blue-600">
          Logout
        </Link>}

      </header>

      <main className="min-h-screen w-full dark:bg-gray-800 bg-gray-100  p-4">
        <h1 >Main content</h1>
        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quod expedita voluptate cumque dicta minima temporibus quae consectetur
          pariatur, architecto accusamus. Et quod quos sit, deleniti rerum odio
          numquam reiciendis ipsa!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quod expedita voluptate cumque dicta minima temporibus quae consectetur
          pariatur, architecto accusamus. Et quod quos sit, deleniti rerum odio
          numquam reiciendis ipsa!
        </p>
        <h2 >Sub content</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quod expedita voluptate cumque dicta minima temporibus quae consectetur
          pariatur, architecto accusamus. Et quod quos sit, deleniti rerum odio
          numquam reiciendis ipsa!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quod expedita voluptate cumque dicta minima temporibus quae consectetur
          pariatur, architecto accusamus. Et quod quos sit, deleniti rerum odio
          numquam reiciendis ipsa!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quod expedita voluptate cumque dicta minima temporibus quae consectetur
          pariatur, architecto accusamus. Et quod quos sit, deleniti rerum odio
          numquam reiciendis ipsa!
        </p>


      </main>
    </div>
  );

}



export default function Index() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <MainContent />
      </div>



    </>

  );
}
