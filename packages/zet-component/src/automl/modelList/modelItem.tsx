import * as React from "react";
import { Icon, Tooltip } from "antd";
import moment from "moment";
import Chart from "../../components/charts";
import Timer from "../../components/timer";
import ZetIcon from "../../components/icon";

import "./index.less";

const { LineChart } = Chart;

export interface ModelItemProps {
  /** model 数据 */
  data: any;
  onSeeLogClick?: (dataId: string) => void;
}

export interface ModelItemState {}

class ModelItem extends React.Component<ModelItemProps, ModelItemState> {
  constructor(props: ModelItemProps) {
    super(props);
    this.state = {};
  }
  timeStatus = () => {
    const { data } = this.props;
    if (data.startTime && data.endTime) {
      return "";
    }
    if (data.status === 5) {
      return "start";
    }
    return "stop";
  }
  iconStatus = (status) => {
    switch (status) {
      // case 0: return intl.get('project.job.block.Queued');
      // case 1: return intl.get('project.job.block.Sent');
      // case 2: return intl.get('project.job.block.Received');
      // case 3: return intl.get('project.job.block.ImgPulling');
      // case 4: return intl.get('project.job.block.ImgPulled');
      case 5:
        return (
          <span className={"status"}>
            <Icon
              type="loading"
              theme="outlined"
              style={{
                color: "#dark-blue-grey-65",
                marginRight: 5,
              }}
            />
            运行中
          </span>
        );
      // case 6: return intl.get('project.job.block.Cancel');
      case 7:
        return (
          <span className={"status"}>
            <Icon
              type="close-circle-o"
              style={{
                color: "rgba(245, 34, 45, 0.85)",
                marginRight: 5,
              }}
            />
            异常
          </span>
        );
      case 8:
        return (
          <span className={"status"}>
            <Icon
              type="check-circle-o"
              style={{
                color: "#13c2c2",
                marginRight: 5,
              }}
            />
            完成
          </span>
        );
      // case 9: return intl.get('project.job.block.Canceling');
      // case 10: return intl.get('project.job.block.Canceled');
      // case 11: return intl.get('project.job.block.Hold');
      // case 12: return intl.get('project.job.block.Stopping');
      // case 13: return intl.get('project.job.block.Stopped');
      // case 14: return intl.get('project.job.block.Terminating');
      // case 15: return intl.get('project.job.block.Terminated');
      // case 16: return intl.get('project.job.block.Paused');
      default:
        return "";
    }
  }
  onSeeLogClick = (dataId) => {
    this.props.onSeeLogClick(dataId);
  }
  formatCpu = () => {
    const { data } = this.props;
    const cpus = data.metricData.cpu;
    if (data.status === 5) {
      return cpus.length > 0
        ? (cpus[cpus.length - 1].y * data.resource.cpus).toFixed(2)
        : 0;
    }
    return data.resource.cpus;
  }

  formatMem = () => {
    const { data } = this.props;
    const mem = data.metricData.mem;
    if (data.status === 5) {
      return mem.length > 0
        ? ((mem[mem.length - 1].y * data.resource.mem) / 1024).toFixed(3)
        : 0;
    }
    if (data.resource.mem) {
      return (data.resource.mem / 1024).toFixed(3);
    }
    return 0;
  }

  formatMGpu = () => {
    const { data } = this.props;
    const gpu = data.metricData.gpu;
    if (data.status === 5) {
      return gpu.length > 0
        ? (gpu[gpu.length - 1].y * data.resource.gpus).toFixed(2)
        : 0;
    }
    return data.resource.gpus;
  }
  render() {
    const { data } = this.props;
    const cpu = data.metricData.cpu;
    const mem = data.metricData.mem;
    const gpu = data.metricData.gpu;
    return (
      <div>
        <div className={"item"} id={data.moduleId}>
          <div className={"itemInfo"}>
            <h3 className={"itemTitle"}>
              <span
                className={"shortName"}
                style={{ fontSize: 16, color: "rgba(16, 38, 58, 0.85)" }}
              >
                {data.alias}
              </span>
              {this.iconStatus(data.status)}
              <Tooltip title="查看日志">
                <span
                  onClick={() => {
                    this.onSeeLogClick(data.id);
                  }}
                >
                  <ZetIcon
                    type="zeticon-file-text1"
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </Tooltip>
            </h3>

            <div
              className={"moduleDescription"}
              style={{ color: "rgba(16, 38, 58, 0.45)", fontSize: 12 }}
            >
              <Tooltip title={data.mouduleDescription}>
                {data.mouduleDescription}
              </Tooltip>
            </div>
          </div>
          <div className={"chartItem"}>
            <div>{this.formatCpu()} CPU(Cores)</div>
            {data.metricData && data.metricData.cpu.length > 0 && (
              <LineChart
                data={cpu}
                chart={{
                  height: 40,
                  padding: [2, 0],
                }}
                geomLine={{
                  type: "area",
                  opacity: 1,
                  color: ["#1c7aee"],
                  tooltip: [
                    "x*y",
                    (x, y) => {
                      return {
                        title: moment(x).format("YYYY-MM-DD HH:mm:ss"),
                        value: y,
                      };
                    },
                  ],
                }}
                geomPoint={{
                  size: 0,
                }}
                showxy={false}
              />
            )}
          </div>
          <div className={"chartItem"}>
            <div>{this.formatMem()} MEM(GB)</div>
            {data.metricData && data.metricData.mem.length > 0 && (
              <LineChart
                data={mem}
                chart={{
                  height: 40,
                  padding: [2, 0],
                }}
                tooltip={
                  {
                    // triggerOn: 'none',
                  }
                }
                geomLine={{
                  type: "area",
                  opacity: 1,
                  color: ["#ffc53d"],
                  tooltip: [
                    "x*y",
                    (x, y) => {
                      return {
                        title: moment(x).format("YYYY-MM-DD HH:mm:ss"),
                        value: y,
                      };
                    },
                  ],
                }}
                geomPoint={{
                  size: 0,
                }}
                showxy={false}
              />
            )}
          </div>
          <div className={"chartItem"}>
            <div>{this.formatMGpu()} GPU(S)</div>
            {data.metricData && data.metricData.gpu.length > 0 && (
              <LineChart
                data={gpu}
                chart={{
                  height: 40,
                  padding: [2, 0],
                }}
                tooltip={
                  {
                    // triggerOn: 'none',
                  }
                }
                geomLine={{
                  type: "area",
                  opacity: 1,
                  color: ["#13c2c2"],
                  tooltip: [
                    "x*y",
                    (x, y) => {
                      return {
                        title: moment(x).format("YYYY-MM-DD HH:mm:ss"),
                        value: y,
                      };
                    },
                  ],
                }}
                geomPoint={{
                  size: 0,
                }}
                showxy={false}
              />
            )}
          </div>
          <div>
            {data.status !== 0 ? (
              <Timer
                start={data.startTime}
                end={data.endTime}
                status={this.timeStatus()}
                data={this.props.data}
              />
            ) : (
              <div className={"timer"}>
                <div className={"timerTit"}>耗时</div>
                <div className={"userTimer"}>- - : - - : - -</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ModelItem;
