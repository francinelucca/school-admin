import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

class ClassTable extends React.Component {

    renderRows= () => {
        const {rows, onEdit,onDeleteClass} = this.props;

        return rows ? rows.map(r => {
            return (
                <tr>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.teacher.firstName } {r.teacher.lastName}</td>
                  <td>{r.classroom || ''}</td>
                  <td>
                      <Button variant="primary" onClick={() => onEdit(r.id)}>Edit</Button>
                      <Button variant="danger" onClick={() => onDeleteClass(r.id)}>Delete</Button>
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
            <th>Teacher</th>
            <th>Class Room</th>
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

export default ClassTable;