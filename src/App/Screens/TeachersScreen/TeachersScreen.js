import React from 'react';
import Lodash from 'lodash';


import TeachersScreenComponent from '../../Components/TeachersScreenComponent';
import Api from '../../Core/Api';


class TeacherScreens extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            teacherObj: {},
            teachers: [],
        }
    }

    componentDidMount() {
        this.fetchTeachers()
        .then(objTeachersResponse => {
            const data = Lodash.get(objTeachersResponse, ['data'], []);
            this.setState({
                teachers: data,
            })
        })
        .catch(objError => {
            const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
            alert(message);
        });
    }

    getTeacher=id => {
        return Api.GetTeacher(id)
    }


    fetchTeachers= () => {
        return Api.GetTeachers()
    }

    onTeacherEdit= id => {
        this.getTeacher(id).then(objTeachersResponse => {
            const data = Lodash.get(objTeachersResponse, ['data'], []);
            this.setState(prevState => (
                {
                    teacherObj: data, 
                }))
    })}

    onDeleteTeacher = id => {
        Api.DeleteTeacher(id)
        .then(objResponse => 
            this.setState(prevState => ({
                teachers: prevState.teachers.filter(c => c.id !== id)
            })))
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });;        
    }

    refreshTeachersData= () => {
        this.fetchTeachers()
        .then(objTeachersResponse => {
            const data = Lodash.get(objTeachersResponse, ['data'], []);
            this.setState({
                teachers: data,
            })
        })
        .catch(objError => {
            const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
            alert(message);
        });
    }

    onCreateTeacher= objTeacher => {
       return Api.CreateTeacher({
        firstName: objTeacher.firstName,
        lastName: objTeacher.lastName,
        gender: objTeacher.gender.key,
        idCard:objTeacher.idCard,
        }).then(obj =>
            this.refreshTeachersData())
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });
    }

    onEditTeacher= objTeacher => {
        return Api.EditTeacher(objTeacher.id,{
            firstName: objTeacher.firstName,
            lastName: objTeacher.lastName,
            gender: objTeacher.gender.key,
            idCard:objTeacher.idCard
        }).then(obj =>
            this.refreshTeachersData())
            .catch(objError => {
                const message = Lodash.get(objError, ['response','data'], 'unexpected error occured');
                alert(message);
            });
    }

    clearTeacherData= () => {
        this.setState({
            teacherObj: {}
        });
    }

    render() {
        const {  teacherObj, teachers } = this.state;
        return (
            <TeachersScreenComponent rows={teachers}
                                    onEdit={this.onTeacherEdit}
                                    onDeleteTeacher={this.onDeleteTeacher}
                                    createTeacher={this.onCreateTeacher}
                                    onTeacherEdit={this.onTeacherEdit}
                                    teacherObj={teacherObj}
                                    editTeacher={this.onEditTeacher}
                                    clearTeacherData={this.clearTeacherData}/>
        )
    }
}

export default TeacherScreens;