import axios from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";


const LogoutBtn = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            console.log("Logging out...");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {}, { withCredentials: true });
            console.log(response)

            if (response.status !== 200) {
                toast.error("Internal Server Error");
            }

            toast.success("Logged out successfully");


            await new Promise(resolve => setTimeout(resolve, 800)); // Delay before navigation
            router.replace("/login");
        } catch (error: any) {
            toast.error(`Logout Failed: ${error?.message || "An unexpected error occurred while logging out"}`);
        }
    }

    return (
        <Button type="button" variant="ghost" className="hover:bg-icon hover:text-black text-slate-300" onClick={handleLogout}>
            <LogOut  className="!w-5 !h-5" />
        </Button>
    )
}

export default LogoutBtn