import { signOut } from "@/services/auth"
import { redirect } from "react-router-dom";

export const loader = async () => {
    await signOut();   
    return redirect('/');
}