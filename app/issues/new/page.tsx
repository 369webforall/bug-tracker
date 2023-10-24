import dynamic from 'next/dynamic';
import IssueFormSkelton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkelton />,
});
const NewIssueForm = () => {
  return <IssueForm />;
};

export default NewIssueForm;
