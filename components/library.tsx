"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { Song } from "@/types/types";
import MediaItem from "./media-item";

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between px-5 pt-4 mb-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">
            Your Library
          </p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
            ml-auto
          "
        />
      </div>
      <hr className="border-neutral-400" />
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        { songs.map((song) => <MediaItem data={song} key={song.id} />)}
      </div>
    </div>
  );
}

export default Library;
