


export type Trade = {
  stopLoss?: number | null,
  status: "open" | "closed",
  tradeId: string,
  takeProfit?: number | null,
  pnl?: number,
  openPrice: number,
  leverage: number,
  quantity: number,
  userId: string,
  asset: string,
  closedPrice?: number,
  marginPrice: number
}
