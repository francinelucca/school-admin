import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Lodash from 'lodash';

class StudentClassTable extends React.Component {

    renderEnrolledClasses = () => {
        const {enrolledClasses, onRemoveClass} = this.props;

        return !Lodash.isEmpty(enrolledClasses) ? enrolledClasses.map(r => {
            return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.classroom}</td>
                  <td>
                      <Button variant="danger" onClick={() => onRemoveClass(r)}>-</Button>
                  </td>
                </tr>
            )
        }) : [];
    }

    renderEnrollableClasses = () => {
        const {enrollableClasses, onAddClass} = this.props;

        return !Lodash.isEmpty(enrollableClasses) ? enrollableClasses.map(r => {
            return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.classroom}</td>
                  <td>
                      <Button variant="success" onClick={() => onAddClass(r)}>+</Button>
                  </td>
                </tr>
            )
        }) : [];
    }

    render() {
    
        return (
            <>
        <h4>Enrolled Classes</h4>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Classroom</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {this.renderEnrolledClasses()}
        </tbody>
      </Table>
       <h4>Enrollable Students</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Classroom</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {this.renderEnrollableClasses()}
        </tbody>
      </Table>
      </>
        );
    }
};

export default StudentClassTable;