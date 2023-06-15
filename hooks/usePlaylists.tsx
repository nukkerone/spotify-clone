
import { useEffect, useState } from 'react'
import { Playlist } from '@/types/types'
import { create } from 'zustand'
import { useUser } from './useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import uniqid from "uniqid";
import { toast } from "react-hot-toast";

type PlaylistStore = {
  playlists: Playlist[],
  set: (p: Playlist[]) => void,
}

const usePlaylistStore = create<PlaylistStore>((set) => ({
  playlists: [],
  set: (p: Playlist[]) => set({ playlists: p }),
}))

const usePlaylists = () => {
  const playListStore = usePlaylistStore()
  const { supabaseClient } = useSessionContext()
  const { user } = useUser()
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, [user])

  const fetchPlaylists = async () => {
    if (user) {
      const { data, error } = await supabaseClient.from('playlists').select('*, songs(*)');
      if (!error) {
        playListStore.set(data as Playlist[]);
      }
    } else {
      playListStore.set([]);
    }
  }

  const create = async (title: string, imageFile: any, songId?: string) => {
    if (!user) { return }
    const uniqueID = uniqid();

    setIsSaving(true)
    // Upload image
    const {
      data: imageData,
      error: imageError
    } = await supabaseClient
      .storage
      .from('playlist_images')
      .upload(`image-${imageFile.title}-${uniqueID}`, imageFile, {
        cacheControl: '3600',
        upsert: false
      });

    if (imageError) {
      setIsSaving(false);
      return toast.error('Failed image upload');
    }

    // Create record 
    const { error: supabaseError, data: insertedPlaylist } = await supabaseClient
      .from('playlists')
      .insert({
        user_id: user.id,
        title,
        image_path: imageData.path
      })
      .select().single();

    if (supabaseError) {
      return toast.error(supabaseError.message);
    }

    if (songId) {
      const { error: supabaseError } = await supabaseClient
      .from('playlist_songs')
      .insert({
        playlist_id: insertedPlaylist.id,
        song_id: songId
      });
    }

    fetchPlaylists();
    setIsSaving(false);
  }

  const addSong = async (playlistId: string, songId: string) => {
    setIsSaving(true);
    const { error: supabaseError } = await supabaseClient
      .from('playlist_songs')
      .insert({
        playlist_id: playlistId,
        song_id: songId
      });

    setIsSaving(false);
    fetchPlaylists();
  }

  return { playlists: playListStore.playlists, create, isSaving, addSong }
}

export default usePlaylists
