import * as React from 'react';
import { ResourceContext } from './resourceContext';
import classnames from 'classnames';
import styles from './index.less';
class ResourceGroup extends React.Component {
    render() {
        const { className, title, children, disabled } = this.props;
        const styleProps = {};
        const classNames = classnames(styles.zetResourcePanel, className);
        // context value
        const contextValue = {
            resourceGroup: {
                disabled,
            }
        };
        return (React.createElement("div", { style: styleProps, className: classNames },
            React.createElement("div", { className: styles.zetResourcePanelTitle }, title),
            React.createElement("div", { className: styles.zetResourcePanelContent },
                React.createElement(ResourceContext.Provider, { value: contextValue }, children))));
    }
}
ResourceGroup.defaultProps = {
    title: '',
    className: '',
    style: {},
    disabled: false,
};
export default ResourceGroup;
//# sourceMappingURL=resourceGroup.js.map