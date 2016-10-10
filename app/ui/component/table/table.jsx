import React from 'react';
import {Link, withRouter} from 'react-router';


const Table = (props) => {

    var rows = null;
    var cdef = props.cdef;

    if (Array.isArray(props.items)) {
        rows = props.items.map((v, i) => {

            let name = null;

            if (cdef.link) {
                name = <Link to={v[cdef.link]}>{v[cdef.name]}</Link>;
            } else {
                name = v[cdef.name];
            }

            return (
                <tr key={v[cdef.id]}>
                    <td>{v[cdef.id]}</td>
                    <td>{name}</td>
                    <td>{v[cdef.rowdate]}</td>
                </tr>
            );
        });
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
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