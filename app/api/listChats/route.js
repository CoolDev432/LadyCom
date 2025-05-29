
import { NextRequest, NextResponse } from 'next/server';
import { databases, ID } from '@/app/appwriteConf';

export async function GET() {
  try {
        const res = await databases.listDocuments('SafetyMapDB','683721570009c6c8ddc9');
        return NextResponse.json(res)
  } catch (error) {
    console.error('Error Listing chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
