export const isSponsorGuild = (): boolean => {
  try {
    if (typeof window === "undefined") return false;
    const guild = localStorage.getItem("guild") || "";
    return guild === "마법재단";
  } catch {
    return false;
  }
};
