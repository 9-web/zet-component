import React from "react";
import { Collapse, Tooltip, Icon } from "antd";

const Panel = Collapse.Panel;

interface CollapseFooterProps {
  data: any;
}
interface CollapseFooterState {}

const messMap = (data) => {
  return Array.isArray(data) && data.map((item, index) => {
    return (
      <p key={index}>{item}</p>
    );
  });
};
const getAmount = (data= {}) => {
  const total = {sum: 0, numeric: 0, text: 0, time: 0};
  Object.keys(data).forEach(item => {
    if (['numeric', 'text', 'time'].includes(item)) {
      if (Array.isArray(data[item])) {
        total.sum += data[item].length;
        total[item] = data[item].length;
      }
    }
  });
  return total;
};

class CollapseFooter extends React.Component<CollapseFooterProps, CollapseFooterState> {
  render() {
    const { data } = this.props;
    const { numeric, text, time } = data;
    const amount = getAmount(data);
    return (
      <React.Fragment>
        <div className={"footer-tile"}>
          {`验证特征 (${amount.sum})`}
          <span style={{ marginLeft: 10 }}>
            <Tooltip title="通过模型训练可以生成或更新衍生特征">
              <Icon type="info-circle" />
            </Tooltip>
          </span>
        </div>
        <Collapse
          defaultActiveKey={["1"]}
          // onChange={callback}
          bordered={false}
          className={"collapse-inner"}
        >
          <Panel header={`数值型  (${amount.numeric})`} key="1">
            {messMap(numeric)}
          </Panel>
          <Panel header={`文本型  (${amount.text})`} key="2">
            {messMap(text)}
          </Panel>
          <Panel header={`时间型  (${amount.time})`} key="3">
            {messMap(time)}
          </Panel>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default CollapseFooter;
