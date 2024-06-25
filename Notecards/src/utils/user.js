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
    let username = await response.json();
    document.cookie = "username=" + username;
    return true;
  } else {
    return false;
  }
}

export const getUsername = () => {
  let decodedCookie = decodeURIComponent(document.cookie);
  return decodedCookie.substring("username=".length)
}