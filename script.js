function App({ songs }) {
    function handleChangeMusic({ isPrev = false, playListIndex = null }) {
        if (isLocked || indexSong === playListIndex) return;

        if (playListIndex || playListIndex === 0) {
            indexSong = playListIndex;
        } else {
            indexSong = isPrev ? indexSong - 1 : indexSong + 1;
        }
        
        if (indexSong < 0) {
            indexSong = 0;
            return;
        } else if (indexSong >= songs.length) {
            indexSong = songs.length - 1;
            return;
        }

        selectedSong.pause();
        selectedSong.currentTime = 0;
        progressBarIsUpdating = false;
        selectedSong = playlistSongs_elmnt[indexSong];

        if (selectedSong.paused && songIsPlayed) {
            selectedSong.play();
        } else {
            selectedSong.pause();
        }

        setBodyBg(songs[indexSong].bg);
        sliderImgs_elmnt.style.setProperty('--index', -indexSong);
        updateInfo(singerName_elmnt, songs[indexSong].artist);
        updateInfo(songName_elmnt, songs[indexSong].songName);
    }

    function handlePlayMusic() {
        if (selectedSong.currentTime === selectedSong.duration) {
            handleChangeMusic({});
        }

        this.classList.toggle("click");
        songIsPlayed = !songIsPlayed;
        selectedSong.paused ? selectedSong.play() : selectedSong.pause();
    }

    return (
        dom("div", { class: "slider center", onclick: handleResizeSlider },
            dom("div", { class: "slider__content center" },
                dom("button", { class: "music-player__playlist-button center button"},
                    dom("i", { class: "icon-playlist"})
                )
            )
        )
    );
}
dom("button", {
    onClick: handlePlayMusic,
    class: "music-player__brodcast-guarantor center button" 
}, [
    dom("i", { class: "icon-play" }), 
    dom("i", { class: "icon-pause" }) 
]),

dom("div", { class: "slider__imgs flex-row" }, slides.map(({ songName, files: { cover } }) =>
    dom("img", { src: cover, class: "img", alt: songName }))),

dom("div", { class: "slider__controls center" }, [
    dom("button", {
        class: "slider__switch-button flex-row button",
        onClick: () => handleChangeMusic({ isPrev: true }) 
    }, dom("i", { class: "icon-back" })) 
]);
