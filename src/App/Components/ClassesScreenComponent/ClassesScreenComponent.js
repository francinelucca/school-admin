import React from 'react';
import ClassTable from '../ClassTable';
import Modal from '../Common/Modal';
import ClassEdit from '../ClassEdit';
import Button from 'react-bootstrap/Button';


class ClassScreenComponent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            isModalVisible: false,
            currentModalTitle: "Create New Class"
        }
    }

    onClassEdit= id => {
        const { onClassEdit } = this.props;
        onClassEdit(id);
        this.setState({
            isModalVisible: true,
            currentModalTitle: "Update Registered Class"
        })
    }

    openEditForm= () => {
       this.setState({
           isModalVisible: true,
           currentModalTitle: "Create New Class"
       });
    }

    onCreateClass= objClassValues => {
        const { createClass } = this.props;
        this.onModalClose();
        createClass(objClassValues);
    }

    onEditClass= objClassValues => {
        const { editClass } = this.props;
        this.onModalClose();
        editClass(objClassValues);
    }

    renderEditForm= () => {
        const {teachers, classObj, students } = this.props;
        return (
            <ClassEdit teachers={teachers}
                       createClass={this.onCreateClass}
                       classObj={classObj}
                       editClass={this.onEditClass}
                       students={students}/>
        )
    }

    onModalClose= () => {
        const { clearClassData } = this.props; 
        this.setState({
            isModalVisible: false
        });
        clearClassData();
    }

    render() {
        const {isModalVisible, currentModalTitle} = this.state;
        const { rows, onDeleteClass } = this.props;
        return(
            <>
            <Modal isVisible={isModalVisible} 
                   renderBody={this.renderEditForm}
                   title={currentModalTitle}
                   handleClose={this.onModalClose}/>
            <h3>Registered Classes</h3>
            <ClassTable rows={rows}
                        onEdit={this.onClassEdit}
                        onDeleteClass={onDeleteClass}/>
            <Button variant="primary" 
                    onClick={this.openEditForm}>
                Add New
            </Button>
            </>

        );
    }
}


export default ClassScreenComponent;
