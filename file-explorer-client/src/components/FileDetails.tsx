import React from 'react';
import './FileDetails.css';

interface FileDetailsProps {
  fileItem: {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    creationDate: Date;
    lastModifiedDate: Date;
  } | null;
}

const FileDetails: React.FC<FileDetailsProps> = ({ fileItem }) => {
  if (!fileItem) return <div>Selectați un fișier pentru a vedea detaliile.</div>;

  return (
    <div className="fileDetails"> 
      <h2 className="title">{fileItem.name}</h2> 
      <div className="detail">
        <span className="detailLabel">Tip:</span> {fileItem.type === 'file' ? 'Fișier' : 'Director'}
      </div>
      {fileItem.type === 'file' && (
        <div className="detail">
          <span className="detailLabel">Dimensiune:</span> {fileItem.size} bytes
        </div>
      )}
      <div className="detail">
        <span className="detailLabel">Data creării:</span> {fileItem.creationDate.toLocaleString()}
      </div>
      <div className="detail">
        <span className="detailLabel">Data ultimei modificări:</span> {fileItem.lastModifiedDate.toLocaleString()}
      </div>
    </div>
  );
};

export default FileDetails;
