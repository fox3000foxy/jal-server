// $ = (id)=>{return document.getElementById(id)}

var overlaps = (function () {
    function getPositions(elem) {
        var pos = elem.getBoundingClientRect();
        return [[pos.left, pos.right], [pos.top, pos.bottom]];
    }

    function comparePositions(p1, p2) {
        var r1, r2;
        if (p1[0] < p2[0]) {
          r1 = p1;
          r2 = p2;
        } else {
          r1 = p2;
          r2 = p1;
        }
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (a, b) {
        var pos1 = getPositions(a),
            pos2 = getPositions(b);
			tileRelativeCoordinate = -(pos2[1][1] - pos1[1][1])%46
			// console.clear()
			// console.log(tileRelativeCoordinate)
			// console.log(a)
			pos1[0][1] = pos1[0][1] + tileRelativeCoordinate - 46
			pos1[0][0] = pos1[0][0] + tileRelativeCoordinate + 2
			// collideTileDemo.style.left = pos1[0][0]
			// collideTileDemo.style.top = pos1[1][0]
			// collideTileDemo.style.width = pos1[0][1] - pos1[0][0]
			// collideTileDemo.style.height = pos1[1][1] - pos1[1][0]
		return {
			collide:comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]),
		}
    };
})();

// collideTileDemo = document.createElement('div')
// collideTileDemo.style.position = 'absolute'
// collideTileDemo.style.zIndex = 100
// collideTileDemo.style.background = 'red'
// document.body.appendChild(collideTileDemo)