export default [{
  id: '1',
  name: '特征抽样策略',
  desc: '特征抽样策略特征抽样策略特征抽样策略f',
  params: [
    // {
    //   key: 'tree',
    //   name: '树的个数',
    //   type: 'tag-input',
    //   default: [10],
    //   extra: '树的数量'
    // },
    {
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
      default: [12, 12, 12],
    }, {
      key: 'max_features##number',
      name: 'number_detail',
      type: 'input-number',
      default: 1.,
    }, {
      key: 'diff',
      name: 'aaaaaaaa',
      type: 'input-number',
      default: 0,
      condition: 'max_features$$five'
    }, {
      key: 'diff2',
      name: 'aaaaaaaa',
      type: 'input-number',
      default: 0.1224,
      condition: 'max_features$$five'
    },
    {
      key: 'randomState',
      name: 'randomState',
      type: 'select',
      data: [
        { name: '随机', value: 'none' },
        { name: '自定义', value: 'randomState##number' },
      ],
      default: 'none',
    },
    {
      key: 'randomState##number',
      name: 'randomStateNumber',
      min: 0,
      // max: 1.0,
      type: 'input-number',
      default: 0.1,
    },
  ]
}]
