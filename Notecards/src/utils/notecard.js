const url = 'http://localhost:4221/'

export const createCards = async (cards) => {
  console.log(cards)
  const response = await fetch(url + "create-card", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cards)
  })

  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}

export const updateCards = async (cards) => {
  console.log(cards)
  const response = await fetch(url + "update-cards", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cards)
  })

  if (response.status == 202) {
    return true;
  } else {
    return false;
  }
}

export const deleteCards = async(cards) => {
  const response = await fetch(url + "delete-card", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cards)
  })

  if (response.status == 201)
    return true;
  else 
    return false;
}