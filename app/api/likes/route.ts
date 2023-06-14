import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { like, song_id: songId } = await req.json()
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }} = await supabase.auth.getUser();
  const userId = user?.id;
  // const userId = '86d6c604-7bbd-44bd-b8e8-7fc578e6ca01';

  if (!userId) {
    return NextResponse.json({ error: "You must be logged in to like a song" }, { status: 401 });
  }

  try {
    if (like) {
      const { data, error } = await supabase.from('liked_songs').upsert({ user_id: userId, song_id: songId });
      if (error) { throw error; }
    } else {
      const { data, error } = await supabase.from('liked_songs').delete().match({ user_id: userId, song_id: songId });
      if (error) { throw error; }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({ like, userId, songId });
}
