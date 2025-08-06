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

    const {data:books,error} = await supabase.from("books").select("*").eq("userId",session?.user.id);

    if (error) {
      console.error('Database error:', error.message);
      return NextResponse.json(
        { error: 'Failed to fetch books' },
        { status: 500 }
      );
    }
    return NextResponse.json({books})


  } catch (error) {
    console.log("Api Error",error)
    NextResponse.json({error:"Server Error"},{status:500})

  }
}

export async function POST(req: NextRequest) {}
