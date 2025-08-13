type Account = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

export type IncomeData = {
  id: number;
  receivedFrom: string;
  amount: number;
  account: Account;
  category: Category;
  date: string;
  comments: string;
};
