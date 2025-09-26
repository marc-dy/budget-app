type Account = {
  id: number;
  name: string;
};

type Category = {
  id: number;
  name: string;
};

export type Income = {
  id: number;
  receivedFrom: string;
  amount: number;
  account: Account;
  category: Category;
  date: string; // TODO: Check if this is correct
  comments: string;
};
