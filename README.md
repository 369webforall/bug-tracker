# Video

[class-1](https://youtu.be/M0Fsrt9V9HE)

[class-2](https://youtu.be/at07DRKHj6Q)

[class-3](https://youtu.be/G-0p_SFPuXg)

# 1. Introduction (10m)

Build a full-stack production-grade application Issue-tracker

- In modern web, these are the few common features.
- Dashboard with chart
- Filtering, sorting, pagination
- Forms with client side validation
- User authentication and access control
- Model dialog box and tost notification

By the end of the course everyone should be confident in building fast, responsive fully functional web application and able to host.

**Stack**

- Nextjs, Typescript, tailwindcss, Radix UI, Prisma, NextAuth

**Learning Goal**

- How to structure your application
- How to write clean, professional quality code, that align with industry standard and best practices.
- How to think like software Engineer.

**What should you know**

- Client and Server component's
- Routing, Building API
- Database integration with Prisma
- Authentication with NextAuth

**Project Roadmanp**

- May be you thinking how to start and finish the project, which component should i build first.

`Lets take simple approach, divide the project in 2 parts`

**core/Essential Features**

- Create an issue, setup database
- Viewing Issues
- Updating Issue
- Deleting Issue

**Advance Features**

- User Authentication
- Assigning issues
- Sorting, Filtering, Pagination
- Dashboard

**Important Point to remember**

- When we are building this application we are going to focus one feature at a time.
- When building feature, our goal is not to come with perfect solution, first we build the working feature, then improve the code.

**there is no such thing as `Perfect in software development`**
`Make it first work and improve it`

# 2. Setting Up the Project (45m)

- create new github repository issue-tracker
- clone
  window>`git clone https://github.com/369webforall/bug-tracker.git`

- open in vscode (add extension ES7+React/redux/ Tailwind css intellisent / Prisma / Javascript/Typescript)

- install next-js, with typescript and tailwind css
  `npx create-next-app@latest ./`

- clean the code.

git add .
git commit -m "project setup"
git push

**NavBar.tsx**

- crate NavBar.tsx file in app directory

- install react-icons (`npm i react-icons`)
- install classnames (`npm i classnames`)

- once navbar is complete
  git add .
  git commit -m "Navbar completed"
  git push

# 3. Creating Issues (database setup) (80m)

**1. Database setup**

- Mongodb
- create project in mongodb atlas, save password, copy the link of your project.

**2. Setting up prisma**

- install prisma (`npm i prisma`)
- intialize prisma (`npx prisma init`)

- change provider datasource db {
  provider = "mongodb"
  url = env("DATABASE_URL")
  }

**3. Creating the issue model**

- create model as below

```javascript
model Issue {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  status      Status   @default(OPEN)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

- `npx prisma format` this will format the code

  (Prisma Client is a TypeScript (or JavaScript) library that provides a type-safe and auto-completing API for interacting with your database. When you run npx prisma generate, Prisma generates the necessary code based on your Prisma schema and the database you're using.)

- `npx prisma db push` - it sync the schema with our database (creating database and table)

`git add .`
`git commit -m "setup prisma and model"`
`git push`

[Guide Prisma-mongodb](https://www.prisma.io/docs/guides/database/mongodb)

**4. Building an API**

- app>api>issues>route.tsx
- add api code to post method.
- install zod for data validation
- to store data(issue) we need to create prisma client.
- in prisma>client.ts (`add the code from nextjs-prisma client documentation`)

```javascript
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

import { z } from 'zod';
const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
```

**5. Setting up Redix UI**

- To build the new issue page we will use radix UI, very popular component library.
- Radix comes in to flavour, Themes and Primitives, themes have pre build component ready to use, where Primitives have only behaviour, and we have to style ourself.
- step1 `npm install @radix-ui/themes`

- step2 `import '@radix-ui/themes/styles.css;`

- step3 ` Add the Theme component`

[install Radix](https://www.radix-ui.com/themes/docs/overview/getting-started)

- import Button component in issue page and test.
  `git add . //  git commit -m "setup radix ui" // git push`

  **6. Building the new issue page**

  - In this section we are just going to build the form with two field, title and description.
  - issues>new>page.tsx
  - add the form from radix ui.

  ```javascript
  'use client';
  import React from 'react';
  import { TextField, TextArea, Button } from '@radix-ui/themes';
  const NewIssuePage = () => {
    return (
      <div className="max-w-xl space-y-4">
        <TextField.Root>
          <TextField.Input placeholder="Title" />
        </TextField.Root>
        <TextArea placeholder="Description" />
        <Button>Submit New Issue</Button>
      </div>
    );
  };
  export default NewIssuePage;
  ```

- add button to navigate the NewIssuePage

**7. Customizing radix ui theme**

- ThemePanle to change the theme.
- Also fix the inter font to work with radix ui.
- Follow the instruction in below link.

[RadixUi-typography](https://www.radix-ui.com/themes/docs/theme/typography)

**8. Adding a Markdown editor**

- Now let's replace textarea filed with markdown component.
- For this we are going to use `react-simplemde-editor`
  [React SimpleMDE (EasyMDE) Markdown Editor](https://www.npmjs.com/package/react-simplemde-editor)

  - install `npm install --save react-simplemde-editor easymde`
  - now to use this component, import
    `import SimpleMDE from "react-simplemde-editor";`
    `import "easymde/dist/easymde.min.css";`

- Replace TextArea field with SimpleMDE component.

**9. Handling form submission**

- our Form is ready now its time to handle the form submission, we are going to use very popular library call `React Hook Form`

- install `npm install react-hook-form`

- `import { useForm } from "react-hook-form"`

- Next we define the interface of our form, basically the shape of our form (all the fields)
- Call the function useForm, which return objects, destructure it.
  `const {register} = useForm<IssueForm>()`

  - {...register('title')} // because we saw in console log. it return object with 4 properties. that's why we must destructure it.

- This technique will not work with simpleMDE

  - We need to use the controller component.
  - First we render the controller component then pass the SimpleMDE component to controller component as props.

  ```javascript
  <Controller
    name="description"
    control={control}
    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
  />
  ```

- next we need to submit form, handleSubmit

- install axios to connect with our api. (POST)
  `npm i axios`

  ```javascript
  'use client';
  import { TextField, Button } from '@radix-ui/themes';
  import SimpleMDE from 'react-simplemde-editor';
  import 'easymde/dist/easymde.min.css';
  import { useForm, Controller } from 'react-hook-form';
  import axios from 'axios';
  import { useRouter } from 'next/navigation';
  interface IssueForm {
  title: string;
  description: string;
  }
  const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register('title')} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit New Issue</Button>
    </form>
  );
  };
  export default NewIssuePage;
  ```

**10. Handling Errors**

- currently our code doen't have error handling, so next thing what we want to do is handle the potential error and provide the feedback to the user if something goes wrong.
- add `try catch` block;

- we can also format the error `return NextResponse.json(validation.error.format(), { status: 400 });`

- we can also provide the custom error message.
- This will be usefull if you want to handle error in server, for example in registraion form , user must select unique username.

- now we need to display the error in client page.
- `useState` hook to store the error.

- now let's use one of the component from Radix ui `callout` to display the error.

```javascript
'use client';
import { useState } from 'react';
import { TextField, Button, Callout } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
interface IssueForm {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  const [error, setError] = useState('');

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-4'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occurred');
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

```

**11. Implementing client side valiation**

- We have schema for validating our Object in route.tsx file, so it would be nice if we use the same shcema also in client side.

- let's extract this logic in seperate module, so we can use it in two different places.

- right click on createIssueSchema and click Refactor.

- move the file to app directory.
- change the name to more general name like `validationSchema`

- now to use the schema, install the package called `@hookform/resolver`
  `npm i @hookform/resolvers`

  `import { zodResolver } from '@hookform/resolvers/zod';`

  - also update the interfce, we already have type check in zod
    `import {z} from 'zod'`
    `type IssueForm = z.infer<typeof createIssueSchema>;`

- now we can get formState object, destructure to errors object which has property for title and description.

**12. Extract the error message component**

```javascript
import { Text } from '@radix-ui/themes';
import React, { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text as="p" color="red">
      {children}
    </Text>
  );
};

export default ErrorMessage;
```

**13. Adding a spinner**

- To improve user experience we want to add the spinner when submitting the form.

[react spinner elements](https://tw-elements.com/docs/standard/components/spinners/)

```javascript
import React from 'react';

const Spinner = () => {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
```

- import to page.tsx add to the Button component.
- useState hook to maintain the state for displaying the spinner when submitting the form.

**14. code organization**

- when creating the issue we may move the code in seperate file, but we only have one place creating the issue so for now let's keep it there
  // createIssue(data)

- move the inline function.

# 4. Viewing Issues (54m)

**1-Showing the issues**

- show the issue, in issue page. import prisma,
  `prisma.issue.findMany()`
- use Table component from Radix UI
- map through the issues and display the issue
- also hide status and issueDate in mobile.
- add div block to display the status on mobile.

**2-Building the issues Status Badge**

- Now let's add the beautiful badge componet from Radix ui for our status.
- first approach

```javascript
const IssueStatusBadge = ({ status }: { status: Status }) => {
  if (status === 'OPEN') return <Badge color="red">Open</Badge>;
  if (status === 'IN_PROGRESS') return <Badge color="violet">Open</Badge>;
  if (status === 'CLOSE') return <Badge color="orange">Open</Badge>;
};
```

- Second approach using Record, utility type in TypeScript which allows us to define a key value pair.

```javascript
import { Status, Issue } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

const statusMap: Record<
  Status,
  { label: string, color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSE: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
```

**3-Adding Loading Skeltons**

- To imporve the user experience, let's add the loading skelton.
- when someone visit the site, while data is loading, user can see the skelton of the page.

- In issue folder add loading.tsx
- we can install delay package to delay the page loading so that we can see it clearly.

`npm i delay`

`import delay from 'delay`

- right after data is fetch, we can add delay(2000)

- To add the modern loading skelton, React Loading Skeleton package we will use.

`npm i react-loading-skeleton`

```javascript
import { Table } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import IssueActions from './IssueActions';
const issues = [1, 2, 3, 4, 5, 6];
const LoadingIssuePage = () => {
  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuePage;
```

- we can move the button to seperate componet so it can be used in different component inside issues.

**4-Showing Issues Details**

- let's add [id]>page.tsx

```javascript
import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
```

**5-Styling the Issue Details Page**

- let's style the issue detail page, will use Radix UI.

```javascript
import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Flex, Card } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />

        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
```

**6-Adding Markdown Preview**

- let's install package called react-markdown
  `npm i react-markdown`

  - wrap the paragraph with ReactMarkdown component.
  - Next install the package tailwind typograpy
    [tailwind typography](https://tailwindcss.com/docs/typography-plugin)

  `npm install -D @tailwindcss/typography`

```javascript
import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Heading, Flex, Card } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />

        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
```

**7-Building the Styled Link Component**

- either we can add some style to title link, so when hover styles changed
- or let's build the custom Link componet and use Radix Link for style.

```javascript
import React from 'react';
import { Link as RadixLink } from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props {
  href: string;
  children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
```

**8-Additional Loading Skeltons**

- copy the code from issuedetail page and add in loading file.
- fix all the import.
- Add Box component form Radix UI.
  `import Skeleton from 'react-loading-skeleton'`
  `import 'react-loading-skeleton/dist/skeleton.css'`

  - add Skeleton componet in loading file, form loading and also for issueDetailspage loading.

  **9-Disabling Server-side rendering**

- if there is any error, then better we comment out the component and try to figure out the issue.

- disable SSR, for mark-down-editor

```javascript
'use client';

import { useState } from 'react';
import { TextField, Button, Callout } from '@radix-ui/themes';
// import SimpleMDE from 'react-simplemde-editor';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

// interface IssueForm {
//   title: string;
//   description: string;
// }
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
type IssueForm = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm <
  IssueForm >
  {
    resolver: zodResolver(createIssueSchema),
  };
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occurred');
    }
  });
  return (
    <div className="max-w-xl mb-4">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-4" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
```

- **10-Refactoring-Organizing Imports**
- go to component folder and add index.ts
- import all the component here.

```javaScript

export { default as Link } from './Link';
export { default as Spinner } from './Spinner';
export { default as IssueStatusBadge } from './IssueStatusBadge';
export { default as ErrorMessage } from './ErrorMessage';

export { default as Skeleton } from './Skeleton';

```

# 5. Updating Issues (60m)

**1. Adding the Edit Button**

- In this section we just focus on adding an Edit Button
- In [id] folder let's go to the page. replace div with Grid component and add two column form Radix UI.

- Make grid column responsive by adding breakpoint for Radix UI ( columns: {initial: '1', md:'2'})

- gap-5
- Install icons from radix ui
  `npm i @radix-ui/react-icons`

  - search pencil icon (Pencil 2)

  ```javascript
  import React from 'react';
  import prisma from '@/prisma/client';
  import { notFound } from 'next/navigation';
  import { Heading, Flex, Card, Grid, Box, Button } from '@radix-ui/themes';
  import IssueStatusBadge from '@/app/components/IssueStatusBadge';
  import ReactMarkdown from 'react-markdown';
  import { Pencil2Icon } from '@radix-ui/react-icons';
  import Link from 'next/link';
  interface Props {
    params: { id: string };
  }
  const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
      where: { id: params.id },
    });

    if (!issue) notFound();

    return (
      <Grid columns={{ initial: '1', md: '2' }} gap="5">
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3" my="2">
            <IssueStatusBadge status={issue.status} />

            <p>{issue.createdAt.toDateString()}</p>
          </Flex>
          <Card className="prose" mt="4">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Button>
            <Pencil2Icon />
            <Link
              href={`/issues/${issue.id}/edit`}
              className="flex gap-2 items-center"
            >
              Edit Issue
            </Link>
          </Button>
        </Box>
      </Grid>
    );
  };
  export default IssueDetailPage;
  ```

  **2. Applying the single Responsibility principle**

  - Software entities should have a single responsibility.
  - let's apply this principle in issueDetailPage
  - If we look at the details of this page, it should have only layout, two column grid layout.
  - first create EditIssueButton and move the button code.
  - second create IssueDetails page and move the details code here.

  **3. Building the Edit Issue page**

  - here we will build the edit issue page. we need to reuse the form, so let's add componets folder in issue, so we can add the the component which we think only needed in issue.

  - fetch the issue with id in IssueForm and pass as props.

  - edit>page.tsx

```javascript
import React from 'react';
import IssueForm from '../../_components/IssueForm';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
```

- **4. Building an API**
- add api/issues/[id]/route.ts

```javascript
import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
```

**5. Updating Issues**

- We build the api now it's time to update our form.
- in form, check if there is issue then update the data axios.patch() else axios.put()
- add the respective api route.
- Also dinamically display the text in submit button.

  **6. Understanding Caching**

  - In Nextjs there is three cache layer

  1. Datacache

  - When we fetch data from external source using fetch() api, nextjs store the result in data cache.
  - This data cache stored in file system.
  - It is permanent until we redeploy our application.
  - So next time when we request the data, nextjs not go over the network, it will just return the datacache file.

- `we can disable data cache or revalidate after certain time`
- ` fetch('...', {cache:'no-store'})`
- `fetch('...', {next: {revalidate: 3600}})`

2.  Full Route cache (cache on server)

- Used to store the statically rendered routes.
  ordering
  a. Static (build time)

- Routes with no parameter are considered static routes

- To change the static route to dynamic applies
  `export const revalidate = 0;`
  or
  `export const dynamic = 'force-dynamic;`

b. Dynamic (request time)

- Routes with parameters as dynamic route.

3. Router cache (client-side cache)
   (Data stored in the browser)

- Store the payload of page in browsers
- Last for a session
- Get refreshed when page reload
- After 5 min data reload.

- We can add the page to reload when data is created.
  `router.refresh()`

**7. Improving the Loading Experience**

-Improve the loading experience by adding dynamic loading. And refactoring the code.

# 6. Deleting Issues (40m)

**1- Adding a Delete Button**

- In this section we are going to implement feature for delete issue.
- Add Delete Button, in issues>id>DeleteIssueButton.tsx

**2- Adding a Confirmation dialog box**

- When delete button is clicked we need to show the conformation box.
- we will use radix ui for alert componet.

**3- Building an API**

- Build API for deleteing issue.
- api/issues/[id]>route.ts

```javascript
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 400 });

  await prisma.issue.delete({ where: { id: params.id } });

  return NextResponse.json({ message: 'Issue Deleted' }, { status: 200 });
}
```

**4- Deleting an Issue**

- Now our api is ready, to delete an issue, go to delete issue button.
- add callback function on click.

```javascript
<Button
  variant="solid"
  color="red"
  onClick={async () => {
    await axios.delete(`/api/issues/` + issueId);
    router.push('/issues');
    router.refresh();
  }}
>
  Delete Issue
</Button>
```

- `import axios from 'axios';`
- `import { useRouter } from 'next/navigation';`

```javascript
<Button
  variant="solid"
  color="red"
  onClick={async () => {
    try {
      await axios.delete(`/api/issues/` + issueId);
      router.push('/issues');
      router.refresh();
    } catch (error) {}
  }}
>
  Delete Issue
</Button>
```

**5- Handling Errors**

- We must consider the situation for error.
- First wrap the expression in try catch block.

  **6- Improving the user Experience**

  - add spinner, when deleting the issue.
  - useState hook to manage the state.
  - use delay library for delay the api for 3 second.

  **7- Removing Duplicate Skeletons**

  - Structure the folder in issues, so there is no over lapping with child and parent layout.

# 7. Authentication (51m)

**1. Seeting up NextAuth**

- we will setup authentication using NextAuth.
- step 1 `npm install next-auth`
- step 2 - setup folder and file `api>auth>[...nextauth]>route.ts`

```javascript
import NextAuth from 'next-auth';

const handler = NextAuth({
  providers: [],
});

export { handler as GET, handler as POST };
```

- add two varaible as below in .env file

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="oj4FrEFPhG7QqkylTomy4IMqMFU3y6E2ngA8JYII92w="

**2. Configuring Google Provider**

- setup google account in console
  [Google console](https://console.cloud.google.com/)
- add GOOGLE_CLIENT_ID, and GOOGLE_CLIENT_SECRET to env file.
- import `import GoogleProvider from 'next-auth/providers/google';`
- add GoogleProvider inside providers array.

```Javascript
GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

```

- **3. Adding the Prisma Adapter**
- To setup prisma adapter let check the NextAuth Adapter page for prisma.
  [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)

  - prisma client and @prisma/client and prisma --save-dev already installed in our system.

- install `npm install @next-auth/prisma-adapter`

- `npx prisma format` to format the model
- `npx prisma db push` - it sync the schema with our database (creating database and table)
- let test if we can login / `http://localhost:3000/api/auth/signin`

- Note:- when using Adapter, NextAuth changes the stratigy from jwt to database, and it will not work with Provider like google.
- so let's add ` session: { strategy: 'jwt' }`

  **4. Adding the Login and Logout Links**

- add login and logout link in navbar
- `import { useSession } from 'next-auth/react';`

```javascript
<Box>
  {status === 'authenticated' && <Link href="/api/auth/signout">Log out</Link>}
  {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
</Box>
```

-make sure to wrapped your main component in RootLayout in a `SessionProvider`

- Because SessionProvider use react hook context API, we must create seperate file, and then expirt provider.
  > app>auth>Provider.tsx

```javascript
'use client';
import React, { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

- now wrapped all the component with AuthProvider inside body.

- now you can test the login and logout.

**5. Change the layout of the Navbar**

**6. Adding the Drop-down Menu**

# 8. Assigning Issues to Users (48m)

# 9. Filtering, Sorting, and Pagination (55m)

# 10. Dashboard (24m)

# 11. Going to Production (29m)

```

```
