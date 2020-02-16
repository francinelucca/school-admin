import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Moment from "moment";

class StudentTable extends React.Component {

    renderRows= () => {
        const {rows, onEdit,onDeleteStudent} = this.props;

        return rows ? rows.map(r => {

            return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.firstName } {r.lastName}</td>
                  <td>{r.gender ==='F' ? 'Female' : 'Male'}</td>
                  <td>{Moment(r.birthDay).format("MM-DD-YYYY")}</td>
                  <td>{r.studentId}</td>
                  <td>
                      <Button variant="primary" onClick={() => onEdit(r.id)}>Edit</Button>
                      <Button variant="danger" onClick={() => onDeleteStudent(r.id)}>Delete</Button>
                  </td>
                </tr>
            )
        }) : [];
    }

    render() {
    
        return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Student ID</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
            {this.renderRows()}
        </tbody>
      </Table>
        );
    }
};

export default StudentTable;