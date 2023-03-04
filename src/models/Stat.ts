export interface IStat {
    id: string;
    name: string;
    symbol: string;
    market_data: {
        current_price: {
            usd: string;
            ngn: string
        }
    }
}