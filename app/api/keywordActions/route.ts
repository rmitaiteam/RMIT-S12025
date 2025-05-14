import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { action, queries } = await request.json(); 
        console.log("Action type:", action);
        console.log("Queries:", queries);

        const awsApiUrl = 'https://4q5ri8dv5c.execute-api.ap-southeast-2.amazonaws.com/default/KeywordActions';
        
        const bodyData: any = { action }; 

        if (action === 'INSERT' || action === 'DELETE') {
            bodyData.queries = queries;
        }

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

        let responseBody;
        if (typeof responseData.body === 'string') {
            responseBody = JSON.parse(responseData.body); 
        } else {
            responseBody = responseData.body;
        }

        if (action === 'GET_LAST_SCRAPE') {
            return NextResponse.json({ body: responseBody });
        }

        const queriesResponse = responseBody?.queries ?? []; 

        console.log("Parsed queries:", queriesResponse);
        console.log("Parsed queries:", responseData);

        return NextResponse.json(queriesResponse); 
    } catch (error) {
        console.error("Error in API call:", error);
        return NextResponse.json(
            { error: 'An error occurred while processing the request' },
            { status: 500 }
        );
    }
}
