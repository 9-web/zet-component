import React from 'react';
// import classnames from 'classnames';
import ModuleListItem from './modelItem';
import ModelDetail from './modelDetail';
import ModelChart from './modelChart';

import './index.less';

export interface ModelListProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  /** model 数据 */
  data: any;
  /** 展示类型 */
  contentType: string;
  /** job数据 */
  jobData?: any;
  autoMLInfo?: any;
  /** job id */
  jobId?: string;
  /** 查看日志回调  contentType 值为 detail */
  getView?: (blockId: string) => void;
  /** 预测按钮事件回调  contentType 值为 detail */
  getForecast?: (moduleId: string) => void;
  /** 查看详情回调  contentType 值为 detail */
  openModelDetail?: (modelId: string, modelName: string, jobId: string) => void;
  onSeeLogClick?: (dataId: string) => void;
}

class ModelList extends React.Component<ModelListProps, any> {
  constructor(props: ModelListProps) {
    super(props);
    this.state = {};
  }
  sort = () => {
    const { data } = this.props;
    const arr = data.filter((v) => [5, 7, 8].indexOf(v.status) !== -1);
    return arr;
  }
  getContent = () => {
    const { contentType, width, height, style, autoMLInfo } = this.props;
    const { jobData, jobId, data, ...otherProps } = this.props;
    let result;
    const styleProps = {width, height, ...style};
    switch (contentType) {
      case 'list' :
        result = (
          <div className={'mudoleList'} style={styleProps}>
            <div className={'listWrap'}>
              {
                this.sort().length > 0 && this.sort().map((v) => {
                  if (v.mouduleName) {
                    return (
                      <ModuleListItem key={v.id} data={v} onSeeLogClick={this.props.onSeeLogClick}/>
                    );
                  }
                  return '';
                })
              }
            </div>
          </div>);
        break;
      case 'detail':
        result = (
          <div className={'mdlMain'}>
            {jobData.map((item, index) => {
              return <ModelDetail
                item={item}
                jobId={jobId}
                key={index}
                getView={this.props.getView}
                getForecast={this.props.getForecast}
                openModelDetail={this.props.openModelDetail}
              ></ModelDetail>;
            })}
        </div>
        );
        break;
      case 'chart':
        result = (
          <div className={'mdlMain'}>
            {data.map((item, index) => {
              return <ModelChart
                item={item}
                autoMLInfo={autoMLInfo}
                jobId={jobData.jobId}
                key={index}
                {...otherProps}
                {...item.scales}
                options={item.options}
                getView={this.props.getView}
                getForecast={this.props.getForecast}
                openModelDetail={this.props.openModelDetail}
              ></ModelChart>;
            })}
          </div>
        );
        break;
      default: null;
    }
    return result;
  }
  render() {
    return (
      <React.Fragment>
        {this.getContent()}
      </React.Fragment>

    );
  }
}

export default ModelList;
