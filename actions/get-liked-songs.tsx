import { Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return [];

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
}

export default getLikedSongs

