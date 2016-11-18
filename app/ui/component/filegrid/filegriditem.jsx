import React from 'react';

const FileGridItem = ({file, onRemove, onCopyToStore}) => {

    let inner = null;

    if (file.contentType.indexOf('image/') != -1) {
        inner = <img className="grid-item-file-img" src={file.path} alt={file.name} />;
    } else {
        inner = <div className="grid-item-file-other">{file.contentType}</div>;
    }

    return (
        <div className="grid-item">
            <div className="grid-item-preview">
                {inner}
            </div>
            <div className="grid-item-details">
                <span className="grid-item-name">{file.name}</span>
                <span className="grid-item-info">{file.contentType}</span>
            </div>
            <div className="grid-item-menu">
                <a href={file.path} target="_blank">Ouvrir</a>
                <a href="#" onClick={onCopyToStore} data-4n-id={file._id}>Copier</a>
                <a href="#" onClick={onRemove} data-4n-id={file._id}>Supprimer</a>
            </div>
        </div>
    );
}

export default FileGridItem;