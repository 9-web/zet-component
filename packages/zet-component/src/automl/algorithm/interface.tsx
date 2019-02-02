export interface ParamsItemSchema {
  /** 参数key */
  key: string,
  /** 名称 */
  name: string,
  /** 组件渲染类型，支持tag-input, select, inputnumber, input, radio */
  type: string,
  /** 是否支持多选，只有type=select支持此参数 */
  multiple?: boolean,
  /** 默认值 */
  default: any,
  /** 扩展描述 */
  extra: string,
  /** item数据，例如：select 的 option || radio group */
  data?: any,
  /** 配置子父级依赖关系 */
  condition?: string,
}

/** 当个数据项结构 */
export interface DataItemSchema {
  /** id */
  id: string,
  /** 名称 */
  name: string,
  /** 描述 */
  desc?: string,
  /** 算法参数列表 */
  params: Array<ParamsItemSchema>,
}

/** 单个value结构 */
export interface ValueItemSchema {
  /** 算法Id */
  id: string,
  /** 算法名称 */
  name: string,
  /** 参数选项 */
  params: object,
}
