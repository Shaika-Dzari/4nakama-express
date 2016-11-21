function getOneAccountByUsername(db, username, next) {
    db.one('select * from account where username = ${username}', {username: username})
      .then((data) => {
          next(null, data);
      })
      .catch(error => {
          next(error);
      })
}

exports.getOneAccountByUsername = getOneAccountByUsername;