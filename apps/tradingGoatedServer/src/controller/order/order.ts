import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/middleware";
import { users } from "../..";
import { randomUUIDv7 } from "bun";
import { sub } from "../../connectredis";

export const dotrading = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId
  const data = req.body
  if (!userId) return;
  const user = users.find((data) => data.Id === userId)
  if (!user) return;
  let sellPrice = 0
  let AvgPrice;
  let buyPrice;
  sub.pSubscribe("*", (d: any) => {
    const data = JSON.parse(d)
    sellPrice = data.sellPrice
    AvgPrice = data.AvgPrice
    buyPrice = data.buyPrice
  })
  if (user.balance.usd === 0) {
    res.json({ message: "ghar ja bhai tu" })
  }
  const marginPrice = (data.openPrice * data.quantity) / data.leverage


  user?.trades.push({
    type: data.type,
    stopLoss: data.stopLoss || null,
    status: "open",
    openPrice: data.type === "buy" ? Number(buyPrice) : Number(sellPrice),
    leverage: data.leverage || 1,
    quantity: data.quantity,
    userId: userId,
    asset: data.asset,
    tradeId: randomUUIDv7(),
    marginPrice: marginPrice,
    takeProfit: data.takeProfit || null
  })

  user.balance.coins[data.assert] = data.quantity

  const usertrade = user.trades.find((d) => {
    return d.userId === userId
  })
  console.log(usertrade)
  res.json({ message: "Trade executed successfully", usertrade })
}

export const gettrades = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId
  const user = users.find((data) => data.Id === userId)
  if (!user) return
  const trades = user.trades
  res.json({
    trades
  })
}

export const closedtrade = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const { tradeId, closedPrice } = req.body
  const user = users.find((data) => data.Id === userId)
  if (!user) return
  const trade = user.trades.findIndex((t) => t.tradeId === tradeId)
  const existingtrade = user.trades[trade]
  if (!existingtrade) {
    return res.status(404).json({ message: "Trade not found" });
  }
  const actualpnl = Number(existingtrade?.openPrice) - closedPrice
  const updatetrade = { ...existingtrade, status: "closed" as const, closedPrice: closedPrice, pnl: actualpnl }
  user.trades[trade] = updatetrade
  return res.json({
    message: "Trade closed successfully",
    trade: updatetrade,
  });
}
