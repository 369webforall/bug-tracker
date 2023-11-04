import Pagination from './components/Pagination';

export default function Home() {
  return <Pagination pageSize={10} currentPage={1} itemCount={100} />;
}
