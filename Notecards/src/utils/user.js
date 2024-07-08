const url = 'http://localhost:4221/'

export const newLogin = async (username_, password_) => {
  const response = await fetch(url + "login/new/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username_,
      password: password_
    })
  })
  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}

export const login = async (username_, password_) => {
  const response = await fetch(url + "login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username_,
      password: password_
    })
  })
  if (response.status == 200) {
    let userData = await response.json();
    document.cookie = "username=" + userData["username"];
    document.cookie = "user_id=" + userData["user_id"];
    return true;
  } else {
    return false;
  }
}

export const logoff = () => {
  document.cookie.split(';').forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
}

export const getUsername = () => {
  let decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie.substring("username=".length, decodedCookie.indexOf("; user_id="));
}

export const getUserId = () => {
  let decodedCookie = decodeURIComponent(document.cookie)
  return parseInt(decodedCookie.substring(decodedCookie.indexOf("; user_id=") + "; user_id=".length));
}