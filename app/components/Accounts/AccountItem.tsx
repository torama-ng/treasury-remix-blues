import { NavLink } from "@remix-run/react";

export function AccountItem({ account }: any) {
    if (!account) {
        return null;
    }
    return (
        <li key={account.id}>
            <NavLink to={account.id.toString()}
                className={({ isActive }) =>
                    `block border-b p-4 text-xl ${isActive ? "light:bg-white dark:bg-gray-900" : ""}`
                }
            >
                {account.name} {account.accountType}
                <p > <span className="text-xs font-medium ">{account.accountNumber}  </span>{account.status}</p>
            </NavLink>
        </li>
    );
}