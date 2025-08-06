import { supabase } from "@/lib/supabase-admin";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: books, error } = await supabase
      .from("books")
      .select("*")
      .eq("userId", session?.user.id);

    if (error) {
      console.error("Database error:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch books" },
        { status: 500 },
      );
    }
    return NextResponse.json({ books });
  } catch (error) {
    console.log("Api Error", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(options);

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { title, genre, author } = await req.json();

    const { data: newBook, error } = await supabase
      .from("books")
      .insert({ title, genre, author, userId: session?.user.id })
      .select()
      .single();

    if (error) {
      console.log("Databse error", error.message);
      return NextResponse.json(
        { error: "Failed to create book" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Book created successfully", book: newBook },
      { status: 201 },
    );
  } catch (error) {
    console.log("Api error", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(options);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book id is required" },
        { status: 400 },
      );
    }
    const { data: existingBook, error: fetchError } = await supabase
      .from("books")
      .select("id, userId")
      .eq("id", bookId)
      .eq("userId", session?.user.id)
      .single();

    if (fetchError || !existingBook) {
      return NextResponse.json(
        { error: "Book not found or access denied" },
        { status: 404 },
      );
    }
    const { error: deleteError } = await supabase
      .from("books")
      .delete()
      .eq("id", bookId)
      .eq("userId", session?.user.id);

    if (deleteError) {
      console.log("Error deleting book: ", deleteError.message);
      return NextResponse.json(
        { error: "Failed to delete book" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Book deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log("Api error", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
