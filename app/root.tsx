import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { APP_NAME } from "~/utils/utils";

import { getUser } from "~/services/session.server";
import stylesheet from "~/tailwind.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (

    // Error boundary not working
    // <ErrorBoundary>
      <ThemeProvider>

        <Document>
          <Layout>
            <Outlet />
          </Layout>
        </Document>
      </ThemeProvider>

    // </ErrorBoundary>


  );
}

// export function ErrorBoundry({ error }: any) {
//   console.log(error);
//   return (
//     <Document>
//       <Layout>
//         <h1>Sorry An Error Occured</h1>
//         <pre>{error}</pre>
//       </Layout>
//     </Document>
//   );
// }
type iDocType = {
  children: React.ReactNode;
  title?: string;
};

function Document({ children, title }: iDocType) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title ? title : APP_NAME}</title>
      </head>
      <body className="dark:bg-black dark:text-white">
        {/* <CommandPalette projects={projects} openMe={false} /> */}
        {children}
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <ScrollRestoration />
        <Scripts />

      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen mx-2">
      {/* <NavBar /> */}

      <div className="flex flex-1 overflow-hidden">

        {/* <aside className="hidden sm:block my-2 py-2 px-2 w-64 overflow-y-auto bg-gray-100   dark:bg-gray-900">
          <ul className="list-none">
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/movies/add"> * Add</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="https://www.mongodb.com/docs/drivers/node/current/">MongoDB Driver docs</Link></li>
          </ul>

          <ul className="list-none">
            <li><Link to="/expenses">Expenses</Link></li>
            <li><Link to="/expenses/add"> * Add</Link></li>
          </ul>
        </aside> */}
        <main className="flex flex-1 my-1 overflow-y-auto paragraph px-4">
          {children}
        </main>
      </div>
    </div>
  );
}


// export default function App() {
//   return (
//     <ThemeProvider>
//       <html lang="en" className="h-full">
//         <head>
//           <meta charSet="utf-8" />
//           <meta name="viewport" content="width=device-width,initial-scale=1" />
//           <Meta />
//           <Links />
//         </head>
//         <body className="dark:bg-black dark:text-white h-full">
//           <nav className="flex justify-between h-16 items-center width-full">
//             <Link to="/">
//               <img src={logo} className="h-12 w-12 mx-2" alt="Logo" />
//             </Link>
//             <div className="float-right">
//               <ThemeSwitcher />
//             </div>
//           </nav>
//           <SideBar />
//           <Outlet />
//           <ScrollRestoration />
//           <Scripts />
//           <LiveReload />
//         </body>
//       </html>
//     </ThemeProvider>
//   );
// }



