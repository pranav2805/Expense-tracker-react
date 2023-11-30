import { createSlice } from "@reduxjs/toolkit";

const fetchExpenses = async () => {
  try {
    const resp = await fetch(
      `https://expense-tracker-react-e56d7-default-rtdb.firebaseio.com/expenses.json`
    );
    const data = await resp.json();
    let loadedExpenses = [];

    for (let key in data) {
      loadedExpenses.push({
        id: key,
        amount: data[key].amount,
        desc: data[key].desc,
        category: data[key].category,
      });
    }
    return loadedExpenses;
  } catch (err) {
    console.log(err);
  }
};

const loadedExpenses = await fetchExpenses();
console.log("expenses>>", loadedExpenses);
let total = 0;
loadedExpenses.forEach((expense) => (total += +expense.amount));
const initialState = { expenses: [...loadedExpenses], total: total };

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.total = state.total + +action.payload.amount;
    },
    deleteExpense(state, action) {
      console.log("id>>>", action.payload);
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      const deletedAmount = +state.expenses[index].amount;
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.total -= deletedAmount;
      //   console.log("expenses>>>", state.expenses);
    },
    editExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.expenses[index] = { ...action.payload.updatedData };
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
