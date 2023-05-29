import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "~/utils/utils";

type SubMenuItemProps = {
    open: boolean;
    icon: React.ReactNode;
    label: string;
    onMobileSidebarOpened?: () => void;
    subMenus?: {
        label: string;
        url: string;
    }[];
};

export function SubMenuItem({
    icon,
    open,
    label,
    subMenus,
    onMobileSidebarOpened,
}: SubMenuItemProps) {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
    const [isShownMinSubMenu, setIsShownMinSubMenu] = useState<null | Boolean>(
        false
    );

    const isChildrenActive =
        subMenus && subMenus?.some((item) => item.url === pathname);

    useEffect(() => {
        if (isChildrenActive) {
            setIsOpenSubMenu(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="group"
            onMouseEnter={() => setIsShownMinSubMenu(true)}
            onMouseLeave={() => setIsShownMinSubMenu(false)}
        >
            <button
                onClick={() => setIsOpenSubMenu(!isOpenSubMenu)}
                className={cn(
                    isChildrenActive
                        ? "relative my-1 flex h-11 w-full flex-row items-center  text-base font-medium text-primary-100 before:block before:h-full before:w-1 before:rounded-r-full before:bg-primary-100 before:content-[''] hover:text-primary-100 focus:outline-none dark:hover:text-primary-100"
                        : "relative my-1 flex h-11 w-full flex-row items-center justify-between border-l-4 border-transparent text-base font-light text-skyblue-80 hover:text-primary-100 focus:outline-none  dark:text-white dark:hover:text-primary-100"
                )}
            >
                <span className="flex w-full justify-between">
                    <span className="flex items-center">
                        <span className="ml-4 inline-flex items-center justify-center">
                            {icon}
                        </span>
                        {open && (
                            <span className="ml-4 truncate text-sm tracking-wide">
                                {t(`sidebar.${label}`)}
                            </span>
                        )}
                    </span>
                    {open && (
                        <span
                            className={cn(
                                "mr-4 transition-transform duration-200",
                                isOpenSubMenu && "rotate-90"
                            )}
                        >
                            <ChevronRightIcon className="h-4 w-4" />
                        </span>
                    )}
                </span>
            </button>

            {!open && subMenus && isShownMinSubMenu !== null && (
                <div
                    className={cn(
                        isShownMinSubMenu ? "visible" : "invisible",
                        " absolute left-full hidden h-auto w-40 transform rounded-md bg-white p-4 opacity-0 shadow-[0px_5px_54px_rgba(0,0,0,0.05)] backdrop-blur-lg transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:opacity-100  dark:bg-dark-main xl:block"
                    )}
                >
                    <div>
                        {subMenus.map(({ label, url }) => (
                            <NavLink
                                key={label}
                                onClick={() => setIsShownMinSubMenu(null)}
                                to={url}
                                className={({ isActive }) =>
                                    isActive
                                        ? "relative my-1 flex h-7 flex-row items-center rounded-md font-medium text-primary-100 hover:text-primary-100 focus:outline-none dark:hover:text-primary-100"
                                        : "relative my-1 flex h-7 flex-row items-center rounded font-light text-skyblue-80 hover:text-primary-100 focus:outline-none dark:text-white dark:hover:text-primary-100"
                                }
                            >
                                <span className="truncate text-sm tracking-wide">{label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}

            {isOpenSubMenu &&
                open &&
                subMenus?.length &&
                subMenus.map(({ label, url }) => (
                    <NavLink
                        key={label}
                        onClick={onMobileSidebarOpened}
                        to={url}
                        className={({ isActive }) =>
                            isActive
                                ? "relative my-1 flex h-7 flex-row items-center rounded-md font-medium text-primary-100 hover:text-primary-100 focus:outline-none dark:hover:text-primary-100"
                                : "relative my-1 flex h-7 flex-row items-center rounded font-light text-skyblue-80 hover:text-primary-100 focus:outline-none dark:text-white dark:hover:text-primary-100"
                        }
                    >
                        <span className="ml-14 truncate text-sm tracking-wide">
                            {label}
                        </span>
                    </NavLink>
                ))}
        </div>
    );
}
