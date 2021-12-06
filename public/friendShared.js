const sendFriendRequest = async (id) => {
    const receiver = id

    const res = await fetch("/notification/friend-request/create", {
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
    if(data.ok){
      // await socket.emit("CREATE_FRIEND_REQUEST", data);
      window.location.reload();
    }
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
      if(data.ok){
        window.location.reload();
      }
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
      if(data.ok){
        window.location.reload();
      }
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
      if(data.ok){
        window.location.reload();
      }
      return data;
}