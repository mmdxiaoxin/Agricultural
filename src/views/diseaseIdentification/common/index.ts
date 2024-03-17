// 测试图片
export const modelProcessingResults = [
  { src: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg", description: "RGB还原" },
  { src: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", description: "图像分割" },
  { src: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg", description: "去除背景" },
  { src: "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg0", description: "测试内容" }
];

//测试模型选项
export const modelOption = [
  { value: "1", label: "Net2_59" },
  { value: "2", label: "Res_RGB" }
];

//预处理函数配置
export const preprocessingOption = [
  { value: "1", label: "NONE", description: "什么都不做" },
  { value: "2", label: "MMS", description: "最大最小值归一化" },
  { value: "3", label: "SS", description: "标准差标准化" },
  { value: "4", label: "CT", description: "均值中心化" },
  { value: "5", label: "SNV", description: "标准正态变换" },
  { value: "6", label: "MA", description: "移动平均平滑" },
  { value: "7", label: "SG", description: "Savitzky-Golay平滑滤波" },
  { value: "8", label: "D1", description: "一阶导数" },
  { value: "9", label: "D2", description: "二阶导数" },
  { value: "9", label: "DT", description: "趋势校正(DT)" },
  { value: "9", label: "DT2", description: "改进的趋势校正" }
];
