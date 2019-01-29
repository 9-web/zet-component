export default [{
  key: 'baseInfo',
  value: '基础信息',
  children: [
    {
      key: 'target',
      value: '目标'
    }
  ]
}, {
  key: 'featureEngineering',
  value: '特征工程',
  children: [{
    key: 'pretreatment',
    value: '特性预处理',
  },{
    key: 'processing',
    value: '特征处理',
  }]
}, {
  key: 'modelTraining',
  value: '模型训练',
  children: [{
    key: 'algorithms',
    value: '算法',
  },{
    key: 'hyperparams',
    value: '超参数调优',
  }]
}, {
  key: 'dataDeclustering',
  value: '数据拆分',
  children: [{
    key: 'trainAndTest',
    value: '训练集/测试集',
  }, {
    key: 'trainAndVerify',
    value: '训练集/验证集',
  }, {
    key: 'all',
    value: '训练集/测试集/验证集',
  }]
}, {
  key: 'resource',
  value: '资源设置',
  children: [{
    key: 'standalone',
    value: '单击资源',
  },{
    key: 'distributed',
    value: '分布式资源',
  }]
}]
