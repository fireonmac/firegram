import { logout } from "@/services/auth"
import { redirect } from "react-router-dom";

export const loader = async () => {
    await logout();   
    return redirect('/');
}