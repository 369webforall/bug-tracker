import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';

import React from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButton;
