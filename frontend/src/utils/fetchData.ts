import { api } from "./api";

export const fetchData = async (formData: FormData) => {
    try {
        const response = await api().post("upload/", formData);
        return response.data;
    } catch (error) {
        console.error("Error uploading file", error);
        return "An error occurred during file upload. Please try again.";
    }
}