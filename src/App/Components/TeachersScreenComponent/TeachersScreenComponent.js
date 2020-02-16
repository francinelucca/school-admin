import React from 'react';
import TeacherTable from '../TeacherTable';
import Modal from '../Common/Modal';
import TeacherEdit from '../TeacherEdit';
import Button from 'react-bootstrap/Button';


class TeachersScreenComponent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            isModalVisible: false,
            currentModalTitle: "Create New Teacher"
        }
    }

    onTeacherEdit= id => {
        const { onTeacherEdit } = this.props;
        onTeacherEdit(id);
        this.setState({
            isModalVisible: true,
            currentModalTitle: "Update Registered Teacher"
        })
    }

    openEditForm= () => {
       this.setState({
           isModalVisible: true,
           currentModalTitle: "Create New Teacher"
       });
    }

    onCreateTeacher= objTeacherValues => {
        const { createTeacher } = this.props;
        this.onModalClose();
        createTeacher(objTeacherValues);
    }

    onEditTeacher= objTeacherValues => {
        const { editTeacher } = this.props;
        this.onModalClose();
        editTeacher(objTeacherValues);
    }

    renderEditForm= () => {
        const {teacherObj } = this.props;
        return (
            <TeacherEdit
                       createTeacher={this.onCreateTeacher}
                       teacherObj={teacherObj}
                       editTeacher={this.onEditTeacher}/>
        )
    }

    onModalClose= () => {
        const { clearTeacherData } = this.props; 
        this.setState({
            isModalVisible: false
        });
        clearTeacherData();
    }

    render() {
        const {isModalVisible, currentModalTitle} = this.state;
        const { rows, onDeleteTeacher } = this.props;
        return(
            <>
            <Modal isVisible={isModalVisible} 
                   renderBody={this.renderEditForm}
                   title={currentModalTitle}
                   handleClose={this.onModalClose}/>
            <h3>Registered Teachers</h3>
            <TeacherTable rows={rows}
                        onEdit={this.onTeacherEdit}
                        onDeleteTeacher={onDeleteTeacher}/>
            <Button variant="primary" 
                    onClick={this.openEditForm}>
                Add New
            </Button>
            </>

        );
    }
}


export default TeachersScreenComponent;
