import * as React from 'react';
import PropTypes from 'prop-types';
import { AchieveContext } from './context';
import styles from './index.less';
class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.getPanelUnfoldCondition = (unfoldState, extraKeys) => {
            const { option } = this.props;
            if (extraKeys === 'all' || extraKeys.indexOf(option) > -1) {
                return unfoldState === 'open';
            }
            else {
                return true;
            }
        };
        this.state = {};
    }
    render() {
        let { style, width, height, children, unfoldState, extraKeys, ...otherProps } = this.props;
        let styleProps = { width, height, ...style };
        if (this.props.flex) {
            styleProps.flex = 1;
        }
        if (!this.getPanelUnfoldCondition(unfoldState, extraKeys)) {
            styleProps.height = 0;
            delete styleProps.flex;
        }
        return (React.createElement("div", Object.assign({ className: styles['zet-panel'], style: styleProps }, otherProps), children));
    }
}
Panel.defaultProps = {
    width: '100%',
    onChange: () => { },
};
Panel.contextTypes = {
    unfoldState: PropTypes.string,
    extraKeys: PropTypes.any,
};
export default props => (React.createElement(AchieveContext.Consumer, null, ({ unfoldState, extraKeys }) => {
    return React.createElement(Panel, Object.assign({}, { ...props, unfoldState, extraKeys }));
}));
//# sourceMappingURL=panel.js.map