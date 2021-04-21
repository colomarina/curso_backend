const casual = require('casual')

module.exports = () => {
  const data = {
    user: []
  }

  for (let i = 0; i < 1000; i++) {
    data.user.push({
      "id": casual.uuid,
      "username": casual.username,
      "birthday": casual.date(format = 'DD-MM-YYYY')
    })
  }

  return data
}