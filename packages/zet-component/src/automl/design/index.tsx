import * as React from 'react';
import classnames from 'classnames';
import { Layout, Menu } from 'antd';
import './index.less';
const { Header, Content, Sider } = Layout;

const { ItemGroup: MenuItemGroup, Item: MenuItem  } = Menu;

/** 左侧列表数据项接口 */
export interface LeftDataItem {
  key: string;
  value: string;
  children?: LeftDataItem;
}

export interface DesignProps {
  /** 组件行行内样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 左侧列表数据 */
  leftData?: LeftDataItem[];
  /** 左侧面板内容自定义渲染 */
  leftRender?: React.ReactNode;
  /** 左侧antd layout.sider容器属性 */
  leftSiderProps?: any;
  /** 左侧antd menu属性 */
  leftMenuProps?: any;
  /** 左侧列表onSelect事件，参数为selectData */
  onSelect: (selectData: LeftDataItem) => void;
}

export interface DesignState {
  selectedKeys: string[];
  selectedData: LeftDataItem;
}

export default class Design extends React.Component<DesignProps, DesignState> {

  constructor(props: DesignProps) {
    super(props);
    const initSelectData = this.getInitSelectData(props.leftData);
    this.state = {
      selectedKeys: [initSelectData.key],
      selectedData: initSelectData,
    };
  }

  getInitSelectData = (leftData) => {
    return (Array.isArray(leftData)
          && leftData.length > 0
          && leftData[0].children
          && leftData[0].children.length > 0
          && leftData[0].children[0]) || {};
  }

  onMenuClick = (data) => {
    const { onSelect } = this.props;
    this.setState({
      selectedKeys: [data.key],
      selectedData: data,
    });
    onSelect && onSelect(data);
  }

  /**
   * 左侧面板内容
   */
  getLeftContent = () => {
    const { leftData, leftRender, leftMenuProps} = this.props;
    const { selectedKeys } = this.state;
    if (leftData) {
      return <Menu
        style={{ border: 'none' }}
        selectedKeys={selectedKeys}
        {...leftMenuProps}
      >
        {
          Array.isArray(leftData) && leftData.map((item) => (
            <MenuItemGroup key={item.key} title={item.value}>
              {
                Array.isArray(item.children) && item.children.map((child) => (
                  <MenuItem  onClick={() => this.onMenuClick(child)} key={child.key}>{child.value}</MenuItem>
                ))
              }
            </MenuItemGroup>
          ))
        }
      </Menu>;
    }
    return leftRender;
  }

  public render() {
    const {
      style,
      className,
      leftSiderProps,
      children,
    } = this.props;
    const { selectedData } = this.state;
    const classNames = classnames('zet-aml-design', className);
    return (
      <Layout
        className={classNames}
        style={style}
      >
        <Sider
          className={'zet-aml-design-sider'}
          width={240}
          theme='light'
          {...leftSiderProps}
        >
          {this.getLeftContent()}
        </Sider>
        <Layout>
          <Header className={'zet-aml-design-header'}>{selectedData.value}</Header>
          <Content className={'zet-aml-design-content'}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
