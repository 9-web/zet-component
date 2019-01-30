import TreeSelect from './tree-select';
import * as React from "react";
class Select extends React.Component {
    render() {
        const { title } = this.props;
        return React.createElement("div", null, title);
    }
}
Select.TreeSelect = TreeSelect;
export default Select;
//# sourceMappingURL=index.js.map