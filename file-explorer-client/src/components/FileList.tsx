import React from 'react';
import styles from './FileList.module.css';

interface FileItem {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    creationDate: Date;
    lastModifiedDate: Date;
}

interface FileListProps {
  files: FileItem[];
  onNavigate: (path: string) => void;
  onSelectFile: (file: FileItem) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onNavigate, onSelectFile }) => {
  return (
    <ul className={styles.fileList}>
      {files.map((fileItem, index) => (
        <li
          key={index}
          className={styles.fileItem}
          onClick={() => {
            console.log(fileItem)
            if (fileItem.type === 'directory') {
              onNavigate(fileItem.name);
            } else {
              onSelectFile(fileItem);
            }
          }}
        >
          <span className={styles.fileName}>{fileItem.name}</span>
          {fileItem.type === 'file' && (
            <span className={styles.fileSize}>({fileItem.size} bytes)</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileList;