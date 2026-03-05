import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function PUT(request: Request, context: unknown) {
  try {
    const body = await request.json();
    const id = (context as { params: { id: string } }).params.id;

    const res = await fetch(`${API_URL}/admin/pricing-packs/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: unknown) {
  try {
    const id = (context as { params: { id: string } }).params.id;

    await fetch(`${API_URL}/admin/pricing-packs/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}