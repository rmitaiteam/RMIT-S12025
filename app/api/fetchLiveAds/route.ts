import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Invalid query or timeframe parameter' }, { status: 400 });
  }

  const apiUrl = `https://07ekpc391h.execute-api.ap-southeast-2.amazonaws.com/prod/ScrapedData?q=${(query)}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
      'x-api-key': process.env.NEXT_AWS_API_KEY || ''
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
