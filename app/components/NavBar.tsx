import { Link } from '@remix-run/react'
import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'
import logo from '~/assets/torama_logo.png'

export const NavBar = () => {
    return (<>

        <nav className="flex justify-between h-16 items-center width-full">
            <Link to="/">
                <img src={logo} className="h-12 w-12 mx-2" alt="Logo" />
            </Link>
            <div className="float-right">
                <ThemeSwitcher />
            </div>
        </nav>
        <div className="flex h-8 items-center ">
            A Remix Stack for Blues
        </div>
    </>
    )
}
