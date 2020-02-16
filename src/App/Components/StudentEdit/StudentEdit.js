import React from 'react';
import Lodash from 'lodash';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import StudentClassTable from '../StudentClassTable';
import Moment from 'moment';

import './StudentEdit.css';
import Dropdown from '../Dropdown';

const OPTIONS = [
    {
    key: 'F',
    label: 'Female'
    },
    {
    key: 'M',
    label: 'Male'
    },
]

class StudentEdit extends React.Component {

    static getDerivedStateFromProps(props, state){
        if(Lodash.isUndefined(state.values.id)){
            let newState= {};
            if(!Lodash.isEmpty(props.classes) && Lodash.isEmpty(state.values.classes) && Lodash.isEmpty(state.values.enrollableClasses)){
             newState= {
                    ...state,
                    values: {
                        ...state.values,
                        enrollableClasses: props.classes
                    }
                };
            }
            if(!Lodash.isEmpty(props.studentObj)){
                newState = {
                    ...state,
                    values: {
                        id: props.studentObj.id,
                        gender: {
                            label: props.studentObj.gender === 'F' ? 'Female' : 'Male',
                            key: props.studentObj.gender
                        },
                        firstName: props.studentObj.firstName,
                        lastName: props.studentObj.lastName,
                        birthDay: props.studentObj.birthDay,
                        studentId: props.studentObj.studentId,
                        classes: props.studentObj.classes,
                        enrollableClasses: props.studentObj.enrollableClasses,
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
                gender: {
                    label: "Genre",
                    key: 1,
                },
                firstName: '',
                lastName: '',
                birthDay: null,
                studentId: '',
                classes: [],
                enrollableClasses: []
            },
        }
    }
    handleSelectedGenre = (objGender) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                gender: objGender
            } 
        }))
    };
    
    handleCreateStudent= () => {
        const { values } = this.state;
        const { createStudent, editStudent } = this.props;
        return Lodash.isUndefined(values.id) ? createStudent(values): editStudent(values);
    };

    handleStudentFirstNameChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
               firstName: key
            } 
        }))
    }

    handleStudentLastNameChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                lastName: key
            } 
        }))
    }

    handleStudentStudentIdChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                studentId: key
            } 
        }))
    }

    handleStudentBirthDayChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                birthDay: key
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

    onAddClass= (classObj) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                classes: 
                [...prevState.values.classes,classObj],
                enrollableClasses:
                prevState.values.enrollableClasses.filter(s => s.id!==classObj.id)
            }
        }));
    }

    onRemoveClass=(classObj) => {
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                enrollableClasses: 
                [...prevState.values.enrollableClasses,classObj],
                classes:
                prevState.values.classes.filter(s => s.id!==classObj.id)
            }
        }));
    }

    render() {
        const { values } = this.state;
        return (
        <div>
        {this.renderId()}     
        <Form >
        <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter First Name"
                          onChange={this.handleStudentFirstNameChange}
                          value={values.firstName} />
        </Form.Group>

        <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" 
                          placeholder="Enter Last Name"
                          onChange={this.handleStudentLastNameChange}
                          value={values.lastName}  />
        </Form.Group>

        <Form.Group controlId="formBirthDay">
            <Form.Label>Birth Day</Form.Label>
            <Form.Control type="date" 
                        placeholder="Enter Date"
                        onChange={this.handleStudentBirthDayChange}
                        value={values.birthDay ? Moment(values.birthDay).format('YYYY-MM-DD') : ''}  />
        </Form.Group>

        <Form.Group controlId="formStudentId">
            <Form.Label>Student ID</Form.Label>
            <Form.Control type="text" 
                        placeholder="Enter Student ID"
                        onChange={this.handleStudentStudentIdChange}
                        value={values.studentId}  />
        </Form.Group>

        <Form.Group controlId="formStudentGender">
            <Form.Label>Gender</Form.Label>
            <Dropdown 
                options={OPTIONS}
                onSelect={this.handleSelectedGenre}
                selectedValue={values.gender}                
            />
        </Form.Group>
        <StudentClassTable enrolledClasses={values.classes}
                           enrollableClasses={values.enrollableClasses}
                           onAddClass={this.onAddClass}
                           onRemoveClass={this.onRemoveClass}/>
        <Button variant="primary" 
                onClick={this.handleCreateStudent}>
            Save
        </Button>
        </Form>           
        </div>
        );

    }
}

export default StudentEdit;