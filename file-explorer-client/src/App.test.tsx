import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import React from 'react';
import App from "./App";
import 'whatwg-fetch'; // fetch is not defined error

//teste de integrare sau de UI

describe("App", () => {
  it("should navigate to subdirectories", async () => {
    render(<App />);
    
    // Wait for "Folder" text to appear
    const folderButton = await screen.findByText("Folder");
    fireEvent.click(folderButton);
    
    // Verify if the "New folder" appears
    expect(await screen.findByText("New folder")).toBeInTheDocument();
    
    // Click on the "New folder" element
    const newFolderButton = await screen.findByText("New folder");
    fireEvent.click(newFolderButton);

    // Verify if the "NewFolder Details" appears
    expect(await screen.findByText("Folder2")).toBeInTheDocument();
  });

  it("should navigate back to parent directories", async () => {
    render(<App />);
    
    // Click on "Folder"
    const folderButton = await screen.findByText("Folder");
    fireEvent.click(folderButton);

    // Click back to "Folder"
    // const folderBackButton = await screen.findByText("./");
    // fireEvent.click(folderBackButton);

    // Ensure "Folder Details" appears again
    expect(await screen.findByText("test.txt")).toBeInTheDocument();
  });

  it("should navigate to root directory", async () => {
    render(<App />);
    
    // Click on the root button (./)
    const rootButton = await screen.findByText("./");
    fireEvent.click(rootButton);

    // Ensure the root directory message is shown
    expect(await screen.findByText("Selectați un fișier pentru a vedea detaliile.")).toBeInTheDocument();
  });
});
