'use client'

import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (err) {
      setError('An error occurred while generating the image.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="w-full  bg-white overflow-hidden max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-lg ">
        <div className="p-6">
        <div className="flex items-center justify-center mb-6">
        <Camera className="text-white mr-2" size={32} />
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-500 to-white mb-6">AI Image Generator</h2>
      </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt for image generation"
              required
              className="text-blue-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Image'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {imageUrl && (
            <div className="mt-4">
              <Image width={400} height={400} src={imageUrl} alt="Generated image" className="w-full rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}