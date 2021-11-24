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


const updatePost = async (postId, content) => {
  try {
    const response = await fetch("/users/post/update", {
      method: "post",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({postId, content})
    });
    const data = await response.json();
    console.log(data);
    
    if(data.ok){
      window.location.reload();
    }

  } catch (error) {
    alert("An Error Occured Please try again");
  }
}

const updateComment = async (commentId, content) => {
  try {
    const response = await fetch("/users/comment/update", {
      method: "post",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({commentId, content})
    });
    const data = await response.json();
        
    if(data.ok){
      window.location.reload();
    }

  } catch (error) {
    alert("An Error Occured Please try again");
  }
}

