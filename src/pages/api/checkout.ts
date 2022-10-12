import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function checkoutStripe(req: NextApiRequest, res: NextApiResponse) {
  const priceId= '1'
  const successUrl = `${process.env.APP_MAIN_LINK}/success`
  const cancelUrl = `${process.env.APP_MAIN_LINK}/canceled`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      { price: priceId, quantity: 1 }
    ]
  })
  return res.status(201).json({
    checkoutUrl:checkoutSession.url,
  })
}