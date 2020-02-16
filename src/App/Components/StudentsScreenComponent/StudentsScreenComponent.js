import React from 'react';
import StudentTable from '../StudentTable';
import Modal from '../Common/Modal';
import StudentEdit from '../StudentEdit';
import Button from 'react-bootstrap/Button';


class StudentsScreenComponent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            isModalVisible: false,
            currentModalTitle: "Create New Student"
        }
    }

    onStudentEdit= id => {
        const { onStudentEdit } = this.props;
        onStudentEdit(id);
        this.setState({
            isModalVisible: true,
            currentModalTitle: "Update Registered Student"
        })
    }

    openEditForm= () => {
       this.setState({
           isModalVisible: true,
           currentModalTitle: "Create New Student"
       });
    }

    onCreateStudent= objStudentValues => {
        const { createStudent } = this.props;
        this.onModalClose();
        createStudent(objStudentValues);
    }

    onEditStudent= objStudentValues => {
        const { editStudent } = this.props;
        this.onModalClose();
        editStudent(objStudentValues);
    }

    renderEditForm= () => {
        const {studentObj, classes } = this.props;
        return (
            <StudentEdit
                       createStudent={this.onCreateStudent}
                       studentObj={studentObj}
                       editStudent={this.onEditStudent}
                       classes={classes}/>
        )
    }

    onModalClose= () => {
        const { clearStudentData } = this.props; 
        this.setState({
            isModalVisible: false
        });
        clearStudentData();
    }

    render() {
        const {isModalVisible, currentModalTitle} = this.state;
        const { rows, onDeleteStudent } = this.props;
        return(
            <>
            <Modal isVisible={isModalVisible} 
                   renderBody={this.renderEditForm}
                   title={currentModalTitle}
                   handleClose={this.onModalClose}/>
            <h3>Registered Students</h3>
            <StudentTable rows={rows}
                        onEdit={this.onStudentEdit}
                        onDeleteStudent={onDeleteStudent}/>
            <Button variant="primary" 
                    onClick={this.openEditForm}>
                Add New
            </Button>
            </>

        );
    }
}


export default StudentsScreenComponent;
