import LatestIssues from './issues/dashboard/LatestIssues';
import IssueSummary from './issues/dashboard/IssueSummary';
import prisma from '@/prisma/client';
import IssueChart from './issues/dashboard/IssueChart';
import { Grid, Flex } from '@radix-ui/themes';
import type { Metadata } from 'next';
export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });

  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });

  const closed = await prisma.issue.count({ where: { status: 'CLOSE' } });

  return (
    <>
      <Grid columns={{ initial: '1', md: '2' }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
