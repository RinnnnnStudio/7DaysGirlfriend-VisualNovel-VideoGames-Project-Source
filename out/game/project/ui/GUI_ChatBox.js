














var PLUGIN_MODULE_TYPE_CHAT_ACTOR = 2;
var PLUGIN_ANIMATION_VOICE_ANIMATION = 3;
var PLUGIN_GUI_CHAT_MAIN_UI = 4;
var PLUGIN_GUI_CHAT_1 = 1007;
var PLUGIN_GUI_CHAT_2 = 1008;
var PLUGIN_GUI_CHAT_3 = 1009;
var PLUGIN_GUI_ACTOR_INFO = 1010;
var PLUGIN_GUI_PICTURE_SHOWALL = 1011;
var GUI_ChatBox = (function (_super) {
    __extends(GUI_ChatBox, _super);
    function GUI_ChatBox() {
        var _this = _super.call(this) || this;
        _this.messages = [];
        _this.messageData = [];
        GUI_ChatBox.self = _this;
        if (!Config.EDIT_MODE) {
            _this.scrollRect = new Rectangle(0, 0, _this.background.width, _this.background.height);
        }
        return _this;
    }
    GUI_ChatBox.prototype.sendTextMessage = function (chatActorID, msg, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var chatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face)
            return;
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_TEXT;
        chatMsg.content = msg;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        this.messageData.push(["sendTextMessage", chatActorID, msg, isLeft]);
    };
    GUI_ChatBox.prototype.sendImageMessage = function (chatActorID, image, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var chatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face)
            return;
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_PICTURE;
        chatMsg.content = image;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        this.messageData.push(["sendImageMessage", chatActorID, image, isLeft]);
    };
    GUI_ChatBox.prototype.sendAnimationMessage = function (chatActorID, animationID, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var chatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face)
            return;
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_ANIMATION;
        chatMsg.content = animationID;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        this.messageData.push(["sendAnimationMessage", chatActorID, animationID, isLeft]);
    };
    GUI_ChatBox.prototype.sendVoiceMessage = function (chatActorID, tsURL, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var chatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face)
            return;
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_VOICE;
        chatMsg.content = tsURL;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        this.messageData.push(["sendVoiceMessage", chatActorID, tsURL, isLeft]);
    };
    GUI_ChatBox.prototype.sendVideoMessage = function (chatActorID, videoURL, isLeft) {
        if (isLeft === void 0) { isLeft = true; }
        var chatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face)
            return;
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_VIDEO;
        chatMsg.content = videoURL;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        this.messageData.push(["sendVideoMessage", chatActorID, videoURL, isLeft]);
    };
    GUI_ChatBox.prototype.sendSystemMessage = function (msg) {
        var chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_SYSTEM_MESSAGE;
        chatMsg.content = msg;
        this.addMessage(chatMsg);
        this.messageData.push(["sendSystemMessage", msg]);
    };
    GUI_ChatBox.prototype.clearMessages = function () {
        var _this = this;
        var taskName = "addMessageTask";
        new SyncTask(taskName, function () {
            for (var i = 0; i < _this.messages.length; i++) {
                _this.messages[i].dispose();
            }
            _this.messages.length = 0;
            _this.messageData.length = 0;
            _this.dialogList.refresh();
            SyncTask.taskOver(taskName);
        });
    };
    GUI_ChatBox.prototype.changeBackgroundImage = function (imageURL, time) {
        var _this = this;
        if (time === void 0) { time = 300; }
        var taskName = "changeBackgroundImageTask";
        new SyncTask(taskName, function () {
            var oriAlpha = _this.background.alpha;
            AssetManager.loadImage(imageURL, Callback.New(function (tex) {
                if (time == 0) {
                    _this.background.image = imageURL;
                    SyncTask.taskOver(taskName);
                    return;
                }
                Tween.to(_this.background, { alpha: 0 }, time, null, Callback.New(function () {
                    _this.background.image = imageURL;
                    Tween.to(_this.background, { alpha: oriAlpha }, time, null, Callback.New(function () {
                        SyncTask.taskOver(taskName);
                    }, _this));
                }, _this));
            }, _this), true, false);
        });
        var idx = ArrayUtils.matchAttributes(this.messageData, { 0: "sendSystemMessage" }, true, "==", true)[0];
        if (idx) {
            this.messageData.splice(idx, 1);
        }
        this.messageData.push(["changeBackgroundImage", imageURL, 0]);
    };
    GUI_ChatBox.prototype.scrollToLastMessage = function () {
        var _this = this;
        if (Config.EDIT_MODE || this.restoreMode) {
            this.dialogList.refresh();
            this.dialogList.vScrollValue = 100;
            return;
        }
        Callback.CallLaterBeforeRender(function () {
            if (GUI_ChatBox.tweenScroll) {
                Tween.clearAll(_this.dialogList);
                GUI_ChatBox.tweenScroll = null;
            }
            GUI_ChatBox.isScrolling = true;
            GUI_ChatBox.tweenScroll = Tween.to(_this.dialogList, { vScrollValue: 100 }, 200, null, Callback.New(function () {
                GUI_ChatBox.isScrolling = false;
            }, _this));
        }, this);
    };
    GUI_ChatBox.prototype.getSaveData = function () {
        return this.messageData;
    };
    GUI_ChatBox.prototype.restoreSaveData = function (messageData) {
        this.restoreMode = true;
        var lastSEVolume = GameAudio.seVolume;
        GameAudio.seVolume = 0;
        for (var i = 0; i < messageData.length; i++) {
            var params = messageData[i];
            var funcName = params.shift();
            if (this[funcName]) {
                this[funcName].apply(this, params);
            }
        }
        this.restoreMode = false;
        GameAudio.stopSE();
        GameAudio.seVolume = lastSEVolume;
    };
    GUI_ChatBox.prototype.addMessage = function (chatMsg) {
        var _this = this;
        var taskName = "addMessageTask";
        new SyncTask(taskName, function () {
            chatMsg.genUI(function () {
                var lastMessage = _this.messages.length == 0 ? null : _this.messages[_this.messages.length - 1];
                chatMsg.ui.y = !lastMessage ? 0 : lastMessage.ui.y + lastMessage.ui.height + 18;
                _this.messages.push(chatMsg);
                _this.dialogList.addChild(chatMsg.ui);
                _this.scrollToLastMessage();
                SyncTask.taskOver(taskName);
            });
        });
    };
    return GUI_ChatBox;
}(GUI_4));
var ChatMsg = (function () {
    function ChatMsg() {
    }
    ChatMsg.prototype.genUI = function (onFin) {
        if (this.ui) {
            onFin();
            return;
        }
        switch (this.mode) {
            case ChatMsg.MODE_TEXT:
                this.genTextUI(onFin);
                break;
            case ChatMsg.MODE_PICTURE:
                this.genImageUI(onFin);
                break;
            case ChatMsg.MODE_ANIMATION:
                this.genAnimationUI(onFin);
                break;
            case ChatMsg.MODE_VOICE:
                this.genVoiceUI(onFin);
                break;
            case ChatMsg.MODE_SYSTEM_MESSAGE:
                this.genSystemMessageUI(onFin);
                break;
            case ChatMsg.MODE_VIDEO:
                this.genVideoUI(onFin);
                break;
        }
    };
    ChatMsg.prototype.genTextUI = function (onFin) {
        var ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        ui.contentText.visible = true;
        ui.contentImage.dispose();
        ui.contentAnimation.dispose();
        ui.contentText.text = this.content;
        this.actorFaceInit(ui);
        var oriWidth = ui.background.width;
        var rightSpace = (oriWidth - ui.contentText.width - ui.contentText.x);
        ui.background.width = this.ui.contentText.x + ui.contentText.textWidth - ui.contentText.letterSpacing + rightSpace;
        if (!this.isLeft)
            ui.background.x += oriWidth - ui.background.width;
        ui.background.height = Math.max(ui.contentText.y * 2 + ui.contentText.textHeight - ui.contentText.leading, ui.face.height - ui.face.y - ui.background.y);
        ui.height = ui.background.height + ui.background.y;
        onFin();
    };
    ChatMsg.prototype.genImageUI = function (onFin) {
        var _this = this;
        var ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        ui.contentImage.visible = true;
        ui.contentText.dispose();
        ui.contentAnimation.dispose();
        this.actorFaceInit(ui);
        AssetManager.loadImage(this.content, Callback.New(function (tex) {
            if (!tex) {
                onFin();
                return;
            }
            ui.contentImage.image = _this.content;
            var oriWidth = ui.background.width;
            var rightSpace = (oriWidth - ui.contentImage.width - ui.contentImage.x);
            var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, tex.width, tex.height), new Rectangle(0, 0, ui.background.width - ui.contentImage.x * 2, tex.height));
            ui.contentImage.width = tex.width * per;
            ui.contentImage.height = tex.height * per;
            ui.background.width = ui.contentImage.x + rightSpace + ui.contentImage.width;
            if (!_this.isLeft)
                ui.background.x += oriWidth - ui.background.width;
            ui.background.height = Math.max(ui.contentImage.y * 2 + ui.contentImage.height, ui.face.height - ui.face.y - ui.background.y);
            ui.height = ui.background.height + ui.background.y;
            if (!Config.EDIT_MODE) {
                ui.on(EventObject.CLICK, _this, function (e) {
                    e.stopPropagation();
                    if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                        return;
                    }
                    if (GUI_ChatBox.isScrolling)
                        return;
                    var bigBmp = new UIBitmap;
                    bigBmp.image = _this.content;
                    bigBmp.width = ui.contentImage.width;
                    bigBmp.height = ui.contentImage.height;
                    var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, bigBmp.width, bigBmp.height), new Rectangle(0, 0, stage.width, stage.height));
                    var toW = bigBmp.width * per;
                    var toH = bigBmp.height * per;
                    var globalP = ui.contentImage.localToGlobal(new Point);
                    bigBmp.x = globalP.x;
                    bigBmp.y = globalP.y;
                    var toX = (stage.width - toW) / 2;
                    var toY = (stage.height - toH) / 2;
                    var bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                    bigBmpBgUI.alpha = 0;
                    stage.addChild(bigBmp);
                    var oldX = bigBmp.x;
                    var oldY = bigBmp.y;
                    var oldW = bigBmp.width;
                    var oldH = bigBmp.height;
                    Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                    Tween.to(bigBmp, { x: toX, y: toY, width: toW, height: toH }, 200, Ease.strongOut);
                    stage.once(EventObject.CLICK, _this, function (e) {
                        Tween.to(bigBmp, { x: oldX, y: oldY, width: oldW, height: oldH }, 200, Ease.strongOut);
                        Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(function () {
                            GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                            bigBmp.dispose();
                        }, _this));
                    });
                });
            }
            onFin();
        }, this), true, false);
    };
    ChatMsg.prototype.genAnimationUI = function (onFin) {
        var _this = this;
        var ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        var rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        ui.contentAnimation.visible = true;
        ui.contentText.dispose();
        ui.contentImage.dispose();
        ui.contentAnimation.animation.syncLoadWhenAssetExist = true;
        this.actorFaceInit(ui);
        AssetManager.preLoadAnimationAsset(this.content, Callback.New(function () {
            ui.contentAnimation.once(EventObject.LOADED, _this, function () {
                var r = ui.contentAnimation.getSelfBounds();
                var oriAniX = ui.contentImage.x;
                var oriAniY = ui.contentImage.y;
                var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, r.width, r.height), new Rectangle(0, 0, ui.background.width - oriAniX - rightSpace, r.height));
                ui.contentAnimation.scaleNumberX = per;
                ui.contentAnimation.scaleNumberY = per;
                ui.contentAnimation.x = oriAniX - r.x * per;
                ui.contentAnimation.y = oriAniY - r.y * per;
                var aniW = r.width * per;
                var aniH = r.height * per;
                var oldPer = per;
                var oriWidth = ui.background.width;
                ui.background.width = oriAniX + rightSpace + r.width * per;
                if (!_this.isLeft)
                    ui.background.x += oriWidth - ui.background.width;
                ui.background.height = Math.max(oriAniY * 2 + r.height * per, ui.face.height - ui.face.y - ui.background.y);
                ui.height = ui.background.height + ui.background.y;
                if (!Config.EDIT_MODE) {
                    ui.on(EventObject.CLICK, _this, function (e) {
                        e.stopPropagation();
                        if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                            return;
                        }
                        if (GUI_ChatBox.isScrolling)
                            return;
                        var bigBmp = new GCAnimation;
                        bigBmp.id = _this.content;
                        bigBmp.loop = true;
                        bigBmp.play();
                        bigBmp.currentFrame = ui.contentAnimation.animation.currentFrame;
                        bigBmp.scaleX = ui.contentAnimation.scaleNumberX;
                        bigBmp.scaleY = ui.contentAnimation.scaleNumberY;
                        var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, aniW, aniH), new Rectangle(0, 0, stage.width, stage.height));
                        var toW = aniW * per;
                        var toH = aniH * per;
                        var globalP = ui.contentAnimation.localToGlobal(new Point);
                        var toX = (stage.width - toW) / 2 - r.x * per;
                        var toY = (stage.height - toH) / 2 - r.y * per;
                        bigBmp.x = globalP.x;
                        bigBmp.y = globalP.y;
                        var bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                        bigBmpBgUI.alpha = 0;
                        stage.addChild(bigBmp);
                        var oldX = bigBmp.x;
                        var oldY = bigBmp.y;
                        Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                        Tween.to(bigBmp, { x: toX, y: toY, scaleX: per, scaleY: per }, 200, Ease.strongOut);
                        stage.once(EventObject.CLICK, _this, function (e) {
                            Tween.to(bigBmp, { x: oldX, y: oldY, scaleX: oldPer, scaleY: oldPer }, 200, Ease.strongOut);
                            Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(function () {
                                GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                                bigBmp.dispose();
                            }, _this));
                        });
                    });
                }
                onFin();
            });
            ui.contentAnimation.animationID = _this.content;
        }, this), true, true, true);
    };
    ChatMsg.prototype.genVoiceUI = function (onFin) {
        var _this = this;
        var ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        var rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        ui.contentImage.dispose();
        ui.contentText.visible = false;
        this.actorFaceInit(ui);
        if (Config.EDIT_MODE) {
            ui.contentAnimation.animation.syncLoadWhenAssetExist = true;
        }
        AssetManager.preLoadAnimationAsset(PLUGIN_ANIMATION_VOICE_ANIMATION, Callback.New(function () {
            ui.contentAnimation.once(EventObject.LOADED, _this, function () {
                var r = ui.contentAnimation.getSelfBounds();
                var oriAniX = ui.contentImage.x;
                var oriAniY = ui.contentImage.y;
                var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, r.width, r.height), new Rectangle(0, 0, ui.background.width - oriAniX + rightSpace, r.height));
                ui.contentAnimation.scaleNumberX = per;
                ui.contentAnimation.scaleNumberY = per;
                ui.contentAnimation.x = oriAniX - r.x * per;
                ui.contentAnimation.y = oriAniY - r.y * per;
                var oriWidth = ui.background.width;
                ui.background.width = oriAniX + rightSpace + r.width * per;
                if (!_this.isLeft)
                    ui.background.x += oriWidth - ui.background.width;
                ui.background.height = Math.max(oriAniY * 2 + r.height * per, ui.face.height - ui.face.y - ui.background.y);
                ui.height = ui.background.height + ui.background.y;
                if (!Config.EDIT_MODE) {
                    ui.background.on(EventObject.CLICK, _this, function (e) {
                        e.stopPropagation();
                        if (ChatMsg.tsSC) {
                            var contentAnimation = ChatMsg.tsMsg.ui.contentAnimation;
                            if (contentAnimation && !contentAnimation.isDisposed) {
                                contentAnimation.playType = 0;
                                contentAnimation.aniFrame = 1;
                            }
                            ChatMsg.tsSC.offAll();
                            ChatMsg.tsSC.stop();
                            ChatMsg.tsSC = null;
                            if (ChatMsg.tsMsg == _this) {
                                return;
                            }
                        }
                        ui.contentAnimation.playType = 2;
                        ChatMsg.tsSC = GameAudio.playTS(_this.content);
                        ChatMsg.tsMsg = _this;
                        if (ChatMsg.tsSC) {
                            ChatMsg.tsSC.on(EventObject.COMPLETE, _this, function () {
                                ChatMsg.tsSC = null;
                                ChatMsg.tsMsg = null;
                                if (!ui.contentAnimation.isDisposed) {
                                    ui.contentAnimation.playType = 0;
                                    ui.contentAnimation.aniFrame = 1;
                                }
                            });
                        }
                    });
                }
                AssetManager.loadAudio(_this.content, Callback.New(function (t) {
                    if (t && t.audioBuffer && t.audioBuffer.duration) {
                        ui.contentText.visible = true;
                        ui.contentText.text = Math.round(t.audioBuffer.duration) + "″";
                        ui.contentText.x = r.width * per + oriAniX + 5;
                        ui.contentText.y = r.height / 2 * per + oriAniY - ui.contentText.textHeight / 2 + 4;
                        ui.background.width += 10 + ui.contentText.textWidth;
                        if (!_this.isLeft)
                            ui.background.x -= 10 + ui.contentText.textWidth;
                    }
                    onFin();
                }, _this), true);
            });
            ui.contentAnimation.animationID = PLUGIN_ANIMATION_VOICE_ANIMATION;
        }, this), Config.EDIT_MODE);
        ui.contentAnimation.playType = 0;
        ui.contentAnimation.aniFrame = 1;
    };
    ChatMsg.prototype.genSystemMessageUI = function (onFin) {
        this.ui = new GUI_1009;
        this.ui.contentText.visible = true;
        this.ui.contentText.text = this.content;
        this.ui.background.height = this.ui.contentText.textHeight + this.ui.contentText.y * 2 - this.ui.contentText.leading;
        this.ui.height = this.ui.background.height;
        onFin();
    };
    ChatMsg.prototype.genVideoUI = function (onFin) {
        var _this = this;
        var ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        var oriX = ui.contentImage.x;
        var oriY = ui.contentImage.y;
        var rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        var videoWidth = ui.background.width - oriX - rightSpace;
        var videoHeight = videoWidth * 9 / 16;
        if (Config.EDIT_MODE) {
            ui.contentImage.visible = true;
            ui.contentImage.graphics.drawRect(0, 0, videoWidth, videoHeight, "#000000");
            ui.contentText.dispose();
            ui.contentAnimation.dispose();
            ui.background.height = Math.max(oriY * 2 + videoHeight, ui.face.height - ui.face.y - ui.background.y);
            ui.height = ui.background.height + ui.background.y;
            onFin();
            return;
        }
        var contentVideo = new UIVideo;
        contentVideo.videoURL = this.content;
        ui.background.addChild(contentVideo);
        ui.background.addChild(ui.contentImage);
        contentVideo.playType = 2;
        contentVideo.x = oriX;
        contentVideo.y = oriY;
        ui.contentImage.visible = false;
        ui.contentText.dispose();
        ui.contentAnimation.dispose();
        this.actorFaceInit(ui);
        contentVideo.width = videoWidth;
        contentVideo.height = videoHeight;
        AssetManager.loadImage("asset/image/picture/ui/menu/playBack.png", Callback.New(function (tex) {
            if (!tex)
                return;
            ui.contentImage.visible = true;
            ui.contentImage.width = tex.width;
            ui.contentImage.height = tex.height;
            ui.contentImage.x = contentVideo.x + (contentVideo.width - tex.width) / 2;
            ui.contentImage.y = contentVideo.y + (contentVideo.height - tex.height) / 2;
        }, this), true, false);
        ui.contentImage.image = "asset/image/picture/ui/menu/playBack.png";
        ui.background.height = Math.max(oriY * 2 + videoHeight, ui.face.height - ui.face.y - ui.background.y);
        ui.height = ui.background.height + ui.background.y;
        if (!Config.EDIT_MODE) {
            ui.on(EventObject.CLICK, this, function (e) {
                e.stopPropagation();
                if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                    return;
                }
                if (GUI_ChatBox.isScrolling)
                    return;
                var oldX = contentVideo.x;
                var oldY = contentVideo.y;
                var oldW = contentVideo.width;
                var oldH = contentVideo.height;
                var per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, contentVideo.width, contentVideo.height), new Rectangle(0, 0, stage.width, stage.height));
                var toW = contentVideo.width * per;
                var toH = contentVideo.height * per;
                var globalP = contentVideo.localToGlobal(new Point);
                contentVideo.x = globalP.x;
                contentVideo.y = globalP.y;
                var toX = (stage.width - toW) / 2;
                var toY = (stage.height - toH) / 2;
                var bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                bigBmpBgUI.alpha = 0;
                stage.addChild(contentVideo);
                contentVideo.playType = 0;
                Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                Tween.to(contentVideo, { x: toX, y: toY, width: toW, height: toH }, 200, Ease.strongOut);
                stage.once(EventObject.CLICK, _this, function (e) {
                    contentVideo.playType = 2;
                    contentVideo.currentTime = 0;
                    Tween.to(contentVideo, { x: globalP.x, y: globalP.y, width: oldW, height: oldH }, 200, Ease.strongOut);
                    Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(function () {
                        ui.background.addChild(contentVideo);
                        ui.background.addChild(ui.contentImage);
                        contentVideo.x = oldX;
                        contentVideo.y = oldY;
                        GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                    }, _this));
                });
            });
        }
        onFin();
    };
    ChatMsg.prototype.actorFaceInit = function (ui) {
        ui.speakerName.text = this.chatActor.name;
        ui.face.image = this.chatActor.face;
        ui.face.on(EventObject.CLICK, this, this.showActorInformation);
    };
    ChatMsg.prototype.showActorInformation = function (e) {
        if (Config.EDIT_MODE)
            return;
        e.stopPropagation();
        var infoUI = GameUI.show(PLUGIN_GUI_ACTOR_INFO);
        GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI).addChild(infoUI);
        var rightX = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI).background.width;
        infoUI.x = rightX;
        infoUI.face.image = this.chatActor.face;
        infoUI.nameLabel.text = this.chatActor.name;
        infoUI.infoLabel.text = this.chatActor.intro;
        Tween.to(infoUI, { x: 0 }, 300, Ease.strongOut);
        infoUI.backBtn.off(EventObject.CLICK, this, onBack);
        infoUI.backBtn.on(EventObject.CLICK, this, onBack);
        stage.off(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
        stage.on(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
        function onBack() {
            stage.off(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
            Tween.to(infoUI, { x: rightX }, 300, Ease.strongOut, Callback.New(function () {
                GameUI.hide(PLUGIN_GUI_ACTOR_INFO);
            }, this));
        }
    };
    ChatMsg.prototype.dispose = function () {
        this.ui.dispose();
    };
    ChatMsg.MODE_TEXT = 0;
    ChatMsg.MODE_PICTURE = 1;
    ChatMsg.MODE_ANIMATION = 2;
    ChatMsg.MODE_VOICE = 3;
    ChatMsg.MODE_VIDEO = 4;
    ChatMsg.MODE_SYSTEM_MESSAGE = 5;
    return ChatMsg;
}());
//# sourceMappingURL=GUI_ChatBox.js.map