var width = 1400;
var height = 400;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var img= new Image();// this is the img of player
img.src='1.png';
img.sx=width / 2;
img.sy=200;
var door=new Image();// this is the img of the teleporte door
door.src='3.png';
var house=new Image();// this is the img of the witch's house
house.src='9.png';
var cloud1=new Image();// this is the img of one of the clouds
cloud1.src='6.png';
var cloud2=new Image();// this is the other cloud
cloud2.src='7.png';
var tree=new Image();// this is the img of the tree
tree.src='8.png';
var win =new Image();// this is the img when win
win.src='win.png';
var fire=new Image();// this is the img of firework
fire.src='fire.png';
var mm=new Image();// this is the img of firework
mm.src='12.png';
var gm=new Image();// this is the img of firework
gm.src='11.png';
var ggm=new Image();// this is the img of firework
ggm.src='10.png';

var player = {
	        x: 10,
            y: 300,
            width: 25,
            height: 25,
            speed: 3,
            velX: 0,
            velY: 0,
            jumping: false,
            grounded: false,
} // create an object called player

var keys = [];
var boxes = [];
var powerup = [];

var friction = 0.7;
var gravity = 0.4;

powerup.push({
        x: 130,
        y: 360,
        width: 10,
        height: 10,
        color: '#BF4D28',
        effect: 'gravity'
    });
powerup.push({
        x: 240,
        y: 360,
        width: 20,
        height: 20,
        color: '#58F604',
        effect: 'lostgravity'
    });
powerup.push({
        x: 570,
        y: 20,
        width: 10,
        height: 10,
        color: '#E404F6',
        effect: 'getgravity'
    });
powerup.push({
        x: 370,
        y: 360,
        width: 20,
        height: 20,
        color: '#F0F02B',
        effect: 'tele1',	
        px: 420,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 850,
        y: 80,
        width: 20,
        height: 20,
        color: '#F0F02B',
        effect: 'tele1',	
        px: 420,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 850,
        y: 200,
        width: 20,
        height: 20,
        color: '#F0F02B',
        effect: 'tele1',
  			
        px: 420,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 850,
        y: 300,
        width: 20,
        height: 20,
        color: '#2B4FF0',
        effect: 'tele5',
        px: 920,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 420,
        y: 240,
        width: 20,
        height: 20,
        color: '#FFC300',
        effect: 'tele2',	
        px: 620,//where they get teleported
        py: 80,
        stay: true
    });
powerup.push({
        x: 490,
        y: 240,
        width: 20,
        height: 20,
        color: '#2BF0D8',
        effect: 'tele3',	
        px: 620,//where they get teleported
        py: 180,
        stay: true
    });
powerup.push({
        x: 550,
        y: 240,
        width: 20,
        height: 20,
        color: '#902BF0',
        effect: 'tele3',	
        px: 620,//where they get teleported
        py: 280,
        stay: true
    });
powerup.push({
        x: 920,
        y: 300,
        width: 20,
        height: 20,
        color: '#2BF0B4',
        effect: 'tele4',	
        px: 920,//where they get teleported
        py: 100,
        stay: true
    });
powerup.push({
        x: 1020,
        y: 300,
        width: 20,
        height: 20,
        color: '#2BF0B4',
        effect: 'tele6',	
        px: 920,//where they get teleported
        py: 230,
        stay: true
    });
powerup.push({
        x: 1120,
        y: 300,
        width: 20,
        height: 20,
        color: '#2BF0B4',
        effect: 'tele7',	
        px: 1300,//where they get teleported
        py: 130,
        stay: true
    });
powerup.push({
        x: 1120,
        y: 350,
        width: 20,
        height: 20,
        color: '#2BF0B4',
        effect: 'tele8',	
        px: 1300,//where they get teleported
        py: 230,
        stay: true
    });

powerup.push({
        x: 1310,
        y: 360,
        width: 30,
        height: 30,
        color: '#2A5D77',
        effect: 'win',//check for win 
        stay: true
    });
powerup.push({
        x: 1150,
        y: 50,
        width: 20,
        height: 20,
        color: '#2B4FF0',
        effect: 'tele5',
        px: 920,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 1150,
        y: 200,
        width: 20,
        height: 20,
        color: '#2B4FF0',
        effect: 'tele5',
        px: 920,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 1300,
        y: 100,
        width: 20,
        height: 20,
        color: '#2B4FF0',
        effect: 'tele5',
        px: 920,//where they get teleported
        py: 370,
        stay: true
    });
powerup.push({
        x: 20,
        y: 20,
        width: 20,
        height: 20,
        color: '#2BF0B4',
        effect: 'tele8',	
        px: 1300,//where they get teleported
        py: 230,
        stay: true
    });

// dimensions



boxes.push({//box on top
    x: 0,
    y: 0,
    width: 10,
    height: height,
});
boxes.push({//box on left
    x: 0,
    y: 0,
    width: width,
    height: 10,
});
boxes.push({//box for the ground
    x: 0,
    y: height - 10,
    width: width,
    height: 50,
});
boxes.push({//box on right
    x: width - 10,
    y: 0,
    width: 50,
    height: height,
});



boxes.push({
    x: 120,
    y: 250,
    width: 50,
    height: 10,
});
boxes.push({
    x: 220,
    y: 300,
    width: 80,
    height: 10,
    color: 'black'
});

boxes.push({
    x: 110,
    y: 150,
    width: 10,
    height: 250,
});
boxes.push({
    x: 70,
    y: 350,
    width: 50,
    height: 10,
});
boxes.push({
    x: 40,
    y: 290,
    width: 30,
    height: 10,
});
boxes.push({
    x: 220,
    y: 0,
    width: 10,
    height: 260,
});
boxes.push({
    x: 220,
    y: 300,
    width: 10,
    height: 90,
});
boxes.push({
    x: 340,
    y: 60,
    width: 10,
    height: 200,
    height: 340,
});
boxes.push({
    x: 230,
    y: 220,
    width: 40,
    height: 10,
});
boxes.push({
    x: 200,
    y: 250,
    width: 30,
    height: 10,
});
boxes.push({
    x: 340,
    y: 60,
    width: 210,
    height: 10,
});
boxes.push({
    x: 600,
    y: 0,
    width: 10,
    height: 400,
});
boxes.push({
    x: 400,
    y: 200,
    width: 200,
    height: 10,
});
boxes.push({
    x: 400,
    y: 200,
    width: 10,
    height: 200,
});
boxes.push({
    x: 900,
    y: 0,
    width: 10,
    height: 400,
});
boxes.push({
    x: 600,
    y: 130,
    width: 300,
    height: 10,
});
boxes.push({
    x: 600,
    y: 260,
    width: 300,
    height: 10,
});
boxes.push({
    x: 900,
    y: 260,
    width: 300,
    height: 10,
});
boxes.push({
    x: 1200,
    y: 0,
    width: 10,
    height: 400,
});
boxes.push({
    x: 900,
    y: 130,
    width: 300,
    height: 10,
});
boxes.push({
    x: 1200,
    y: 200,
    width: 200,
    height: 10,
});
boxes.push({
    x:80,
    y:240,
    width:20,
    height:10,
});
boxes.push({
    x:10,
    y:180,
    width:40,
    height:10,
});
boxes.push({
    x:50,
    y:140,
    width:20,
    height:10,
});
boxes.push({
    x:80,
    y:140,
    width:80,
    height:10,
})
boxes.push({
    x:150,
    y:190,
    width:70,
    height:10,
})

canvas.width = width;
canvas.height = height;
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-core-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//calculate distance between two rects
function colCheck(shapeA, shapeB) 
{
	


    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),//variable number
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),//variable number
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),//fixed number
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),//fixed number
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) //A is high than B
        {
            if (vY > 0) //top
                {
                    colDir = "t";
                    shapeA.y += oY; // push the player out
                } 
            else //bottom
                {
                    colDir = "b";
                    shapeA.y -= oY;// push the player out
                }
        } 
        else 
        {
            if (vX > 0) //left
                {
                    colDir = "l";
                    shapeA.x += oX;// push the player out
                } 
            else //right
                {
                    colDir = "r";
                    shapeA.x -= oX;// push the player out
                }
        }
    }
    return colDir;
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-core-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
for (var i = 0; i < boxes.length; i++) 
    {//print boxes
        ctx.fillStyle = boxes[i].color;
        ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
    }
function update() {
    // check keys
    
    
    
    
    
    if (keys[38] || keys[32] || keys[87]) {
        // up arrow or space
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2.5;//how high to jump
        }
    }
    if (keys[39] || keys[68]) {
        // right arrow
        if (player.velX < player.speed) {
            player.velX++;
        }
    }
    if (keys[37] || keys[65]) {
        // left arrow
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
  
  	
//==-=-=-=-
    player.velX *= friction;
    player.velY += gravity;
 
    
    player.grounded = false;
ctx.clearRect(0,0,1400,400);// clear the canvas
    
       for (var i = 0; i < boxes.length; i++){ 
        var dir = colCheck(player, boxes[i]);

        if (dir === "l" || dir === "r") {
            player.velX = 0;
            player.jumping = false;
        } else if (dir === "b") {
            player.grounded = true;
            player.jumping = false;
        } else if (dir === "t") {
            player.velY *= -1;
        }
        
    }
    
    if(player.grounded){
         player.velY = 0;
    }
    
    player.x += player.velX;
    player.y += player.velY;
  
    ctx.fill(); 
    for(var j = 0; j < powerup.length; j++)
    {
        
        ctx.save();
        var cx = powerup[j].x + 0.5 * powerup[j].width,   // x of shape center
        cy = powerup[j].y + 0.5 * powerup[j].height; //y of shape center
        ctx.translate(cx, cy);  //translate to center of shape
      
        ctx.translate(-cx, -cy);            //translate center back to 0,0
        ctx.fillStyle = powerup[j].color;
        ctx.fillRect(powerup[j].x, powerup[j].y, powerup[j].width, powerup[j].height);
        ctx.restore();
        
          ctx.drawImage(door,370,360);//put the teledoor picture on the tele
   ctx.drawImage(door,850,80);
   ctx.drawImage(door,850,200);
   ctx.drawImage(door,850,300);
   ctx.drawImage(door,420,240);
   ctx.drawImage(door,490,240);
   ctx.drawImage(door,550,240);
   ctx.drawImage(door,920,300);
   ctx.drawImage(door,1020,300);
   ctx.drawImage(door,1120,300);
   ctx.drawImage(door,1120,350);
   ctx.drawImage(door,1150,50);    
   ctx.drawImage(door,1150,200);
   ctx.drawImage(door,1300,100); 
   ctx.drawImage(door,20,20);
   ctx.drawImage(house,1285,330);// put the img of house on the 'win' powerup
        ctx.drawImage(cloud1,60,50);// put the cloud on 
        ctx.drawImage(cloud1,230,30);
        ctx.drawImage(cloud2,660,30);
        ctx.drawImage(cloud1,960,60);
        ctx.drawImage(cloud2,1260,30);
        ctx.drawImage(cloud2,360,130);
        ctx.drawImage(tree,5,315); // put the img of tree on
        ctx.drawImage(tree,450,315);
        ctx.drawImage(tree,650,315);
        ctx.drawImage(tree,680,185);
        ctx.drawImage(tree,950,185);
        ctx.drawImage(tree,920,315);
       
        ctx.drawImage(img,player.x,player.y);// put the img on player
        //powerup collision
        if(colCheck(player, powerup[j])!==null)
        {//touched power up!
            if(powerup[j].effect==='gravity')
            {
              gravity= 0.4;//decrease gravity
              player.speed = 4;// change the speed so player can jump through the box
             
             
            }
            else if (powerup[j].effect==='lostgravity')
            {
              gravity=-0.1;// change the gravity so player can fly through the high box
            }
            else if (powerup[j].effect==='getgravity')
            {
              gravity=0.4;
            }
            else if (powerup[j].effect==='tele1')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele2')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele3')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele4')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele5')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele6')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele7')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='tele8')
            {
              player.x=powerup[j].px;
              player.y=powerup[j].py;
            }
            else if (powerup[j].effect==='win')
            {
              
                ctx.drawImage(win,0,0);
                ctx.drawImage(fire,20,20);
                ctx.drawImage(fire,120,50);
                ctx.drawImage(fire,220,20);
                ctx.drawImage(fire,320,50);
                ctx.drawImage(fire,420,20);
                ctx.drawImage(fire,520,50);
                ctx.drawImage(fire,620,20);
                ctx.drawImage(fire,720,50);
                ctx.drawImage(fire,820,20);
                ctx.drawImage(fire,920,50);
                ctx.drawImage(fire,1020,20);
                ctx.drawImage(fire,1120,50);
                ctx.drawImage(fire,1220,20);
                ctx.drawImage(fire,1320,50);
                player.x=1315;
                player.y=360;
               
                return;
            }
            if(powerup[j].stay!==true)
            powerup[j].width=0;//make power up go away
        }
 
    }
    //powerup stuff

    requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});


window.addEventListener("load", function () {
    update();
});
