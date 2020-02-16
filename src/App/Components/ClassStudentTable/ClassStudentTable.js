import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Lodash from 'lodash';

class ClassStudentTable extends React.Component {

    renderEnrolledStudents = () => {
        const {enrolledStudents, onRemoveStudent} = this.props;

        return !Lodash.isEmpty(enrolledStudents) ? enrolledStudents.map(r => {
            return (
                <tr>
                  <td>{r.id}</td>
                  <td>{r.firstName}</td>
                  <td>{r.lastName}</td>
                  <td>
                      <Button variant="danger" onClick={() => onRemoveStudent(r)}>-</Button>
                  </td>
                </tr>
            )
        }) : [];
    }

    renderEnrollableStudents = () => {
        const {enrollableStudents, onAddStudent} = this.props;

        return !Lodash.isEmpty(enrollableStudents) ? enrollableStudents.map(r => {
            return (
                <tr>
                  <td>{r.id}</td>
                  <td>{r.firstName}</td>
                  <td>{r.lastName}</td>
                  <td>
                      <Button variant="success" onClick={() => onAddStudent(r)}>+</Button>
                  </td>
                </tr>
            )
        }) : [];
    }

    render() {
    
        return (
            <>
        <h4>Enrolled Students</h4>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {this.renderEnrolledStudents()}
        </tbody>
      </Table>
       <h4>Enrollable Students</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {this.renderEnrollableStudents()}
        </tbody>
      </Table>
      </>
        );
    }
};

export default ClassStudentTable;