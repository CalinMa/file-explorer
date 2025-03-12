import fs from 'fs';
import path from 'path';
import { getFilesInDirectory, getFileDetails } from './fileController';

describe('fileController', () => {
  const testDir = path.join(__dirname, 'testDir');
  let testFileCreationDate: Date;
  let testFileLastModifiedDate: Date;
  let testSubDirCreationDate: Date;
  let testSubDirLastModifiedDate: Date;

  beforeAll(() => {
    // Creează un director de testare și fișiere de testare
    fs.mkdirSync(testDir);
    const testFilePath = path.join(testDir, 'testFile.txt');
    fs.writeFileSync(testFilePath, 'test content');
    const testFileStats = fs.statSync(testFilePath);
    testFileCreationDate = testFileStats.birthtime;
    testFileLastModifiedDate = testFileStats.mtime;

    const testSubDirPath = path.join(testDir, 'testSubDir');
    fs.mkdirSync(testSubDirPath);
    const testSubDirStats = fs.statSync(testSubDirPath);
    testSubDirCreationDate = testSubDirStats.birthtime;
    testSubDirLastModifiedDate = testSubDirStats.mtime;
  });

  afterAll(() => {
    // Șterge directorul de testare și fișierele de testare
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  describe('getFilesInDirectory', () => {
    it('should return a list of files and directories in a directory', () => {
      const files = getFilesInDirectory(testDir);
      expect(files).toEqual([
        {
          name: 'testFile.txt',
          type: 'file',
          size: 12,
          creationDate: testFileCreationDate,
          lastModifiedDate: testFileLastModifiedDate,
        },
        {
          name: 'testSubDir',
          type: 'directory',
          size: null,
          creationDate: testSubDirCreationDate,
          lastModifiedDate: testSubDirLastModifiedDate,
        },
      ]);
    });

    it('should throw an error if the directory does not exist', () => {
      expect(() => getFilesInDirectory('nonexistent')).toThrowError('Path-ul "nonexistent" nu există.');
    });

    it('should throw an error if the path is not a directory', () => {
      const filePath = path.join(testDir, 'testFile.txt');
      expect(() => getFilesInDirectory(filePath)).toThrowError(`Path-ul "${filePath}" nu este un director.`);
    });
  });

  describe('getFileDetails', () => {
    it('should return details of a file', () => {
      const filePath = path.join(testDir, 'testFile.txt');
      const fileDetails = getFileDetails(filePath);
      expect(fileDetails).toEqual({
        name: 'testFile.txt',
        type: 'file',
        size: 12,
        creationDate: testFileCreationDate,
        lastModifiedDate: testFileLastModifiedDate,
      });
    });

    it('should return details of a directory', () => {
      const dirPath = path.join(testDir, 'testSubDir');
      const dirDetails = getFileDetails(dirPath);
      expect(dirDetails).toEqual({
        name: 'testSubDir',
        type: 'directory',
        size: null,
        creationDate: testSubDirCreationDate,
        lastModifiedDate: testSubDirLastModifiedDate,
      });
    });

    it('should throw an error if the file does not exist', () => {
      expect(() => getFileDetails('nonexistent')).toThrowError('Path-ul "nonexistent" nu există.');
    });
  });
});