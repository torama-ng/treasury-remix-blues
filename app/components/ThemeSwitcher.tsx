// file: ~/app/components/ThemeSwitcher.tsx
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { CgDarkMode } from "react-icons/cg";
import { MdOutlineLightMode } from "react-icons/md";
const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        console.log(theme)
    }, [theme]);

    return (
        <div>
            <button onClick={toggleTheme} className="hover:opacity-60 text-3xl  mx-4 float-right ">
                {theme === "light" ? <MdOutlineLightMode /> : < CgDarkMode />}
            </button>

        </div>
    );
};

export default ThemeSwitcher;
