// app/api/webhooks/route.js

import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createCustomer } from '@/db/fauna'

export async function POST(req) {
  // Retrieve the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('Missing WEBHOOK_SECRET in environment variables.')
    return new Response('Internal Server Error', { status: 500 })
  }

  // Extract headers directly from the request
  const svix_id = req.headers.get('svix-id')
  const svix_timestamp = req.headers.get('svix-timestamp')
  const svix_signature = req.headers.get('svix-signature')

  // Validate presence of required headers
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing one or more required svix headers.')
    return new Response('Bad Request: Missing svix headers', { status: 400 })
  }

  // Read the raw body as text
  let body
  try {
    body = await req.text()
  } catch (err) {
    console.error('Error reading the request body:', err)
    return new Response('Bad Request: Unable to read body', { status: 400 })
  }

  // Initialize the Svix Webhook verifier
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt
  try {
    // Verify the webhook signature
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return new Response('Unauthorized: Invalid signature', { status: 401 })
  }

  // At this point, the webhook is verified. Process the event.
  const eventType = evt.type
  console.log('Received event:', eventType)
  console.log('Event data:', evt.data)

  // Handle specific event types
  if (eventType === 'user.created') {
    try {
      await createCustomer(evt.data)
      console.log('Customer created successfully.')
    } catch (dbErr) {
      console.error('Error creating customer in database:', dbErr)
      // Optionally, you might want to return a 500 status here
      // if the failure should prevent acknowledgment
      return new Response('Internal Server Error: Database operation failed', { status: 500 })
    }
  } else {
    console.log(`Unhandled event type: ${eventType}`)
  }

  // Respond with a 200 status to acknowledge receipt
  return new Response('Webhook received successfully.', { status: 200 })
}
