import useLoadImage from "@/hooks/useLoadImage"
import { Playlist } from "@/types/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Image from "next/image"

type PlaylistItemsProps = {
  playlists: Playlist[],
  onSelected: (id: string) => void
}

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists, onSelected }) => {

  const loadImage = async (path: string, bucket = 'images') => {
    const supabaseClient = useSupabaseClient();
  
    const { data: imageData } = supabaseClient
      .storage
      .from(bucket)
      .getPublicUrl(path);

    return imageData
  }

  return <div className="flex flex-col gap-y-4">
    {playlists.map((playlist) => <PlaylistItem playlist={playlist} onSelected={() => {}} />)}
  </div>
}

type PlaylistItemProps = {
  playlist: Playlist,
  onSelected: (id: string) => void
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onSelected }) => {
  const imageUrl = useLoadImage(playlist, 'playlist_images');

  return <div key={playlist.id} className="flex items-center gap-x-4">
  <button
    className="
      relative 
      rounded-md 
      min-h-[44px] 
      min-w-[44px] 
      overflow-hidden
    "
    onClick={() => onSelected(playlist.id)}
  >
    <Image
      fill
      src={imageUrl!}
      alt="MediaItem"
      className="object-cover"
    />
  </button>
  <div className="flex flex-col">
    <div className="font-bold">{playlist.title}</div>
    <div className="text-sm">{playlist.songs.length} songs</div>
  </div>
</div>
}

export default PlaylistItems
