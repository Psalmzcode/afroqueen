
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting database ping...`);

  try {
    console.log('Executing Prisma query...');
    interface QueryResult {
      alive: number;
      db_time: Date;
    }
    const result = await prisma.$queryRaw<QueryResult[]>`SELECT 1 as alive, NOW() as db_time`;
    const responseTime = Date.now() - startTime;

    console.log(`✅ Ping successful! Response time: ${responseTime}ms`);
    console.log(`Database time: ${result[0]?.db_time}`);

    return NextResponse.json({
      status: 'success',
      message: 'Database pinged successfully',
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      dbTime: result[0]?.db_time
    });

  } catch (error) {
    console.error('❌ Ping failed! Error:', error);

    return NextResponse.json({
      status: 'error',
      message: 'Ping failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Optional: Export other HTTP methods if needed
// export async function POST(request: NextRequest) { ... }
// export async function DELETE(request: NextRequest) { ... }