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
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'x-api-key': process.env.NEXT_AWS_API_KEY || '',
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch data' }, { status: response.status });
        }
        const responseData = await response.json();
        const parsedBody = JSON.parse(responseData.body);
        return NextResponse.json(parsedBody);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
