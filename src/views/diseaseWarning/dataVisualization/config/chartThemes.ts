// 图表主题渐变生成
const generateChartTheme = (color1: string, color2: string) => {
  return [
    {
      offset: 0,
      color: color1
    },
    {
      offset: 1,
      color: color2
    }
  ];
};

export const chartTheme1 = generateChartTheme("rgb(128, 255, 165)", "rgb(1, 191, 236)");
export const chartTheme2 = generateChartTheme("rgb(0, 221, 255)", "rgb(77, 119, 255)");
export const chartTheme3 = generateChartTheme("rgb(55, 162, 255)", "rgb(116, 21, 219)");
export const chartTheme4 = generateChartTheme("rgb(255, 0, 135)", "rgb(135, 0, 157)");
export const chartTheme5 = generateChartTheme("rgb(255, 191, 0)", "rgb(224, 62, 76)");
export const chartTheme6 = generateChartTheme("rgb(32, 180, 255)", "rgb(3, 228, 201)");
export const chartTheme7 = generateChartTheme("rgb(255, 130, 92)", "rgb(153, 102, 255)");
