export const plantOptions = [
  {
    value: "apple",
    label: "苹果"
  },
  {
    value: "grape",
    label: "葡萄"
  },
  {
    value: "kiwi",
    label: "猕猴桃"
  }
];

// 使用索引签名为 diseaseOptions 提供一个通用字符串索引
export const diseaseOptions: {
  [key: string]: {
    diseases: string[];
    prevention: string[];
  };
} = {
  apple: {
    diseases: ["褐斑病", "斑点落叶病"],
    prevention: ["多菌灵可湿性粉剂", "福美锌可湿性粉剂", "增施磷肥和钾肥"]
  },
  grape: {
    diseases: ["霜霉病", "白粉病"],
    prevention: ["嘧菌酯", "硫悬浮剂"]
  },
  kiwi: {
    diseases: ["褐斑病", "根腐病"],
    prevention: ["甲霜灵", "百菌清"]
  }
};
