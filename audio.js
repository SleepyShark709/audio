//播放函数
const Eventplay = (audio) => {
    let button = e('.play')
    button.addEventListener('click', function() {
        audio.play()
    })
}
//暂停函数
const Eventpause = (audio) => {
    let button = e('.pause')
    button.addEventListener('click', function() {
        audio.pause()
    })
}
//秒转换成分钟
const SecondchangetoMinite = (s) => {
    let m = String(Math.floor(s / 60))
    let Sencond = String(s % 60)
    return m + ':' + Sencond
}
//显示总时长函数
const showtime = (audio) => {
    let elapsed = e('.elapsed')
    let clock = setInterval(function() {
        let wholetime = SecondchangetoMinite(audio.duration.toFixed(0))
        let nowtime = SecondchangetoMinite(audio.currentTime.toFixed(0))

        // log('nowtime', nowtime)
        elapsed.innerHTML = '时长：' + `${nowtime}` + '/' + wholetime
    }, 1000)
}
//顺序播放函数
//把三首歌的路径放到数组中
const songList = () => {
    let s =[]
    let songs = es('.songs')
    // log('songs', songs)
    for (let i = 0; i < songs.length; i++) {
        let song = songs[i].dataset.src
        s.push(song)
    }
    // log('s', s)
    return s
}
//实现顺序播放函数
const listLoop = (audio) => {
    audio.addEventListener('ended', function() {
        //得到['1.mp3', '2.mp3', '3.mp3']
        let s = songList()
        //选中三个div 的父元素
        let musiclist = e('.musiclist')
        //找到这个数组的长度
        let songNumber = s.length
        //第一首歌的下标（0）
        let firstsong = Number(musiclist.dataset.active)
        log('firstsong', firstsong)
        //下一首歌的下表
        let nextsong = (firstsong + 1 + songNumber) % songNumber
        log('nextsong', nextsong)
        //让父元素里面的active变成下一首歌的
        musiclist.dataset.active = nextsong
        //选中下一首歌的id
        let nextSeletor = e('#audio-' + String(nextsong))
        log('nextselector', nextSeletor)
        //选中播放的这个audio
        let nowaudio = e('#id-audio-play')
        //让播放的这个audio的src和下一首歌id的src一样
        nowaudio.src = nextSeletor.dataset.src
        //下面是切歌更换歌曲名称的代码
        let songname = e('.songname')
        songname.dataset.active = nextsong
        let nextnameSelector = e('#name-' + String(nextsong))
        let H2 = e('.h2')
        H2.innerHTML = nextnameSelector.dataset.name
        audio.play()
    })
}
//停止函数
const EventStop = (audio) => {
    let button = e('.stop')
    button.addEventListener('click', function() {
        audio.currentTime = 0
        audio.pause()
    })

}
//CANPLAY函数
const audiocanplay = (audio) => {
    audio.addEventListener('canplay', function() {
        // log('duration in canplay', audio.duration)
        showtime(audio)
    })
}
//下一首函数
const NextSongButton = (audio) => {
    let button = e('.forward')
    button.addEventListener('click', function() {
        //得到['1.mp3', '2.mp3', '3.mp3']
        let s = songList()
        //选中三个div 的父元素
        let musiclist = e('.musiclist')
        //找到这个数组的长度
        let songNumber = s.length
        //第一首歌的下标（0）
        let firstsong = Number(musiclist.dataset.active)
        log('firstsong', firstsong)
        //下一首歌的下标
        let nextsong = (firstsong + 1 + songNumber) % songNumber
        log('nextsong', nextsong)
        //让父元素里面的active变成下一首歌的
        musiclist.dataset.active = nextsong
        //选中下一首歌的id
        let nextSeletor = e('#audio-' + String(nextsong))
        log('nextselector', nextSeletor)
        //选中播放的这个audio
        let nowaudio = e('#id-audio-play')
        //让播放的这个audio的src和下一首歌id的src一样
        nowaudio.src = nextSeletor.dataset.src

        //下面是切歌更换歌曲名称的代码
        let songname = e('.songname')
        songname.dataset.active = nextsong
        let nextnameSelector = e('#name-' + String(nextsong))
        let H2 = e('.h2')
        H2.innerHTML = nextnameSelector.dataset.name
        audio.play()
    })
}
//上一首函数
const LastSongButton = (audio) => {
    let button = e('.backward')
    button.addEventListener('click', function() {
        //得到['1.mp3', '2.mp3', '3.mp3']
        let s = songList()
        //选中三个div 的父元素
        let musiclist = e('.musiclist')
        //找到这个数组的长度
        let songNumber = s.length
        //当前歌曲的下标
        let firstsong = Number(musiclist.dataset.active)
        //下一首歌的下标
        let nextsong = (firstsong - 1 + songNumber) % songNumber
        musiclist.dataset.active = nextsong
        let nexSelector = e('#audio-' + String(nextsong))
        let nowaudio = e('#id-audio-play')
        nowaudio.src = nexSelector.dataset.src
        //下面是切歌更换歌曲名称的代码
        let songname = e('.songname')
        songname.dataset.active = nextsong
        let nextnameSelector = e('#name-' + String(nextsong))
        let H2 = e('.h2')
        H2.innerHTML = nextnameSelector.dataset.name

        audio.play()
    })
}
//点击切换红心函数,但是切歌这个函数不能记录
const RedHeart = () => {
    let button = e('.icon-heart')
    button.addEventListener('click', function(event) {
        let self = event.target
        //这个函数要重新看一下，是切换class属性的
        toggleClass(self, 'show-heart')
    })
}
//音频进度条，拖动进度条的功能
const bindEvents = (audio) => {
    let inner = e('.inner')
    let outer = e('.outer')
    let dot = e('.dot')
    let max = outer.offsetWidth
    let moving = false
    let offset = 0
    dot.addEventListener('mousedown', (event) => {
        log('event', event.clientX, dot.offsetLeft, event.clientX - dot.offsetLeft)
        offset = event.clientX - dot.offsetLeft
        moving = true
    })
    document.addEventListener('mouseup', (event) => {
        moving = false
    })
    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            if (x > max) {
                x = max
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            audio.currentTime = (width / 100) * audio.duration
        }
    })
    //让进度条自己走的事件
    audio.addEventListener('timeupdate', (event) => {
        let x = (audio.currentTime / audio.duration) * 100
        inner.style.width = String(x) + '%'
    })
}

const EventAudio =function() {
    let audio = e('#id-audio-play')
    Eventplay(audio)
    Eventpause(audio)
    audiocanplay(audio)
    listLoop(audio)
    EventStop(audio)
    NextSongButton(audio)
    LastSongButton(audio)
    RedHeart()
    bindEvents(audio)
}

//调用函数
const __main = function() {
    EventAudio()
}
__main()