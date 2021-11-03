/*
    1/ Render song
    2/ Scroll top
    3/ Play/ pause/ seek
    4/ CD rotate
    5/ Next/ prev

*/

//Bind document
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//Get Elements
const main = $('#main');
const audio = $('#audio');
const progress = $('#progress');
const controlsDisc = $('.controls-disc');
const contentDiscImage = $('.content-disc img');
const contentSongName = $('.content-title .song-name');
const contentSongPerformer = $('.content-title .song-performer');
const btnTogglePlay = $('.btn-toggle-play');
const timeSongCurrent = $('.controls-time-song .time-left');
const timeSongTotal = $('.controls-time-song .time-right');

const app = {
    //Current index song
    currentIndex: 0,
    isPlaying: false,
    //List song
    songs: [{
            name: 'Live Devil',
            performer: 'Da-iCE ft. Subaru Kimura',
            path: './assets/music/LiveDevil.mp3',
            image: './assets/image/LiveDevil_TV_Size_Art.jpg'
        },
        {
            name: 'Journey Through The Decade',
            performer: 'Gackt',
            path: './assets/music/JourneyThroughTheDecade.mp3',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6e383159-0e29-4b64-832e-6d09cdd0021e/d2ge90k-22924761-f909-4fdc-ab4f-92dbb6ae4bba.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZlMzgzMTU5LTBlMjktNGI2NC04MzJlLTZkMDljZGQwMDIxZVwvZDJnZTkway0yMjkyNDc2MS1mOTA5LTRmZGMtYWI0Zi05MmRiYjZhZTRiYmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Vea5nUH72PBjv27mBH_Ey2Y5CNtC81Yib1OsbdKhEhI'
        },
        {
            name: 'Over "Quartzer"',
            performer: 'Shuta Sueyoshi',
            path: './assets/music/OverQuartzer.mp3',
            image: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/45296843_1550327161734076_5920978726706741248_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=973b4a&_nc_ohc=OcwsByu2tgcAX8wYoCn&_nc_ht=scontent.fsgn2-3.fna&oh=15f222bbae9916603eca2d46b36e86e3&oe=61A815D2'
        },
        {
            name: 'REAL×EYEZ',
            performer: 'J×Takanori Nishikawa',
            path: './assets/music/REALxEYEZ.m4a',
            image: 'https://i1.sndcdn.com/artworks-000662588752-8lrx7z-t500x500.jpg'
        },
    ],

    //Render playlist
    render: function() {
        let indexSong = 0;
        const htmls = this.songs.map(song => {
            ++indexSong;
            return `
            <div class="content-playlist">
                <div class="content-playlist-song">
                    <div class="song-prefix">
                        <span class="song-number">${indexSong}</span>
                    </div>
                    <div class="song-thumb">
                        <div class="song-image" style="background-image: url('${song.image}');"></div>
                        <div class="song-thumb-active"></div>
                    </div>
                    <div class="song-title">
                        <span class="song-name">
                            ${song.name}
                        </span>
                        <span class="song-performer">
                            ${song.performer}
                        </span>
                    </div>
                </div>
                <div class="content-playlist-time-song">
                    <span></span>
                </div>
                <div class="content-playlist-option-song">
                    <button class="btn btn-mv">
                        <i class="ri-mv-line"></i>
                    </button>
                    <button class="btn btn-lyric">
                        <i class="ri-mic-line"></i>
                    </button>
                    <button class="btn btn-library">
                        <i class="ri-heart-line"></i>
                    </button>
                    <button class="btn btn-option">
                        <i class="ri-more-line"></i>
                    </button>
                </div>
            </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function() {
        const _this = this;

        const discSpin = controlsDisc.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
            fill: 'backwards'
        });

        discSpin.pause();


        //Hành động click vào nút play hoặc pause
        btnTogglePlay.onclick = function() {
            if (_this.isPlaying)
                audio.pause();
            else
                audio.play();
        }

        //Khi bài hát chạy
        audio.onplay = function() {
            _this.isPlaying = true;
            main.classList.add('playing');
            discSpin.play();
        }

        //Khi bài hát đừng
        audio.onpause = function() {
            _this.isPlaying = false;
            main.classList.remove('playing');
            discSpin.pause();
        }

        //Set giá trị cho thanh progress
        audio.addEventListener('timeupdate', _this.audioTimeUpdate);

        //Xử lí khi tua
        progress.onchange = function(e) {
            audio.removeEventListener('timeupdate', _this.audioTimeUpdate);
            const seekTime = e.target.value * audio.duration / 100;
            audio.currentTime = seekTime;
            audio.addEventListener('timeupdate', _this.audioTimeUpdate);
        }


    },
    loadCurrentSong: function() {
        contentSongName.textContent = this.currentSong.name;
        contentSongPerformer.textContent = this.currentSong.performer;
        contentDiscImage.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },
    audioTimeUpdate: function() {
        if (audio.duration) {
            const progressPercentage = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercentage;

            const totalMinute = Math.floor(audio.duration / 60);
            const totalSecond = Math.floor(audio.duration - Math.floor(audio.duration / 60) * 60);
            timeSongTotal.textContent = app.fomartTime(totalMinute, totalSecond);

            const currentMinute = Math.floor(audio.currentTime / 60);
            const currentSecond = Math.floor(audio.currentTime - Math.floor(audio.currentTime / 60) * 60);
            timeSongCurrent.textContent = app.fomartTime(currentMinute, currentSecond);
        }
    },
    fomartTime: function(minutes, seconds) {
        if (minutes < 10)
            minutes = `0${minutes}`;
        if (seconds < 10)
            seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    },

    start: function() {
        //Định nghĩa các thuộc tính cho object
        this.defineProperties();

        //Lắng nghe xử lí các sự kiện trong dom
        this.handleEvents();

        //Tải thông tin bài hát hiện tại vào UI th
        this.loadCurrentSong();

        //Render playlist
        this.render();

    }
}

app.start();