import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { q, timeframe } = await request.json();

    const awsApiUrl = 'https://agzutz09qe.execute-api.ap-southeast-2.amazonaws.com/prod/RDStoApp-DSAI';

    const bodyData = {
      q,
      timeframe,
    };

    const response = await fetch(awsApiUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_AWS_API_KEY || '',
      }),
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: 'Failed to send data to AWS API Gateway', details: errorData },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in API call:", error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
