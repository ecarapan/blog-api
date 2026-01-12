import { App } from "@/app/App.jsx";
import { ErrorPage } from "@/pages/errorPage/ErrorPage.jsx";
import { HomePage } from "@/pages/homePage/HomePage.jsx";
import { PostPage } from "@/pages/postPage/PostPage.jsx";
import { UserPage } from "@/pages/userPage/UserPage.jsx";
import { SignupPage } from "@/pages/signupPage/SignupPage.jsx";
import { LoginPage } from "@/pages/loginPage/LoginPage.jsx";

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
