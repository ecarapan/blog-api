import { Link } from "react-router";

export function ErrorPage() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/">Back to the main page</Link>
    </div>
  );
}
