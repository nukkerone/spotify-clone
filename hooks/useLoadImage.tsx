import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Playlist, Song } from "@/types/types";

const useLoadImage = (element: Song | Playlist, bucket = 'images') => {
  const supabaseClient = useSupabaseClient();

  if (!element) {
    return null;
  }

  const { data: imageData } = supabaseClient
    .storage
    .from(bucket)
    .getPublicUrl(element.image_path);

  return imageData.publicUrl;
};

export default useLoadImage
