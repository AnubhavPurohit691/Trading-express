import type { NextFunction, Request, Response } from "express";
import { dbquery } from "./dbquery";
export const getcandlesController = async (req: Request, res: Response) => {
  const assert = req.query.assert as string;
  const duration = req.query.duration as string
  const limit = req.query.limit as string
  const rows = await dbquery(duration, assert, limit)
  res.json({ assert, duration, data: rows })
}
