// import type { Request, Response } from "express";
// import { users } from "../..";
// import type { AuthenticatedRequest } from "../../middleware/middleware";

// export function orderopen(req: AuthenticatedRequest, res: Response) {
//   const userId = req.userId
//   if (!userId) return;
//   const user = users.find((data) => data.Id === userId)
//   if (!user) return;
//   const body = req.body
//   if (!body) return;
//   console.log("body")
//   user.orders.push({
//     orderId: body.orderId,
//     userId: userId as string,
//     type: body.type,
//     quantity: body.quantity,
//     assert: body.assert,
//     stopLoss: body.stopLoss,
//     takeProfit: body.takeProfit,
//     leverage: body.leverage,
//   });
//   console.log("user push order")
//   const order = user.orders.find((data) => data.userId === userId)
//   user.positions.push({
//     stopLoss: body.stopLoss,
//     takeProfit: body.takeProfit,
//     buyPrice: body.buyPrice,
//     leverage: body.leverage,
//     quantity: body.quantity,
//     userId: order?.userId as string,
//     assert: body.assert,
//   });
//   console.log("user push position")
//   const positionData = user.positions.find((data) => data.userId === userId)
//   console.log("position data", positionData)
//   res.json({ message: "order placed successfully", order: user.orders, position: positionData })
// }

// export const orderclose = (req: AuthenticatedRequest, res: Response) => {
//   const userId = req.userId
//   if (!userId) return;
//   const user = users.find((data) => data.Id === userId)
//   if (!user) return;
//   const body = req.body
//   if (!body) return;
//   const orderId = body.orderId
//   if (!orderId) return;
//   const order = user.orders.find((data) => data.orderId === orderId)
//   if (!order) return res.status(404).json({ error: "order not found" })
//   user.orders.filter((data) => data !== order)
//   const position = user.positions.find((data) => data.userId === userId)
//   console.log(user.positions)
//   user.positions.filter((data) => data !== position)
//   console.log(user.positions)
//   res.json({ message: "order closed successfully", orderId: orderId })
// }
