export const getTagType = (role: String): string => {
  switch (role) {
    case "管理员":
      return ""; // 管理员样式
    case "团队拥有者":
      return "warning"; // 团队拥有者样式
    default:
      return "info"; // 普通成员样式
  }
};
