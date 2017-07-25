module.exports = function(row){
  temp = [];
  for (let i = 0; i < row.length; i++) {
      temp.push(row[i].User.username)
  }
  return Array.from(new Set(temp));

}
