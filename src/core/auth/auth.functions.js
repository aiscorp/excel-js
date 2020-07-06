
//
export function isEmail(email) {
  // eslint-disable-next-line max-len
  const regex = new RegExp(`[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?`)
  return regex.test(String(email).toLowerCase())
}

//
export function isPassword(password) {
  // eslint-disable-next-line max-len
  const regex = new RegExp(`^(?=.*[0-9])[a-zA-Z0-9!_@#$%^&*-]{6,16}$`)
  return regex.test(String(password))
}

