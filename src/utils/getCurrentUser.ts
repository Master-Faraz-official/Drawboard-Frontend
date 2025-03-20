import axios from "axios";

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/getuser`, {
            withCredentials: true,
        });

        if (!response.data.data) {
            throw new Error("User data is missing in the response");
        }

        console.log(response.data.data.user)

        return {
            success: true,
            user: response.data.data.user,
        }
    } catch (error: any) {

        // Check if the error is due to unauthorized access (401)
        if (error.response?.status === 401) {
            return {
                success: false,
                user: null,
                error: "Unauthorized",
            };
        }

        // Handle other errors
        return {
            success: false,
            user: null,
            error: error.response?.data?.message || "Failed to fetch user",
        };
    }
};
