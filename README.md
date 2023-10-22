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
- When building feature, our goal is not to come with perfect solutin, first we build the working feature, then improve the code.

**there is no such thing as `Perfect in software development`**
`Make it first work and improve it`

# 2. Setting Up the Project (45m)

- create new github repo issue-tracker
- clone
- open in vscode (add extension ES7+React/redux/ Tailwind css intellisent / Prisma / Javascript/Typescript)

- install next-js, with typescript and tailwind css
  `npx create-next-app@latest ./`

git add .
git commit -m "project setup"
git push

**NavBar.tsx**

- crate NavBar.tsx file in app directory

- install react-icons (`napm i react-icons`)
- install classnames (`npm i classnames`)

- once navbar is complete
  git add .
  git commit -m "Navbar completed"
  git push

# 3. Creating Issues (database setup) (80m)

**Database setup**

- Mongodb
- create project in mongodb atlas, save password, copy the link of your project.

**setting up prisma and creating the issue model**

- install prisma (`npm i prisma`)
- intialize prisma (`npx prisma init`)

- change provider datasource db {
  provider = "mongodb"
  url = env("DATABASE_URL")
  }

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
- `npx prisma generate`
  (The npx prisma generate command is used to generate the Prisma Client for your Prisma schema. Prisma Client is a TypeScript (or JavaScript) library that provides a type-safe and auto-completing API for interacting with your database. When you run npx prisma generate, Prisma generates the necessary code based on your Prisma schema and the database you're using.)

- `npx prisma db push` - it sync the schema with our database (creating database and table)

`git add .`
`git commit -m "setup prisma and model"`
`git push`

**Building an API**

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

**Setting up Redix UI**

- To build the new issue page we will use radix UI, very popular component library.
- Radix comes in to flavour, Themes and Primitives, themes have pre build component ready to use, where Primitives have only behaviour, and we have to style ourself.
- step1 `npm install @radix-ui/themes`

- step2 `import '@radix-ui/themes/styles.css;`

- step3 ` Add the Theme component`

[install Radix](https://www.radix-ui.com/themes/docs/overview/getting-started)

- import Button component in issue page and test.
  `git add . //  git commit -m "setup radix ui" // git push`

  **Building the new issue page**

  - In this section we are just going to build the form with two filed, title and description.
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

**Customizing radix ui theme**

- ThemePanle to change the theme.
- Also fix the inter font to work with radix ui.

**Adding a Markdown editor**

- Now let's replace textarea filed with markdown component.
- For this we are going to use `react-simplemde-editor`
  [React SimpleMDE (EasyMDE) Markdown Editor](https://www.npmjs.com/package/react-simplemde-editor)

  - install `npm install --save react-simplemde-editor easymde`
  - now to use this component, import
    `import SimpleMDE from "react-simplemde-editor";`
    `import "easymde/dist/easymde.min.css";`

- Replace TextArea field with SimpleMDE component.

**Handling form submission**

- our Form is ready now its time to handle the form submission, we are going to use very popular library call `React Hook Form`

- install `npm install react-hook-form`

- `import { useForm } from "react-hook-form"`

- Next we define the interface of our form, basically the shape of our form (all the fields)
- Call the function useForm, which return objects, destructure it.
  `const {register} = useForm<IssueForm>()`

  - {...register('title')} // because we saw in console log. it reutn object with 4 properties. that's why we must destructure it.

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

# 4. Viewing Issues (54m)

# 5. Updating Issues (60m)

# 6. Deleting Issues (40m)

# 7. Authentication (51m)

# 8. Assigning Issues to Users (48m)

# 9. Filtering, Sorting, and Pagination (55m)

# 10. Dashboard (24m)

# 11. Going to Production (29m)

```

```

```

```
