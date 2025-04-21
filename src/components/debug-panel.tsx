"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugPanel() {
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-api")
      const data = await response.json()
      setApiStatus(data)
    } catch (error) {
      setApiStatus({ success: false, error: error instanceof Error ? error.message : "Une erreur est survenue" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Panneau de débogage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p>Clé API publique: {process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY ? "Présente" : "Absente"}</p>
          </div>
          <Button onClick={testApi} disabled={loading}>
            {loading ? "Test en cours..." : "Tester l'API"}
          </Button>
          {apiStatus && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(apiStatus, null, 2)}</pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
