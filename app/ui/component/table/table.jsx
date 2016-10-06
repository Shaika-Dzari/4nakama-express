import React from 'react';
import {Link, withRouter} from 'react-router';


const Table = (props) => {

    var rows = null;
    var cdef = props.cdef;

    if (Array.isArray(props.items)) {
        rows = props.items.map((v, i) => {
            return (
                <tr key={v[cdef.id]}>
                    <td>{v[cdef.id]}</td>
                    <td>{v[cdef.name]}</td>
                    <td>{v[cdef.rowdate]}</td>
                </tr>
            );
        });
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Date</td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    cdef: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        rowdate: React.PropTypes.string,
        link: React.PropTypes.string
    }).isRequired,
    items: React.PropTypes.array
};

export default Table;