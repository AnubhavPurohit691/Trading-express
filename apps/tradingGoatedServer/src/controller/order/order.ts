import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../middleware/middleware";
import { liquidity, trades, users } from "../..";
import { randomUUIDv7 } from "bun";
import { sub } from "../../connectredis";
import { updateRisk } from "../updateRisk/updateRisk";
import type { Trade } from "../../types/type";
sub.pSubscribe("*", (d: any) => {
  const data = JSON.parse(d)
  // sellPrice = data.sellPrice
  // AvgPrice = data.AvgPrice
  // buyPrice = data.buyPrice
  updateRisk(data)
})

export const dotrading = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId
  const data = req.body
  if (!userId) return;
  const user = users.find((data) => data.Id === userId)
  if (!user) return;
  let sellPrice = 0
  let AvgPrice;
  let buyPrice;
  if (user.balance.usd === 0) {
    res.json({ message: "ghar ja bhai tu" })
  }
  const marginPrice = (data.openPrice * data.quantity) / data.leverage

  const tradee: Trade = {
    stopLoss: data.stopLoss || null,
    status: "open",
    openPrice: data.quantity >= 0 ? Number(buyPrice) : Number(sellPrice),
    leverage: data.leverage || 1,
    quantity: data.quantity,
    userId: userId,
    asset: data.asset,
    tradeId: randomUUIDv7(),
    marginPrice: marginPrice,
    takeProfit: data.takeProfit || null
  }
  trades.push(tradee)
  liquidity.set(userId, [])
  liquidity.get(userId)!.push(tradee)
  user.balance.coins[data.assert] = data.quantity
  const usertrade = liquidity.get(userId)
  res.json({ message: "Trade executed successfully", usertrade })
}

export const gettrades = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId
  const usertrade = liquidity.get(userId!)
  res.json({

    usertrade
  })
}

export const closedtrade = (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const { tradeId, closedPrice } = req.body
  const user = users.find((data) => data.Id === userId)
  if (!user) return
  // const trade = user.trades.findIndex((t) => t.tradeId === tradeId)
  const trades: Trade[] = liquidity.get(userId as any)!
  const trade = trades.find((d) => d.tradeId === tradeId)

  const actualpnl = (Number(trade?.openPrice) - closedPrice) * trade?.quantity!
  const updatetrade = { ...trade, status: "closed" as const, closedPrice: closedPrice, pnl: actualpnl }
  return res.json({
    message: "Trade closed successfully",
    trade: updatetrade,
  });
}
