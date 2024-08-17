import React, { useEffect } from "react";

export const Form = ({ expenses, setExpenses, formData, setFormData }) => {
  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.keys(formData).includes("id")) {
      // code to add a new row
      const newExpense = { ...formData, id: crypto.randomUUID() };
      newExpense.amount = Number(newExpense.amount);
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState, newExpense];
        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        return updatedExpenses;
      });
    } else {
      // code to edit a row
      const updatedExpense = expenses.map((expense) => {
        if (expense.id === formData.id) {
          return {
            ...expense,
            title: formData.title,
            category: formData.category,
            amount: Number(formData.amount),
          };
        } else {
          return expense;
        }
      });
      setExpenses(updatedExpense);
      localStorage.setItem("expenses", JSON.stringify(updatedExpense));
    }

    setFormData({ title: "", category: "", amount: "" });
  };

  // handleInputChange function
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // get expenses from localStorage
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, [setExpenses]);

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="" hidden>
            Select Category
          </option>
          <option value="Grocery">Grocery</option>
          <option value="Clothes">Clothes</option>
          <option value="Bills">Bills</option>
          <option value="Education">Education</option>
          <option value="Medicine">Medicine</option>
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" name="submit" value="submit" className="add-btn">
        {!Object.keys(formData).includes("id") ? "Add" : "Save"}
      </button>
    </form>
  );
};
