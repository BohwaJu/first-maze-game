import { useSetAtom } from "jotai";
import { showToastAtom } from "@/store/toastStore";

export const useToast = () => {
  const showToast = useSetAtom(showToastAtom);

  return {
    showToast,
  };
};
