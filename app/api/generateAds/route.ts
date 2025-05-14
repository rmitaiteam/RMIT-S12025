import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { keyword } = await request.json();
    console.log("Keyword:", keyword);

    const awsApiUrl = 'https://n4o3rjefrh.execute-api.ap-southeast-2.amazonaws.com/prod/GenerateAdsDSAI';
    const bodyData = {
      keyword
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

    if (responseData.generated_ads) {
      responseData.generated_ads = JSON.parse(responseData.generated_ads);
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in API call:", error);
    return NextResponse.json(
      { error: 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
