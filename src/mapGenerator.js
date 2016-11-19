exports.getMap = function (rows = 5, cols = 5) {
  var map = [0]
  var i, j

  for (i = 0; i < rows; i++) {
    map[i] = []
    for (j = 0; j < cols; j++) {
      map[i][j] = 0
    }
  }
  return map
}
