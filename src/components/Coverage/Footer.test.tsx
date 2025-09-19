import "@testing-library/jest-dom";

// src/components/Coverage/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "../../components/Footer";
import '@testing-library/jest-dom';

describe("Footer Component", () => {
  it("renders the copyright text", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Copyright © ${currentYear} - All right reserved`)).toBeInTheDocument();
  });

//   it("renders social media SVG icons", () => {
//     render(<Footer />);
//     // There should be 4 SVG elements (1 logo + 3 social links)
//     const svgs = screen.getAllByRole("img", { hidden: true });
//     expect(svgs.length).toBeGreaterThanOrEqual(4);
//   });
});
