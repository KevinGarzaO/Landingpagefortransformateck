import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')

  console.log('LinkedIn OAuth CODE:', code)
  console.log('LinkedIn OAuth STATE:', state)

  return new NextResponse('LinkedIn OAuth OK. Ya puedes cerrar esta ventana.', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
