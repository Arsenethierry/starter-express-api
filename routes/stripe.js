const express = require('express')
const Stripe = require('stripe')
// require('dotenv').config()
const STRIPE_KEY = `sk_test_51IGIouCEATszhHRKDsXil3J42HXKzMibIB07vqGae1vN5tJzKUCwRpla6MIjgqfjDHI4uMuidW64x0iQJnJMFbYt00wMLJxIvK`
const CLIENT_URL = `http://localhost:3000`

const stripe = Stripe(STRIPE_KEY)
const router = express.Router()
router.post('/create-checkout-session', async (req, res) => {

    const line_items = req.body.cartItems.map((item) => {

        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    images: [item.image],
                    description: item.description,
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.cartQuantity,
        }
    })
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: { allowed_countries: ['US', 'CA', 'IN'] },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 0, currency: 'usd' },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 5 },
                        maximum: { unit: 'business_day', value: 7 },
                    },
                },
            },
        ],
        line_items,
        phone_number_collection: {
            enabled: true,
        },
        mode: 'payment',
        success_url: CLIENT_URL + '/checkout-success',
        cancel_url: CLIENT_URL + '/cart',
    });

    res.send({ url: session.url });
});

module.exports = router 