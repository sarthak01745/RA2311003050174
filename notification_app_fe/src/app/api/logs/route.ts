import { NextRequest, NextResponse } from "next/server";

const LOG_ENDPOINT =
  "http://20.207.122.201/evaluation-service/logs";

const AUTH_TOKEN =
  process.env.API_BEARER_TOKEN || "BEARER_TOKEN_PLACEHOLDER";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Log service responded with ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to forward log: ${message}` },
      { status: 502 }
    );
  }
}
