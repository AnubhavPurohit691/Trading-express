import { trades, users } from "../.."
import type { Trade } from "../../types/type"

export function updateRisk(data: any) {
  const { AvgPrice } = data
  trades.forEach((d: Trade) => {
    if (AvgPrice === d.stopLoss || AvgPrice === d.takeProfit) {
      liquidataion(AvgPrice, d)

    }
    if (d.marginPrice === AvgPrice || d.marginPrice === AvgPrice) {
      liquidataion(AvgPrice, d)
    }
  })
}


function liquidataion(AvgPrice: number, d: any) {

  const calculate_pnl = (AvgPrice - d.openPrice) * d.quantity
  d.pnl = calculate_pnl
  d.status = "closed"
  const user = users.find((f) => f.Id === d.userId)
  if (!user) return;
  user.balance.usd += d.pnl
  d.closedPrice = AvgPrice
}
