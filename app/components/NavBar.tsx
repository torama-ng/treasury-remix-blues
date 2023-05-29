import { Form, Link } from '@remix-run/react'
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import logo from '~/assets/torama_logo.png'
import digiverse_white from '~/assets/digiverse_white.jpg'
import { useUser } from '~/utils/utils'

export const NavBar = () => {
    const user = useUser();
    return (<>

        <nav className="flex justify-between h-16 items-center w-full">
            <Link to="/">
                <img src={digiverse_white} className="  w-40 mx-2" alt="Logo" />
            </Link>
            {user.email}
            {user && <Form action="/logout" method="post">
                <button
                    type="submit"
                    className="rounded bg-slate-300 float-right px-4 py-2  hover:bg-blue-500 active:bg-blue-600"
                >
                    Logout
                </button>
            </Form>}
            <div className="float-right">
                <ThemeSwitcher />
            </div>
        </nav>
            {/* <header className="flex w-full items-center justify-between bg-slate-800 p-4 text-white">
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
    </>
    )
}
