import React from 'react';
import Lodash from 'lodash';


import StudentsScreenComponent from '../../Components/StudentsScreenComponent';
import Api from '../../Core/Api';


class StudentsScreen extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            classes: [],
            studentObj: {},
            students: [],
        }
    }

    componentDidMount() {
        this.fetchStudents()
        .then(objStudentsResponse => {
            const data = Lodash.get(objStudentsResponse, ['data'], []);
            this.setState({
                students: data,
            })
        })
        .catch(objError => {
            const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
            alert(message);
        });

        this.getClasses().then(objClassesData => {
            const data = Lodash.get(objClassesData, ['data'], []);
            this.setState({
                classes: data,
            })
        })
        .catch(objError => {
            const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
            alert(message);
        });


    }

    getClasses=() => {
        return Api.GetClasses()
    }

    getStudent=id => {
        return Api.GetStudent(id)
    }


    fetchStudents= () => {
        return Api.GetStudents()
    }

    onStudentEdit= id => {
        this.getStudent(id).then(objStudentResponse => {
            const data = Lodash.get(objStudentResponse, ['data'], []);
            const classes = Lodash.get(data,['classes'],[]);
            this.setState(prevState => (
                {
                studentObj: {...data, 
                    enrollableClasses: !Lodash.isEmpty(classes) ? prevState.classes.filter(c => !classes.map(s => s.id).includes(c.id)) : prevState.classes
                },               
            }))
        })

    }

    onDeleteStudent= id => {
        Api.DeleteStudent(id)
        .then(objResponse => 
            this.setState(prevState => ({
                students: prevState.students.filter(c => c.id !== id)
            })))
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });      
    }

    refreshStudentsData= () => {
        this.fetchStudents()
        .then(objStudentsResponse => {
            const data = Lodash.get(objStudentsResponse, ['data'], []);
            this.setState({
                students: data,
            })
        })
        .catch(objError => {
            const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
            alert(message);
        });
    }

    onCreateStudent= objStudent => {
       return Api.CreateStudent({
        firstName: objStudent.firstName,
        lastName: objStudent.lastName,
        gender: objStudent.gender.key,
        birthDay: objStudent.birthDay,
        studentId:objStudent.studentId,
        classes: !Lodash.isEmpty(objStudent.classes) ? objStudent.classes.map(c => c.id) : []
        }).then(obj =>
            this.refreshStudentsData())
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });
    }

    onEditStudent= objStudent => {
        return Api.EditStudent(objStudent.id,{
            firstName: objStudent.firstName,
            lastName: objStudent.lastName,
            gender: objStudent.gender.key,
            birthDay: objStudent.birthDay,
            studentId:objStudent.studentId,
            classes: !Lodash.isEmpty(objStudent.classes) ? objStudent.classes.map(c => c.id) : []
        }).then(obj =>
            this.refreshStudentsData())
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });
    }

    clearStudentData= () => {
        this.setState({
            studentObj: {}
        });
    }

    render() {
        const { classes, studentObj, students } = this.state;
        return (
            <StudentsScreenComponent rows={students}
                                    onEdit={this.onStudentEdit}
                                    onDeleteStudent={this.onDeleteStudent}
                                    createStudent={this.onCreateStudent}
                                    onStudentEdit={this.onStudentEdit}
                                    studentObj={studentObj}
                                    editStudent={this.onEditStudent}
                                    clearStudentData={this.clearStudentData}
                                    classes={classes}/>
        )
    }
}

export default StudentsScreen;