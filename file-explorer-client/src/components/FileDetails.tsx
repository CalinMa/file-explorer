import React from 'react';
import styles from './FileDetails.module.css';
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
    <div className={styles.fileDetails}>
      <h2 className={styles.title}>{fileItem.name}</h2>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>Tip:</span> {fileItem.type === 'file' ? 'Fișier' : 'Director'}
      </div>
      {fileItem.type === 'file' && (
        <div className={styles.detail}>
          <span className={styles.detailLabel}>Dimensiune:</span> {fileItem.size} bytes
        </div>
      )}
      <div className={styles.detail}>
        <span className={styles.detailLabel}>Data creării:</span> {fileItem.creationDate.toLocaleString()}
      </div>
      <div className={styles.detail}>
        <span className={styles.detailLabel}>Data ultimei modificări:</span> {fileItem.lastModifiedDate.toLocaleString()}
      </div>
    </div>
  );
};

export default FileDetails;