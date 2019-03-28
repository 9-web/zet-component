import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { DataItemSchema, ParamsItemSchema, ValueItemSchema } from './interface';
import { Form, Select, Input, InputNumber, Radio } from 'antd';
import Ellipsis from '../../components/ellipsis';
import TagInput from '../../components/tag-input';
import TimeSelect from '../../components/time-select';
import styles from './index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 12 },
  },
};

const conditionKey = {
  array: 'array',
  float: 'float',
}

export interface ItemProps extends FormComponentProps {
  /** item 展示需要的数据 */
  data: DataItemSchema,
  /** value 接口传过来的数据 */
  value: ValueItemSchema,
  /** onChange 变化 */
  onChange?: (DataItemSchema) => void,
  /** 是否禁用 */
  disabled: boolean,
}

class Item extends React.Component<ItemProps, any> {


  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    }
  }

  static defaultProps = {
    disabled: false,
  }

  componentDidMount() {
    const { data, value, onChange } = this.props;

    // TODO
    data.params.forEach(f => {
      // 当前data参数没有在value值中处理
      if (!(value.params[f.key] || f.key.indexOf('##') !== -1)) {
        if (f.default.indexOf && f.default.indexOf('##') !== -1) {
          const childItem = data.params.find(fd => fd.key === f.default);
          value.params[f.key] = childItem && childItem.default || [];
        } else {
          value.params[f.key] = f.default;
        }
      }
    });

    onChange && onChange({...value})
  }

  renderSelect = (selectData: ParamsItemSchema) => {
    const { disabled } = this.props;
    return (
      <Select disabled={disabled} style={{width: '100%'}} key={selectData.key}>
        {
          selectData.data && selectData.data.map(d => {
            return <Option key={d.value} value={d.value}>{d.name}</Option>
          })
        }
      </Select>)
  }

  renderRadioGroup = (radioData: ParamsItemSchema) => {
    const { disabled } = this.props;
    return (
      <RadioGroup disabled={disabled} key={radioData.key}>
        {
          Array.isArray(radioData.data) && radioData.data.map(d => {
            return <Radio key={d.value} value={d.value}>{d.name}</Radio>
          })
        }
      </RadioGroup>
    )
  }

  renderTimeSelect = (timeSelectData: ParamsItemSchema) => {
    const { disabled } = this.props;
    return <TimeSelect key={timeSelectData.key} data={timeSelectData.data} disabled={disabled} />
  }

  renderItem = (item: ParamsItemSchema) => {
    const { disabled } = this.props;
    switch (item.type) {
      case 'tag-input':
        return <TagInput style={{width: '100%'}} disabled={disabled} key={item.key} />
      case 'select':
        return this.renderSelect(item)
      case 'input':
        return <Input style={{width: '100%'}} disabled={disabled} key={item.key} />
      case 'input-number':
        return <InputNumber style={{width: '100%'}} min={item.min} max={item.max} disabled={disabled} key={item.key} />
      case 'radio-group':
        return this.renderRadioGroup(item);
      case 'time-select':
        return this.renderTimeSelect(item);
      default:
        throw('auto ml algorithm params no matching ! ');
    }
  }

  handleParams = (params: Array<ParamsItemSchema>) => {
    const { value } = this.props;
    // debugger;
    const filterValue = params.filter(f => {

      if (f.key.indexOf('##') !== -1) {
        const spt = f.key.split('##');
        const parentKey = spt[0];
        const cdK = spt[1];
        const v = value.params[parentKey];
        // console.log('cdk', cdK, v, typeof v);
        // 处理类型条件
        if (Array.isArray(v) && cdK === 'array') {
          return true;
        }

        if (typeof v === 'number' && cdK === 'number') {
          return true;
        }
        if (typeof v === 'boolean' && cdK === 'boolean') {
          return true;
        }
        // 处理条件end
        return false;
      }

      // 处理子父级
      if (f.condition) {
        const spt = f.condition.split('$$')
        const parentKey = spt[0];
        const v = value.params[parentKey];
        if(f.condition === `${parentKey}$$${v}`) {
          return true;
        }
        return false;
      }

      return true;
    });
    return filterValue;
  }

  onChangeCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
    }));
  }

  public render() {
    const { data,
      form: { getFieldDecorator }
    } = this.props;
    const {collapse} = this.state;
    // console.log('data', data)
    return (
      <React.Fragment>
        <div className={styles.zetAmlAlgorithmParamsInfo}>
          <div className={styles.zetAmlAlgorithmParamsInfoTitle} key='name'>{data.name}</div>
          <div className={styles.zetAmlAlgorithmParamsInfoDesc} key='desc'>
            <Ellipsis lines={collapse ? 1 : 100}>
              {data.desc}
            </Ellipsis>
          </div>
          <a style={{ float: 'right' }} onClick={() => this.onChangeCollapse()}>{collapse ? '展开' : '收起'}</a>
        </div>
        <Form layout='horizontal' className={styles.form}>
          {
            data.params && this.handleParams(data.params).map(item => {
              return (
                <FormItem
                  {...formItemLayout}
                  key={item.key}
                  label={item.name}
                  extra={item.extra ? item.extra : null}
                >
                  { getFieldDecorator(item.key, {
                    initialValue: item.default,

                  })(this.renderItem(item)) }
                </FormItem>)
            })
          }
        </Form>
      </React.Fragment>
    );
  }
}

export default Form.create({
  mapPropsToFields(props: ItemProps) {
    const {data, value } = props;

    // 需要处理的字段
    const handleFiled = getHandleParams(data.params);

    const params = {};

    // 遍历参数
    for (const key in value.params) {
      if (value.params.hasOwnProperty(key)) {
        // 获取参数的值
        const res = value.params[key];
        // 需要处理可以该字段
        if(handleFiled[key]) {
          // console.log('r-rr',value, key, res, handleFiled);
          // handleFiled[key]
          // debugger;
          const isHandle = propsToFilesIsHandle(key, res, handleFiled);
          // console.log('isHandle', isHandle, res)
          if (isHandle) {
            const resKey = `${key}##${getKey(res)}`;
            params[key] = Form.createFormField({ value: resKey });
            params[resKey] = Form.createFormField({ value: res });
            continue;
          }
        }
        params[key] = Form.createFormField({ value: res });;
      }
    }
    return params;
  },
  onFieldsChange(props: ItemProps, fields) {
    // TOTO 需要处理参数
    const { data, value, onChange } = props;

    // 需要处理的字段
    const handleFiled = getHandleParams(data.params);

    // 获取当前字段改变的key
    const fieldsKey: any = Object.keys(fields).length > 0 && Object.keys(fields)[0];

    // https://gitlab.datacanvas.com/APS/compass/issues/1037
    if ( fields[fieldsKey].name.indexOf('##number') !== -1) {
      let value = fields[fieldsKey].value;
      if (isNaN(value) || value === '') {
        return false;
      }
      fields[fieldsKey].value = parseFloat(value);
    }

    // 处理子父级关系
    const $$Key = `${fieldsKey}$$${fields[fieldsKey].value}`;
    // debugger;
    const handleCondition = getHandelCondition(data.params);
    if (handleCondition[fieldsKey]) {
      handleCondition[fieldsKey].forEach(fe => {
        if (fe.v !== fields[fieldsKey].value) {
          delete value.params[fe.p.key];
        } else {
          value.params[fe.p.key] = value.params[fe.p.key] || fe.p.default;
        }
      })
      // const currV = handleCondition[fieldsKey].find(fd => fd.v === fields[fieldsKey].value);
      // if (!currV) {
      // }
    }

    // debugger;
    if (handleFiled[fieldsKey]) {
      // debugger;
      const isHandle = fieldsChangeIsHandle(fieldsKey, fields[fieldsKey].value, handleFiled);
      if (isHandle) {
        // 依赖子级key
        // const dpKey = `${fieldsKey}##${handleFiled[fieldsKey]}`;
        // console.log('log', data.params.find(f => f.key === fields[fieldsKey].value))
        value.params[fieldsKey] = data.params.find(f => f.key === fields[fieldsKey].value).default;
      } else {
        value.params[fieldsKey] = fields[fieldsKey].value;
      }
    } else if (fieldsKey.indexOf('##') !== -1) {
      const spt = fieldsKey.split('##');
      value.params[spt[0]] = fields[fieldsKey].value;
    } else {
      value.params[fieldsKey] = fields[fieldsKey].value;
    }

    onChange && onChange({...props.value});
    // console.log('props', props.value, fields);
  },
})(Item);


function fieldsChangeIsHandle(currKey, value,  handleFiled) {

  let flag = handleFiled[currKey].some(key => value === `${currKey}##${key}`);
  if (handleFiled[currKey] && flag) {
    return true;
  }
  return false;
}


/** 判断当前属性是否需要特殊处理 */
function propsToFilesIsHandle(currKey, value, handleFiled) {
  if (handleFiled[currKey].includes('array') && Array.isArray(value) ) {
      return true;
  }

  if (handleFiled[currKey].includes('number') && typeof value === 'number' ) {
    return true;
  }

  if (handleFiled[currKey].includes('boolean') && typeof value === 'boolean' ) {
    return true;
  }
  return false;
}


/**
 * 根据结果值判断要处理的类型
 */
function getKey(value) {
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'number' ) {
    return 'number';
  }

  if (typeof value === 'boolean' ) {
    return 'boolean';
  }
  throw('没有匹配的类型!');
}

/**
 * 获取需要额外处理的参数
 * @param params
 * @returns 返回拆分的数据 {max_feature: array}
 */
function getHandleParams(params) {
  const handleFiled = {};
  // debugger;
  Array.isArray(params) && params.forEach(p => {
    if (p.key.indexOf('##') !== -1) {
      const spt = p.key.split('##');
      if (handleFiled[spt[0]]) {
        handleFiled[spt[0]].push(spt[1]);
      } else {
        handleFiled[spt[0]] = [spt[1]];
      }
    }
  });
  return handleFiled;
}


function getHandelCondition(params) {
  const handleCondition = {};
  // debugger;
  Array.isArray(params) && params.forEach(p => {
    if (p.condition) {
      const spt = p.condition.split('$$');
      if (handleCondition[spt[0]]) {
        handleCondition[spt[0]].push({v: spt[1], p});
      } else {
        handleCondition[spt[0]] = [{v: spt[1], p}];
      }
    }
  });
  return handleCondition;
}
