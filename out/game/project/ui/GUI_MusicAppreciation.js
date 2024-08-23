














var GUI_MusicAppreciation = (function (_super) {
    __extends(GUI_MusicAppreciation, _super);
    function GUI_MusicAppreciation() {
        var _this = _super.call(this) || this;
        _this.currentTime = 0;
        _this.currentBGMIndex = -1;
        _this.on(EventObject.DISPLAY, _this, _this.onDisplay);
        _this.on(EventObject.UNDISPLAY, _this, _this.onUndisplay);
        _this.musicList.on(EventObject.DOUBLE_CLICK, _this, _this.onItemDoubleClick);
        _this.musicList.on(EventObject.CHANGE, _this, _this.onMusicListItemChange);
        _this.musicList.on(UIList.ITEM_CREATE, _this, _this.onListItemCreate);
        _this.playCheckBox.on(EventObject.CHANGE, _this, _this.onPlayBtnClick);
        _this.nextBtn.on(EventObject.CLICK, _this, _this.onNext);
        _this.previousBtn.on(EventObject.CLICK, _this, _this.onPrevious);
        _this.timeProgress.on(EventObject.CHANGE, _this, _this.onChangeMusicProgress);
        return _this;
    }
    GUI_MusicAppreciation.prototype.onUndisplay = function () {
        this.stop();
    };
    GUI_MusicAppreciation.prototype.onDisplay = function () {
        this.stop();
        var arr = [];
        var len = WorldData.myMusic.length;
        for (var i = 0; i < len; i++) {
            var musicURL = WorldData.myMusic[i];
            var musicName = musicURL ? musicURL.split(",")[0].split("/").pop() : "";
            var d = new ListItem_1004;
            arr.push(d);
            d.music = musicName;
            d.musicSelected = musicName;
            d.data = musicURL;
        }
        this.musicList.items = arr;
    };
    GUI_MusicAppreciation.prototype.onListItemCreate = function (ui, data, index) {
        ui.music.visible = true;
        ui.musicSelected.visible = false;
    };
    GUI_MusicAppreciation.prototype.onPlayBtnClick = function (e) {
        if (this.currentBGMIndex != this.musicList.selectedIndex) {
            this.play(this.musicList.selectedIndex);
            return;
        }
        if (!this.playCheckBox.selected) {
            this.pause();
        }
        else {
            this.continuie();
        }
    };
    GUI_MusicAppreciation.prototype.onMusicListItemChange = function (state) {
        ___listSEPlay(state);
        if (state == 0)
            this.musicList.scrollTo(this.musicList.selectedIndex, true, true, 200);
    };
    GUI_MusicAppreciation.prototype.onItemDoubleClick = function () {
        var selectedIndex = this.musicList.selectedIndex;
        if (selectedIndex < 0)
            return;
        for (var i = 0; i < this.musicList.items.length; i++) {
            var itemUI = this.musicList.getItemUI(i);
            itemUI.music.visible = true;
            itemUI.musicSelected.visible = false;
        }
        var selItemUI = this.musicList.getItemUI(this.musicList.selectedIndex);
        selItemUI.music.visible = false;
        selItemUI.musicSelected.visible = true;
        this.play(selectedIndex);
    };
    GUI_MusicAppreciation.prototype.onPlayUpdate = function () {
        var sc = GameAudio.lastBgmSoundChannel;
        if (sc && sc.position && sc.duration) {
            var positionStr = this.fomatTime(sc.position);
            var durationStr = this.fomatTime(sc.duration);
            if (!this.dragingTimeProgress) {
                this.timePosition.text = positionStr;
                this.timeDuration.text = durationStr;
                this.timeProgress.setValueForce(sc.position * 100 / sc.duration);
            }
            this.currentTime = sc.position;
        }
    };
    GUI_MusicAppreciation.prototype.onNext = function (e) {
        var index = this.musicList.selectedIndex + 1;
        if (index >= this.musicList.items.length) {
            index = 0;
        }
        this.musicList.selectedIndex = index;
        this.play(index);
    };
    GUI_MusicAppreciation.prototype.onPrevious = function (e) {
        var index = this.musicList.selectedIndex - 1;
        if (index < 0) {
            index = this.musicList.items.length - 1;
        }
        this.musicList.selectedIndex = index;
        this.play(index);
    };
    GUI_MusicAppreciation.prototype.onChangeMusicProgress = function () {
        if (!this.dragingTimeProgress) {
            stage.off(EventObject.MOUSE_UP, this, this.onUpMusicProgress);
            stage.once(EventObject.MOUSE_UP, this, this.onUpMusicProgress);
            this.dragingTimeProgress = true;
        }
        var sc = GameAudio.lastBgmSoundChannel;
        if (sc) {
            var position = sc.duration * this.timeProgress.value / 100;
            var positionStr = this.fomatTime(position);
            var durationStr = this.fomatTime(sc.duration);
            this.timePosition.text = positionStr;
            this.timeDuration.text = durationStr;
        }
    };
    GUI_MusicAppreciation.prototype.onUpMusicProgress = function () {
        var sc = GameAudio.lastBgmSoundChannel;
        if (sc) {
            this.currentTime = sc.startTime = this.timeProgress.value * sc.duration / 100;
            if (this.isPlaying) {
                sc.play();
            }
        }
        this.dragingTimeProgress = false;
    };
    GUI_MusicAppreciation.prototype.stop = function () {
        this.isPlaying = false;
        GameAudio.stopBGM();
        os.remove_ENTERFRAME(this.onPlayUpdate, this);
        this.timePosition.text = "00:00";
        this.timeDuration.text = "00:00";
        this.timeProgress.setValueForce(0);
        this.playCheckBox.setSelectedForce(false);
        this.currentBGMIndex = -1;
    };
    GUI_MusicAppreciation.prototype.play = function (musicIndex) {
        if (musicIndex < 0)
            return;
        var item = this.musicList.items[musicIndex];
        if (!item)
            return;
        this.stop();
        var url = item.data;
        GameAudio.playBGM(url);
        this.isPlaying = true;
        this.currentBGMIndex = musicIndex;
        this.playCheckBox.setSelectedForce(true);
        this.setSelectedIndexEffect(musicIndex);
        os.add_ENTERFRAME(this.onPlayUpdate, this);
        this.onPlayUpdate();
    };
    GUI_MusicAppreciation.prototype.continuie = function () {
        var sc = GameAudio.lastBgmSoundChannel;
        if (sc) {
            this.isPlaying = true;
            sc.startTime = this.currentTime;
            sc.play();
            os.add_ENTERFRAME(this.onPlayUpdate, this);
        }
        else {
            this.play(this.musicList.selectedIndex);
        }
    };
    GUI_MusicAppreciation.prototype.pause = function () {
        var sc = GameAudio.lastBgmSoundChannel;
        if (sc) {
            this.isPlaying = false;
            sc.pause();
            os.remove_ENTERFRAME(this.onPlayUpdate, this);
        }
    };
    GUI_MusicAppreciation.prototype.setSelectedIndexEffect = function (index) {
        for (var i = 0; i < this.musicList.items.length; i++) {
            var itemUI = this.musicList.getItemUI(i);
            itemUI.music.visible = true;
            itemUI.musicSelected.visible = false;
        }
        if (index >= 0) {
            var selItemUI = this.musicList.getItemUI(index);
            selItemUI.music.visible = false;
            selItemUI.musicSelected.visible = true;
        }
    };
    GUI_MusicAppreciation.prototype.fomatTime = function (second) {
        var minuteStr = MathUtils.fixIntDigit(Math.floor(second / 60), 2);
        var secondStr = MathUtils.fixIntDigit(Math.floor(second % 60), 2);
        return minuteStr + ":" + secondStr;
    };
    return GUI_MusicAppreciation;
}(GUI_14));
//# sourceMappingURL=GUI_MusicAppreciation.js.map