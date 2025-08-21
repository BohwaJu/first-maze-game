export const isSponsorGuild = (): boolean => {
  try {
    if (typeof window === "undefined") return false;
    const guild = localStorage.getItem("guild") || "";
    return guild === "미스테리로프";
  } catch {
    return false;
  }
};
