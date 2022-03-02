var stage = new createjs.Stage("wrapper");
var container = new createjs.Container();
stage.addChild(container);
var text = container.addChild(new createjs.Text("The Diaries of John Rabe", "150px Times", "#fff").set({x:190, y:470}));
stage.update();
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);
function adjust_screen(){
    canvas = document.getElementById("wrapper");
    canvas.width = 1920
    canvas.height = 1080
    if(document.documentElement.clientWidth <= document.documentElement.clientHeight){
        canvas.width = 1080;
        canvas.height = 1920;
        container.rotation = container_indoor.rotation = container_outdoor.rotation = 90;
        container.x = container_indoor.x = container_outdoor.x = 1080
    }
};adjust_screen();

/*var box_close_img = new Image();
box_close_img.src = "img/indoor.png";
var t;
box_close_img.onload = function (){
    t = new createjs.Bitmap(this);
    //t.x = stageWidth/2;t.y = stageHeight/2;
    container.addChild(t);
    stage.update();
};*/

var state = 0;
var things = [];//ticket2 ticket1 letter letter1 letter2 sand , tele diary1 2 3 
var rects = [];//diary turn window
var timer;
var bg;
function f(){};

var Queue = new createjs.LoadQueue();
Queue.on("complete", HandleComplete, this);
Queue.loadManifest([
    {id: "box", src:"img/box.png"},
    {id: "outdoor", src:"img/outdoor.jpg"},
    {id: "box_open", src:"img/box_open.png"},
    {id: "pointer", src:"img/pointer.png"},
    {id: "mession", src:"img/mession.png"}
]);
function HandleComplete() {
    bg = container.addChild(new createjs.Bitmap(Queue.getResult("box")));
    things.push(new createjs.Bitmap(Queue.getResult("box_open")));
    things.push(new createjs.Bitmap(Queue.getResult("mession")).set({x:270, y:-70, scaleX:0.5, scaleY:0.5}));
    things.push(new createjs.Bitmap(Queue.getResult("pointer")).set({x:900, y:420, scaleX:0.4, scaleY:0.4}));
    things.push(new createjs.Bitmap(Queue.getResult("outdoor")));
    
    bg.addEventListener("click", function() {
        bg.removeEventListener("click", arguments.callee);
        createjs.Tween.get(container).to({alpha:0}, 1000).call(function(){
            container.removeChild(bg);
            container.removeChild(text);
            container.addChild(things[0]);
        }).to({alpha:1}, 1000);
    });
    things[0].addEventListener("click", function() {
        things[0].removeEventListener("click", arguments.callee);
        container.addChild(things[1]);
        container.addChild(things[2]);
    });
    things[2].addEventListener("click", function() {
        things[2].removeEventListener("click", arguments.callee);
        createjs.Tween.get(container).to({alpha:0}, 1000).call(function(){
        container.removeChild(things[0]);
        container.removeChild(things[1]);
        container.removeChild(things[2]);
        container.addChild(text);
        container.addChild(things[3]);
        }).to({alpha:1}, 1000);
    })
    things[3].addEventListener("click", function() {
        things[3].removeEventListener("click", arguments.callee);
        createjs.Tween.get(container).to({alpha:0}, 1000).call(function(){
        state = 1;
        container.removeChild(things[3]);
        things.length = 0;
        bg.set({alpha:0.01});
        }).to({alpha:1}, 1000);
    });
}

/*box.onload = function() {
    bg = container.addChild(new createjs.Bitmap(this));
    bg.addEventListener("click", function() {
        //alert("?");
        bg.removeEventListener("click", arguments.callee);
        var box_open = new Image();
        box_open.src = "img/box_open.png";
        box_open.onload = function() {
            container.removeChild(bg);
            bg = container.addChild(new createjs.Bitmap(this));
            bg.addEventListener("click", function() {

            });
            //console.log(bg);
        };
    });
}*/

/*var outdoor = new Image();
outdoor.src = "img/outdoor.jpg";
outdoor.onload = function() {
    bg = container.addChild(new createjs.Bitmap(this)).set({alpha:0.01});
    bg.addEventListener("click", f);
    //container.addChild(bg);
}*/

container.addEventListener("click", function(event) {
    console.log(stage.mouseX, stage.mouseY);
})

var queue = new createjs.LoadQueue();
queue.on("complete", handleComplete, this);
queue.loadManifest([
    {id: "aircraft", src:"img/aircraft.png"},
    {id: "diary1", src:"img/diary1.png"},
    {id: "diary2", src:"img/diary2.png"},
    {id: "diary3", src:"img/diary3.png"},
    {id: "indoor", src:"img/indoor.png"},
    {id: "letter", src:"img/letter.png"},
    {id: "letter1", src:"img/letter1.png"},
    {id: "letter2", src:"img/letter2.png"},
    {id: "newspaper", src:"img/newspaper.jpeg"},
    {id: "sand", src:"img/sand.png"},
    {id: "shelter", src:"img/shelter.jpg"},
    {id: "telescope", src:"img/tele.png"},
    {id: "ticket1", src:"img/ticket1.png"},
    {id: "ticket2", src:"img/ticket2.png"}
]);
function handleComplete() {
    container.addEventListener("tick", function() {
    if(state == 1){
    container.removeEventListener("tick", arguments.callee);
    container.addChild(new createjs.Bitmap(queue.getResult("indoor")));

    container.addChild(rects[0]);
    container.addChild(rects[1]);

    things.push(container.addChild(new createjs.Bitmap(queue.getResult("ticket2"))).set({x:1371, y:600, scaleX:0.05, scaleY:0.05, rotation:90}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("ticket1"))).set({x:1355, y:600, scaleX:0.05, scaleY:0.05, rotation:100}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("letter"))).set({x:1187, y:570, scaleX:0.45, scaleY:0.45}));
    things.push(new createjs.Bitmap(queue.getResult("letter1")).set({x:things[0].x, y:things[0].y, scaleX:0.03, scaleY:0.03}));
    things.push(new createjs.Bitmap(queue.getResult("letter2")).set({x:things[0].x, y:things[0].y, scaleX:0.03, scaleY:0.03}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("sand"))).set({x:1450, y:550, scaleX:0.75, scaleY:0.75}));
    things.push(new createjs.Bitmap(queue.getResult("shelter")).set({alpha:0.01}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("telescope"))).set({x:1190, y:435, scaleX:0.12, scaleY:0.12}));
    things.push(new createjs.Bitmap(queue.getResult("diary1")).set({x:954, y:581, scaleX:0.03, scaleY:0.03}));//8
    things.push(new createjs.Bitmap(queue.getResult("diary2")).set({x:954, y:581, scaleX:0.03, scaleY:0.03}));
    things.push(new createjs.Bitmap(queue.getResult("diary3")).set({x:954, y:581, scaleX:0.03, scaleY:0.03}));
    things.push(container.addChild(new createjs.Bitmap(queue.getResult("newspaper")).set({x:1490, y:240, scaleX:0.4, scaleY:0.4, alpha:0.01})));
    things.push(new createjs.Bitmap(queue.getResult("aircraft")).set({x:-40, scaleX:0.67, scaleY:0.67}));//12

    things[0].addEventListener("click", ticket2_handler);
    things[1].addEventListener("click", ticket1_handler);
    things[2].addEventListener("click", letter_handler);
    things[3].addEventListener("click", letterx_handler);
    things[4].addEventListener("click", letterx_handler);
    things[5].addEventListener("click", sand_handler);
    things[6].addEventListener("click", shelter_handler);
    things[7].addEventListener("click", tele_handler);
    things[8].addEventListener("click", diaryx_handler);
    things[9].addEventListener("click", diaryx_handler);
    things[10].addEventListener("click", diaryx_handler);
    things[11].addEventListener("click", newspaper_handler);
    things[12].addEventListener("click", aircraft_handler);
    }});
}

function draw_rects() {
    rects.push(new createjs.Shape());
    rects[0].graphics.beginFill("#000000");
    rects[0].graphics.drawRect(0, 0, 220, 130);
    rects[0].x = 935;
    rects[0].y = 537;
    rects[0].rotation = 35;
    rects[0].alpha = 0.01;
    rects[0].addEventListener("click", diary_handler);

    rects.push(new createjs.Shape());
    rects[1].graphics.beginFill("#000000");
    rects[1].graphics.drawRect(650, 0, 700, 350);
    rects[1].alpha = 0.01;
    rects[1].addEventListener("click", window_handler);
};draw_rects();

function aircraft_handler() {
    container.removeChild(things[12]);
}

function window_handler() {
    things[6].set({alpha:1});
    container.addChild(things[6]);
    if(things[5].x == 1775 || things[5].x == 630) {
        container.removeChild(things[5]);
        container.addChild(things[5]);
    }
}
function shelter_handler() {
    things[6].set({alpha:0});
    if(things[5].x == 630) {
        container.removeChild(things[5]);
    }
}

function newspaper_handler() {
    if(things[11].x == 1490) {
        container.addChild(bg);
        container.removeChild(things[11]);
        container.addChild(things[11]);
        things[11].set({alpha:1, x:310, y:160, scaleX:1.3, scaleY:1.3});
    }
    else {
        container.removeChild(bg);
        things[11].set({x:1490, y:240, scaleX:0.4, scaleY:0.4, alpha:0.01});
    }
}

function diary_handler() {
    container.addChild(bg);
    container.addChild(things[state+7]);
    createjs.Tween.get(things[state+7]).to({x:304, y:0, scaleX:0.9, scaleY:0.9}, 300);
    if(state == 1 && things[0].rotation == 0 && things[1].rotation == 0) {
        container.removeChild(things[0]);
        container.removeChild(things[1]);
        container.addChild(things[0]);
        container.addChild(things[1]);
    }
}

function diaryx_handler() {
    things[state+7].set({x:954, y:581, scaleX:0.03, scaleY:0.03});
    container.removeChild(things[state+7]);
    container.removeChild(bg);
    if(things[0].y == 400) {
        container.removeChild(things[0]);
    }
    if(things[1].y == 440) {
        container.removeChild(things[1]);
    }
}

function state1_end() {
    container.addChild(bg);
    createjs.Tween.get(container).to({alpha:0}, 1000).to({alpha:1}, 1000);
    things[0].removeEventListener("click", ticket2_handler);
    things[0].removeEventListener("pressmove", ticket2_move);
    things[0].removeEventListener("pressup", ticket2_end);
    things[1].removeEventListener("click", ticket1_handler);
    things[1].removeEventListener("pressmove", ticket1_move);
    things[1].removeEventListener("pressup", ticket1_end);
    things[8].removeEventListener("click", diaryx_handler);
    container.removeChild(things[0]);
    container.removeChild(things[1]);
    container.removeChild(things[8]);
    container.removeChild(bg);
    state = 2;
}

function state3_end() {
    state = 4;
    container.addChild(bg);
    createjs.Tween.get(container).to({alpha:0}, 1000).to({alpha:1}, 1000).call(function() {
        shelter_handler();
        container.addChild(things[10]);
        createjs.Tween.get(things[10]).to({x:304, y:0, scaleX:0.9, scaleY:0.9}, 300);
    });
}

function ticket1_move(e) {
    things[1].set({x:e.stageX, y:e.stageY});
}
function ticket1_end() {
    if(things[8].x == 304 && things[1].x > 550 && things[1].x < 888 && things[1].y > 510 && things[1].y < 820) {
        things[1].set({x:580, y: 440, scaleX:0.16, scaleY:0.16});
        if(things[0].y == 400) {
            state1_end();
        }
    }
    else {
        createjs.Tween.get(things[1]).to({x:1800, y:200, scaleX:0.04, scaleY:0.04}, 200);
    }
}

function ticket2_move(e) {
    things[0].set({x:e.stageX, y:e.stageY});
}
function ticket2_end() {
    if(things[8].x == 304 && things[0].x > 1000 && things[0].x < 1350 && things[0].y > 450 && things[0].y < 820) {
        things[0].set({x:980, y:400, scaleX:0.17, scaleY:0.17});
        if(things[1].y == 440) {
            state1_end();
        }
    }
    else {
        createjs.Tween.get(things[0]).to({x:1800, y:330, scaleX:0.04, scaleY:0.04}, 200);
    }
}

function ticket1_handler() {
    if(things[1].scaleX != 0.4) {
        container.addChild(bg);
        createjs.Tween.get(things[1]).to({rotation:0}).to({x:480, y:-50, scaleX:0.4, scaleY:0.4}, 300);
        container.removeChild(things[1]);
        container.addChild(things[1]);
        things[1].removeEventListener("pressmove", ticket1_move);
        things[1].removeEventListener("pressup", ticket1_end);
    }
    else {
        createjs.Tween.get(things[1]).to({x:1800, y:200, scaleX:0.04, scaleY:0.04}, 300);
        container.removeChild(bg);
        things[1].addEventListener("pressmove", ticket1_move);
        things[1].addEventListener("pressup", ticket1_end);
    }
}

function ticket2_handler() {
    if(things[0].scaleX != 0.4) {
        container.addChild(bg);
        createjs.Tween.get(things[0]).to({rotation:0}).to({x:480, y:-50, scaleX:0.4, scaleY:0.4}, 300);
        container.removeChild(things[0]);
        container.addChild(things[0]);
        things[0].removeEventListener("pressmove", ticket2_move);
        things[0].removeEventListener("pressup", ticket2_end);
    }
    else {
        createjs.Tween.get(things[0]).to({x:1800, y:330, scaleX:0.04, scaleY:0.04}, 300);
        container.removeChild(bg);
        things[0].addEventListener("pressmove", ticket2_move);
        things[0].addEventListener("pressup", ticket2_end);
    }
}

function letter_handler() {
    container.removeChild(things[2]);
    container.addChild(bg);
    container.addChild(things[3]);
    container.addChild(things[4]);
    createjs.Tween.get(things[3]).to({x:1040, y:200, scaleX:0.6, scaleY:0.6}, 300);
    createjs.Tween.get(things[4]).to({x:115, y:220, scaleX:0.6, scaleY:0.6}, 300);
}

function letterx_handler() {
    createjs.Tween.get(things[3]).to({x:1800, y:100, scaleX:0.03, scaleY:0.03}, 300);
    createjs.Tween.get(things[4]).to({x:1800, y:100, scaleX:0.03, scaleY:0.03}, 300).call(function(){
        container.removeChild(things[3]);
        container.removeChild(things[4]);
        container.removeChild(bg);
        things[2].set({x:1800, y:100, scaleX:0.2, scaleY:0.2});
        container.addChild(things[2]);
    });
}

function sand_handler() {
    things[5].removeEventListener("click", arguments.callee);
    things[5].addEventListener("pressmove", sand_move);
    things[5].addEventListener("pressup", sand_end);
    createjs.Tween.get(things[5]).to({x:1775, y:460, scaleX:0.15, scaleY:0.15}, 1000);
}
/*function grass_handler() {
    things[6].removeEventListener("click", arguments.callee);
    createjs.Tween.get(things[6]).to({x:1800, y:580, scaleX:0.2, scaleY:0.2}, 1000);
}*/

function sand_move(e) {
    things[5].set({x:e.stageX, y:e.stageY});
}
function sand_end() {
    if(things[6].alpha == 1 && things[5].x > 760 && things[5].x < 1250 && things[5].y > 620 && things[5].y < 720) {
        things[5].set({x:630, y:400, scaleX:0.7, scaleY:0.7});
    }
    else {
        createjs.Tween.get(things[5]).to({x:1775, y:460, scaleX:0.15, scaleY:0.15}, 200);
    }
}

function tele_handler() {
    things[7].removeEventListener("click", arguments.callee);
    createjs.Tween.get(things[7]).to({x:1790, y:600, scaleX:0.11, scaleY:0.11}, 500);
    things[7].addEventListener("pressmove", tele_move);
    things[7].addEventListener("pressup", tele_end);
}

function tele_move(e) {
    things[7].set({x:e.stageX, y:e.stageY});
}
function tele_end() {
    if(state == 2 && things[7].x > 650 && things[7].x < 1350 && things[7].y < 350) {
        container.addChild(things[12]);
        state = 3;
        things[7].set({x:1790, y:600, scaleX:0.11, scaleY:0.11});
        timer = window.setTimeout(gameover, 10000);
    }
    else {
        createjs.Tween.get(things[7]).to({x:1790, y:600, scaleX:0.11, scaleY:0.11}, 200);
    }
}

function gameover() {
    if(things[5].x == 630)
        state3_end();
    else
        createjs.Tween.get(container).to({alpha:0.01}, 1000).to({alpha:0.01}, 1000).call(function(){window.location.reload();});
}