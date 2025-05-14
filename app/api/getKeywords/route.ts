import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_id, campaign_name } = body;

    const cookieStore = cookies();
    const idToken = cookieStore.get('CognitoIdentityServiceProvider.486u3mark3r5s9kqbik2n2ud1v.b9eef488-3071-7075-27f1-52e02df8f227.idToken')?.value;

    if (!customer_id || !campaign_name) {
      return NextResponse.json({ error: 'Missing customer_id or campaign_name' }, { status: 400 });
    }

    console.log(`customer_id: ${customer_id}, campaign_name: ${campaign_name}`);

    const apiUrl = `https://lznw869119.execute-api.ap-southeast-2.amazonaws.com/GetKeywords`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${idToken}`,
      },
      body: JSON.stringify({ customer_id, campaign_name }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
