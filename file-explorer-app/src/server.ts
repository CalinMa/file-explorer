import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { getFilesInDirectory, getFileDetails } from './controllers/fileController';

const app = express(); 
const PORT = 3000;

app.use(cors()); 

app.use(express.json());


interface FileQuery {
  path?: string;
}


app.get('/api/files', (req: any, res: any) => {
  const { path } = req.query as FileQuery; 

  if (typeof path !== 'string') {
    return res.status(400).json({ error: 'Path-ul este invalid.' });
  }

  try {
    const files = getFilesInDirectory(path);
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Eroare necunoscută.' });
  }
});

app.get('/api/file', (req: any, res: any) => {
  const { path } = req.query as FileQuery;

  if (typeof path !== 'string') {
    return res.status(400).json({ error: 'Path-ul este invalid.' });
  }

  try {
    const fileDetails = getFileDetails(path);
    res.json(fileDetails);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Eroare necunoscută.' });
  }
});


app.listen(PORT, () => { 
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});

