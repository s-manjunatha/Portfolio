import { NextResponse } from "next/server";
import { fetchGitHubData } from "@/app/lib/github";

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || "s-manjunatha";
    const data = await fetchGitHubData(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in github API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
