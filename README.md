## Hackernew clone

This is a pet project that illustrates how to implement a hackernew clone with next.js, react-query, tailwindcss with a graphql backend.

![Screen Shot 2022-07-16 at 3 59 07 PM](https://user-images.githubusercontent.com/1467801/179374364-18517eaa-6551-4076-afd7-3a9c7936bb78.png)



## prerequisite

- This project uses a custom pre-built graphql backend implement as a part of https://www.howtographql.com/react-apollo/1-getting-started/
- You would need to clone that server and start it as a separate application.

- To clone:  

```
curl https://codeload.github.com/howtographql/react-apollo/tar.gz/starter | tar -xz --strip=1 react-apollo-starter/server
```

- then cd into the server folder
- run `npx prisma generate`
- run `npm run dev`

and keep the backend graphql server running

## Starting the UI server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

