import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
export async function POST(req) {
    try {
      const { prompt } = await req.json()
  
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "512x512",
      })
  
      const imageUrl = response.data[0].url
  
      return NextResponse.json({ imageUrl })
    } catch (error) {
      console.error('Error generating image:', error)
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
    }
  }