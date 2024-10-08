import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { ItemsTable } from "./components/ItemsTable";
import expenseData from "./expenseData";

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
  });
  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <Form
            expenses={expenses}
            setExpenses={setExpenses}
            formData={formData}
            setFormData={setFormData}
          />
          <ItemsTable
            expenses={expenses}
            setExpenses={setExpenses}
            setFormData={setFormData}
          />
        </div>
      </main>
      <p className="copyright-text">
        <i> 2024 Made with ❤ by Nikhil Singh</i>
      </p>
    </>
  );
}

export default App;
