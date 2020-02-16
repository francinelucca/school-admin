import React from 'react';
import Lodash from 'lodash';


import ClassesScreenComponent from '../../Components/ClassesScreenComponent';
import Api, { SchoolApi } from '../../Core/Api';


class ClassesScreen extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            classes: [],
            teachers: [],
            classObj: {},
            students: [],
        }
    }

    componentDidMount() {
        this.fetchClasses()
        .then(objClassesResponse => {
            const data = Lodash.get(objClassesResponse, ['data'], []);
            this.setState({
                classes: data,
            })
        });

        this.getTeachers().then(objTeachersData => {
            const data = Lodash.get(objTeachersData, ['data'], []);
            this.setState({
                teachers: data,
            })
        });

        this.getStudents().then(objStudentsData => {
            const data = Lodash.get(objStudentsData, ['data'], []);
            this.setState({
                students: data,
            })
        });


    }
    getTeachers=() => {
        return  Api.GetTeachers();
    }

    getStudents=() => {
        return Api.GetStudents();
    }

    getClass=id => {
        return Api.GetClass(id);
    }


    fetchClasses= () => {
        return Api.GetClasses();
    }

    onClassEdit= id => {
        this.getClass(id).then(objClassResponse => {
            const data = Lodash.get(objClassResponse, ['data'], []);
            const students = Lodash.get(data,['students'],[]);
            console.log(data);
            this.setState(prevState => (
                {
                classObj: {...data, 
                    enrollableStudents: !Lodash.isEmpty(students) ? prevState.students.filter(c => !students.map(s => s.id).includes(c.id)) : prevState.students
                },               
            }))
        })

    }

    onDeleteClass= id => {
        Api.DeleteClass(id)
        .then(objResponse => 
            this.setState(prevState => ({
                classes: prevState.classes.filter(c => c.id !== id)
            })));        
    }

    refreshClassesData= () => {
        this.fetchClasses()
        .then(objClassesResponse => {
            const data = Lodash.get(objClassesResponse, ['data'], []);
            this.setState({
                classes: data,
            })
        });
    }

    onCreateClass= objClass => {
       return Api.CreateClass({
            name: objClass.name,
            classroom: objClass.classroom,
            teacherId: objClass.selectedTeacher.key,
            students: !Lodash.isEmpty(objClass.students) ? objClass.students.map(c => c.id) : []
        }).then(obj =>
            this.refreshClassesData())
    }

    onEditClass= objClass => {
        return Api.EditClass(objClass.id,{
            name: objClass.name,
            classroom: objClass.classroom,
            teacherId: objClass.selectedTeacher.key,
            students: !Lodash.isEmpty(objClass.students) ? objClass.students.map(c => c.id) : []
        }).then(obj =>
            this.refreshClassesData())
    }

    clearClassData= () => {
        this.setState({
            classObj: {}
        });
    }

    render() {
        const { classes, teachers, classObj, students } = this.state;
        return (
            <ClassesScreenComponent rows={classes}
                                    onEdit={this.onClassEdit}
                                    onDeleteClass={this.onDeleteClass}
                                    teachers={teachers}
                                    createClass={this.onCreateClass}
                                    onClassEdit={this.onClassEdit}
                                    classObj={classObj}
                                    editClass={this.onEditClass}
                                    clearClassData={this.clearClassData}
                                    students={students}/>
        )
    }
}

export default ClassesScreen;