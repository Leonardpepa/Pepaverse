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

const deleteComment = async (commentId, postId) => {
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
    const commentDisplay = document.getElementById(`comment-display${postId}`);
    commentDisplay.textContent = ` ${Number(commentDisplay.textContent) - 1}`;
    await deleteCommentNotification(data.comment._id);
  }
  return await data;
};

const updatePost = async (postId, content) => {
  try {
    const response = await fetch("/users/post/update", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId, content: content }),
    });
    const data = await response.json();

    return await data;
  } catch (error) {
    alert("An Error Occured Please try again");
  }
};

const updateComment = async (commentId, content) => {
  try {
    const response = await fetch("/users/comment/update", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: commentId, content: content }),
    });
    const data = await response.json();

    return await data;
  } catch (error) {
    alert("An Error Occured Please try again");
  }
};

const sendLikeRequest = async (postId) => {
  const res = await fetch("/users/like", {
    method: yes[postId] ? "delete" : "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId: postId }),
  });
  const data = await res.json();
  return await data;
};

const commentPost = async (postId, content) => {
  const res = await fetch("/users/comment", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      postId,
      content,
    }),
  });
  const data = await res.json();
  return data;
};

const createLikeNotification = async (author, receiver, post, like) => {
  const res = await fetch("/notification/like/create", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: author,
      receiver: receiver,
      post: post,
      type: "like",
      like: like,
    }),
  });
  const data = await res.json();
  return data;
};

const deleteLikeNotification = async (id) => {
  const res = await fetch("/notification/like/delete", {
    method: "delete",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      like: id,
    }),
  });
  const data = await res.json();
  return data;
};

const createCommentNotification = async (author, receiver, post, comment) => {
  const res = await fetch("/notification/comment/create", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      author: author,
      receiver: receiver,
      post: post,
      type: "comment",
      like: null,
      comment: comment,
    }),
  });
  const data = await res.json();
  return data;
};

const deleteCommentNotification = async (comment) => {
  const res = await fetch("/notification/comment/delete", {
    method: "delete",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment,
    }),
  });
  const data = await res.json();
  return data;
};

const fetchComments = async (postId) => {
  const res = await fetch(`/post/${postId}/comment`, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const commentForms = document.querySelectorAll(".comment-form");

commentForms.forEach(async (form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postInput = document.getElementById(
      `comment-input${form.classList[1]}`
    );

    if (postInput.value) {
      const data = await commentPost(postInput.classList[1], postInput.value);
      if (data.ok) {
        const commentDisplay = document.getElementById(
          `comment-display${form.classList[1]}`
        );

        commentDisplay.textContent =
          " " + (Number(commentDisplay.textContent) + 1);

        const commentDiv = document.getElementById(
          `comments-div${form.classList[1]}`
        );

        const comment = await createUIComment(data.comment, commentDiv);

        postInput.value = "";

        const resData = await createCommentNotification(
          data.comment.author._id,
          postInput.classList[3],
          data.comment.post,
          data.comment._id
        );

        if (resData.ok) {
          socket.emit("CREATE_COMMENT_NOTIFICATION", resData);
        }

        comment.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  });
});

const showCommentBtns = document.querySelectorAll(".comment-btn");

const showComments = async (list) => {
  list.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const commentsContainer = document.getElementById(
        `comments${btn.classList[0]}`
      );
      commentsContainer.classList.toggle("hidden");
      if (commentsContainer.children[1].children.length === 0) {
        const data = await fetchComments(btn.classList[0]);
        displayFetchedComments(data.results, commentsContainer.children[1]);
      }
    });
  });
};

showComments(showCommentBtns);

const displayFetchedComments = (list, div) => {
  list.forEach((comment) => {
    createUIComment(comment, div);
  });
  const updateCommentForms = document.querySelectorAll(".update-comment");

  updateCommentForms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const commentId = form.classList[1];
      const content = e.target.content.value;

      const response = await updateComment(commentId, content);
      if (response.ok) {
        const commentText = document.getElementById(`comment-text${commentId}`);
        commentText.textContent = content;
        const updatedAt = document.getElementById(`updatedAt${commentId}`);
        updatedAt.innerHTML =
          '<small class="text-muted">Last updated 0 minutes ago</small>';
      }
    });
  });
};

const updatePostForms = document.querySelectorAll(".update-post");

updatePostForms.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const postId = form.classList[1];
    const content = e.target.content.value;

    const response = await updatePost(postId, content);

    if (response.ok) {
      const postText = document.getElementById(`post-text${postId}`);
      postText.textContent = content;
    }
  });
});

const updateNotificationSeen = async (element) => {
  const res = await fetch(`/notification/${element.id}/seen`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.ok) {
    window.location.href = element.getAttribute("data-url");
  }
};
