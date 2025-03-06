import React, { useState, useEffect } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import FileList from './components/FileList';
import FileDetails from './components/FileDetails';

interface FileItem {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    creationDate: Date;
    lastModifiedDate: Date;
}

interface ApiFile {
    name: string;
    type: 'file' | 'directory';
    size: number | null;
    creationDate: string;
    lastModifiedDate: string;
}

const App: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<string[]>(['.']);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

    useEffect(() => {
        fetchFiles(currentPath.join('/'));
    }, [currentPath]);

    const fetchFiles = async (path: string) => {
        console.log('fetch called with new path ', path);
        try {
            const response = await fetch(`http://localhost:3000/api/files?path=${path}`);
            const data = await response.json();

            const files: FileItem[] = data.map((file: ApiFile) => ({
                name: file.name,
                type: file.type,
                size: file.size,
                creationDate: new Date(file.creationDate),
                lastModifiedDate: new Date(file.lastModifiedDate),
            }));

            setFiles(files);
        } catch (error) {
            console.error('Eroare la încărcarea fișierelor:', error);
        }
    };

    const handleNavigate = (path: string) => {
        console.log('Handle navigate ', path);

        if (path === '..') {
            const newPath = [...currentPath];
            if (newPath.length > 1) {
                newPath.pop();
            }
            setCurrentPath(newPath);
            setSelectedFile(null);
            return;
        }

        if (path === './') {
            setCurrentPath(['.']);
            setSelectedFile(null);
            return;
        }

        if (path.startsWith('/')) {
            setCurrentPath(path.split('/').filter(p => p !== ''));
            setSelectedFile(null);
            return;
        }

       
        const index = currentPath.indexOf(path);
        if (index !== -1) {
            const newPath = currentPath.slice(0, index + 1);
            setCurrentPath(newPath);
            setSelectedFile(null);
            return;
        }

    
        const newPath = [...currentPath, path];
        setCurrentPath(newPath);
        setSelectedFile(null);
    };

    const handleSelectFile = (file: FileItem) => {
        setSelectedFile(file);
    };

    return (
        <div className="app">
            <Breadcrumbs currentPath={currentPath} onNavigate={handleNavigate} />
            <FileList files={files} onNavigate={handleNavigate} onSelectFile={handleSelectFile} />
            <FileDetails fileItem={selectedFile} />
        </div>
    );
};

export default App;