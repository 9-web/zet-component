
export const item = {
  id: '1',
  name: '特征抽样策略',
  desc: '特征抽样策略特征抽样策略特征抽样策略f',
  params: [
    {
      key: 'tree',
      name: '树的个数',
      type: 'tag-input',
      default: [10],
      extra: '树的数量'
    }, {
      key: 'max_features',
      name: '特征抽象策略',
      type: 'select',
      data: [
        {
          name: 'one',
          value: 'one',
        },
        {
          name: 'two',
          value: 'two',
        },
        {
          name: 'three',
          value: 'max_features##array',
        },
        {
          name: 'four',
          value: 'max_features##number',
        },
        {
          name: 'five',
          value: 'five',
        }
      ],
      default: 'max_features##array',
    }, {
      key: 'max_features##array',
      name: 'three_detail',
      type: 'tag-input',
      default: [23, 232, 23],
    }, {
      key: 'max_features##number',
      name: 'number_detail',
      type: 'inputnumber',
      default: 0.4,
    }, {
      key: 'diff',
      name: 'aaaaaaaa',
      type: 'inputnumber',
      default: 0.14,
      condition: 'max_features$$five'
    }, {
      key: 'diff2',
      name: 'aaaaaaaa',
      type: 'inputnumber',
      default: 0.1224,
      condition: 'max_features$$five'
    }
  ]
}

export const value = {
  id: '1',
  name: '特征抽样策略',
  params: {
    tree: [1,2,3,4,5,6],
    // max_features: 'five',
    max_features: [1,2,3],
    // diff2: '232'
  }
}

// 两种情况
// 1. 下拉框需要其它输入框的数据
// 2. 下拉框控制其它输入框显示影藏
