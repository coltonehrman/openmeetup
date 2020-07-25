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

const signup = async (user) => {
  const { username, password, email } = user;
  if (!username || !password || !email) {
    // display error
    return;
  }

  const res = await POST('/signup', user);
  console.log(res);
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

  return POST('/groups', group);
};

const joinGroup = async (groupId) => {
  if (typeof groupId === 'undefined') {
    // display error
    return;
  }

  return POST(`/groups/${groupId}/join`);
};

const leaveGroup = async (groupId) => {
  if (typeof groupId === 'undefined') {
    // display error
    return;
  }

  return POST(`/groups/${groupId}/leave`);
};

(async () => {
  // await signup({
  //   username: 'coltonje',
  //   password: 'test',
  //   email: 'coltonje@gmail.com'
  // });

  // await login({
  //   username: 'coltonje95',
  //   password: 'test'
  // });

  // await logout();

  console.log(await createGroup({
    title: 'another fake group',
    location: { long: 29.7762816, lat: -96.157696 }
  }));

  // console.log(await joinGroup(2));

  // await leaveGroup(1);
  // await leaveGroup(2);

  console.log(await session());

})();