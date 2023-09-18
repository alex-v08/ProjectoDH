import { NextResponse } from 'next/server'

async function fetchFeatures() {
  const hostUrl = process.env.NEXT_PUBLIC_HOST_URL

  const response = await fetch(`${hostUrl}/api/feature/all`, {
    cache: 'no-store'
  })
  const data = await response.json()
  const results = Array.from(data)
  return results
}

export async function GET() {
  const results = await fetchFeatures()
  return NextResponse.json(results)
}
