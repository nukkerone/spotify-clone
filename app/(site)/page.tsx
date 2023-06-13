import getSongs from '@/actions/get-songs'
import Header from '@/components/header'
import PageContent from './components/page-content';
import ListItem from "@/components/list-item";

export const revalidate = 0

export default async function Home() {

  const songs = await getSongs();

  //console.log('S ', songs)

  return <div className='
    h-full
    w-full
    rounded-lg
    bg-neutral-900
    overflow-hidden
    overflow-y-auto
  '>
    <Header>Welcome back</Header>

    <div className="mt-2 mb-7 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4 mb-4">
        <ListItem image="/images/liked.png" name="Liked songs" href="/liked"></ListItem>
      </div>

      <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>

      <PageContent songs={songs} />
    </div>
  </div>
}
