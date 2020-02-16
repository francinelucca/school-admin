import React from 'react';
import Lodash from 'lodash';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TeacherClassTable from '../TeacherClassTable';

import './TeacherEdit.css';
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

class TeacherEdit extends React.Component {

    static getDerivedStateFromProps(props, state){
        if(Lodash.isUndefined(state.values.id) && !Lodash.isEmpty(props.teacherObj)){
               let newState = {
                    ...state,
                    values: {
                        id: props.teacherObj.id,
                        gender: {
                            label: props.teacherObj.gender === 'F' ? 'Female' : 'Male',
                            key: props.teacherObj.gender
                        },
                        firstName: props.teacherObj.firstName,
                        lastName: props.teacherObj.lastName,
                        idCard: props.teacherObj.idCard,
                        classes: props.teacherObj.classes,
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
                idCard: '',
                classes: [],
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
    
    handleCreateTeacher= () => {
        const { values } = this.state;
        const { createTeacher, editTeacher } = this.props;
        return Lodash.isUndefined(values.id) ? createTeacher(values): editTeacher(values);
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

    handleStudentIdCardChange= e => {
        const key = e.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                idCard: key
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
                          placeholder="Enter Last Room"
                          onChange={this.handleStudentLastNameChange}
                          value={values.lastName}  />
        </Form.Group>

        <Form.Group controlId="formIdCard">
            <Form.Label>ID Card</Form.Label>
            <Form.Control type="text" 
                        placeholder="Enter ID Card"
                        onChange={this.handleStudentIdCardChange}
                        value={values.idCard}  />
        </Form.Group>

        <Form.Group controlId="formTeacherGender">
            <Form.Label>Gender</Form.Label>
            <Dropdown 
                options={OPTIONS}
                onSelect={this.handleSelectedGenre}
                selectedValue={values.gender}                
            />
        </Form.Group>
        <TeacherClassTable classes={values.classes}/>
        <Button variant="primary" 
                onClick={this.handleCreateTeacher}>
            Save
        </Button>
        </Form>           
        </div>
        );

    }
}

export default TeacherEdit;