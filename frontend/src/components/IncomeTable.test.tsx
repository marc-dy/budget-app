import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IncomeTable from "./IncomeTable";
import "@testing-library/jest-dom"; // <-- Add this import for toBeInTheDocument

describe("IncomeTable", () => {
  it("renders table headers and sorts date in descending by default", () => {
    render(<IncomeTable incomes={[]} />);
    expect(screen.getByText("Received From")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Date ↓")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("renders income data rows and sorts date by default", () => {
    const incomes = [
      {
        id: 1,
        receivedFrom: "Company A",
        amount: 1000,
        account: {
          id: 2,
          name: "Bank Account",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Freelance Project",
        amount: 500,
        account: {
          id: 3,
          name: "PayPal",
        },
        category: {
          id: 5,
          name: "Freelance",
        },
        date: "2022-10-05",
        comments: "Payment for project work",
      },
    ];

    render(<IncomeTable incomes={incomes} />);
    const rows = screen.getAllByRole("row").slice(1);
    const values = rows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
        .join("")
    );
    expect(values).toEqual([
      "Company A1000Bank AccountSalary2023-10-01Monthly salaryEditDelete",
      "Freelance Project500PayPalFreelance2022-10-05Payment for project workEditDelete",
    ]);
  });

  it("sorts amount in ascending order with already sorted amounts", async () => {
    const incomes = [
      {
        id: 1,
        receivedFrom: "Client A",
        amount: 500,
        account: {
          id: 1,
          name: "Bank A",
        },
        category: {
          id: 1,
          name: "Salary",
        },
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Client B",
        amount: 1000,
        account: {
          id: 2,
          name: "PayPal",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-05",
        comments: "commentB",
      },
    ];

    render(<IncomeTable incomes={incomes} />);
    const user = userEvent.setup();
    await user.click(screen.getByText("Amount"));
    expect(screen.getByText("Amount ↑")).toBeInTheDocument();
    const rows = screen.getAllByRole("row").slice(1);
    const values = rows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
        .join("")
    );
    expect(values).toEqual([
      "Client A500Bank ASalary2023-10-01Monthly salaryEditDelete",
      "Client B1000PayPalSalary2023-10-05commentBEditDelete",
    ]);
  });

  it("sorts comment with different capitalization", async () => {
    const incomes = [
      {
        id: 1,
        receivedFrom: "Client A",
        amount: 500,
        account: {
          id: 1,
          name: "Bank A",
        },
        category: {
          id: 1,
          name: "Salary",
        },
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Client B",
        amount: 1000,
        account: {
          id: 2,
          name: "PayPal",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-05",
        comments: "commentB",
      },
      {
        id: 3,
        receivedFrom: "Client C",
        amount: 1,
        account: {
          id: 2,
          name: "PayPal",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-10",
        comments: "Zebra",
      },
    ];

    render(<IncomeTable incomes={incomes} />);
    const user = userEvent.setup();
    await user.click(screen.getByText("Comments"));
    expect(screen.getByText("Comments ↑")).toBeInTheDocument();
    const rows = screen.getAllByRole("row").slice(1);
    const values = rows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
        .join("")
    );
    expect(values).toEqual([
      "Client B1000PayPalSalary2023-10-05commentBEditDelete",
      "Client A500Bank ASalary2023-10-01Monthly salaryEditDelete",
      "Client C1PayPalSalary2023-10-10ZebraEditDelete",
    ]);
  });
});

describe.each([
  { header: "Received From" },
  { header: "Amount" },
  { header: "Account" },
  { header: "Category" },
  { header: "Date" },
  { header: "Comments" },
])("IncomeTable sorting by $header", ({ header }) => {
  it(`sorts by ${header} when header is clicked`, async () => {
    const incomes = [
      {
        id: 1,
        receivedFrom: "Client B",
        amount: 500,
        account: {
          id: 2,
          name: "PayPal",
        },
        category: {
          id: 4,
          name: "Salary",
        },
        date: "2023-10-05",
        comments: "commentB",
      },
      {
        id: 2,
        receivedFrom: "Client A",
        amount: 500,
        account: {
          id: 3,
          name: "GCash",
        },
        category: {
          id: 5,
          name: "Freelance",
        },
        date: "2023-10-01",
        comments: "commentA",
      },
    ];

    render(<IncomeTable incomes={incomes} />);
    const user = userEvent.setup();
    if (header === "Date") {
      await user.click(screen.getByText(header + " ↓"));
    } else {
      await user.click(screen.getByText(header));
    }
    expect(screen.getByText(header + " ↑")).toBeInTheDocument();
    let rows = screen.getAllByRole("row").slice(1);
    let values = rows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
        .join("")
    );
    expect(values).toEqual([
      "Client A500GCashFreelance2023-10-01commentAEditDelete",
      "Client B500PayPalSalary2023-10-05commentBEditDelete",
    ]);

    // Click on the "Amount" header again to sort by amount descending
    await user.click(screen.getByText(header + " ↑"));
    expect(screen.getByText(header + " ↓")).toBeInTheDocument();
    rows = screen.getAllByRole("row").slice(1);
    values = rows.map((row) =>
      within(row)
        .getAllByRole("cell")
        .map((cell) => cell.textContent)
        .join("")
    );
    expect(values).toEqual([
      "Client B500PayPalSalary2023-10-05commentBEditDelete",
      "Client A500GCashFreelance2023-10-01commentAEditDelete",
    ]);
  });
});
