export default {
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
          label: 'one',
          value: 'one',
        },
        {
          label: 'two',
          value: 'two',
        },
        {
          label: 'three',
          value: 'condition##max_features_tree',
        }
      ]
    }, {
      display: false,
      key: 'max_features_tree',
      name: 'three_detail'
    }
  ]
}
