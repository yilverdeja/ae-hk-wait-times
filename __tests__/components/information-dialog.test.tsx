import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import InformationDialog from "../../components/information-dialog";

describe("Information Dialog", () => {
  it("should render a link on load", () => {
    render(<InformationDialog />);
    expect(screen.getByText(/understand/i)).toBeInTheDocument();
  });
});
