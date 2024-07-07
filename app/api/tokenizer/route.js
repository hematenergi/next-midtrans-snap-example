import Midtrans from "midtrans-client"
import { NextResponse } from "next/server"

let snap = new Midtrans.Snap({
  isProduction: false,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
  serverKey: process.env.SECRET,
})

export async function POST(request) {
  const { id, productName, price, quantity } = await request.json()

  let parameter = {
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity,
    },
    item_details: [
      {
        name: productName,
        price: price,
        quantity: quantity,
      },
    ],
  }

  const token = await snap.createTransactionToken(parameter)
  console.log(token)

  return NextResponse.json({ token })
}
