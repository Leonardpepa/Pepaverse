const createFriendRequestNotificationUI = (data) => {
  const notificationsContainer = document.getElementById("notifications");

  let notificationBadge = document.getElementById("notification-badge");

  const zeroNotifications = document.getElementById("zero-notifications");

  const div = document.createElement("div");

  div.innerHTML = `
      <div class=" item d-flex justify-content-start align-items-center">
        <a href="/profile/${data.notification.author._id}">
          <img style="width: 100%; height: auto; max-width: 30px; border-radius: 50%;" class="img-thumbnail " src="${data.notification.author.profileUrl}" alt="user profile">
        </a>
        <li><a class="dropdown-item" href="/profile/${data.notification.author._id}">${data.notification.author.name} wants to be your friend</a></li>
        <button type="button" onclick=" acceptFriendRequest('${data.notification.friendship}')" class = "btn btn-outline-primary btn-sm m-1 ">  Accept</button>
      </div>
  `;

  if (zeroNotifications) {
    notificationsContainer.removeChild(zeroNotifications);
  }

  if (notificationBadge) {
    notificationBadge.textContent = Number(notificationBadge.textContent) + 1;
  } else {
    notificationBadge = document.createElement("span");
    notificationBadge.innerHTML = `<span id="notification-badge" class="badge bg-danger"> 1</span>`;
    document.getElementById("navbarDropdown").appendChild(notificationBadge);
  }

  notificationsContainer.appendChild(div);
};

createLikeNotificationUi = (data) => {
  const notificationsContainer = document.getElementById("notifications");

  let notificationBadge = document.getElementById("notification-badge");

  const zeroNotifications = document.getElementById("zero-notifications");

  const div = document.createElement("div");

  div.innerHTML = `
        <div onclick = "updateNotificationSeen(this)" id= "${data.notification._id}" data-url="/post/${data.notification.post}" class="item d-flex justify-content-start align-items-center">
          <a href="/profile/${data.notification.author._id}">
            <img style="width: 100%; height: auto; max-width: 30px; border-radius: 50%;" class="img-thumbnail " src="${data.notification.author.profileUrl}" alt="user profile">
          </a>
          <li><a class="dropdown-item"  href="#">${data.notification.author.name} liked your post</a></li>
        </div>
  `;

  if (zeroNotifications) {
    notificationsContainer.removeChild(zeroNotifications);
  }

  if (notificationBadge) {
    notificationBadge.textContent = Number(notificationBadge.textContent) + 1;
  } else {
    notificationBadge = document.createElement("span");
    notificationBadge.innerHTML = `<span id="notification-badge" class="badge bg-danger"> 1</span>`;
    document.getElementById("navbarDropdown").appendChild(notificationBadge);
  }

  notificationsContainer.appendChild(div);
};

const createCommentNotificationUI = (data) => {
  const notificationsContainer = document.getElementById("notifications");

  let notificationBadge = document.getElementById("notification-badge");

  const zeroNotifications = document.getElementById("zero-notifications");

  const div = document.createElement("div");

  div.innerHTML = `
      <div onclick = "updateNotificationSeen(this)" id="${data.notification._id}" data-url="/post/${data.notification.post}" class="item d-flex justify-content-start align-items-center">
        <a href="/profile/${data.notification.author._id}">
          <img style="width: 100%; height: auto; max-width: 30px; border-radius: 50%;" class="img-thumbnail" src="${data.notification.author.profileUrl}" alt="user profile">
        </a>
        <li><a class="dropdown-item"  href="#">${data.notification.author.name} commented on your post</a></li>
      </div>
  `;

  if (zeroNotifications) {
    notificationsContainer.removeChild(zeroNotifications);
  }

  if (notificationBadge) {
    notificationBadge.textContent = Number(notificationBadge.textContent) + 1;
  } else {
    notificationBadge = document.createElement("span");
    notificationBadge.innerHTML = `<span id="notification-badge" class="badge bg-danger"> 1</span>`;
    document.getElementById("navbarDropdown").appendChild(notificationBadge);
  }

  notificationsContainer.appendChild(div);
};
