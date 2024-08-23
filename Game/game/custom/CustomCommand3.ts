/**
 * 自定义事件命令
 * -- 消息
 * Created by 黑暗之神KDS on 2018-12-18 17:17:50.
 */
module CommandExecute {
    let chatTrigger: CommandTrigger;
    /**
     * 文本消息
     */
    export function customCommand_2001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2001): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.sendTextMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 文本消息-预编译
     */
    export function customCommandPrecompile_2001(commandPage: CommandPage, cmd: Command, index: number, p: CustomCommandParams_2001): void {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    /**
     * 图片消息
     */
    export function customCommand_2002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2002): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = cp.content;
        chatUI.sendImageMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 动画消息
     */
    export function customCommand_2003(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2003): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = cp.content;
        chatUI.sendAnimationMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 语音消息
     */
    export function customCommand_2004(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2004): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = cp.content;
        chatUI.sendVoiceMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 系统消息
     */
    export function customCommand_2005(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2005): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.sendSystemMessage(content);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 视频消息
     */
    export function customCommand_2006(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2006): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = cp.content;
        chatUI.sendVideoMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 系统消息-预编译
     */
    export function customCommandPrecompile_2005(commandPage: CommandPage, cmd: Command, index: number, p: CustomCommandParams_2001): void {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    /**
     * 清理消息
     */
    export function customCommand_2009(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2009): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        chatUI.clearMessages();
    }
    /**
     * 更换背景
     */
    export function customCommand_2010(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2010): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.changeBackgroundImage(content, cp.time * 1000);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, () => {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    /**
     * 文本消息-预编译
     */
    export function customCommandPrecompile_2010(commandPage: CommandPage, cmd: Command, index: number, p: CustomCommandParams_2010): void {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    /**
     * 更换标题
     */
    export function customCommand_2011(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_2011): void {
        let chatUI = GUI_ChatBox.self;
        if (!chatUI) return;
        let content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.title.text = content;
    }
    /**
     * 文本消息-预编译
     */
    export function customCommandPrecompile_2011(commandPage: CommandPage, cmd: Command, index: number, p: CustomCommandParams_2011): void {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.title);
    }
    //------------------------------------------------------------------------------------------------------
    //  存档/读档
    //------------------------------------------------------------------------------------------------------
    if (!Config.BEHAVIOR_EDIT_MODE) {
        let restoreChatTriggerInfo: { mainType: number, indexType: number, from: number }
        SinglePlayerGame.regSaveCustomData("cmdChatBoxMessage", Callback.New(() => {
            // 储存显示对象
            let chatBox = GUI_ChatBox.self;
            if (!chatBox) return null;
            let o = chatBox.getSaveData();
            return { chatbox: o, chatboxTitle: chatBox.title.text, chatTrigger: chatTrigger ? true : false, chatTriggerInfo: { mainType: chatTrigger?.mainType, indexType: chatTrigger?.indexType, from: chatTrigger?.from } };
        }, {}));
        /**
         * 监听读档恢复数据，恢复储存的自定义数据-图像相关事件
         */
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(() => {
            let o = SinglePlayerGame.getSaveCustomData("cmdChatBoxMessage");
            if (o) {
                restoreChatTriggerInfo = o.chatTrigger ? o.chatTriggerInfo : null;
            }
            let chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox;
            if (chatBox && o) {
                chatBox.restoreSaveData(o.chatbox);
                chatBox.title.text = o.chatboxTitle;
            }
            else if (!chatBox && o) {
                EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, (uiID: number) => {
                    if (uiID == PLUGIN_GUI_CHAT_MAIN_UI) {
                        // @ts-ignore
                        let onHappen = arguments.callee;
                        EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, onHappen, GameUI);
                        chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox;
                        chatBox.restoreSaveData(o.chatbox);
                        chatBox.title.text = o.chatboxTitle;
                        return;
                    }
                }, GameUI);
            }
        }, {}, null));
        EventUtils.addEventListenerFunction(SinglePlayerGame, SinglePlayerGame.EVENT_RECOVER_TRIGGER, (trigger: CommandTrigger) => {
            if (restoreChatTriggerInfo) {
                if (restoreChatTriggerInfo.mainType == trigger.mainType && restoreChatTriggerInfo.indexType == trigger.indexType && restoreChatTriggerInfo.from == trigger.from) {
                    let chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox;
                    if (chatBox) {
                        chatBox.dialogList.once(EventObject.CLICK, chatBox, () => {
                            CommandPage.executeEvent(trigger);
                        });
                    }
                    else {
                        EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, (uiID: number) => {
                            if (uiID == PLUGIN_GUI_CHAT_MAIN_UI) {
                                // @ts-ignore
                                let onHappen = arguments.callee;
                                EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, onHappen, GameUI);
                                chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI) as GUI_ChatBox;
                                chatBox.dialogList.once(EventObject.CLICK, chatBox, () => {
                                    CommandPage.executeEvent(trigger);
                                });
                                return;
                            }
                        }, GameUI);
                    }
                }
            }
        }, {});
    }
    //------------------------------------------------------------------------------------------------------
    //  预加载
    //------------------------------------------------------------------------------------------------------
    // 重写预加载事件页
    // 使用资源的自定义指令编号
    let PLUGIN_COMMAND_CHAT_MESSAGE_PICTURE: number = 2002;
    let PLUGIN_COMMAND_CHAT_MESSAGE_ANIMATION: number = 2003;
    let PLUGIN_COMMAND_CHAT_MESSAGE_BACKGROUND: number = 2010;
    // 缓存
    let preloadCommandPageInfo: { [cmdPageID: number]: { imageArr: string[], aniArr: number[], standAvatarArr: number[], uiArr: number[] } } = {};
    let oldPreLoadCommandPage = AssetManager.preLoadCommandPage;
    AssetManager.preLoadCommandPage = function (commandPage: CommandPage, complete: Callback = null, syncCallbackWhenAssetExist: boolean = false, autoDispose: boolean = false) {
        // 资源获取
        let imageArr = [];
        let aniArr = [];
        let standAvatarArr = [];
        let uiArr = [];
        // 记录
        preloadCommandPageInfo[commandPage.id] = {
            imageArr: imageArr,
            aniArr: aniArr,
            standAvatarArr: standAvatarArr,
            uiArr: uiArr
        };
        for (let i = 0; i < commandPage.commands.length; i++) {
            let cmd = commandPage.commands[i];
            if (cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_PICTURE || cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_BACKGROUND) {
                let cp: CustomCommandParams_2002 | CustomCommandParams_2010 = cmd.params[0];
                imageArr.push(cp.content);
            }
            else if (cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_ANIMATION) {
                let cp: CustomCommandParams_2003 = cmd.params[0];
                aniArr.push(cp.content);
            }
        }
        // 记录旧的参数
        let oldArgs = arguments;
        // 需要加载的
        let totalCount = 1 + aniArr.length + standAvatarArr.length + uiArr.length;
        let currentLoad = 0;
        function onLoadOver() {
            currentLoad++;
            if (totalCount == currentLoad) {
                oldPreLoadCommandPage.apply(this, oldArgs);
            }
        }
        let onLoadOverCB = Callback.New(onLoadOver, this);
        AssetManager.loadImages(imageArr, onLoadOverCB, true, true, true);
        for (let i = 0; i < aniArr.length; i++) {
            AssetManager.preLoadAnimationAsset(aniArr[i], onLoadOverCB, true, false, true);
        }
    }
    // 重写卸载事件页
    let oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage: CommandPage) {
        let cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            let imageCache = cache.imageArr, animationCache = cache.aniArr;
            AssetManager.disposeImages(imageCache);
            for (let s = 0; s < animationCache.length; s++)AssetManager.disposeAnimationAsset(animationCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    }
}