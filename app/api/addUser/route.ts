import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  let idToken: string | undefined;
  cookieStore.getAll().forEach(cookie => {
    if (cookie.name.includes('.idToken')) {
      idToken = cookie.value;
    }
  });

  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiUrl = 'https://o0bhur7nkd.execute-api.ap-southeast-2.amazonaws.com/prod';

  try {
    const body = await request.json();
    const { action, email } = body;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'x-api-key': process.env.NEXT_AWS_API_KEY || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action, email })
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to whitelist user' }, { status: response.status });
    }

    // Parse the invite link from the response body
    const parsedBody = JSON.parse(data.body);
    console.log('parsedBody:', parsedBody);
    const inviteLink = parsedBody.response;

    if (!inviteLink || !inviteLink.invite_code) {
      return NextResponse.json({ error: 'Invite code not found in response' }, { status: 500 });
    }

    let inviteCode = inviteLink.invite_code;

    // Remove the inner {}
    inviteCode = inviteCode.replace(/[{}'']/g, '');

    return NextResponse.json({ invite_code: inviteCode });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}