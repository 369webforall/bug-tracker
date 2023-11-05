import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';
export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <LatestIssues />
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
