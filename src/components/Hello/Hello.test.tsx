import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hello } from "./Hello";


describe("Hello component", () => {
    it("renders greeting with name", () => {
        render(<Hello name="Dima" />);


        expect(screen.getByText("Hello, Dima")).toBeInTheDocument();
    });
});