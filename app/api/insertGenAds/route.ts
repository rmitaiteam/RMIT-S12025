import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { query, headlines, descriptions, rating, quality } = await request.json();

        const payload = {
            body: JSON.stringify({
                query: query || "",
                headline1: headlines[0] || "",
                headline2: headlines[1] || "",
                headline3: headlines[2] || "",
                headline4: headlines[3] || "",
                description1: descriptions[0] || "",
                description2: descriptions[1] || "",
                description3: descriptions[2] || "",
                description4: descriptions[3] || "",
                rating: rating || 0,
                quality_level: quality || "Average"
            })
        };


        const response = await fetch('https://r6ltnumf98.execute-api.ap-southeast-2.amazonaws.com/prod/AdsToRDS', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_AWS_API_KEY || '',
              }),
            body: JSON.stringify(payload),  
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`AWS Lambda request failed: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in API call:", error);
        return NextResponse.json(
            { error: "An error occurred while processing the request" },
            { status: 500 }
        );
    }
}
