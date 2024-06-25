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

export const login = async ({ username_, password_ }) => {
  const response = await fetch(url + "login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      username: username_,
      passwrod: password_
    }
  })
  if (response.status == 200) {
    return true;
  } else {
    return false;
  }
}

export default { newLogin, login }