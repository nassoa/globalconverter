import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.EXCHANGERATE_API_KEY
    const publicApiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)

    const data = await response.json()

    return NextResponse.json({
      success: true,
      apiKeyExists: !!apiKey,
      publicApiKeyExists: !!publicApiKey,
      apiResponse: data,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Une erreur inconnue est survenue",
      },
      { status: 500 },
    )
  }
}
