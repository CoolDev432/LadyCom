import { NextRequest, NextResponse } from 'next/server';
import { databases, ID } from '@/app/appwriteConf';



export async function POST(req) {
  try {
    const body = await req.json();
    const { email, chat } = body;

    if (!email || !chat) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newDoc = await databases.createDocument(
      'SafetyMapDB',
      '683721570009c6c8ddc9',
      ID.unique(),
      {
        email: email,
        chat: chat
      }
    );

    return NextResponse.json({ success: true, document: newDoc });
  } catch (error) {
    console.error('Error posting chat:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
