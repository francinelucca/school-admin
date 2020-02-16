import axios from 'axios';

const API_HOST = 'https://schoolapiflucca.azurewebsites.net/api';


export const SchoolApi = axios.create({
    baseURL: API_HOST,
})

const GetStudents = () => {
    return SchoolApi.get(`Students`);
}

const GetStudent = studentId => {
    return SchoolApi.get(`Students/${studentId}`);
}

const DeleteStudent = studentId => {
    return SchoolApi.delete(`Students/${studentId}`);
}

const CreateStudent = objStudent => {
    return SchoolApi.post(`Students`, objStudent);
}

const EditStudent = (studentId, objStudent) => {
    return SchoolApi.put(`Students/${studentId}`, objStudent);
}

const GetTeachers = () => {
    return SchoolApi.get(`Teachers`);
}

const GetTeacher = teacherId => {
    return SchoolApi.get(`Teachers/${teacherId}`);
}

const DeleteTeacher = teacherId => {
    return SchoolApi.delete(`Teachers/${teacherId}`);
}

const CreateTeacher = objTeacher => {
    return SchoolApi.post(`Teachers`, objTeacher);
}

const EditTeacher = (teacherId, objTeacher) => {
    return SchoolApi.put(`Teachers/${teacherId}`, objTeacher);
}

const GetClasses = () => {
    return SchoolApi.get(`Classes`);
}

const GetClass = classId => {
    return SchoolApi.get(`Classes/${classId}`);
}

const DeleteClass = classId => {
    return SchoolApi.delete(`Classes/${classId}`);
}

const CreateClass = objClass => {
    return SchoolApi.post(`Classes`, objClass);
}

const EditClass = (classId, objClass) => {
    return SchoolApi.put(`Classes/${classId}`, objClass);
}

const Api = {
    GetStudents,
    GetStudent,
    CreateStudent,
    EditStudent,
    DeleteStudent,
    GetTeachers,
    GetTeachers,
    CreateTeacher,
    EditTeacher,
    DeleteTeacher,
    GetClasses,
    GetClass,
    CreateClass,
    EditClass,
    DeleteClass
}

export default Api;