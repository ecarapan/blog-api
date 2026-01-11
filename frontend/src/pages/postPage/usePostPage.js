// import { useParams } from "react-router";
// import { useState, useEffect } from "react";
// import { useUser } from "@/hooks/useUser.js";

// export function usePostPage() {
//   const { postId } = useParams();

//   const [post, setPost] = useState(null);
//   const [postLoading, setPostLoading] = useState(true);
//   const [postError, setPostError] = useState(null);

//   const [commentsList, setCommentsList] = useState([]);
//   const [commentsLoading, setCommentsLoading] = useState(true);
//   const [commentsError, setCommentsError] = useState(null);

//   const { user } = useUser(post?.user_id);

//   useEffect(() => {
//     async function fetchPost() {
//       try {
//         const response = await fetch(`http://localhost:3000/posts/${postId}`);
//         const postData = await response.json();
//         setPost(postData);
//         setPostLoading(false);
//       } catch (err) {
//         setPostError(err.message || "Error fetching posts");
//         setPostLoading(false);
//       }
//     }

//     fetchPost();
//   }, [postId]);

//   useEffect(() => {
//     if (!post) {
//       return;
//     }

//     async function fetchComments() {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/posts/${post.id}/comments`
//         );
//         const commentsData = await response.json();
//         setCommentsList(commentsData);
//         setCommentsLoading(false);
//       } catch (err) {
//         setCommentsError(err.message || "Error fetching posts");
//         setCommentsLoading(false);
//       }
//     }

//     fetchComments();
//   }, [post]);

//   function formatDate(dateString) {
//     const d = new Date(dateString);
//     return d.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   }

//   return {
//     post,
//     postLoading,
//     postError,
//     commentsList,
//     commentsLoading,
//     commentsError,
//     user,
//     formatDate,
//   };
// }
