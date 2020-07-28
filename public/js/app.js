const GET = async (url) => {
  if (!url) {
    // display error
    return;
  }

  const response = await fetch(url, {
    method: 'GET',
    mode: 'same-origin',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  try {
    const res = await response.json();
    return res;
  } catch (err) {
    return response;
  }
};

const POST = async (url, data = {}) => {
  if (!url) {
    // display error
    return;
  }

  const response = await fetch(url, {
    method: 'POST',
    mode: 'same-origin',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  try {
    const res = await response.json();
    return res;
  } catch (err) {
    return response;
  }
};

const DELETE = async (url) => {
  if (!url) {
    // display error
    return;
  }

  const response = await fetch(url, {
    method: 'DELETE',
    mode: 'same-origin',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  try {
    const res = await response.json();
    return res;
  } catch (err) {
    return response;
  }
};

const signup = async (user) => {
  const { username, password, email } = user;
  if (!username || !password || !email) {
    // display error
    return;
  }

  return POST('/signup', user);
};

const login = async (user) => {
  const { username, password, email } = user;
  if ((!username && !email) || !password) {
    // display error
    return;
  }

  return POST('/login', user);
};

const logout = async () => POST('/logout');
const session = async () => GET('/session');

const createGroup = async (group) => {
  const { title } = group;
  if (!title) {
    // display error
    return;
  }

  return POST('/group', group);
};

const deleteGroup = async (id) => {
  if (typeof id === 'undefined') {
    // display error
    return;
  }

  return DELETE(`/group/${id}`);
};

const joinGroup = async (groupId) => {
  if (typeof groupId === 'undefined') {
    // display error
    return;
  }

  return POST(`/group/${groupId}/join`);
};

const leaveGroup = async (groupId) => {
  if (typeof groupId === 'undefined') {
    // display error
    return;
  }

  return POST(`/group/${groupId}/leave`);
};

const createEvent = async (event) => {
  return POST('/event', event);
};

const deleteEvent = async (id) => {
  if (typeof id === 'undefined') {
    // display error
    return;
  }

  return DELETE(`/event/${id}`);
};

const assignGroupToEvent = async (eventId, groupId) => {
  if (typeof eventId === 'undefined' || typeof groupId === 'undefined') {
    // display error
    return;
  }

  return POST(`/event/${eventId}/group/${groupId}`);
};

const joinEvent = async (eventId) => {
  if (typeof eventId === 'undefined') {
    // display error
    return;
  }

  return POST(`/event/${eventId}/join`);
};

const leaveEvent = async (eventId) => {
  if (typeof eventId === 'undefined') {
    // display error
    return;
  }

  return POST(`/event/${eventId}/leave`);
};

const createCategory = async (category) => {
  const { title } = category;
  if (!title) {
    // display error
    return;
  }

  return POST('/category', category);
};

const deleteCategory = async (categoryId) => {
  if (typeof categoryId === 'undefined') {
    // display error
    return;
  }

  return DELETE(`/category/${categoryId}`);
};

const addCategoryToGroup = async (groupId, categoryId) => {
  if (typeof groupId === 'undefined' || typeof categoryId === 'undefined') {
    // display error
    return;
  }

  return POST(`/group/${groupId}/category/${categoryId}`);
};

(async () => {
  // await signup({
  //   username: 'coltonje',
  //   password: 'test',
  //   email: 'coltonje@gmail.com'
  // });

  // await login({
  //   username: 'coltonje',
  //   password: 'test'
  // });

  // await logout();

  // await createGroup({
  //   title: 'fake group with loc',
  //   location: {
  //     long: 29.7762816,
  //     lat: -96.157696
  //   }
  // });

  // console.log(await deleteGroup(2));

  // console.log(await joinGroup(1));

  // console.log(await leaveGroup(1));
  // await leaveGroup(2);

  // console.log(await createCategory({
  //   title: 'Technology'
  // }));

  // console.log(await deleteCategory(4));

  // console.log(await addCategoryToGroup(1, 4));

  // console.log(await createEvent());

  // console.log(await deleteEvent(2));

  // console.log(await joinEvent(2));

  // console.log(await assignGroupToEvent(2, 1));

  console.log(await session());

})();