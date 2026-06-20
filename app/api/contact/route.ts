import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name             = formData.get('name')?.toString() ?? ''
    const email            = formData.get('email')?.toString() ?? ''
    const phone            = formData.get('phone')?.toString() || null
    const pieceType        = formData.get('pieceType')?.toString() || null
    const description      = formData.get('description')?.toString() ?? ''
    const budgetRange      = formData.get('budgetRange')?.toString() || null
    const referenceWebsiteUrl = formData.get('referenceWebsiteUrl')?.toString() || null
    const imageEntry       = formData.get('referenceImage')

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    // Upload image to Sanity if provided
    let imageAssetId: string | null = null
    let imageUrl: string | null = null

    if (imageEntry instanceof File && imageEntry.size > 0) {
      const arrayBuffer = await imageEntry.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const asset = await writeClient.assets.upload('image', buffer, {
        filename: imageEntry.name,
        contentType: imageEntry.type,
      })
      imageAssetId = asset._id
      imageUrl = asset.url
    }

    // Create customInquiry document in Sanity
    await writeClient.create({
      _type: 'customInquiry',
      name,
      email,
      phone,
      pieceType,
      description,
      budgetRange,
      referenceWebsiteUrl,
      ...(imageAssetId && {
        referenceImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAssetId },
        },
      }),
      submittedAt: new Date().toISOString(),
    })

    // Build email body
    const emailLines = [
      'New Custom Jewelry Inquiry — Anthony Laurence Jewelers',
      '═══════════════════════════════════════════════════════',
      '',
      `Name:          ${name}`,
      `Email:         ${email}`,
      `Phone:         ${phone || 'Not provided'}`,
      `Jewelry Type:  ${pieceType || 'Not specified'}`,
      `Budget Range:  ${budgetRange || 'Not specified'}`,
      '',
      'Description / Vision:',
      description,
      '',
      `Reference URL: ${referenceWebsiteUrl || 'None'}`,
    ]

    if (imageUrl) {
      emailLines.push('')
      emailLines.push('Reference Image:')
      emailLines.push(imageUrl)
    }

    await transporter.sendMail({
      from: `"Anthony Laurence Jewelers" <${process.env.GMAIL_USER}>`,
      to: 'anthonylaurencejewlers@gmail.com',
      replyTo: email,
      subject: `Custom Jewelry Inquiry from ${name}`,
      text: emailLines.join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
