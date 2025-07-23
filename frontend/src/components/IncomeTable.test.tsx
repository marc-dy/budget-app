import { render, screen } from "@testing-library/react";
import IncomeTable from "./IncomeTable";
import "@testing-library/jest-dom"; // <-- Add this import for toBeInTheDocument

describe("IncomeTable", () => {
  it("renders table headers", () => {
    render(<IncomeTable incomeList={[]} />);
    expect(screen.getByText("Received From")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("renders income data rows", () => {
    const incomeList = [
      {
        id: 1,
        receivedFrom: "Company A",
        amount: 1000,
        account: "Bank Account",
        category: "Salary",
        date: "2023-10-01",
        comments: "Monthly salary",
      },
      {
        id: 2,
        receivedFrom: "Freelance Project",
        amount: 500,
        account: "PayPal",
        category: "Freelance",
        date: "2023-10-05",
        comments: "Payment for project work",
      },
    ];

    render(<IncomeTable incomeList={incomeList} />);
    expect(screen.getByText("Company A")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("Bank Account")).toBeInTheDocument();
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("2023-10-01")).toBeInTheDocument();
    expect(screen.getByText("Monthly salary")).toBeInTheDocument();

    expect(screen.getByText("Freelance Project")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("PayPal")).toBeInTheDocument();
    expect(screen.getByText("Freelance")).toBeInTheDocument();
    expect(screen.getByText("2023-10-05")).toBeInTheDocument();
    expect(screen.getByText("Payment for project work")).toBeInTheDocument();
  });
});
