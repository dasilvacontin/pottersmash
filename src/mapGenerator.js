exports.getMap = function (rows = 5, cols = 5) {
  var map = initMatrix(rows + 1, cols + 1)
  var newMap = cleanMatrix([6, 7, 8], [5, 6, 7, 8], 50, map, rows + 1, cols + 1)
  return newMap
}

function initMatrix (rows, cols) {
  var map = [0]
  var i, j

  for (i = 0; i < rows; i++) {
    map[i] = []
    for (j = 0; j < cols; j++) {
      map[i][j] = Math.random() < 0.50 ? 0 : 1
    }
  }
  return map
}

function cleanMatrix (bornList, surviveList, iters, map, rows, cols) {
  var newMap = initMatrix(rows, cols)
  while (iters > 0) {
    iters--
    var r, c
    for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
        var liveCondition
        if (r === 0 || r >= rows - 1 || c === 0 || c >= cols - 1) {
          liveCondition = true
        } else {
          var nbhd = 0
          nbhd += map[r - 1][c - 1]
          nbhd += map[r - 1][c]
          nbhd += map[r - 1][c + 1]
          nbhd += map[r][c - 1]
          nbhd += map[r][c + 1]
          nbhd += map[r + 1][c - 1]
          nbhd += map[r + 1][c]
          nbhd += map[r + 1][c + 1]
          // apply B678/S345678
          var currentState = map[r][c]
          liveCondition =
             (currentState === 0 && bornList.indexOf(nbhd) > -1) ||
             (currentState === 1 && surviveList.indexOf(nbhd) > -1)
        }
        newMap[r][c] = liveCondition ? 1 : 0
      }
    }
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      map[i][j] = newMap[i][j]
    }
  }
  return map
}
