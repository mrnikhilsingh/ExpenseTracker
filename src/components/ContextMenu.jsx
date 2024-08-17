import React from "react";

export const ContextMenu = ({ menuPosition, setMenuPosition, setExpenses, rowData, setFormData }) => {
  if (!menuPosition.left) return;

  // function to delete a row
  const handleDelete = (rowId) => {
    setExpenses((prevState) => {
      const updatedExpense = prevState.filter(
        (expense) => expense.id !== rowId
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpense));
      return updatedExpense;
    });
  };

  return (
    <div
      className="context-menu"
      style={{ left: menuPosition.left, top: menuPosition.top }}
    >
      <div
        onClick={() => {
          console.log("Editing");
          setMenuPosition({});
          setFormData({id:rowData.id, title: rowData.title, category: rowData.category, amount: rowData.amount });
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          handleDelete(rowData.id);
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
};
