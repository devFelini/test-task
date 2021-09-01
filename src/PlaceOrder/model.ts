export type OrderSide = "buy" | "sell";
export type ProfitField = "profit" | "percent" | "price";

export type ValidateItem = {
    profit: boolean | string, 
    percent: boolean | string,
    price: boolean | string
};