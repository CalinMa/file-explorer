import React from 'react';
import './FileList.css';

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
    focusedIndex: number;
}

const FileList: React.FC<FileListProps> = ({ files, onNavigate, onSelectFile, focusedIndex }) => {
  return (
      <ul className={"fileList"}>
          {files.map((fileItem, index) => (
              <li
                  key={index}
                  className={`fileItem ${focusedIndex === index ? 'focused' : ''}`}
                  onClick={() => {
                      if (fileItem.type === 'directory') {
                          onNavigate(fileItem.name);
                      } else {
                          onSelectFile(fileItem);
                      }
                  }}
                  tabIndex={0} 
              >
                  <span className={"fileName"}>{fileItem.name}</span>
                  {fileItem.type === 'file' && (
                      <span className={"fileSize"}>({fileItem.size} bytes)</span>
                  )}
              </li>
          ))}
      </ul>
  );
};

export default FileList;