console.log("Spotify music player");
//Functions
const updatecurrentinfo=()=>{//For Updating Current Song details on now playing Container
    document.getElementById('current-song-name').innerText=songs[songIndex].songname;
    document.getElementById('current-artist').innerText=songs[songIndex].artistname;
    document.getElementById('current-cover').src=songs[songIndex].coverpath;

}
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
    Array.from(document.getElementsByClassName('song-name')).forEach((element)=>{
        element.style.color='white';
    })
}
//Variable Declaration
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let progressbar=document.getElementById('progressbar');
let songsitems=Array.from(document.getElementsByClassName('song-box'));

//Songs List
let songs=[
    { songname:"techno on my mind", artistname:"speedboys",filepath:"songs/1.mp3",coverpath:"covers/1.jpg"
    },
    { songname:"Indecisive", artistname:"T & Sugah",filepath:"songs/2.mp3",coverpath:"covers/2.jpg"
    },
    { songname:"Desperate", artistname:"NEFFEX",filepath:"songs/3.mp3",coverpath:"covers/3.jpg"
    },
    { songname:"Getting Down", artistname:"JOXION",filepath:"songs/4.mp3",coverpath:"covers/4.jpg"
    },
    { songname:"Driver Seat", artistname:"C1W",filepath:"songs/5.mp3",coverpath:"covers/5.jpg"
    },
    { songname:"No Money", artistname:"Clarx, Zaug",filepath:"songs/6.mp3",coverpath:"covers/6.jpg"
    },
    { songname:"Fall Too Deep", artistname:"Barmuda, Andrew A",filepath:"songs/7.mp3",coverpath:"covers/7.jpg"
    },
    { songname:"What I Want", artistname:"Ray Le Fanue, Britt Lari",filepath:"songs/8.mp3",coverpath:"covers/8.jpg"
    },
    { songname:"Think About Me", artistname:"Yancle",filepath:"songs/9.mp3",coverpath:"covers/9.jpg"
    },
    { songname:"Keep Me Closer", artistname:"Low Mileage",filepath:"songs/10.mp3",coverpath:"covers/10.jpg"
    },
    { songname:"Take Away", artistname:"borne",filepath:"songs/11.mp3",coverpath:"covers/11.jpg"
    }
];

//To Display Songs names and Cover images
songsitems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName('song-name')[0].innerText=songs[i].songname;
    element.getElementsByClassName('song-artist')[0].innerText=songs[i].artistname;

})


//For Playing the control the song from Play button above progess bar
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
        document.getElementById(`song${songIndex}`).style.color='green';
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

//To update progress bar
audioElement.addEventListener('timeupdate',()=>{
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})

progressbar.addEventListener('change',()=>{
    audioElement.currentTime=(progressbar.value*audioElement.duration)/100;
})



//To make audio play from play buttons next to song name
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(e.target.classList.contains('fa-circle-pause')){
            makeAllPlays();
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            
        }
        else if (audioElement.currentTime>0 && songIndex==parseInt(e.target.id)){
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            document.getElementById(`song${songIndex}`).style.color='green';
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        updatecurrentinfo();
        document.getElementById(`song${songIndex}`).style.color='green';
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }

    })
})

//To play next song
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=10){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementById(`song${songIndex}`).style.color='green';
    updatecurrentinfo();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

//To play previous song
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=10;
    }
    else{
        songIndex-=1;
    }
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    updatecurrentinfo();
    document.getElementById(`song${songIndex}`).style.color='green';
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})