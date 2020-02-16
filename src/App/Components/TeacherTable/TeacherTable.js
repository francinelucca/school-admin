import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class TeacherTable extends React.Component {

    renderRows= () => {
        const {rows, onEdit,onDeleteTeacher} = this.props;

        return rows ? rows.map(r => {

            return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.firstName } {r.lastName}</td>
                  <td>{r.gender ==='F' ? 'Female' : 'Male'}</td>
                  <td>{r.idCard}</td>
                  <td>
                      <Button variant="primary" onClick={() => onEdit(r.id)}>Edit</Button>
                      <Button variant="danger" onClick={() => onDeleteTeacher(r.id)}>Delete</Button>
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
            <th>ID Card</th>
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

export default TeacherTable;