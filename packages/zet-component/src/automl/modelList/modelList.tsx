import React from 'react';
import classnames from 'classnames';
import ModuleListItem from './modelItem';
import ModelDetail from './modelDetail'

import styles from './index.less';

export interface ModelListProps {
  /** model 数据 */
  data:any,
  /** 展示类型 */
  contentType:string,
  /** job数据 */
  jobData?:any,
  /** job id */
  jobId?:string,
  /** 查看日志回调  contentType 值为 detail*/
  getView?:(blockId:string)=>void,
  /** 预测按钮事件回调  contentType 值为 detail*/
  getForecast?:(moduleId:string)=>void,
  /** 查看详情回调  contentType 值为 detail*/
  openModelDetail?:(modelId:string,modelName:string,jobId:string)=>void
}

export interface ModelListState {

}

class ModelList extends React.Component<ModelListProps, ModelListState> {
  constructor(props: ModelListProps) {
    super(props);
    this.state = {}
  }
  sort=() => {
    const { data } = this.props;
    const arr = data.filter(v => [5, 7, 8].indexOf(v.status) !== -1);
    return arr;
  }
  getContent = () => {
    const { contentType }= this.props;
    if(contentType === 'list'){
        return (
          <div className={styles.mudoleList}>
            <div className={styles.listWrap}>
              {
                this.sort().length > 0 && this.sort().map((v) => {
                  if (v.mouduleName) {
                    return (
                      <ModuleListItem data={v} />
                    );
                  }
                  return '';
                })
              }
            </div>
          </div>
        )
      }else{
        const { jobData, jobId } = this.props;
        return (
          <div className={styles.mdlMain}>
            {jobData.map((item,index)=>{
              return <ModelDetail
                item={item}
                jobId={jobId}
                key={index}
                getView={this.props.getView}
                getForecast={this.props.getForecast}
                openModelDetail={this.props.openModelDetail}
              ></ModelDetail>
            })}
          </div>
        )
      }
  };
  render() {
    return (
      <div>
        {this.getContent()}
      </div>

    );
  }
}

export default ModelList
