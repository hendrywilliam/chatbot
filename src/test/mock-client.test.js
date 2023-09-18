import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../components/navbar";
import { EmptyScreen } from "../components/empty-screen";

describe("navbar", () => {
  test("should render navbar perfectly fine", () => {
    render(
      <>
        <Navbar />
        <EmptyScreen />
      </>
    );
    expect(screen.getByText("Glad you made it!")).toBeInTheDocument();
    expect(screen.getByText(";)")).toBeTruthy();
  });
});
