import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, category, description } = body

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required.' },
        { status: 400 }
      )
    }

    await transporter.sendMail({
      from: `"Anthony Laurence Jewelers" <${process.env.GMAIL_USER}>`,
      to: 'anthonylaurencejewlers@gmail.com',
      replyTo: email,
      subject: `Custom Jewelry Inquiry from ${name}`,
      text: [
        'New Custom Jewelry Inquiry — Anthony Laurence Jewelers',
        '',
        `Name:      ${name}`,
        `Email:     ${email}`,
        `Phone:     ${phone || 'Not provided'}`,
        `Category:  ${category || 'Not specified'}`,
        '',
        'Description:',
        description,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
