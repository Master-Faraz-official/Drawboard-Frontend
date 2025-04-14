import axios from "axios";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LogoutBtn = () => {
    const router = useRouter()
    return (
        <Button variant="ghost" onClick={async () => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {}, { withCredentials: true });

                if (response.status !== 200) {
                    toast.error("Internal Server Error");
                }

                toast.success("Logged out successfully");


                await new Promise(resolve => setTimeout(resolve, 800)); // Delay before navigation
                router.replace("/login");
            } catch (error: any) {
                toast.error(`Logout Failed: ${error?.message || "An unexpected error occurred while logging out"}`);
            }

        }} >
            <div className="flex space-x-1">
                <Image src="/images/icons/logout.svg" alt="Logout" width={24} height={24} />
                {/* <span className="mt-1">Logout</span> */}
            </div>
        </Button>
    )
}

export default LogoutBtn