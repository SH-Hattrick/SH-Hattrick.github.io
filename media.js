// JavaScript Document

function autoPlay(){//自动播放

    var myAuto = document.getElementById('musicplayer');

    myAuto.src = 'media/bgm1.mp3';//MP3路径

    myAuto.play();

}

function pausePlay(){//暂停播放

  var myAuto = document.getElementById('musicplayer');

  myAuto.pause();

}

function createAuto(){
  //  var _id = $("#audio");

  //  if (window.applicationCache) {
  //       _id.html('')

  //          } else {

  //          _id.html('');

  //     }
    // var audio=document.createElement("musicplayer");
    // audio.src="media/bgm1.mp3";//路径
    // audio.play();

    // var music = document.getElementsByName("musicplayer");
    // if(music == null){
    //    alert();
    //    return;
    // }
    // music.play();
}


createAuto();