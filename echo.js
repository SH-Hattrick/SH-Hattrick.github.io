/////////////////////////////////////// globals /////////////////////////////////////////////
var canvasX = 1920;
var canvasY = 1080;
var stage = new createjs.Stage("wrapper");
var container = new createjs.Container();
var objects = {};
var rects = [];//diary turn window
var bg;
var Queue = new createjs.LoadQueue();

const COMPLETED = 2;
const READY = 1;
const DISABLED = 0;

var itemHeld = null;

var progressnum = 0;
var SceneState = 0;
const SceneOne = 1;
var loading;

var texthint = new createjs.Text("", "Italic 40px KaiTi", "#fff").set({x:190, y:900});//提示信息
var textSceneone = new createjs.Text("水手从遥远的东方紧急赶来，\n\n在海上鸣响汽笛迎接他新生的孩子。\n\n那时他不曾预想：\n\n日后的小拉贝会像楼顶那只善飞的渡鸟一样，游走世界各地，飞得那么高，那么远，\n\n并深深奉献于他曾经去往的中国。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneTwo = new createjs.Text("童年时，父亲从中国带回的那些传说和艺术品，\n\n就像一些文明的种子播撒在了拉贝心中。\n\n他兴奋于能有一份工作，让他领略东方古国文化的神韵。\n\n1918年，拉贝远渡重洋，来到了心仪已久的北京。"
    ,"Italic 50px KaiTi","#000").set({x:100, y:100});
var textSceneThree = new createjs.Text("年轻人，我们需要一名会计兼文书，\n\n如果你不计较工资的微博，\n\n不嫌弃工作的辛劳，\n\n明天就可以来这儿上班。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneFour1 = new createjs.Text("拉贝，感谢你出色地完成会计整理的任务，\n\n为公司省去每月结算的好几百美元，\n\n你真是公司商务中的第一流专家！"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneFour2 = new createjs.Text("在拉贝影响下，\n\n他的未婚妻道拉对中国的向往之情由来已久。\n\n在爱人到达北京的次年，\n\n勇敢的道拉独自旅行到中国，\n\n1909年10月，\n\n他们在北京举行了婚礼"
    ,"Italic 50px KaiTi","#fff").set({x:900, y:100});
var textSceneFour3 = new createjs.Text("凭借着自己的才能与勤奋，\n\n拉贝在西门子站稳了脚跟，\n\n很快就出任西门子北京分公司经理，\n\n之后又在天津分公司工作。"
    ,"Italic 50px KaiTi","#fff").set({x:950, y:100});
var textSceneFour4 = new createjs.Text("拉贝和公司的中国人相处得尤为融洽，\n\n他很喜欢和中国人交朋友，\n\n其中有一位交鲍家良的青年在他手下干会计，\n\n拉贝待他情同父子。"
    ,"Italic 50px KaiTi","#fff").set({x:950, y:100});
var textSceneFive1 = new createjs.Text("生意之余，拉贝热衷于领略中国文化的精髓。\n\n北京的博物馆、庙宇、宫殿、古玩市场、甚至周围的田野和乡村，\n\n都让他和道拉惊叹并赞不绝口。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneFive2 = new createjs.Text("拿起老相机，\n\n看看100年前拉贝镜头下的颐和园是什么样子吧"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:500});
var textSceneFive3 = new createjs.Text("出于对中国文化的热爱，\n\n他收集了大量有关北京的照片和绘画，\n\n并辅以对北京社会生活方方面面的详细记录。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneSix1 = new createjs.Text("1930年8月份，\n\n拉贝女儿的婚礼在天津一处教堂举行。\n\n牧师牵着两位新人的手说：\n\n天使们走到了一起。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var textSceneSix2 = new createjs.Text("我一生中最美好的青年时代\n\n都在这个国家愉快度过，\n\n我的儿孙都出生在这里，我\n\n的事业在这里得到了成功，\n\n我始终得到了中国人的厚待。\n\n——约翰·拉贝"
    ,"Italic 50px KaiTi","#fff").set({x:1150, y:100});
var textSceneSeven1 = new createjs.Text("1930年，\n\n因为出色的工作能力，\n\n西门子上海总部任命拉贝为南京分公司经理，\n\n把他放到中国首都来开辟业务。"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:100});
var endingtext = new createjs.Text("约翰·拉贝"
    ,"Italic 300px KaiTi","#fff").set({x:220, y:350});
    
/////////////////////////////////////// class /////////////////////////////////////////////


//背包系统
class BagItem {
    constructor(name,x,y,scaleX,scaleY,rotation,alpha){
        this.name = name;
        this.x = x;
        this.y = y;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.rotation = rotation;
        this.alpha = alpha;

        this.scaleXoffset = 1;
        this.scaleYoffset = 1;
    }
    setscaleoffset(x,y){
        this.scaleXoffset = x;
        this.scaleYoffset = y;
    }
}
class Bag {
    constructor(size) {
        this.bagsize = size;
        this.index = 0;
        this.bagItem = [];
        this.startX = 1750;
        this.startY = 0;
        this.scaleX = 0.15;
        this.scaleY = 0.15;
        this.offset = (canvasY - this.startY - 50) / this.bagsize;
        for (var i = 0; i < this.bagsize; i++) { 
            this.bagItem.push(new BagItem());
        }
    };
    add(item){
        for(var i=0;i<this.index;++i){
            if(this.bagItem[i].name == item.name){
                createjs.Tween.get(objects[item.name]).to({x:this.startX, y:this.startY + this.offset * i, scaleX:this.scaleX * item.scaleXoffset, scaleY:this.scaleY * item.scaleYoffset}, 200);
                return;
            }
        }
        this.bagItem[this.index] = item;
        objects[item.name].set({x:this.startX, y:this.startY + this.offset * this.index, scaleX:this.scaleX * item.scaleXoffset, scaleY:this.scaleY * item.scaleYoffset});
        createjs.Tween.get(objects[item.name]).to({x:this.startX, y:this.startY + this.offset * this.index, scaleX:this.scaleX* item.scaleXoffset, scaleY:this.scaleY* item.scaleYoffset, alpha:1}, 200);
        this.index++;
        if(objects[item.name].dragable != true){
            objects[item.name].dragable = true;
        }
        objects[item.name].addEventListener("pressmove",onbagitemDragged);
        objects[item.name].addEventListener("pressup",onbagitemDraggedEnd);
        this.reload();
    }
    getItem(name){
        for (var i = 0; i < this.index; i++) { 
            if(this.bagItem[i].name == name){
                return this.bagItem[i];
            }
        }
        return null;
    }
    getItemByID(id){
        for (var i = 0; i < this.index; i++) { 
            if(objects[this.bagItem[i].name].id == id){
                return this.bagItem[i];
            }
        }
        return null;
    }
    removeItem(name){
        for (var i = 0; i < this.index; i++) { 
            if(this.bagItem[i].name == name){
                for(var j=i+1;j<this.index;++j){
                    this.bagItem[j-1] = this.bagItem[j];
                }
                this.index--;
                container.removeChild(objects[objects[name]]);
                break;
            }
        }
        this.reload();
    }
    reload(){
        for(var i=0;i<this.index;++i){
            container.removeChild(objects[this.bagItem[i].name]);
            container.addChild(objects[this.bagItem[i].name]);
            createjs.Tween.get(objects[this.bagItem[i].name]).to({x:this.startX, y:this.startY + this.offset * i, scaleX:this.scaleX *this.bagItem[i].scaleXoffset, scaleY:this.scaleY *this.bagItem[i].scaleYoffset}, 200);
        }
    }
}; var bag = new Bag(6);





//任务系统
class Task{
    constructor(id, key, nextTaskList, enable){
        this.descriptor = ""; //任务的文字描述
        this.taskID = id;
        this.key = key;
        this.enable = enable;
        this.complete = false;
        this.next = nextTaskList;//该任务激活的任务序号
    }
    addDescriptor(str){
        this.descriptor = str;
    }
}
class TaskController{
    constructor(){
        //构造任务
        this.tasks = [];
        this.size = 0;

        this.initTask();
    }
    initTask(){

    }
    enableTask(name){
        for(var i = 0;i<this.tasks.length; ++i){
            if(this.tasks[i].key == name){
                this.tasks[i].enable = true;
            }
        }
    }
    disableTask(name){
        for(var i = 0;i<this.tasks.length; ++i){
            if(this.tasks[i].key == name){
                this.tasks[i].enable = false;
            }
        }
    }
    completeTask(key){
        for(var i = 0;i<this.size; ++i){
            if(this.tasks[i].key == key){
                this.tasks[i].complete = true;
                this.tasks[i].enable = false;
                this.enableTask(i);
            }
        }
    }
    addTask(task){
        this.tasks.push(task);
        this.size++;
    }
    getTask(key){
        for(var i = 0;i<this.tasks[id].next.length; ++i){
            if(this.tasks[i].key == key){
                return this.tasks[i];
            }
        }
    }
    checkStatus(key){
        for(var i = 0;i<this.size; ++i){
            if(this.tasks[i].key == key){
                if(this.tasks[i].complete == true){
                    return COMPLETED;
                }
                else{
                    return this.tasks[i].enable == true?READY:DISABLED;
                }
            }
        }
    }
}var controller = new TaskController();

/////////////////////////////////////// methods /////////////////////////////////////////////
function init(){
    createjs.MotionGuidePlugin.install();
    container = new createjs.Container();
    stage.addChild(container);

    stage.enableMouseOver();
    createjs.Touch.enable(stage);
    loading = new createjs.Text("正在打开日记...  "+progressnum, "150px kaiti", "#fff").set({x:190, y:470});
    var text = container.addChild(loading);
    stage.update();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", handleTick);
    duniao_adjust_screen();    
    initSceneOne();
}

function handleTick(){
    //itemHeld = null;
}

function duniao_adjust_screen(){
    canvas = document.getElementById("wrapper");
    canvas.width = 1920;
    canvas.height = 1080;
    if(document.documentElement.clientWidth <= document.documentElement.clientHeight){
        //alert("?");
        screen = 0;
        //text.set({x:570, y:190, rotation:90});
        canvas.width = 1080;
        canvas.height = 1920;
        container.rotation = 90;
        container.x = 1080;
    }
};

function initSceneOne(){
    Queue.on("complete", HandleCompleteSceneTwo, this);
    Queue.on("progress", HandleProgress, this);
    Queue.loadManifest([
        {id:"dock", src:"img/echo/dock.png"},
        {id:"s2_1", src:"img/echo/s2_1.png"},
        {id:"s2_2", src:"img/echo/s2_2.png"},
        {id:"arrowhead", src:"img/echo/arrowhead.png"},
        {id:"photo1", src:"img/echo/photo1.png"},
        {id:"photo2", src:"img/echo/photo2.png"},
        {id:"photo3", src:"img/echo/photo3.png"},
        {id:"photo4", src:"img/echo/photo4.png"},
        {id:"photo5", src:"img/echo/photo5.png"},
        {id:"photo6", src:"img/echo/photo6.png"},
        {id:"photo7", src:"img/echo/photo7.png"},
    ]);
}

function initSceneTwo(){
    HandleCompleteSceneTwo();
}

function HandleProgress(){
    loading.set({alpha:1});
    let num = `${Math.floor(Queue.progress * 100)}%`;
    progressnum = num;
    container.removeChild(loading)
    loading = new createjs.Text("正在打开日记...  "+progressnum, "150px kaiti", "#fff").set({x:190, y:470});
    var text = container.addChild(loading);
    stage.update();
}

function HandleCompleteSceneOne() {
    loading.set({alpha:0});

    progressnum = 0;

    objects["dock"] = new createjs.Bitmap(Queue.getResult("dock")).set({alpha:0});

    drawSceneOne();
}

function HandleCompleteSceneTwo(){
    loading.set({alpha:0});

    progressnum = 0;

    objects["s2_1"] = new createjs.Bitmap(Queue.getResult("s2_1")).set({alpha:0});
    objects["s2_2"] = new createjs.Bitmap(Queue.getResult("s2_2")).set({alpha:0});
    objects["arrowhead1"] = new createjs.Bitmap(Queue.getResult("arrowhead")).set({alpha:0, x:100, y:250, scaleX:0.1, scaleY:0.1, rotation:180});
    objects["arrowhead2"] = new createjs.Bitmap(Queue.getResult("arrowhead")).set({alpha:0, x:1850, y:450, scaleX:0.1, scaleY:0.1});

    objects["photo1"] = new createjs.Bitmap(Queue.getResult("photo1")).set({alpha:0.01, x:50, y:350, scaleX:0.2, scaleY:0.2});
    objects["photo2"] = new createjs.Bitmap(Queue.getResult("photo2")).set({alpha:0.01, x:500, y:270, scaleX:0.2, scaleY:0.3});
    objects["photo3"] = new createjs.Bitmap(Queue.getResult("photo3")).set({alpha:0.01, x:1000, y:350, scaleX:0.2, scaleY:0.2});
    objects["photo4"] = new createjs.Bitmap(Queue.getResult("photo4")).set({alpha:0.01, x:1500, y:350, scaleX:0.2, scaleY:0.3});
    objects["photo5"] = new createjs.Bitmap(Queue.getResult("photo5")).set({alpha:0, x:300, y:300, scaleX:0.2, scaleY:0.4});
    objects["photo6"] = new createjs.Bitmap(Queue.getResult("photo6")).set({alpha:0, x:900, y:250, scaleX:0.2, scaleY:0.4});
    objects["photo7"] = new createjs.Bitmap(Queue.getResult("photo7")).set({alpha:0, x:1400, y:200, scaleX:0.2, scaleY:0.4});
    
    objects["arrowhead2"].addEventListener("click", onarrow2Scene2Clicked);

    objects["photo1"].addEventListener("click", onphoto1Clicked);
    objects["photo2"].addEventListener("click", onphoto2Clicked);
    objects["photo3"].addEventListener("click", onphoto3Clicked);
    objects["photo4"].addEventListener("click", onphoto4Clicked);
    objects["photo5"].addEventListener("click", onphoto5Clicked);
    objects["photo6"].addEventListener("click", onphoto6Clicked);
    objects["photo7"].addEventListener("click", onphoto7Clicked);

    drawSceneTwo();
}

function drawSceneOne(){
    bag.reload();

    removeHint();

    container.addChild(objects["dock"]);

    createjs.Tween.get(objects["dock"]).to({alpha:1}, 2000).call(function(){
        objects["dock"].addEventListener("click", function(){
            createjs.Tween.get(objects["dock"]).to({alpha:0}, 1000).call(function(){
                container.removeChild(objects["dock"]);
                initSceneTwo();
            })
        });
    });

    stage.update();
}

function drawSceneTwo(){
    bag.reload();

    removeHint();

    container.addChild(objects["s2_1"]);
    container.addChild(objects["s2_2"]);
    container.addChild(objects["arrowhead1"]);
    container.addChild(objects["arrowhead2"]);

    container.addChild(objects["photo1"]);
    container.addChild(objects["photo2"]);
    container.addChild(objects["photo3"]);
    container.addChild(objects["photo4"]);
    container.addChild(objects["photo5"]);
    container.addChild(objects["photo6"]);
    container.addChild(objects["photo7"]);

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000).call(function(){
        objects["arrowhead1"].addEventListener("click", onarrow1Scene2Clicked);
    })

    stage.update();
}

function onarrow1Scene2Clicked(){
    objects["photo1"].set({alpha:0, x:50, y:350, scaleX:0.2, scaleY:0.2});
    objects["photo2"].set({alpha:0});
    objects["photo3"].set({alpha:0});
    objects["photo4"].set({alpha:0});
    objects["photo5"].set({alpha:0.01});
    objects["photo6"].set({alpha:0.01});
    objects["photo7"].set({alpha:0.01});

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["s2_2"]).to({alpha:1}, 1000);
        createjs.Tween.get(objects["arrowhead2"]).to({alpha:1}, 1000);
    })
}

function onarrow2Scene2Clicked(){
    objects["photo1"].set({alpha:0.01, x:50, y:350, scaleX:0.2, scaleY:0.2});
    objects["photo2"].set({alpha:0.01});
    objects["photo3"].set({alpha:0.01});
    objects["photo4"].set({alpha:0.01});
    objects["photo5"].set({alpha:0});
    objects["photo6"].set({alpha:0});
    objects["photo7"].set({alpha:0});

    createjs.Tween.get(objects["arrowhead2"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_2"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000);
        createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
    })
}

function onphoto1Clicked(){
    if(objects["photo1"].scaleX > 0.5){
        createjs.Tween.get(objects["photo1"]).to({alpha:0}, 1000).call(function(){
            objects["photo1"].set({alpha:0.01, x:50, y:350, scaleX:0.2, scaleY:0.2});
            createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
            objects["photo2"].set({alpha:0.01});
            objects["photo3"].set({alpha:0.01});
            objects["photo4"].set({alpha:0.01});
        });
        
        return;
    }
    objects["photo1"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});
    objects["photo2"].set({alpha:0});
    objects["photo3"].set({alpha:0});
    objects["photo4"].set({alpha:0});

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo1"]).to({alpha:1}, 1000);
    })
}

function onphoto2Clicked(){
    if(objects["photo2"].scaleX > 0.5){
        createjs.Tween.get(objects["photo2"]).to({alpha:0}, 1000).call(function(){
            objects["photo2"].set({alpha:0.01, x:500, y:270, scaleX:0.2, scaleY:0.3});
            createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
            objects["photo1"].set({alpha:0.01});
            objects["photo3"].set({alpha:0.01});
            objects["photo4"].set({alpha:0.01});
        });
        
        return;
    }
    objects["photo1"].set({alpha:0});
    objects["photo2"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});
    objects["photo3"].set({alpha:0});
    objects["photo4"].set({alpha:0});

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo2"]).to({alpha:1}, 1000);
    })
}

function onphoto3Clicked(){
    if(objects["photo3"].scaleX > 0.5){
        createjs.Tween.get(objects["photo3"]).to({alpha:0}, 1000).call(function(){
            objects["photo3"].set({alpha:0.01, x:1000, y:350, scaleX:0.2, scaleY:0.2});
            createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
            objects["photo2"].set({alpha:0.01});
            objects["photo1"].set({alpha:0.01});
            objects["photo4"].set({alpha:0.01});
        });
        
        return;
    }
    objects["photo1"].set({alpha:0});
    objects["photo2"].set({alpha:0});
    objects["photo3"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});
    objects["photo4"].set({alpha:0});

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo3"]).to({alpha:1}, 1000);
    })
}

function onphoto4Clicked(){
    if(objects["photo4"].scaleX > 0.5){
        createjs.Tween.get(objects["photo4"]).to({alpha:0}, 1000).call(function(){
            objects["photo4"].set({alpha:0.01, x:1500, y:350, scaleX:0.2, scaleY:0.3});
            createjs.Tween.get(objects["s2_1"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead1"]).to({alpha:1}, 1000);
            objects["photo2"].set({alpha:0.01});
            objects["photo3"].set({alpha:0.01});
            objects["photo1"].set({alpha:0.01});
        });
        
        return;
    }
    objects["photo1"].set({alpha:0});
    objects["photo2"].set({alpha:0});
    objects["photo3"].set({alpha:0});
    objects["photo4"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});

    createjs.Tween.get(objects["arrowhead1"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_1"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo4"]).to({alpha:1}, 1000);
    })
}


function onphoto5Clicked(){
    if(objects["photo5"].scaleX > 0.5){
        createjs.Tween.get(objects["photo5"]).to({alpha:0}, 1000).call(function(){
            objects["photo5"].set({alpha:0.01, x:1500, y:350, scaleX:0.2, scaleY:0.3});
            createjs.Tween.get(objects["s2_2"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead2"]).to({alpha:1}, 1000);
            objects["photo6"].set({alpha:0.01});
            objects["photo7"].set({alpha:0.01});
        });
        
        return;
    }

    objects["photo6"].set({alpha:0});
    objects["photo7"].set({alpha:0});
    objects["photo5"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});

    createjs.Tween.get(objects["arrowhead2"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_2"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo5"]).to({alpha:1}, 1000);
    })
}

function onphoto6Clicked(){
    if(objects["photo6"].scaleX > 0.5){
        createjs.Tween.get(objects["photo6"]).to({alpha:0}, 1000).call(function(){
            objects["photo6"].set({alpha:0.01, x:900, y:250, scaleX:0.2, scaleY:0.4});
            createjs.Tween.get(objects["s2_2"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead2"]).to({alpha:1}, 1000);
            objects["photo5"].set({alpha:0.01});
            objects["photo7"].set({alpha:0.01});
        });
        
        return;
    }

    objects["photo5"].set({alpha:0});
    objects["photo7"].set({alpha:0});
    objects["photo6"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});

    createjs.Tween.get(objects["arrowhead2"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_2"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo6"]).to({alpha:1}, 1000);
    })
}

function onphoto7Clicked(){
    if(objects["photo7"].scaleX > 0.5){
        createjs.Tween.get(objects["photo7"]).to({alpha:0}, 1000).call(function(){
            objects["photo7"].set({alpha:0.01, x:1400, y:200, scaleX:0.2, scaleY:0.4});
            createjs.Tween.get(objects["s2_2"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["arrowhead2"]).to({alpha:1}, 1000);
            objects["photo5"].set({alpha:0.01});
            objects["photo6"].set({alpha:0.01});
        });
        
        return;
    }

    objects["photo5"].set({alpha:0});
    objects["photo6"].set({alpha:0});
    objects["photo7"].set({alpha:0, x:0, y:0, scaleX:1, scaleY:1});

    createjs.Tween.get(objects["arrowhead2"]).to({alpha:0}, 1000);
    createjs.Tween.get(objects["s2_2"]).to({alpha:0}, 1000).call(function(){
        createjs.Tween.get(objects["photo7"]).to({alpha:1}, 1000);
    })
}








function clearScreen(){
    for(var i;i<objects.length;++i){
        container.removeChild(objects[i]);
    }
}

function playEffect(str, timegap){
    
    document.getElementById("myaudio").volume = 0.05;
    document.getElementById("effect").src = "sound/" + str;
    document.getElementById("effect").play();
    setTimeout(function(){
        document.getElementById("myaudio").volume = 0.2;
    }, timegap);
}

function removeHint(){
    texthint.text = " ";
    texthint.set({alpha:1});

}

///////////////////////////////////////Now we are on a go/////////////////////////////////////////
init();
//////////////////////////////////////////////////////////////////////////////////////////////////
