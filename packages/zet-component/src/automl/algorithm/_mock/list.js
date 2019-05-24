export default [
  {
    id: 'd1010bce-2050-4beb-855b-d9ebcae81598',
    name: 'VGG19',
    desc: 'VGG19',
    params: [{
      key: 'norm_size',
      name: 'norm_size4',
      extra: 'norm_size4',
      min: 48,
      max: 224,
      type: 'input-number',
      default: 48,
    }]
  }, {
    id: 'component-item',
    name: 'component-item',
    desc: 'component-item',
    params: [{
      key: 'radioGroup',
      name: 'radioGroup',
      type: 'radio-group',
      extra: "radio-group",
      data: [{
        name: 'A',
        value: 1,
      }, {
        name: 'B',
        value: 2,
      }, {
        name: 'C',
        value: 3,
      }],
      default: 1,
    }, 
    {
      key: 'checkboxGroup',
      name: 'checkboxGroup',
      type: 'checkbox-group',
      extra: "checkbox-group",
      data: [{
        name: 'A',
        value: 1,
      }, {
        name: 'B',
        value: 2,
      }, {
        name: 'C',
        value: 3,
      }],
      default: [1],
    },
    {
      key: 'timeSelect',
      name: 'timeSelect',
      type: 'time-select',
      extra: "time-select",
      data: {
        seconds: {
          key: 'seconds',
          selectData: [1, 5, 10, 20, 30],
          displayUnit: '秒',
        },
        minutes: {
          key: 'minutes',
          selectData: [1, 5, 10, 20, 30],
          displayUnit: '分钟',
        },
        hours: {
          key: 'hours',
          selectData: [1, 2, 4, 8, 12, 18],
          displayUnit: '小时',
        },
      },
      default: 180,
    }]
  }
];
