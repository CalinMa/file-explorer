
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should navigate to subdirectories", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Folder"));
    expect(screen.getByText("Folder Details")).toBeInTheDocument();
    fireEvent.click(screen.getByText("NewFolder"));
    expect(screen.getByText("NewFolder Details")).toBeInTheDocument();
  });

  it("should navigate back to parent directories", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Folder"));
    fireEvent.click(screen.getByText("NewFolder"));
    fireEvent.click(screen.getByText("Folder"));
    expect(screen.getByText("Folder Details")).toBeInTheDocument();
  });

  it("should navigate to root directory", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Folder"));
    fireEvent.click(screen.getByText("NewFolder"));
    fireEvent.click(screen.getByText("./"));
    expect(
      screen.getByText(
        "Selectați un fișier sau director pentru a vedea detaliile."
      )
    ).toBeInTheDocument();
  });

});
