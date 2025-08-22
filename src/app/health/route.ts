import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Vous pouvez ajouter ici des vérifications supplémentaires
    // comme la connexion à la base de données, etc.
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  } catch {
    return NextResponse.json(
      { status: 'unhealthy', error: 'Service unavailable' },
      { status: 503 }
    )
  }
}
