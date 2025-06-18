import { createBanner } from "../../services/bannerService";

export default function useCreateBanner(onSuccess) {
  const handleCreate = async (formData) => {
    try {
      await createBanner(formData);
      if (onSuccess) onSuccess(); // refresh banner
    } catch (error) {
      console.error("Create Banner Error:", error);
      throw error;
    }
  };

  return { handleCreate };
}
