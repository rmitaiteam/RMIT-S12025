import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

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

  if (!id) {
    const apiUrl = `https://ew71desr1i.execute-api.ap-southeast-2.amazonaws.com/GetGenAds`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
      'x-api-key': process.env.NEXT_AWS_API_KEY || '',
      'Authorization': `${idToken}`
      }
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
else {
  const apiUrl = "https://2dgoyacvmh.execute-api.ap-southeast-2.amazonaws.com/prod";
  const raw = JSON.stringify({
    queryStringParameters: {
      id: Number(id)
    }
  });

  try {
    console.log(raw)
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_AWS_API_KEY || '',
      }),
      body: raw
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
}
