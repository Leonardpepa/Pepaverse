const deletePost = async (postId) => {
  const res = await fetch("/users/post", {
    method: "delete",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postId }),
  });
  const data = await res.json();
  if (data.ok) {
    const post = document.getElementById(`post${postId}`);
    post.parentElement.removeChild(post);
  }
  return await data;
};

const deleteComment = async (commentId) => {
  const res = await fetch("/users/comment", {
    method: "delete",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId: commentId }),
  });
  const data = await res.json();
  if (data.ok) {
    const comment = document.getElementById(`comment${commentId}`);
    comment.parentElement.removeChild(comment);
  }
  return await data;
};
