import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';

class FileAdmin extends React.Component {

    render() {
        return (
            <div className="box bluebox">
                <div className="heading">
                    <div className="row">
                        <div className="col-6">
                            <h4>Messages</h4>
                        </div>
                        <div className="col-6 right">
                            <button className="btn" onClick={this.onNewMessage}>Créer</button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <form action="/api/files" method="post" encType="multipart/form-data">
                        <input type="file" name="test" value="Upload" />
                        <input type="submit" value="submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default FileAdmin;
