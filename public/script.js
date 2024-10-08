const userVideo=document.getElementById('user-video');
const startButton=document.getElementById('start-btn');

const state={media:null}
const socket=io();
startButton.addEventListener('click',e=>{
    const mediaRecorder=new MediaRecorder(state.media,{
        audioBitsPerSecond:128000,
        videoBitsPerSecond:2500000,
        frameRate:25
    })
    mediaRecorder.ondataavailable=ev=>{
        console.log("Binary data avaliable",ev.data);
        socket.emit('binarystream',ev.data);
    }
    mediaRecorder.start(25);
});

window.addEventListener('load',async e=>{
    const media=await navigator.mediaDevices.getUserMedia({audio:true,video:true})
    state.media=media;
    userVideo.srcObject=media;

});