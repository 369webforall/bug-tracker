import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });

  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });

  const closed = await prisma.issue.count({ where: { status: 'CLOSE' } });

  return (
    <>
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </>
  );
}
