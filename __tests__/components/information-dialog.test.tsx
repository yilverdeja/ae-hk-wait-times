import { expect, it, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InformationDialog from "../../components/information-dialog";

describe("Information Dialog", () => {
  it("should render a button with a text of 'understand'", () => {
    render(<InformationDialog />);
    const dialogButton = screen.getByRole("button");
    expect(dialogButton).toBeInTheDocument();
    expect(dialogButton).toHaveTextContent(/understand/i);
  });

  it("should open a dialog when the button is clicked", async () => {
    render(<InformationDialog />);

    const dialogButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(dialogButton);

    expect(
      screen.getByRole("heading", { level: 2, name: /understanding/i })
    ).toBeInTheDocument();

    const collapsibleHeadings = screen.queryAllByRole("heading", { level: 3 });
    expect(collapsibleHeadings).toHaveLength(3);
  });

  it("should expand a collapsible heading when clicked", async () => {
    render(<InformationDialog />);

    const dialogButton = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(dialogButton);

    expect(screen.queryAllByRole("paragraph")).toHaveLength(2);

    const collapsibleHeadings = screen.queryAllByRole("button");
    await user.click(collapsibleHeadings[0]);

    console.log(screen);

    expect(screen.queryAllByRole("paragraph")).toHaveLength(3);
  });
});
