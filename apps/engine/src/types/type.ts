

enum OrderType{
   Sell ="Sell",
   Buy="Buy"
}

export type Order = {
    orderId:string,
    userId:string,
    type:OrderType,
    quantity:number,
    assert:string,
    stopLoss?:number,
    takeProfit?:number,
    leverage:number,
    status:"open"|"close",
    margin:number,

}

export type Position= {
    stopLoss?:number|undefined,
    takeProfit?:number|undefined,
    buyPrice:number,
    leverage:number,
    quantity:number,
    userId:string,
    assert:string,
}
