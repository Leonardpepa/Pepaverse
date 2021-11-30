const sendFriendRequest = async (id) => {
    const receiver = id

    const res = await fetch("/notification", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiver,
        type: "friend-request",
        postId: null,
      }),
    });
    const data = await res.json();
    return data;
}

const acceptFriendRequest = async (id) => {
    const res = await fetch("/friendship/accept", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendshipId: id,
        }),
      });
      const data = await res.json();
      return data;
}

const deleteFriend = async (id) => {
    const res = await fetch("/friendship", {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendshipId: id,
        }),
      });
      const data = await res.json();
      return data;
}

const undoFriendRequest = async (id) => {
    const res = await fetch("/friendship/undo", {
        method: "delete",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friendshipId: id,
        }),
      });
      const data = await res.json();
      return data;
}