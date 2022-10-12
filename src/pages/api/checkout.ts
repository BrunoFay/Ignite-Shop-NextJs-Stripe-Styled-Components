import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function checkoutStripe(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.body

  if(req.method !== 'POST'){
    return res.status(405)
  }

  if (!productId) {
    return res.status(404).json({ message: 'PriceId is required!' })
  }

  const successUrl = `${process.env.APP_MAIN_LINK}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.APP_MAIN_LINK}/canceled`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      { price: productId, quantity: 1 }
    ]
  })
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}