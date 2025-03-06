import fs from 'fs';
import path from 'path';

export const getFilesInDirectory = (dirPath: string) => {
    try {
   
      if (!fs.existsSync(dirPath)) {
        throw new Error(`Path-ul "${dirPath}" nu există.`);
      }
  
      const stats = fs.statSync(dirPath);
      if (!stats.isDirectory()) {
        throw new Error(`Path-ul "${dirPath}" nu este un director.`);
      }
  
      const files = fs.readdirSync(dirPath);
  
      return files.map((file) => {
        const filePath = path.join(dirPath, file);
        const fileStats = fs.statSync(filePath);
  
        if (!fs.existsSync(filePath)) {
            throw new Error(`Fișierul sau directorul "${filePath}" nu există.`);
          }
          
        return {
          name: file,
          type: fileStats.isDirectory() ? 'directory' : 'file', 
          size: fileStats.isFile() ? fileStats.size : null, 
          creationDate: fileStats.birthtime, 
          lastModifiedDate: fileStats.mtime
        };
      });
    } catch (error) {
      
      if (error instanceof Error) {
        throw new Error(`Eroare la citirea directorului "${dirPath}": ${error.message}`);
      } else {
        throw new Error(`Eroare necunoscută la citirea directorului "${dirPath}".`);
      }
    }
  };


export const getFileDetails = (filePath: string) => {
  try {

    if (!fs.existsSync(filePath)) {
      throw new Error(`Path-ul "${filePath}" nu există.`);
    }

    const stats = fs.statSync(filePath);

    return {
      name: path.basename(filePath), 
      type: stats.isDirectory() ? 'directory' : 'file',
      size: stats.isFile() ? stats.size : null,
      creationDate: stats.birthtime, 
      lastModifiedDate: stats.mtime, 
    };
  } catch (error) {
   
    if (error instanceof Error) {
      throw new Error(`Eroare la citirea fișierului "${filePath}": ${error.message}`);
    } else {
      throw new Error(`Eroare necunoscută la citirea fișierului "${filePath}".`);
    }
  }
};
