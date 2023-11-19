import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";

export const useUserStore = defineStore({
  id: "agricultural-user",
  state: (): {
    userInfo: { phone: string; name: string; description: string; avatar: string; email: string; currentRole: string };
    token: string;
  } => ({
    token: "",
    userInfo: {
      name: "小新AI",
      email: "782446723@qq.com",
      phone: "18888888888",
      avatar: "src/assets/images/avatar.png",
      description: "嗨嗨嗨，测试",
      currentRole: "管理员"
    }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("agricultural-user")
});
