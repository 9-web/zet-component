import * as React from 'react';
import classnames from 'classnames';
import Input from '../../components/input'
import styles from './index.less';

const {Search} = Input;

export interface taskGroupProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties,
  /** 自定义类名 */
  className?: string,
  width?: string | number,
  changeJob?:(record:object)=>void,
  delJob?:(jobId:string)=>void,
  onSearch?:(keywords:string)=>void,
  selectedTaskId?:string
}

export interface taskGroupState {
  selectedTaskId:string,
  selectedModelKeys:string[],
}

class taskGroup extends React.Component<taskGroupProps, taskGroupState> {
  constructor(props: taskGroupProps) {
    super(props);
    this.state = {
      selectedTaskId:'',
      selectedModelKeys:[]
    }
  }
  componentDidMount(){
    this.setState({
      selectedTaskId:this.props.selectedTaskId
    })
  }
  componentWillReceiveProps(nextProps){
    if(this.props.selectedTaskId !== nextProps.selectedTaskId){
      this.setState({
        selectedTaskId:nextProps.selectedTaskId
      })
    }
  }
  selectedRow = (record)=>{
    this.setState({
      selectedTaskId:record.jobId
    })
    this.props.changeJob && this.props.changeJob(record)
  }
  setSelectedModelKeys = (selectedModelKeys) => {
    this.setState({
      selectedModelKeys:selectedModelKeys
    })
  };
  instertSelectedRow = (child, extendProps) => {
    if(typeof child === 'object'){
      return React.cloneElement(child,extendProps)
    }
    return child
  };
  search = (keywords) => {
    this.props.onSearch && this.props.onSearch(keywords)
  };
  render() {
    const { children, className,style,width,...otherProps } = this.props;
    const { selectedTaskId,selectedModelKeys } = this.state;
    const extendProps = {
      ...otherProps,
      selectedRow:this.selectedRow,
      selectedTaskId,
      setSelectedModelKeys:this.setSelectedModelKeys,
      selectedModelKeys:selectedModelKeys
    }
    const kids = React.Children.map(children, child =>{
      return this.instertSelectedRow(child as React.ReactChild,extendProps)
    })
    const cNames = classnames(styles.zetTaskGroup, className);
    const styleProps = {width, ...style};
    return (
      <div className={cNames} style={styleProps}>
        <Search
          style={{ width: 324,marginBottom:10 }}
          onChange={this.search}
          onSearch={this.search}
        />
        <div className={styles.zetTaskList}>
          {kids}
        </div>
      </div>
    );
  }
}

export default taskGroup
