export interface Category {
    id: number;
    name: string;
    type: 'income' | 'expense';
}

export interface Transaction {

    id: number;
    amount: string | number;
    description: string;
    date: string;
    category: Category;

}