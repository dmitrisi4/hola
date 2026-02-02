import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Header from "./Header";

vi.mock("@tanstack/react-router", async (importOriginal) => {
    const actual = await importOriginal<
        typeof import("@tanstack/react-router")
    >();

    return {
        ...actual,
        Link: ({ to, children, ...rest }: any) => (
            <a href={typeof to === "string" ? to : String(to)} {...rest}>
                {children}
            </a>
        ),
    };
});

describe("Header", () => {
    it("renders all navigation links", () => {
        render(<Header />);

        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Start - Server Functions" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Start - API Request" }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Start - SSR Demos" }),
        ).toBeInTheDocument();
    });

    it("has correct links", () => {
        render(<Header />);

        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "href",
            "/",
        );
        expect(
            screen.getByRole("link", { name: "Start - Server Functions" }),
        ).toHaveAttribute("href", "/demo/start/server-funcs");
        expect(
            screen.getByRole("link", { name: "Start - API Request" }),
        ).toHaveAttribute("href", "/demo/start/api-request");
        expect(screen.getByRole("link", { name: "Start - SSR Demos" })).toHaveAttribute(
            "href",
            "/demo/start/ssr",
        );
    });
});