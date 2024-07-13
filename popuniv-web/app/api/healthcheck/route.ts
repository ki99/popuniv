import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  return NextResponse.json(healthcheck);
}
