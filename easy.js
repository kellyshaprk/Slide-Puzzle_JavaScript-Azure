// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;
/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/
const puzzlePieces = [
  {name: ".box1", x: 0, y:0},
  {name: ".box2", x: 100, y:100},
  {name: ".box3", x: 200, y:0},
  {name: ".box4", x: 0, y:200},
  {name: ".box5", x: 200, y:100},
  {name: ".box6", x: 0, y:100},
  {name: ".box7", x: 100, y:0},
  {name: ".box8", x: 300, y:0},
  {name: ".box9", x: 100, y:300},
  {name: ".box10", x: 100, y:200},
  {name: ".box11", x: 0, y:300},
  {name: ".box12", x: 300, y:100},
  {name: ".box13", x: 200, y:300},
  {name: ".box14", x: 200, y:200},
  {name: ".box15", x: 300, y:200}
];

// blankSpace: initialize blank square as last piece so as to remember where it is.
// Will eventually use it to ask direction of clicked puzzle piece(s).
// Once pieces move, must remember to update x,y values to new blank space coords
const blankSpace = { x: 300, y: 300, order: 16 };

// I'm structuring my program sort of like how Vue does it - all in my puzzle object below.
const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "", 
  initialize: function() {
    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/

    // show puzzle pieces
    this.display();
  },
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },
  slide: function(e) {
    // call isMoveable to find out direction to move
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/
    directionToMove = this.isMoveable(e); 

    // Array for the target to move
    var tbl = [];
    
    // Grab what user clicked
    this.currentPiece = document.querySelector(`[data-idx="${e.target.dataset.idx}"]`);

    /* 
        If directionToMove is "down" or "up", 
          the target(s) has the same X value and the different Y value
        And it should consider the Y value of the blankSpace
    */ 
    if (directionToMove == "down") {   
        for (var i = 0; i < 15; i++) {
          if (this.pieces[i].x == this.pieces[this.currentPiece.dataset.idx].x 
            && this.pieces[i].y >= this.pieces[this.currentPiece.dataset.idx].y
            && this.pieces[i].y < blankSpace.y) 
            {
              // Insert the target to array named tbl
              tbl.push (this.pieces[i]);
              // Sort the target array order by Y value
              tbl.sort(function(a,b){
                return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
              });
            }
          }

        // By using the name of the tbl array, find the actual target and move
        for (var i = 0; i < tbl.length; i++) {
          for (var j = 0; j < 15; j++) {
            if (tbl[i].name == this.pieces[j].name) {
              newY = tbl[i].y + this.distance;

              TweenMax.to(tbl[i].name, 0.17, {
                x: tbl[i].x,
                y: newY,
                ease: Power0.easeNone
              })
              // Update the Y value of the target
              this.pieces[j].y = newY
            }
          }
        }
        // Update the Y value of the blankspace
        blankSpace.y = blankSpace.y - (this.distance * tbl.length)

        // Array initialize
        tbl.splice(0, tbl.length);
    }

    if (directionToMove == "up") {       
      for (var i = 0; i < 15; i++) {
        if (this.pieces[i].x == this.pieces[this.currentPiece.dataset.idx].x 
          && this.pieces[i].y <= this.pieces[this.currentPiece.dataset.idx].y
          && this.pieces[i].y > blankSpace.y) 
          {
            // Insert the target to array named tbl
            tbl.push (this.pieces[i]);
            // Sort the target array order by Y value
            tbl.sort(function(a,b){
              return a.y < b.y ? -1 : a.y > b.y ? 1 : 0;
            });
          }
        }
      // By using the name of the tbl array, find the actual target and move  
      for (var i = 0; i < tbl.length; i++) {
        for (var j = 0; j < 15; j++) {
          if (tbl[i].name == this.pieces[j].name) {
            newY = tbl[i].y - this.distance;

            TweenMax.to(tbl[i].name, 0.17, {
              x: tbl[i].x,
              y: newY,
              ease: Power0.easeNone
            })
            // Update the Y value of the target
            this.pieces[j].y = newY
          }
        }
      }
      // Update the Y value of the blankspace
      blankSpace.y = blankSpace.y + (this.distance * tbl.length)

      // Array initialize
      tbl.splice(0, tbl.length);
    }

    /* 
        If directionToMove is "right" or "left", 
          the target(s) has the same Y value and the different X value
        And it should consider the X value of the blankSpace
    */ 
    if (directionToMove == "right") {       
      for (var i = 0; i < 15; i++) {
        if (this.pieces[i].y == this.pieces[this.currentPiece.dataset.idx].y 
          && this.pieces[i].x >= this.pieces[this.currentPiece.dataset.idx].x
          && this.pieces[i].x < blankSpace.x) 
          {
            // Insert the target to array named tbl
            tbl.push (this.pieces[i]);
            // Sort the target array order by X value
            tbl.sort(function(a,b){
              return a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
            });
          }
        }
      // By using the name of the tbl array, find the actual target and move  
      for (var i = 0; i < tbl.length; i++) {
        for (var j = 0; j < 15; j++) {
          if (tbl[i].name == this.pieces[j].name) {
            newX = tbl[i].x + this.distance;

            TweenMax.to(tbl[i].name, 0.17, {
              x: newX,
              y: tbl[i].y,
              ease: Power0.easeNone
            })
            // Update the X value of the target  
            this.pieces[j].x = newX
          }
        }
      }
      // Update the X value of the blankspace
      blankSpace.x = blankSpace.x - (this.distance * tbl.length)

      // Array initialize
      tbl.splice(0, tbl.length);
    }
 
    if (directionToMove == "left") {       
      for (var i = 0; i < 15; i++) {
        if (this.pieces[i].y == this.pieces[this.currentPiece.dataset.idx].y 
          && this.pieces[i].x <= this.pieces[this.currentPiece.dataset.idx].x
          && this.pieces[i].x > blankSpace.x) 
          {
            // Insert the target to array named tbl
            tbl.push (this.pieces[i]);
            // Sort the target array order by X value
            tbl.sort(function(a,b){
              return a.x < b.x ? -1 : a.x > b.x ? 1 : 0;
            });
          }
        }
      // By using the name of the tbl array, find the actual target and move    
      for (var i = 0; i < tbl.length; i++) {
        for (var j = 0; j < 15; j++) {
          if (tbl[i].name == this.pieces[j].name) {
            newX = tbl[i].x - this.distance;

            TweenMax.to(tbl[i].name, 0.17, {
              x: newX,
              y: tbl[i].y,
              ease: Power0.easeNone
            })
            // Update the X value of the target    
            this.pieces[j].x = newX
          }
        }
      }
      // Update the X value of the blankspace
      blankSpace.x = blankSpace.x + (this.distance * tbl.length)

      // Array initialize
      tbl.splice(0, tbl.length);
    }

    // If the user sequences the puzzle in order, then alert a message
    this.isdone();
  },
  isMoveable: function(e) {
    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
     ******************************************/
    var xy = e.target.style.transform;
    x = xy.substring(19, xy.lastIndexOf(","));
    y = xy.substring(xy.lastIndexOf(",") + 2, xy.lastIndexOf(")"));

    if (x == blankSpace.x) {
      if (y < blankSpace.y) {
        return "down";
      }
      else {
        return "up"
      }
    }
    else if (y == blankSpace.y) {
      if (x < blankSpace.x) {
        return "right"
      }
      else {
        return "left"
      }
    } 
    else {
      return "e"
    }
  } ,
  isdone: function() {
    /* 
      Check if the puzzle is in order
    */
    var stnd = [];
    var boxNameIdx = 1;
    for (var i = 0; i < 400 ; i += 100) {
      for (var j = 0; j < 400; j+= 100) { 
        var dd = {}
        dd.name = ".box" + boxNameIdx ;
        dd.x = j;
        dd.y = i;
        stnd.push(dd)
        boxNameIdx += 1;
      }
    }
    // remove the last one - X:300 / Y:300
    stnd.pop(); 

    // Compare standard puzzle and user's puzzle
    var stndCnt = 0;
    for (var i = 0; i < 15; i++ ){
      if (stnd[i].x == this.pieces[i].x && stnd[i].y == this.pieces[i].y) {
        stndCnt+=1;
      }
    }

    // If they are the same, "Winner!" alert
    if (stndCnt == 15){
      alert("Winner!");
    }
  }
};

puzzle.initialize();

// Wait for a mouse to be cliked
window.addEventListener('click', puzzle.slide.bind(puzzle));

/* 
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
