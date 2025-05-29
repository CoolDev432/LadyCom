import { NextResponse } from 'next/server'
import { Vonage } from '@vonage/server-sdk'

const vonage = new Vonage({
  apiKey: "e8c74613",
  apiSecret: "VA9UHtqqwZdMc8v8"
})

const from = "Vonage APIs"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const to = searchParams.get('to')
  const text = searchParams.get('text') || 'Default SMS from Next.js API'

  if (!to) {
    return NextResponse.json({ error: 'Missing "to" query parameter' }, { status: 400 })
  }

  try {
    const response = await vonage.sms.send({ to, from, text })
    console.log('Message sent successfully:', response)
    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error('Error sending SMS:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
