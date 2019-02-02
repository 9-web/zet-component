export default [
  {
    id: 'd7660525-e5a3-44fd-af23-8376f945bfb5',
    name: 'LeNet',
    desc: '一个随机森林是由许多决策树。森林中的每棵树预测一条记录，并且每棵树“投票”森林的最终答案,森林选择票数最多的班级。 决策树是构建决策树的简单 算法。决策树的每个节点都包含其中一个输入要素的条件。当“增长”（即训练）森林时： • 对于每棵树，使用训练集的随机样本; • 对于树中的每个决策点，都考虑输入要素的随机子集。 随机森林通常会提供良好的结果，代价是模型的“可解释性',
    params: [{
      key: 'norm_size',
      name: 'norm_size1',
      min: 48,
      max: 224,
      type: 'inputnumber',
      default: 48,
    }]
  }, {
    id: '39f0901a-1807-40bf-848a-304d19d4ace4',
    name: 'VGG19',
    desc: 'VGG19',
    params: [{
      key: 'norm_size',
      name: 'norm_size2',
      min: 48,
      max: 224,
      type: 'inputnumber',
      default: 48,
    }]
  }, {
    id: 'bd2b5e04-695b-4763-a39f-d1b1b1c02a8f',
    name: 'VGG19',
    desc: 'VGG19',
    params: [{
      key: 'norm_size',
      name: 'norm_size3',
      min: 48,
      max: 224,
      type: 'inputnumber',
      default: 48,
    }]
  }, {
    id: 'd1010bce-2050-4beb-855b-d9ebcae81598',
    name: 'VGG19',
    desc: 'VGG19',
    params: [{
      key: 'norm_size',
      name: 'norm_size4',
      min: 48,
      max: 224,
      type: 'inputnumber',
      default: 48,
    }]
  }, {
    id: 'e4918d33-224f-4b44-9c66-69e2a1632e65',
    name: 'Xception',
    desc: 'Xception',
    params: [{
      key: 'norm_size',
      name: 'norm_size5',
      min: 48,
      max: 224,
      type: 'inputnumber',
      default: 48,
    }]
  }
]
