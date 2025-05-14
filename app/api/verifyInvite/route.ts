import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const apiUrl = 'https://o0bhur7nkd.execute-api.ap-southeast-2.amazonaws.com/prod';

    try {
        const body = await request.json();
        const { action, invite_uuid } = body;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'x-api-key': process.env.NEXT_AWS_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action, invite_uuid })
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data.message || 'Failed to process' }, { status: response.status });
        }

        // Parse the invite link from the response body
        const parsedBody = JSON.parse(data.body);
        let email = parsedBody;

        return NextResponse.json({ email: email });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
