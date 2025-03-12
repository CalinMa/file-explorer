import React, { useState, useEffect} from 'react';
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
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);
    

    useEffect(() => {
        fetchFiles(currentPath.join('/'));
    }, [currentPath]);

    const fetchFiles = async (path: string) => {
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
            setFocusedIndex(-1);
        } catch (error) {
            console.error('Eroare la încărcarea fișierelor:', error);
        }
    };

    const handleNavigate = (path: string) => {
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // console.log('Key pressed:', e.key);
        // console.log('Current focusedIndex:', focusedIndex);
        if (e.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, files.length - 1));
        } else if (e.key === 'Enter' && focusedIndex !== -1) {
            const fileItem = files[focusedIndex];
            if (fileItem.type === 'directory') {
                handleNavigate(fileItem.name);
            } else {
                handleSelectFile(fileItem);
            }
        } else if (e.key === 'Backspace') {
            handleNavigate('..');
        }
    };

    return (
        <div className="app" onKeyDown={handleKeyDown} tabIndex={0}>
            <Breadcrumbs currentPath={currentPath} onNavigate={handleNavigate} />
            <FileList files={files} onNavigate={handleNavigate} onSelectFile={handleSelectFile} focusedIndex={focusedIndex} />
            <FileDetails fileItem={selectedFile} />
        </div>
    );
};

export default App;