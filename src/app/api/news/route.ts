import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');

  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      throw new Error("API key is missing");
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}&pageSize=${limit}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }
    const data = await res.json();
    return NextResponse.json({
      articles: data.articles,
      totalPages: Math.ceil(data.totalResults / limit),
      currentPage: page,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

