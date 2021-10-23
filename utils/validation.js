function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

function validatePassword(password, confirm) {
  if (password.length >= 8 && password === confirm) {
    return true;
  }
  return false;
}

module.exports = { validateEmail, validatePassword };
