import { App } from "@/app/App.tsx";
import { ErrorPage } from "@/pages/errorPage/ErrorPage.tsx";
import { HomePage } from "@/pages/homePage/HomePage.tsx";
import { CreatePostPage } from "@/pages/createPostPage/CreatePostPage.tsx";
import { PostPage } from "@/pages/postPage/PostPage.tsx";
import { UserPage } from "@/pages/userPage/UserPage.tsx";
import { SignupPage } from "@/pages/signupPage/SignupPage.tsx";
import { LoginPage } from "@/pages/loginPage/LoginPage.tsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        element: <HomePage />,
      },
      {
        path: "create",
        element: <CreatePostPage />,
      },
      {
        path: "posts/:postId",
        element: <PostPage />,
      },
      {
        path: "users/:userId",
        element: <UserPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
