// AddProductForm.test.tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePortfolio } from "../context/PortfolioContext";
import AddProductForm from "../components/AddProductForm";

// Mock the context used in the component
jest.mock("../context/PortfolioContext", () => ({
  usePortfolio: jest.fn(),
}));

// Create a mock for the updateCryptosInvestmentPortfolio function
const mockUpdateCryptosInvestmentPortfolio = jest.fn();

describe("AddProductForm", () => {
  beforeEach(() => {
    // Mock the return values for usePortfolio
    (usePortfolio as jest.Mock).mockReturnValue({
      cryptosInfo: [{ id: "1", name: "Bitcoin", symbol: "BTC" }],
      isLoading: false,
      cryptosInvestmentPortfolio: [],
      updateCryptosInvestmentPortfolio: mockUpdateCryptosInvestmentPortfolio,
    });
  });

  test("renders the form correctly", () => {
    render(<AddProductForm />);

    // Check that the form inputs are present
    expect(screen.getByLabelText(/crypto/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/average cost/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/investment amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/purchase date/i)).toBeInTheDocument();
  });

  test("formats average cost and investment amount correctly", async () => {
    render(<AddProductForm />);

   // Simulate entering a value in the Average Cost input
   const averageCostInput = screen.getByLabelText(/average cost/i);
   fireEvent.change(averageCostInput, { target: { value: '50000.5' } });

   // Test that the input value is formatted correctly
   expect(averageCostInput).toHaveValue("50,000.5");

   // Simulate entering a value in the Investment Amount input
   const investmentAmountInput = screen.getByLabelText(/investment amount/i);
   fireEvent.change(investmentAmountInput, { target: { value: '2000.75' } });

   // Test that the input value is formatted correctly
   expect(investmentAmountInput).toHaveValue("2,000.75");
  });

  test("shows an alert when product is added", async () => {
    // Mock window.alert to test if it's called
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<AddProductForm />);

    // Fill in the form
    userEvent.type(screen.getByLabelText(/crypto/i), "Bitcoin");
    userEvent.type(screen.getByLabelText(/average cost/i), "50000");
    userEvent.type(screen.getByLabelText(/investment amount/i), "1000");
    userEvent.type(screen.getByLabelText(/purchase date/i), "12/01/2024");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      // Check that alert is called
      expect(mockAlert).toHaveBeenCalledWith("Crypto added successfully!");
    });

    // Clean up
    mockAlert.mockRestore();
  });
});
