const Users = require('../users/users-model');

/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
function checkForUsernameAndPassword(req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({ status: 401, message: 'username and password required' });
  } else {
    next();
  }
}

async function checkUsernameFree(req, res, next) {
  const username = { username: req.body.username };
  await Users.findBy(username)
    .then((user) => {
      if (!user.length) {
        return next();
      } else {
        return next(res.json({ status: 422, message: 'Username Taken' }));
      }
    })
    .catch((err) => {
      return next(err);
    });
}

// Check for only username only
async function checkUsernameExists(req, res, next) {
  const username = { username: req.body.username };
  await Users.findBy(username)
    .then((user) => {
      if (user.length) {
        req.user = user[0];
        next();
      } else next(res.status(401).json({ message: 'Invalid Credentials' }));
    })
    .catch((err) => {
      next(err);
    });
}
// Check for username & password
async function checkCredentials(req, res, next) {
  const credentials = {
    username: req.body.username,
    password: req.body.password,
  };
  await Users.findBy(credentials)
    .then((user) => {
      if (user.length) {
        req.user = user[0];
        next();
      } else next(res.status(401).json({ message: 'Invalid Credentials' }));
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  checkForUsernameAndPassword,
  checkUsernameFree,
  checkUsernameExists,
  checkCredentials,
};
