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

git add .
git commit -m "setup prisma and model"
git push

# 4. Viewing Issues (54m)

# 5. Updating Issues (60m)

# 6. Deleting Issues (40m)

# 7. Authentication (51m)

# 8. Assigning Issues to Users (48m)

# 9. Filtering, Sorting, and Pagination (55m)

# 10. Dashboard (24m)

# 11. Going to Production (29m)
