import React from 'react';
import Lodash from 'lodash';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ClassStudentTable from '../ClassStudentTable';

import './ClassEdit.css';
import Dropdown from '../Dropdown';

class ClassEdit extends React.Component {

    static getDerivedStateFromProps(props, state){
        if(Lodash.isUndefined(state.values.id)){
            let newState= {};
            if(!Lodash.isEmpty(props.students) && Lodash.isEmpty(state.values.students) && Lodash.isEmpty(state.values.enrollableStudents)){
             newState= {
                    ...state,
                    values: {
                        ...state.values,
                        enrollableStudents: props.students
                    }
                };
            }
            if(!Lodash.isEmpty(props.classObj)){
                newState = {
                    ...state,
                    values: {
                        id: props.classObj.id,
                        selectedTeacher: {
                            label: props.classObj.teacher.firstName + ' ' + props.classObj.teacher.lastName,
                            key: props.classObj.teacher.id
                        },
                        name: props.classObj.name,
                        classroom: props.classObj.classroom,
                        students: props.classObj.students,
                        enrollableStudents: props.classObj.enrollableStudents,
                    }
                }
            }
            return newState;
        }

    }
    constructor(props){
        super(props);
        this.state = {
            values: {
                selectedTeacher: {
                    label: "Teachers",
                    key: 1,
                },
                name: '',
                classroom: '',
                students: [],
                enrollableStudents: []
            },
        }
    }
    handleSelectedTeacher = (objOption) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                selectedTeacher: objOption
            } 
        }))
    };
    
    handleCreateClass= () => {
        const { values } = this.state;
        const { createClass, editClass } = this.props;
        return Lodash.isUndefined(values.id) ? createClass(values): editClass(values);
    };

    handleClassNameChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
               name: key
            } 
        }))
    }

    handleClassroomNameChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                classroom: key
            } 
        }))
    }

    renderId= () => {
        const {values } = this.state;
        if(values.id){
            return (
            <label>ID: {values.id}</label>
            )
        }
    }

    onAddStudent= (student) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                students: 
                [...prevState.values.students,student],
                enrollableStudents:
                prevState.values.enrollableStudents.filter(s => s.id!=student.id)
            }
        }));
    }

    onRemoveStudent=(student) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                enrollableStudents: 
                [...prevState.values.enrollableStudents,student],
                students:
                prevState.values.students.filter(s => s.id!=student.id)
            }
        }));
    }

    render() {
        const { teachers } = this.props;
        const { values } = this.state;
        const options = teachers ? teachers.map(t => {
            return {
                    key: t.id,
                    label: t.firstName + ' ' + t.lastName
                }
        }): [];
        return (
        <div>
        {this.renderId()}     
        <Form >
        <Form.Group controlId="classNameForm">
            <Form.Label>Class Name</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter Class Name"
                          onChange={this.handleClassNameChange}
                          value={values.name} />
        </Form.Group>

        <Form.Group controlId="formClassRoom">
            <Form.Label>Class Room</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter Class Room"
                          onChange={this.handleClassroomNameChange}
                          value={values.classroom}  />
        </Form.Group>
        <Form.Group controlId="formClassTeacher">
            <Form.Label>Teacher</Form.Label>
            <Dropdown 
                options={options}
                onSelect={this.handleSelectedTeacher}
                selectedValue={values.selectedTeacher}                
            />
        </Form.Group>
        <ClassStudentTable enrolledStudents={values.students}
                           enrollableStudents={values.enrollableStudents}
                           onAddStudent={this.onAddStudent}
                           onRemoveStudent={this.onRemoveStudent}/>
        <Button variant="primary" 
                onClick={this.handleCreateClass}>
            Save
        </Button>
        </Form>           
        </div>
        );

    }
}

export default ClassEdit;