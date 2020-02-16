import React from 'react';
import Table from 'react-bootstrap/Table';
import Lodash from 'lodash';

class TeacherClassTable extends React.Component {

    renderClasses = () => {
        const {classes} = this.props;

        return !Lodash.isEmpty(classes) ? classes.map(r => {
            return (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>{r.classroom}</td>
                </tr>
            )
        }) : [];
    }

    renderTable = () => {
      const { classes } = this.props;

      return( !Lodash.isEmpty(classes) ? 
          <>
          <h4>Managed Classes</h4>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Classroom</th>
            </tr>
          </thead>
          <tbody>
              {this.renderClasses()}
          </tbody>
        </Table>
        </>
        : null
      )
    }

    render() {
    
        return (
          this.renderTable()
        );
    }
};

export default TeacherClassTable;