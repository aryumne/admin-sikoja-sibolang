import { useRoutes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import ErrorRoutes from "./ErrorRoutes";
import MainRoutes from "./MainRoutes";


export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthRoutes, ErrorRoutes])
}