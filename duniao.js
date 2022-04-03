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
//var text = container.addChild(new createjs.Text("加载中...", "150px Times", "#fff").set({x:190, y:470}));




var texthint = new createjs.Text("", "Italic 40px KaiTi", "#fff").set({x:190, y:900});//提示信息
var textSceneone = new createjs.Text("水手从遥远的东方紧急赶来，在海上鸣响汽笛迎接他新生的孩子。那时他不曾预想：\n\n日后的小拉贝会像楼顶那只善飞的渡鸟一样，游走世界各地，飞得那么高，那么远，\n\n并深深奉献于他曾经去往的中国。"
    ,"Italic 40px KaiTi","#fff").set({x:100, y:100});
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
var textSceneFive2 = new createjs.Text("拿起老相机，看看100年前拉贝镜头下的颐和园是什么样子吧"
    ,"Italic 50px KaiTi","#fff").set({x:100, y:500});



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
        this.addTask(new Task(this.size,"files",[],true));//放置照片
        this.addTask(new Task(this.size,"marriage",[],true));//电报
        this.addTask(new Task(this.size,"factory",[],true));//盖章
        this.addTask(new Task(this.size,"workmate",[],true));//盖章
    }
    enableTask(name){
        for(var i = 0;i<this.tasks.length; ++i){
            if(this.tasks[i].key == name){
                this.tasks[i].enable = true;
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
    Queue.on("complete", HandleCompleteSceneOne, this);
    Queue.on("progress", HandleProgress, this);
    Queue.loadManifest([
        {id:"Sceneone", src:"img/duniao/Sceneone.png"},
        {id:"AsiaEuroMap", src:"img/duniao/AsiaEuroMap.png"},
        {id:"raven", src:"img/duniao/raven.png"},
        {id:"FrontDoor", src:"img/duniao/FrontDoor.png"},
        {id:"Scenefour", src:"img/duniao/Scenefour.png"},
        {id:"files", src:"img/duniao/files.png"},
        {id:"file1", src:"img/duniao/file1.jpg"},
        {id:"file2", src:"img/duniao/file2.jpg"},
        {id:"file3", src:"img/duniao/file3.jpg"},
        {id:"file4", src:"img/duniao/file4.jpg"},
        {id:"marriage", src:"img/duniao/marriage.jpg"},
        {id:"factory", src:"img/duniao/factory.jpg"},
        {id:"workmate", src:"img/duniao/workmate.jpg"},
        {id:"camera", src:"img/duniao/camera.png"}
    ]);
}

function initSceneTwo(){
    HandleCompleteSceneTwo();
}

function initSceneThree(){
    HandleCompleteSceneThree();
}

function initSceneFour(){
    HandleCompleteSceneFour();
}

function initSceneFive(){
    console.log(5);
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

    objects["Sceneone"] = new createjs.Bitmap(Queue.getResult("Sceneone"));

    objects["Sceneone"].addEventListener("click", onSceneoneClicked);

    drawSceneOne();
}

function HandleCompleteSceneTwo() {
    loading.set({alpha:0});

    progressnum = 0;

    objects["AsiaEuroMap"] = new createjs.Bitmap(Queue.getResult("AsiaEuroMap")).set({x: 100,scaleX:0.33, scaleY:0.33});
    objects["raven"] = new createjs.Bitmap(Queue.getResult("raven")).set({x:450,y:300,scaleX:0.04,scaleY:0.04});

    objects["raven"].addEventListener("click", onRavenClicked);

    drawSceneTwo();
}

function HandleCompleteSceneThree(){
    loading.set({alpha:0});

    progressnum = 0;

    objects["FrontDoor"] = new createjs.Bitmap(Queue.getResult("FrontDoor"));

    drawSceneThree();
}

function HandleCompleteSceneFour(){
    loading.set({alpha:0});

    progressnum = 0;

    objects["Scenefour"] = new createjs.Bitmap(Queue.getResult("Scenefour")).set({alpha:0});
    objects["files"] = new createjs.Bitmap(Queue.getResult("files")).set({alpha:0, x:830, y:480, scaleX:0.1, scaleY:0.1});
    objects["file1"] = new createjs.Bitmap(Queue.getResult("file1")).set({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02});
    objects["file2"] = new createjs.Bitmap(Queue.getResult("file2")).set({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02});
    objects["file3"] = new createjs.Bitmap(Queue.getResult("file3")).set({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02});
    objects["file4"] = new createjs.Bitmap(Queue.getResult("file4")).set({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02});
    objects["marriage"] = new createjs.Bitmap(Queue.getResult("marriage")).set({alpha:0.01, x:1060, y:90, scaleX:0.1, scaleY:0.1});
    objects["factory"] = new createjs.Bitmap(Queue.getResult("factory")).set({x:1300, y:200, scaleX:0.1, scaleY:0.16, alpha:0.01});
    objects["workmate"] = new createjs.Bitmap(Queue.getResult("workmate")).set({alpha:0.01, x:1600, y:250, scaleX:0.2, scaleY:0.2});
    objects["camera"] = new createjs.Bitmap(Queue.getResult("camera")).set({alpha:0, x:980, y:530, scaleX:0.1, scaleY:0.1});

    var button1 = new createjs.Shape(); objects["button1"] = button1;
    button1.graphics.beginFill("white").drawRect(0,0,400,400); button1.set({x:880, y:480, scaleX:0.02, scaleY:0.02, alpha:0});
    var buttontext = new createjs.Text("整理文件", "Italic 40px KaiTi", "#000").set({x:380, y:750, alpha:0})
    
    objects["buttontext"] = buttontext;
    objects["buttontext"].addEventListener("click", onbuttonClicked);
    objects["button1"].addEventListener("click", onbuttonClicked);
    objects["file1"].addEventListener("click", onfilecloseClicked);
    objects["file2"].addEventListener("click", onfilecloseClicked);
    objects["file3"].addEventListener("click", onfilecloseClicked);
    objects["file4"].addEventListener("click", onfilecloseClicked);
    objects["marriage"].addEventListener("click", onmarriageClicked);
    objects["factory"].addEventListener("click", onfactoryClicked);
    objects["workmate"].addEventListener("click", onphotoClicked);
    objects["camera"].addEventListener("click", oncameraClicked);

    drawSceneFour();
}

function HandleCompleteSceneFive(){

}

function drawSceneOne(){
    container.addChild(objects["Sceneone"]);

    bag.reload();

    removeHint();

    SceneState = SceneOne;

    stage.update();
}

function drawSceneTwo(){
    container.addChild(objects["AsiaEuroMap"]);
    container.addChild(objects["raven"]);
}

function drawSceneThree(){
    container.addChild(objects["FrontDoor"]).set({alpha:0});
    createjs.Tween.get(objects["FrontDoor"]).to({alpha:1}, 2000).call(function(){
        objects["FrontDoor"].addEventListener("click", onFrontDoorClicked)
    });
}

function drawSceneFour(){
    container.addChild(objects["Scenefour"]);
    container.addChild(objects["files"]);
    container.addChild(objects["camera"]);
    createjs.Tween.get(objects["files"]).to({alpha:1}, 1000).call(function(){
        objects["files"].addEventListener("click", onfilesClicked);
        container.addChild(objects["file1"]);
        container.addChild(objects["file2"]);
        container.addChild(objects["file3"]);
        container.addChild(objects["file4"]);
        container.addChild(objects["button1"]);
        container.addChild(objects["buttontext"]);
        container.addChild(objects["marriage"]);
        container.addChild(objects["factory"]);
        container.addChild(objects["workmate"]);
    });
    createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 1000);
    createjs.Tween.get(objects["camera"]).to({alpha:1}, 1000);
}

function drawSceneFive(){
    
}


function showHint(str, time){
    texthint.set({alpha:1});
    hint = str;
    texthint.text = hint;
    container.addChild(texthint);
    createjs.Tween.get(texthint).to({alpha:0}, time).call(function(){
        texthint.text = " ";
        texthint.set({alpha:1});
    });
}
function removeHint(){
    texthint.text = " ";
    texthint.set({alpha:1});

}

function onSceneoneClicked(){
    createjs.Tween.get(objects["Sceneone"]).to({alpha:0.3}, 2000).call(function(){
        container.addChild(textSceneone); 
        textSceneone.set({alpha:0});
        createjs.Tween.get(textSceneone).to({alpha:1}, 1000).call(function(){
            createjs.Tween.get(textSceneone).to({alpha:1}, 6000).call(function(){
                createjs.Tween.get(objects["Sceneone"]).to({alpha:0}, 1000);
                createjs.Tween.get(textSceneone).to({alpha:0}, 1000).call(function(){
                    container.removeChild(textSceneone);
                    container.removeChild(objects["SceneOne"]);
                    initSceneTwo();
                });
            });
        });
    });
}

function onRavenClicked(){
    objects["raven"].removeEventListener("click", onRavenClicked);
    createjs.Tween.get(objects["raven"]).to({guide: {path: [450, 300, 460, 500, 600, 700, 900, 750, 1200, 650]}}, 6000).call(function(){
        createjs.Tween.get(objects["raven"]).to({alpha:0.6}, 1000);
        createjs.Tween.get(objects["AsiaEuroMap"]).to({alpha:0.6}, 1000);
        textSceneTwo.set({alpha:0});
        container.addChild(textSceneTwo);
        createjs.Tween.get(textSceneTwo).to({alpha:1}, 1000).call(function(){
            createjs.Tween.get(textSceneTwo).to({alpha:1}, 5000).call(function(){
                createjs.Tween.get(objects["raven"]).to({alpha:0}, 1000);
                createjs.Tween.get(objects["AsiaEuroMap"]).to({alpha:0}, 1000);
                createjs.Tween.get(textSceneTwo).to({alpha:0}, 1000).call(function(){
                    container.removeChild(objects["raven"]);
                    container.removeChild(objects["AsiaEuroMap"]);
                    container.removeChild(textSceneTwo);
                    initSceneThree();
                });
            });
        });
    });
}

function onFrontDoorClicked(){
    objects["FrontDoor"].removeEventListener("click", onFrontDoorClicked);
    createjs.Tween.get(objects["FrontDoor"]).to({alpha:0}, 2000).call(function(){
        textSceneThree.set({alpha:0});
        container.addChild(textSceneThree);
        createjs.Tween.get(textSceneThree).to({alpha:1}, 1000).call(function(){
            createjs.Tween.get(textSceneThree).to({alpha:1}, 5000).call(function(){
                createjs.Tween.get(textSceneThree).to({alpha:0}, 1000).call(function(){
                    container.removeChild(objects["FrontDoor"]);
                    container.removeChild(textSceneThree);
                    initSceneFour();
                })
            })
        })
    });
}

function onfilesClicked(){
    createjs.Tween.get(objects["file1"]).to({x:300, y:100, scaleX:0.15, scaleY:0.15, alpha:1}, 200);
    createjs.Tween.get(objects["file2"]).to({x:600, y:400, scaleX:0.15, scaleY:0.15, alpha:1}, 200);
    createjs.Tween.get(objects["file3"]).to({x:900, y:100, scaleX:0.15, scaleY:0.15, alpha:1}, 200);
    createjs.Tween.get(objects["file4"]).to({x:1200, y:400, scaleX:0.15, scaleY:0.15, alpha:1}, 200);
    createjs.Tween.get(objects["button1"]).to({alpha:1, x:380, y:750, scaleX:0.5, scaleY:0.2}, 200);
    createjs.Tween.get(objects["buttontext"]).to({alpha:1, x:400, y:770, scaleX:1, scaleY:1}, 200);
}

function onfilecloseClicked(){
    createjs.Tween.get(objects["file1"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
    createjs.Tween.get(objects["file2"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
    createjs.Tween.get(objects["file3"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
    createjs.Tween.get(objects["file4"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
    createjs.Tween.get(objects["button1"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
    createjs.Tween.get(objects["buttontext"]).to({alpha:0, x:880, y:480, scaleX:0.02, scaleY:0.02}, 200);
}

function onbuttonClicked(){
    onfilecloseClicked();
    createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 500).call(function(){
        container.removeChild(objects["files"]);
        container.removeChild(objects["file1"]);
        container.removeChild(objects["file2"]);
        container.removeChild(objects["file3"]);
        container.removeChild(objects["file4"]);
        container.removeChild(objects["button1"]);
        container.removeChild(objects["buttontext"]);
        createjs.Tween.get(objects["Scenefour"]).to({alpha:0.5}, 1000).call(function(){

            textSceneFour1.set({alpha:0});
            container.addChild(textSceneFour1);
            createjs.Tween.get(textSceneFour1).to({alpha:1}, 200).call(function(){
                createjs.Tween.get(textSceneFour1).to({alpha:1}, 5000).call(function(){
                    createjs.Tween.get(textSceneFour1).to({alpha:0}, 1000).call(function(){
                        container.removeChild(textSceneFour1);
                        controller.completeTask("files");
                    });
                    createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 1000);
                })
            })
        })
    })
}

function onmarriageClicked(){
    objects["marriage"].removeEventListener("click", onmarriageClicked);
    createjs.Tween.get(objects["files"]).to({alpha:0.5}, 1000);
    createjs.Tween.get(objects["Scenefour"]).to({alpha:0.5}, 1000).call(function(){
        objects["marriage"].addEventListener("click", function(){
            createjs.Tween.get(objects["files"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["marriage"]).to({alpha:0.01, x:1060, y:90, scaleX:0.1, scaleY:0.1}, 200);
            createjs.Tween.get(textSceneFour2).to({alpha:0}, 1000).call(function(){
                container.removeChild(textSceneFour2);
                objects["marriage"].addEventListener("click", onmarriageClicked);
                controller.completeTask("marriage");
            });
        });
    });
    createjs.Tween.get(objects["marriage"]).to({x:250, y:100, scaleX:0.4, scaleY:0.4, alpha:1}, 200);
    textSceneFour2.set({alpha:0});
    container.addChild(textSceneFour2);
    createjs.Tween.get(textSceneFour2).to({alpha:1}, 1000);
}

function onfactoryClicked(){
    objects["factory"].removeEventListener("click", onfactoryClicked);
    createjs.Tween.get(objects["files"]).to({alpha:0.5}, 1000);
    createjs.Tween.get(objects["Scenefour"]).to({alpha:0.5}, 1000).call(function(){
        objects["factory"].addEventListener("click", function(){
            createjs.Tween.get(objects["files"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["factory"]).to({x:1300, y:200, scaleX:0.1, scaleY:0.16, alpha:0.01}, 200);
            createjs.Tween.get(textSceneFour3).to({alpha:0}, 1000).call(function(){
                container.removeChild(textSceneFour3);
                objects["factory"].addEventListener("click", onfactoryClicked);
                controller.completeTask("factory");
            });
        })
    });
    createjs.Tween.get(objects["factory"]).to({x:150, y:150, scaleX:0.4, scaleY:0.4, alpha:1}, 200);
    textSceneFour3.set({alpha:0});
    container.addChild(textSceneFour3);
    createjs.Tween.get(textSceneFour3).to({alpha:1}, 1000);
}

function onphotoClicked(){
    objects["workmate"].removeEventListener("click", onphotoClicked);
    createjs.Tween.get(objects["files"]).to({alpha:0.5}, 1000);
    createjs.Tween.get(objects["Scenefour"]).to({alpha:0.5}, 1000).call(function(){
        objects["workmate"].addEventListener("click", function(){
            createjs.Tween.get(objects["files"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["Scenefour"]).to({alpha:1}, 1000);
            createjs.Tween.get(objects["workmate"]).to({x:1300, y:200, scaleX:0.1, scaleY:0.16, alpha:0.01}, 200);
            createjs.Tween.get(textSceneFour4).to({alpha:0}, 1000).call(function(){
                container.removeChild(textSceneFour4);
                objects["factory"].addEventListener("click", onfactoryClicked);
                controller.completeTask("workmate");
            });
        })
    });
    createjs.Tween.get(objects["workmate"]).to({x:150, y:150, scaleX:0.7, scaleY:0.7, alpha:1}, 200);
    textSceneFour4.set({alpha:0});
    container.addChild(textSceneFour4);
    createjs.Tween.get(textSceneFour4).to({alpha:1}, 1000);
}

function oncameraClicked(){
    if(controller.checkStatus("marriage") == COMPLETED 
    && controller.checkStatus("factory") == COMPLETED
    && controller.checkStatus("files") == COMPLETED
    && controller.checkStatus("workmate") == COMPLETED)
    {
        createjs.Tween.get(objects["camera"]).to({alpha:0}, 1000);
        createjs.Tween.get(objects["Scenefour"]).to({alpha:0}, 1000).call(function(){
            clearScreen();
            container.addChild(textSceneFive1);
            container.addChild(textSceneFive2)
            textSceneFive1.set({alpha:0});
            textSceneFive2.set({alpha:0});
            createjs.Tween.get(textSceneFive2).to({alpha:1}, 1000);
            createjs.Tween.get(textSceneFive1).to({alpha:1}, 1000).call(function(){
                createjs.Tween.get(textSceneFive1).to({alpha:1}, 5000).call(function(){
                    createjs.Tween.get(textSceneFive1).to({alpha:0}, 1000);
                    createjs.Tween.get(textSceneFive2).to({alpha:0}, 1000).call(function(){
                        container.removeChild(textSceneFive1);
                        container.removeChild(textSceneFive2);
                        initSceneFive();
                    })
                })
            })
        })
    }
    else{
        showHint("继续探索...", 2000);
    }
}

function clearScreen(){
    for(var i;i<objects.length;++i){
        container.removeChild(objects[i]);
    }
}

///////////////////////////////////////Now we are on a go/////////////////////////////////////////
init();
//////////////////////////////////////////////////////////////////////////////////////////////////
