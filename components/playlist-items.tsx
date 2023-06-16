import useLoadImage from "@/hooks/useLoadImage"
import { Playlist } from "@/types/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Image from "next/image"

type PlaylistItemsProps = {
  playlists: Playlist[],
  onSelected: (id: string) => void
}

const PlaylistItems: React.FC<PlaylistItemsProps> = ({ playlists, onSelected }) => {

  return <div className="flex flex-col gap-y-4">
    {playlists.map((playlist) => <PlaylistItem key={playlist.id} playlist={playlist} onSelected={onSelected} />)}
  </div>
}

type PlaylistItemProps = {
  playlist: Playlist,
  onSelected: (id: string) => void
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onSelected }) => {
  const imageUrl = useLoadImage(playlist, 'playlist_images');

  return <div className="flex items-center gap-x-4">
    <button
      className="flex gap-x-4"
      onClick={() => onSelected(playlist.id)}
    >
      <div className="relative rounded-md h-[44px] w-[44px] overflow-hidden">
        <Image
          fill
          src={imageUrl!}
          alt="MediaItem"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col text-left">
        <div className="font-bold">{playlist.title}</div>
        <div className="text-sm">{playlist.songs.length} songs</div>
      </div>
    </button>
  </div>
}

export default PlaylistItems
