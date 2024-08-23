/**
 * 聊天对话界面
 * Created by 黑暗之神KDS on 2023-05-02 21:23:40.
 */
let PLUGIN_MODULE_TYPE_CHAT_ACTOR: number = 2;
let PLUGIN_ANIMATION_VOICE_ANIMATION: number = 3;
let PLUGIN_GUI_CHAT_MAIN_UI: number = 4;
let PLUGIN_GUI_CHAT_1: number = 1007;
let PLUGIN_GUI_CHAT_2: number = 1008;
let PLUGIN_GUI_CHAT_3: number = 1009;
let PLUGIN_GUI_ACTOR_INFO: number = 1010;
let PLUGIN_GUI_PICTURE_SHOWALL: number = 1011;
class GUI_ChatBox extends GUI_4 {
    /**
     * 单例
     */
    static self: GUI_ChatBox;
    /**
     * 显示的信息
     */
    messages: ChatMsg[] = [];
    private messageData: any[] = [];
    private static tweenScroll: Tween;
    static isScrolling: boolean;
    /**
     * 恢复档案模式
     */
    private restoreMode: boolean;
    /**
     * 构造函数
     */
    constructor() {
        super();
        GUI_ChatBox.self = this;
        if (!Config.EDIT_MODE) {
            this.scrollRect = new Rectangle(0, 0, this.background.width, this.background.height);
        }
    }
    //------------------------------------------------------------------------------------------------------
    // 发送消息
    //------------------------------------------------------------------------------------------------------
    /**
     * 发送文本消息
     * @param chatActorID 角色编号
     * @param msg 文本消息
     * @param isLeft[可选] 默认值=true 
     */
    sendTextMessage(chatActorID: number, msg: string, isLeft: boolean = true): void {
        let chatActor: Module_ChatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face) return;
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_TEXT;
        chatMsg.content = msg;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendTextMessage", chatActorID, msg, isLeft]);
    }
    /**
     * 发送图片消息
     * @param chatActorID 角色编号
     * @param image 图片地址
     * @param isLeft[可选] 默认值=true 
     */
    sendImageMessage(chatActorID: number, image: string, isLeft: boolean = true): void {
        let chatActor: Module_ChatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face) return;
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_PICTURE;
        chatMsg.content = image;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendImageMessage", chatActorID, image, isLeft]);
    }
    /**
     * 发送动画消息
     * @param chatActorID 角色编号
     * @param animationID 动画编号
     * @param isLeft[可选] 默认值=true 
     */
    sendAnimationMessage(chatActorID: number, animationID: number, isLeft: boolean = true): void {
        let chatActor: Module_ChatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face) return;
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_ANIMATION;
        chatMsg.content = animationID;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendAnimationMessage", chatActorID, animationID, isLeft]);
    }
    /**
     * 发送语音消息
     * @param chatActorID 角色编号
     * @param tsURL 语音相对路径
     * @param isLeft[可选] 默认值=true 
     */
    sendVoiceMessage(chatActorID: number, tsURL: string, isLeft: boolean = true): void {
        let chatActor: Module_ChatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face) return;
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_VOICE;
        chatMsg.content = tsURL;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendVoiceMessage", chatActorID, tsURL, isLeft]);
    }
    /**
     * 发送视频消息
     * @param chatActorID 角色编号
     * @param videoURL 视频相对路径
     * @param isLeft[可选] 默认值=true 
     */
    sendVideoMessage(chatActorID: number, videoURL: string, isLeft: boolean = true): void {
        let chatActor: Module_ChatActor = GameData.getModuleData(PLUGIN_MODULE_TYPE_CHAT_ACTOR, chatActorID);
        if (!chatActor || !chatActor.face) return;
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_VIDEO;
        chatMsg.content = videoURL;
        chatMsg.isLeft = isLeft;
        chatMsg.chatActor = chatActor;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendVideoMessage", chatActorID, videoURL, isLeft]);
    }
    /**
     * 发送系统消息
     * @param msg 消息
     */
    sendSystemMessage(msg: string): void {
        let chatMsg = new ChatMsg;
        chatMsg.mode = ChatMsg.MODE_SYSTEM_MESSAGE;
        chatMsg.content = msg;
        this.addMessage(chatMsg);
        // 记录数据
        this.messageData.push(["sendSystemMessage", msg]);
    }
    /**
     * 清理消息
     */
    clearMessages(): void {
        const taskName = "addMessageTask";
        new SyncTask(taskName, () => {
            for (let i = 0; i < this.messages.length; i++) {
                this.messages[i].dispose();
            }
            this.messages.length = 0;
            this.messageData.length = 0;
            this.dialogList.refresh();
            SyncTask.taskOver(taskName);
        });
    }
    //------------------------------------------------------------------------------------------------------
    //  更换背景
    //------------------------------------------------------------------------------------------------------
    /**
     * 更换背景
     * @param imageURL 图片背景
     * @param time[可选] 默认值=300 
     */
    changeBackgroundImage(imageURL: string, time: number = 300): void {
        const taskName = "changeBackgroundImageTask";
        new SyncTask(taskName, () => {
            let oriAlpha = this.background.alpha;
            AssetManager.loadImage(imageURL, Callback.New((tex: Texture) => {
                if (time == 0) {
                    this.background.image = imageURL;
                    SyncTask.taskOver(taskName);
                    return;
                }
                Tween.to(this.background, { alpha: 0 }, time, null, Callback.New(() => {
                    this.background.image = imageURL;
                    Tween.to(this.background, { alpha: oriAlpha }, time, null, Callback.New(() => {
                        SyncTask.taskOver(taskName);
                    }, this));
                }, this));
            }, this), true, false);
        });
        // 记录数据
        let idx = ArrayUtils.matchAttributes(this.messageData, { 0: "sendSystemMessage" }, true, "==", true)[0];
        if (idx) {
            this.messageData.splice(idx, 1);
        }
        this.messageData.push(["changeBackgroundImage", imageURL, 0]);
    }
    //------------------------------------------------------------------------------------------------------
    //  显示效果
    //------------------------------------------------------------------------------------------------------
    /**
     * 滚动到最后一条消息的效果
     */
    scrollToLastMessage(): void {
        if (Config.EDIT_MODE || this.restoreMode) {
            this.dialogList.refresh();
            this.dialogList.vScrollValue = 100;
            return;
        }
        Callback.CallLaterBeforeRender(() => {
            if (GUI_ChatBox.tweenScroll) {
                Tween.clearAll(this.dialogList);
                GUI_ChatBox.tweenScroll = null;
            }
            GUI_ChatBox.isScrolling = true;
            GUI_ChatBox.tweenScroll = Tween.to(this.dialogList, { vScrollValue: 100 }, 200, null, Callback.New(() => {
                GUI_ChatBox.isScrolling = false;
            }, this));
        }, this);
    }
    //------------------------------------------------------------------------------------------------------
    //  存档/读档
    //------------------------------------------------------------------------------------------------------
    getSaveData(): any[][] {
        return this.messageData;
    }
    restoreSaveData(messageData: any[][]): void {
        this.restoreMode = true;
        let lastSEVolume = GameAudio.seVolume;
        GameAudio.seVolume = 0;
        for (let i = 0; i < messageData.length; i++) {
            let params = messageData[i];
            let funcName = params.shift();
            if (this[funcName]) {
                this[funcName].apply(this, params);
            }
        }
        this.restoreMode = false;
        GameAudio.stopSE();
        GameAudio.seVolume = lastSEVolume;
    }
    //------------------------------------------------------------------------------------------------------
    //  私有实现
    //------------------------------------------------------------------------------------------------------
    /**
     * 新增消息
     * @param chatMsg 消息对象
     */
    private addMessage(chatMsg: ChatMsg) {
        const taskName = "addMessageTask";
        new SyncTask(taskName, () => {
            chatMsg.genUI(() => {
                let lastMessage = this.messages.length == 0 ? null : this.messages[this.messages.length - 1];
                chatMsg.ui.y = !lastMessage ? 0 : lastMessage.ui.y + lastMessage.ui.height + 18;
                this.messages.push(chatMsg);
                this.dialogList.addChild(chatMsg.ui);
                this.scrollToLastMessage();
                SyncTask.taskOver(taskName);
            });
        });
    }
}
class ChatMsg {
    /**
     * 模式：文本信息
     */
    static MODE_TEXT: number = 0;
    /**
     * 模式：图片
     */
    static MODE_PICTURE: number = 1;
    /**
     * 模式：动画
     */
    static MODE_ANIMATION: number = 2;
    /**
     * 模式：语音
     */
    static MODE_VOICE: number = 3;
    /**
     * 模式：视频
     */
    static MODE_VIDEO: number = 4;
    /**
     * 模式：系统消息
     */
    static MODE_SYSTEM_MESSAGE: number = 5;
    /**
     * 语音通道
     */
    private static tsSC: SoundChannel;
    private static tsMsg: ChatMsg;
    /**
     * 模式 对应ChatMsg.MODE_XXXXX
     */
    mode: number;
    /**
     * 角色ID
     */
    chatActor: Module_ChatActor;
    /**
     * 是否位于左边
     */
    isLeft: boolean;
    /**
     * 消息内容
     */
    content: string | number;
    /**
     * 显示对象
     */
    ui: GUI_1007 | GUI_1008 | GUI_1009;
    /**
     * 生成显示对象
     */
    genUI(onFin: Function): void {
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
    }
    /**
     * 生成文本对话
     */
    private genTextUI(onFin: Function): void {
        let ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        ui.contentText.visible = true;
        ui.contentImage.dispose();
        ui.contentAnimation.dispose();
        ui.contentText.text = this.content as string;
        this.actorFaceInit(ui);
        // 计算对话框宽度（右边方向则需要x坐标偏移）
        let oriWidth = ui.background.width;
        let rightSpace = (oriWidth - ui.contentText.width - ui.contentText.x);
        ui.background.width = this.ui.contentText.x + ui.contentText.textWidth - ui.contentText.letterSpacing + rightSpace;
        if (!this.isLeft) ui.background.x += oriWidth - ui.background.width;
        // 计算对话框高度
        ui.background.height = Math.max(ui.contentText.y * 2 + ui.contentText.textHeight - ui.contentText.leading, ui.face.height - ui.face.y - ui.background.y);
        // 设置此条对话高度
        ui.height = ui.background.height + ui.background.y;
        onFin();
    }
    /**
     * 生成图片对话
     */
    private genImageUI(onFin: Function): void {
        let ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        ui.contentImage.visible = true;
        ui.contentText.dispose();
        ui.contentAnimation.dispose();
        this.actorFaceInit(ui);
        // 加载图片
        AssetManager.loadImage(this.content as string, Callback.New((tex: Texture) => {
            if (!tex) {
                onFin();
                return;
            }
            ui.contentImage.image = this.content as string;
            let oriWidth = ui.background.width;
            let rightSpace = (oriWidth - ui.contentImage.width - ui.contentImage.x);
            // 限制最大宽高不能超过对话框
            let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, tex.width, tex.height), new Rectangle(0, 0, ui.background.width - ui.contentImage.x * 2, tex.height))
            ui.contentImage.width = tex.width * per;
            ui.contentImage.height = tex.height * per;
            // 计算对话框宽度
            ui.background.width = ui.contentImage.x + rightSpace + ui.contentImage.width;
            if (!this.isLeft) ui.background.x += oriWidth - ui.background.width;
            // 计算对话框高度
            ui.background.height = Math.max(ui.contentImage.y * 2 + ui.contentImage.height, ui.face.height - ui.face.y - ui.background.y);
            // 设置此条对话高度
            ui.height = ui.background.height + ui.background.y;
            // 点击后放大查看
            if (!Config.EDIT_MODE) {
                ui.on(EventObject.CLICK, this, (e: EventObject) => {
                    e.stopPropagation();
                    if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                        return;
                    }
                    if (GUI_ChatBox.isScrolling) return;
                    // 点击放大/缩小效果
                    let bigBmp = new UIBitmap;
                    bigBmp.image = this.content as string;
                    bigBmp.width = ui.contentImage.width;
                    bigBmp.height = ui.contentImage.height;
                    let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, bigBmp.width, bigBmp.height), new Rectangle(0, 0, stage.width, stage.height));
                    let toW = bigBmp.width * per;
                    let toH = bigBmp.height * per;
                    let globalP = ui.contentImage.localToGlobal(new Point);
                    bigBmp.x = globalP.x;
                    bigBmp.y = globalP.y;
                    let toX = (stage.width - toW) / 2;
                    let toY = (stage.height - toH) / 2;
                    let bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                    bigBmpBgUI.alpha = 0;
                    stage.addChild(bigBmp);
                    let oldX = bigBmp.x;
                    let oldY = bigBmp.y;
                    let oldW = bigBmp.width;
                    let oldH = bigBmp.height;
                    Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                    Tween.to(bigBmp, { x: toX, y: toY, width: toW, height: toH }, 200, Ease.strongOut);
                    stage.once(EventObject.CLICK, this, (e: EventObject) => {
                        Tween.to(bigBmp, { x: oldX, y: oldY, width: oldW, height: oldH }, 200, Ease.strongOut);
                        Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(() => {
                            GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                            bigBmp.dispose();
                        }, this));
                    });
                })
            }
            onFin();
        }, this), true, false);
    }
    /**
     * 生成动画对话
     */
    private genAnimationUI(onFin: Function): void {
        let ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        let rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        ui.contentAnimation.visible = true;
        ui.contentText.dispose();
        ui.contentImage.dispose();
        ui.contentAnimation.animation.syncLoadWhenAssetExist = true;
        this.actorFaceInit(ui);
        // 加载动画
        AssetManager.preLoadAnimationAsset(this.content as number, Callback.New(() => {
            ui.contentAnimation.once(EventObject.LOADED, this, () => {
                let r = ui.contentAnimation.getSelfBounds();
                let oriAniX = ui.contentImage.x;
                let oriAniY = ui.contentImage.y;
                // 限制最大宽高不能超过对话框（参考图片）
                let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, r.width, r.height), new Rectangle(0, 0, ui.background.width - oriAniX - rightSpace, r.height))
                ui.contentAnimation.scaleNumberX = per;
                ui.contentAnimation.scaleNumberY = per;
                ui.contentAnimation.x = oriAniX - r.x * per;
                ui.contentAnimation.y = oriAniY - r.y * per;
                let aniW = r.width * per;
                let aniH = r.height * per;
                let oldPer = per;
                // 计算对话框宽度
                let oriWidth = ui.background.width;
                ui.background.width = oriAniX + rightSpace + r.width * per;
                if (!this.isLeft) ui.background.x += oriWidth - ui.background.width;
                // 计算对话框高度
                ui.background.height = Math.max(oriAniY * 2 + r.height * per, ui.face.height - ui.face.y - ui.background.y);
                // 设置此条对话高度
                ui.height = ui.background.height + ui.background.y;
                // 点击后放大查看
                if (!Config.EDIT_MODE) {
                    ui.on(EventObject.CLICK, this, (e: EventObject) => {
                        e.stopPropagation();
                        if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                            return;
                        }
                        if (GUI_ChatBox.isScrolling) return;
                        // 点击放大/缩小效果
                        let bigBmp = new GCAnimation;
                        bigBmp.id = this.content as number;
                        bigBmp.loop = true;
                        bigBmp.play();
                        bigBmp.currentFrame = ui.contentAnimation.animation.currentFrame;
                        bigBmp.scaleX = ui.contentAnimation.scaleNumberX;
                        bigBmp.scaleY = ui.contentAnimation.scaleNumberY;
                        let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, aniW, aniH), new Rectangle(0, 0, stage.width, stage.height));
                        let toW = aniW * per;
                        let toH = aniH * per;
                        let globalP = ui.contentAnimation.localToGlobal(new Point);
                        let toX = (stage.width - toW) / 2 - r.x * per;
                        let toY = (stage.height - toH) / 2 - r.y * per;
                        bigBmp.x = globalP.x;
                        bigBmp.y = globalP.y;
                        let bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                        bigBmpBgUI.alpha = 0;
                        stage.addChild(bigBmp);
                        let oldX = bigBmp.x;
                        let oldY = bigBmp.y;
                        Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                        Tween.to(bigBmp, { x: toX, y: toY, scaleX: per, scaleY: per }, 200, Ease.strongOut);
                        stage.once(EventObject.CLICK, this, (e: EventObject) => {
                            Tween.to(bigBmp, { x: oldX, y: oldY, scaleX: oldPer, scaleY: oldPer }, 200, Ease.strongOut);
                            Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(() => {
                                GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                                bigBmp.dispose();
                            }, this));
                        });
                    })
                }
                onFin();
            })
            ui.contentAnimation.animationID = this.content as number;
        }, this), true, true, true);
    }
    /**
     * 生成语音对话
     */
    private genVoiceUI(onFin: Function): void {
        let ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        let rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        ui.contentImage.dispose();
        // ui.contentText.dispose();
        ui.contentText.visible = false;
        // ui.contentAnimation.dispose();
        this.actorFaceInit(ui);
        if (Config.EDIT_MODE) {
            ui.contentAnimation.animation.syncLoadWhenAssetExist = true;
        }
        // 加载语音动画标志
        AssetManager.preLoadAnimationAsset(PLUGIN_ANIMATION_VOICE_ANIMATION, Callback.New(() => {
            ui.contentAnimation.once(EventObject.LOADED, this, () => {
                let r = ui.contentAnimation.getSelfBounds();
                let oriAniX = ui.contentImage.x;
                let oriAniY = ui.contentImage.y;
                // 限制最大宽高不能超过对话框
                let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, r.width, r.height), new Rectangle(0, 0, ui.background.width - oriAniX + rightSpace, r.height))
                ui.contentAnimation.scaleNumberX = per;
                ui.contentAnimation.scaleNumberY = per;
                ui.contentAnimation.x = oriAniX - r.x * per;
                ui.contentAnimation.y = oriAniY - r.y * per;
                // 计算对话框宽度
                let oriWidth = ui.background.width;
                ui.background.width = oriAniX + rightSpace + r.width * per;
                if (!this.isLeft) ui.background.x += oriWidth - ui.background.width;
                // 计算对话框高度
                ui.background.height = Math.max(oriAniY * 2 + r.height * per, ui.face.height - ui.face.y - ui.background.y);
                // 设置此条对话高度
                ui.height = ui.background.height + ui.background.y;
                // 核心逻辑：点击后播放音效
                if (!Config.EDIT_MODE) {
                    ui.background.on(EventObject.CLICK, this, (e: EventObject) => {
                        e.stopPropagation();
                        // -- 已播放中的情况则停止
                        if (ChatMsg.tsSC) {
                            let contentAnimation = (ChatMsg.tsMsg.ui as GUI_1007).contentAnimation
                            if (contentAnimation && !contentAnimation.isDisposed) {
                                contentAnimation.playType = 0;
                                contentAnimation.aniFrame = 1;
                            }
                            ChatMsg.tsSC.offAll();
                            ChatMsg.tsSC.stop();
                            ChatMsg.tsSC = null;
                            if (ChatMsg.tsMsg == this) {
                                return;
                            }
                        }
                        // -- 播放
                        ui.contentAnimation.playType = 2;
                        ChatMsg.tsSC = GameAudio.playTS(this.content as string);
                        ChatMsg.tsMsg = this;
                        if (ChatMsg.tsSC) {
                            ChatMsg.tsSC.on(EventObject.COMPLETE, this, () => {
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
                // 语音预加载
                AssetManager.loadAudio(this.content as string, Callback.New((t) => {
                    if (t && t.audioBuffer && t.audioBuffer.duration) {
                        ui.contentText.visible = true;
                        ui.contentText.text = Math.round(t.audioBuffer.duration) + "″";
                        ui.contentText.x = r.width * per + oriAniX + 5;
                        ui.contentText.y = r.height / 2 * per + oriAniY - ui.contentText.textHeight / 2 + 4;
                        ui.background.width += 10 + ui.contentText.textWidth;
                        if (!this.isLeft) ui.background.x -= 10 + ui.contentText.textWidth;
                    }
                    onFin();
                }, this), true);
            });
            ui.contentAnimation.animationID = PLUGIN_ANIMATION_VOICE_ANIMATION;
        }, this), Config.EDIT_MODE);
        ui.contentAnimation.playType = 0;
        ui.contentAnimation.aniFrame = 1;
    }
    /**
     * 生成系统消息
     */
    private genSystemMessageUI(onFin: Function): void {
        this.ui = new GUI_1009;
        this.ui.contentText.visible = true;
        this.ui.contentText.text = this.content as string;
        this.ui.background.height = this.ui.contentText.textHeight + this.ui.contentText.y * 2 - this.ui.contentText.leading;
        this.ui.height = this.ui.background.height;
        onFin();
    }
    /**
     * 生成视频对话
     */
    private genVideoUI(onFin: Function): void {
        let ui = this.ui = new (this.isLeft ? GUI_1007 : GUI_1008);
        let oriX = ui.contentImage.x;
        let oriY = ui.contentImage.y;
        let rightSpace = (ui.background.width - ui.contentImage.width - ui.contentImage.x);
        let videoWidth = ui.background.width - oriX - rightSpace;
        let videoHeight = videoWidth * 9 / 16;
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
        let contentVideo = new UIVideo;
        contentVideo.videoURL = this.content as string;
        ui.background.addChild(contentVideo);
        ui.background.addChild(ui.contentImage);
        contentVideo.playType = 2;
        contentVideo.x = oriX;
        contentVideo.y = oriY;
        ui.contentImage.visible = false;
        ui.contentText.dispose();
        ui.contentAnimation.dispose();
        this.actorFaceInit(ui);
        // 限制最大宽高不能超过对话框

        contentVideo.width = videoWidth;
        contentVideo.height = videoHeight;
        AssetManager.loadImage(`asset/image/picture/ui/menu/playBack.png`, Callback.New((tex: Texture) => {
            if (!tex) return;
            ui.contentImage.visible = true;
            ui.contentImage.width = tex.width;
            ui.contentImage.height = tex.height;
            ui.contentImage.x = contentVideo.x + (contentVideo.width - tex.width) / 2;
            ui.contentImage.y = contentVideo.y + (contentVideo.height - tex.height) / 2;
        }, this), true, false);
        ui.contentImage.image = "asset/image/picture/ui/menu/playBack.png";
        // 计算对话框高度
        ui.background.height = Math.max(oriY * 2 + videoHeight, ui.face.height - ui.face.y - ui.background.y);
        // 设置此条对话高度
        ui.height = ui.background.height + ui.background.y;
        // 点击后放大查看
        if (!Config.EDIT_MODE) {
            ui.on(EventObject.CLICK, this, (e: EventObject) => {
                e.stopPropagation();
                if (GameUI.isOpened(PLUGIN_GUI_PICTURE_SHOWALL)) {
                    return;
                }
                if (GUI_ChatBox.isScrolling) return;
                let oldX = contentVideo.x;
                let oldY = contentVideo.y;
                let oldW = contentVideo.width;
                let oldH = contentVideo.height;
                // 点击放大/缩小效果
                let per = GameUtils.getAutoFitSizePre(new Rectangle(0, 0, contentVideo.width, contentVideo.height), new Rectangle(0, 0, stage.width, stage.height));
                let toW = contentVideo.width * per;
                let toH = contentVideo.height * per;
                let globalP = contentVideo.localToGlobal(new Point);
                contentVideo.x = globalP.x;
                contentVideo.y = globalP.y;
                let toX = (stage.width - toW) / 2;
                let toY = (stage.height - toH) / 2;
                let bigBmpBgUI = GameUI.show(PLUGIN_GUI_PICTURE_SHOWALL);
                bigBmpBgUI.alpha = 0;
                stage.addChild(contentVideo);
                contentVideo.playType = 0;
                Tween.to(bigBmpBgUI, { alpha: 1 }, 200, Ease.strongOut);
                Tween.to(contentVideo, { x: toX, y: toY, width: toW, height: toH }, 200, Ease.strongOut);
                stage.once(EventObject.CLICK, this, (e: EventObject) => {
                    contentVideo.playType = 2;
                    contentVideo.currentTime = 0;
                    Tween.to(contentVideo, { x: globalP.x, y: globalP.y, width: oldW, height: oldH }, 200, Ease.strongOut);
                    Tween.to(bigBmpBgUI, { alpha: 0 }, 200, Ease.strongOut, Callback.New(() => {
                        ui.background.addChild(contentVideo);
                        ui.background.addChild(ui.contentImage);
                        contentVideo.x = oldX;
                        contentVideo.y = oldY;
                        GameUI.hide(PLUGIN_GUI_PICTURE_SHOWALL);
                    }, this));
                });
            })
        }
        onFin();
    }
    /**
     * 角色头像绑定详细信息界面
     */
    private actorFaceInit(ui: { face: UIBitmap, speakerName: UIString }): void {
        ui.speakerName.text = this.chatActor.name;
        ui.face.image = this.chatActor.face;
        ui.face.on(EventObject.CLICK, this, this.showActorInformation);
    }
    /**
     * 查看信息
     */
    private showActorInformation(e: EventObject) {
        if (Config.EDIT_MODE) return;
        e.stopPropagation();
        let infoUI: GUI_1010 = GameUI.show(PLUGIN_GUI_ACTOR_INFO) as GUI_1010;
        (GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox).addChild(infoUI);
        let rightX = (GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox).background.width;
        infoUI.x = rightX;
        infoUI.face.image = this.chatActor.face;
        infoUI.nameLabel.text = this.chatActor.name;
        infoUI.infoLabel.text = this.chatActor.intro;
        // 出场效果
        Tween.to(infoUI, { x: 0 }, 300, Ease.strongOut);
        infoUI.backBtn.off(EventObject.CLICK, this, onBack);
        infoUI.backBtn.on(EventObject.CLICK, this, onBack);
        stage.off(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
        stage.on(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
        function onBack() {
            stage.off(EventObject.RIGHT_MOUSE_DOWN, this, onBack);
            Tween.to(infoUI, { x: rightX }, 300, Ease.strongOut, Callback.New(() => {
                GameUI.hide(PLUGIN_GUI_ACTOR_INFO);
            }, this));
        }
    }
    /**
     * 释放
     */
    dispose(): void {
        this.ui.dispose();
    }
}