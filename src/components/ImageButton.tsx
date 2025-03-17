import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

// Enum for defining button types
enum ButtonType {
  Navigation = "navigation",
  Logout = "logout",
}

interface PropsType {
  imgSrc: string;
  label: string;
  buttonType: ButtonType;
  link?: string; // Only needed for navigation type buttons
  onLogoutSuccess?: () => void; // Optional callback for logout success
}

const ImageButton = ({ imgSrc, label, buttonType, link, onLogoutSuccess }: PropsType) => {
  const router = useRouter();

  const handleClick = async () => {
    if (buttonType === ButtonType.Navigation && link) {
      // For navigation button, navigate to the provided link
      router.push(link);
    } else if (buttonType === ButtonType.Logout) {
      // For logout button, handle the logout logic
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
          {},
          { withCredentials: true }
        );

        if (response.status !== 200) {
          toast.error("Internal Server Error");
        }

        toast.success("Logged out successfully");

        // Optional: Call the onLogoutSuccess callback
        if (onLogoutSuccess) {
          onLogoutSuccess();
        }

        await new Promise((resolve) => setTimeout(resolve, 800)); // Delay before navigation
        router.replace("/");
      } catch (error: any) {
        toast.error(
          `Logout Failed: ${error?.message || "An unexpected error occurred while logging out"}`
        );
      }
    }
  };

  return (
    <Button variant="ghost" onClick={handleClick} className="flex space-x-2 items-center">
      <Image src={imgSrc} alt={label} width={24} height={24} />
      {label}
    </Button>
  );
};

export default ImageButton;
