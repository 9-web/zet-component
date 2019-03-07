import * as React from 'react';
import classnames from 'classnames';
import styles from './index.less';
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { style, className, width, children } = this.props;
        const classNames = classnames(styles.zetContent, className);
        const styleProps = { ...style, width };
        return (React.createElement("div", { className: classNames, style: styleProps }, children));
    }
}
export default Content;
//# sourceMappingURL=content.js.map