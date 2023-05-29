import { NavLink } from "@remix-run/react";
import React from "react";
import { useTranslation } from "react-i18next";
// utils
import { SubMenuItem } from "./SubMenuItem";

type MenuItemProps = {
    open: boolean;
    onMobileSidebarOpened?: () => void;
    menus: {
        icon: React.ReactNode;
        label: string;
        url: string;
        subMenus?: {
            label: string;
            url: string;
        }[];
    }[];
};

export default function MenuItem({
    open,
    menus,
    onMobileSidebarOpened,
}: MenuItemProps) {
    const { t } = useTranslation();

    return (
        <li className="flex flex-col">
            {menus.map(({ label, icon, url, subMenus }) => (
                <div key={label}>
                    {subMenus ? (
                        <SubMenuItem
                            icon={icon}
                            open={open}
                            label={label}
                            subMenus={subMenus}
                            onMobileSidebarOpened={onMobileSidebarOpened}
                        />
                    ) : (
                        <NavLink
                            to={url}
                            onClick={onMobileSidebarOpened}
                            className={({ isActive }) =>
                                isActive
                                    ? "relative my-1 flex h-11 flex-row items-center text-base font-medium text-primary-100 before:block before:h-full before:w-1 before:rounded-r-full before:bg-primary-100 before:content-[''] focus:outline-none dark:hover:text-primary-100"
                                    : "hover:bg-secondary-500/10 relative my-1 flex h-11 flex-row items-center border-l-4 border-transparent text-base font-light text-skyblue-80 hover:text-primary-100 focus:outline-none dark:text-white dark:hover:text-primary-100"
                            }
                        >
                            <span className="ml-4 inline-flex items-center justify-center">
                                {icon}
                            </span>
                            {open && (
                                <span className="ml-4 truncate text-sm tracking-wide">
                                    {t(`sidebar.${label}`)}
                                </span>
                            )}
                        </NavLink>
                    )}
                </div>
            ))}
        </li>
    );
}
