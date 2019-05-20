import * as React from 'react';
import { Button } from 'antd';
import { LocaleReceiverHoc } from "../../utils/hoc";

import './index.less';

export interface ContrastButtonProps {
  /** 组件行行内样式 */
  contrastIds?: string[];
  /** 对比模型id */
  contrastJobId?: string;
  item: any;
  jobName: string;
  jobId: string;
  style?: object;
  intl?: any;
  showContras?: (item: object, jobId: string, jobName: string) => void;
}

class ContrastButton extends React.Component<ContrastButtonProps, any> {
  constructor(props: ContrastButtonProps) {
    super(props);
    this.state = {};
  }
  showContras = (e, item, jobId , jobName) => {
    e.stopPropagation();
    this.props.showContras(item, jobId, jobName);
  }

  isDisabled = () => {
    const { item, contrastIds, contrastJobId, jobId } = this.props;
    if (contrastJobId && contrastJobId !== jobId) {
      return true;
    }
    if (item.modelTrainStatus) {
      return contrastIds.indexOf(item.modelId) !== -1 || item.modelTrainStatus !== 'SUCCESS';
    }
    if (item.trainStatus) {
      return contrastIds.indexOf(item.modelId) !== -1 || item.trainStatus !== 'SUCCESS';
    }
    return contrastIds.indexOf(item.modelId) !== -1;
  }
  render() {
    const { contrastIds, item, jobName, style, jobId, intl= {} } = this.props;
    return (
      <Button
        size='small'
        style={style}
        className={'ml15'}
        disabled={this.isDisabled()}
        onClick={(e) => {
          this.showContras(e, item, jobId, jobName);
        }}
      >
        {contrastIds.indexOf(item.modelId) !== -1 ? (intl.added || '已添加') : (intl.contrast || '对比')}
      </Button>
    );
  }
}

export default LocaleReceiverHoc('AutoML')(ContrastButton);
