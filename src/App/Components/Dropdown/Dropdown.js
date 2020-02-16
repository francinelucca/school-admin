import React from 'react';
import Lodash from 'lodash';
import Dropdown from 'react-bootstrap/Dropdown';

class DropdownComponent extends React.Component {

    static getDerivedStateFromProps(props, state){
        if(!Lodash.isEqual(props.selectedValue, state.selectedValue)){
            return {
                selectedValue: props.selectedValue
            }
        }
    }
    constructor(props){
        super(props);
        this.state= {
            selectedValue: props.selectedValue
        }
    }

    getDropdownMenus = () => {
        const { options } = this.props;
        return (
            options.map(option => {
              return (
                <Dropdown.Item key={option.key} eventKey={option}
                onClick={() => this.handleOnSelectItem(option)}>{option.label}</Dropdown.Item>
              )
            })
        );
    }

    handleOnSelectItem = (objOption) => {
        const { onSelect } = this.props;
        this.setState({
            selectedValue: objOption
        });

        return onSelect(objOption);
    }

    render() {
        const { selectedValue } = this.state;
        return ( 
        <Dropdown >
            <Dropdown.Toggle variant="info"
            id="dropdown-basic">
                {selectedValue.label || ''}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {this.getDropdownMenus()}
            </Dropdown.Menu>
        </Dropdown>
        )
    }
}

export default DropdownComponent;