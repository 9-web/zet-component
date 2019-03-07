import * as React from 'react';
import classnames from 'classnames';
import ZetInput from '../../components/ZetInput';
import styles from './index.less';
const { ZetSearch } = ZetInput;
class taskGroup extends React.Component {
    constructor(props) {
        super(props);
        this.selectedRow = (record) => {
            this.setState({
                selectedTaskId: record.jobId
            });
            this.props.changeJob && this.props.changeJob(record);
        };
        this.setSelectedModelKeys = (selectedModelKeys) => {
            this.setState({
                selectedModelKeys: selectedModelKeys
            });
        };
        this.instertSelectedRow = (child, extendProps) => {
            if (typeof child === 'object') {
                return React.cloneElement(child, extendProps);
            }
            return child;
        };
        this.search = (keywords) => {
            this.props.onSearch && this.props.onSearch(keywords);
        };
        this.state = {
            selectedTaskId: '',
            selectedModelKeys: []
        };
    }
    componentDidMount() {
        this.setState({
            selectedTaskId: this.props.selectedTaskId
        });
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.selectedTaskId !== nextProps.selectedTaskId) {
            this.setState({
                selectedTaskId: nextProps.selectedTaskId
            });
        }
    }
    render() {
        const { children, className, style, width, ...otherProps } = this.props;
        const { selectedTaskId, selectedModelKeys } = this.state;
        const extendProps = {
            ...otherProps,
            selectedRow: this.selectedRow,
            selectedTaskId,
            setSelectedModelKeys: this.setSelectedModelKeys,
            selectedModelKeys: selectedModelKeys
        };
        const kids = React.Children.map(children, child => {
            return this.instertSelectedRow(child, extendProps);
        });
        const cNames = classnames(styles.zetTaskGroup, className);
        const styleProps = { width, ...style };
        return (React.createElement("div", { className: cNames, style: styleProps },
            React.createElement(ZetSearch, { style: { width: 324, marginBottom: 10 }, onChange: this.search, onSearch: this.search }),
            React.createElement("div", { className: styles.zetTaskList }, kids)));
    }
}
export default taskGroup;
//# sourceMappingURL=taskGroup.js.map