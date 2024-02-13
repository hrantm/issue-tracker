import Image from 'next/image'
import Pagination from './components/Pagination'

export default function Home() {
  return (
    <Pagination currentPage={10} pageSize={10} itemCount={100}/>

  )
}
