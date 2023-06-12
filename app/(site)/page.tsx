import getSongs from '@/actions/get-songs'
import Header from '@/components/header'
import PageContent from './components/page-content';

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
      <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>

      <PageContent songs={songs} />
    </div>
  </div>
}
