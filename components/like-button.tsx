"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { set } from "react-hook-form";

interface LikeButtonProps {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  songId
}) => {
  const router = useRouter();
  const {
    supabaseClient
  } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (user && songId) {
      const getLikedSongs = async () => {
        const { data: likedSongs, error } = await supabaseClient
          .from('liked_songs')
          .select('song_id')
          .eq('user_id', user.id)
          .eq('song_id', songId);
        if (error) {
          return toast.error('There was an error getting liked songs');
        }
        if (likedSongs.length > 0) {
          setIsLiked(true);
        }
      }
      getLikedSongs();
    }
  }, [user, songId])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const onLike = async () => {
    if (!user) {
      authModal.onOpen();
      return;
    }
    let error = null;
    if (isLiked) {
      ({ error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('song_id', songId)
        .eq('user_id', user.id))
      if (error) {
        return toast.error('There was an error unliking this song');
      } else {
        toast.success('Song unliked successfully');
      }
    } else {
      ({ error } = await supabaseClient
        .from('liked_songs')
        .insert({
          song_id: songId,
          user_id: user.id
        }))

      if (error) {
        return toast.error('There was an error liking this song');
      } else {
        toast.success('Song liked successfully');
      }
    }

    setIsLiked(!isLiked);
  }

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={onLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

export default LikeButton
