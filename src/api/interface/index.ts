// 请求响应参数（不包含data）
export interface Result {
  code: string;
  message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

// 分页响应参数
export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

// 分页请求参数
export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

// 文件上传模块
export namespace Upload {
  export interface ResFileUrl {
    fileUrl: string;
  }
}

// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }

  export interface ResLogin {
    access_token: string;
  }

  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

// 用户管理模块
export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }

  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }

  export interface ResStatus {
    userLabel: string;
    userValue: number;
  }

  export interface ResGender {
    genderLabel: string;
    genderValue: number;
  }

  export interface ResDeviceList {
    id: string;
    name: string;
    children?: ResDeviceList[];
  }

  export interface ResRole {
    id: string;
    name: string;
    children?: ResDeviceList[];
  }
}

//数据相关模块
export namespace DataHandle {
  export interface ReqDeviceMethod {
    id: string;
    method: string;
  }

  export interface ResAddress {
    id: string;
    name: string;
  }

  export interface ResRealDeviceData {
    createTime: Date;
    error: boolean;
    errorMsg: string;
    name: string;
    sign: string;
    type: number;
    unit: string;
    value: number;
    valueMsg: string;
  }

  export interface ResRealDeviceDataList {
    deviceDataList: ResRealDeviceData[];
  }

  export interface ReqCollectMethod {
    deviceId: string; //设备id
    hour?: string; //返回所需要多少小时的数据
    columns?: string; //所需要的数据sign
  }

  export interface ResCollectData {
    AA1?: number; //空气温度
    AB1?: number; //空气湿度
    AC1?: number; //大气压强
    AD1?: number; //风速
    AE1?: number; //风向
    AI1?: number; //土壤湿度
    AJ1?: number; //土壤EC
    AH1?: number; //土壤温度
    AL1?: number; //光照强度
    BD1?: number; //CO2
    AF1?: number; //降雨量
    id?: string; //采集数据id
    createTime: string; //采集时间
  }

  interface SiteValue {
    name: string; //站点名称
    value: number; //站点数据
  }

  export interface ResDashboardData {
    deviceCount: number; //设备总数
    siteCount: number; //站点总数
    siteValues: SiteValue[]; //站点数据
    totalDeviceDataCount: number; //数据总数
  }
}
