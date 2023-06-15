'use client'

import { useEffect, useState } from "react"
import Modal from "./modal"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import usePlaylistCreationModal from "@/hooks/usePlaylistCreationModal"
import Input from "./input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "./button"
import SearchInputWithCallback from "./search-input-with-callback"
import PlaylistItems from "./playlist-items"
import usePlaylists from "@/hooks/usePlaylists"
import { Playlist, Song } from '@/types/types'

const PlaylistCreationModal = () => {
  const playlistCreationModal = usePlaylistCreationModal()
  const [activeTab, setActiveTab] = useState<'selection' | 'creation'>('selection')
  const title = activeTab === 'creation' ? 'Create a new playlist' : 'Select a playlist'
  const description = activeTab === 'creation' ? 'Create your own playlist' : 'Choose from an existing playlist'

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { playlists, create: createPlaylists, isSaving, addSong } = usePlaylists()
  const [filteredPlaylists, setFilteredPlaylists] = useState<Playlist[]>(playlists)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      playlistCreationModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const imageFile = values.image?.[0];
    const title = values.title;

    await createPlaylists(title, imageFile, playlistCreationModal.songId);
    reset();
    toast.success('Playlist created and song added to it')
    setTimeout(() => {
      playlistCreationModal.onClose();
    }, 300)
  }

  const onPlaylistSelected = async (playlistId: string) => {
    if (!playlistCreationModal.songId) { return }
    await addSong(playlistId, playlistCreationModal.songId)
    reset();
    toast.success('Song added to the playlist')
    setTimeout(() => {
      playlistCreationModal.onClose();
    }, 300)
  }

  useEffect(() => {
    if (activeTab === 'selection') {
      // Fetch playlists, update state
      if (searchQuery.length > 0) {
        setFilteredPlaylists(playlists.filter(p => p.title.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0))
      } else {
        setFilteredPlaylists(playlists);
      }
    }
  }, [searchQuery, activeTab, playlists]);

  return <Modal title={title} description={description} isOpen={playlistCreationModal.isOpen} onChange={onChange}>
    { activeTab === 'selection' && <form>
      <SearchInputWithCallback onChange={setSearchQuery} />
      
      <div className="mt-4">
        <PlaylistItems playlists={filteredPlaylists} onSelected={onPlaylistSelected}/>
      </div>

      <div className="flex items-center mt-4">
        <button className="text-gray-500 text-center text-sm underline mx-auto hover:text-gray-400" onClick={() => setActiveTab('creation')}>Or create a new playlist</button>
      </div>
    </form>
    }

    { activeTab === 'creation' && <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4"
    >
      <Input
        id="title"
        disabled={isSaving}
        {...register('title', { required: true })}
        placeholder="Song title"
      />
      <div>
        <div className="pb-1">
          Select an image
        </div>
        <Input
          placeholder="Upload your image"
          disabled={isSaving}
          type="file"
          accept="image/*"
          id="image"
          {...register('image', { required: true })}
        />
      </div>
      <Button disabled={isSaving} type="submit">
        Create
      </Button>

      <div className="flex items-center">
        <button className="text-gray-500 text-center text-sm underline mx-auto hover:text-gray-400" onClick={() => setActiveTab('selection')}>Or choose from an existing playlist</button>
      </div>
    </form>}
  </Modal>
}

export default PlaylistCreationModal
