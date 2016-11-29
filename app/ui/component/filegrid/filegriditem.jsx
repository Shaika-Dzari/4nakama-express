import React from 'react';

const FileGridItem = ({file, onRemove, onCopyToStore}) => {

    let inner = null;

    if (file.contenttype.indexOf('image/') != -1) {
        inner = <img className="grid-item-file-img" src={file.filepath} alt={file.name} />;
    } else {
        inner = <div className="grid-item-file-other">{file.contenttype}</div>;
    }

    return (
        <div className="grid-item">
            <div className="grid-item-preview">
                {inner}
            </div>
            <div className="grid-item-details">
                <span className="grid-item-name">{file.name}</span>
                <span className="grid-item-info">{file.contenttype}</span>
            </div>
            <div className="grid-item-menu">
                <a href={file.filepath} target="_blank">Ouvrir</a>
                <a href="#" onClick={onCopyToStore} data-4n-id={file.id}>Copier</a>
                <a href="#" onClick={onRemove} data-4n-id={file.id}>Supprimer</a>
            </div>
        </div>
    );
}

export default FileGridItem;