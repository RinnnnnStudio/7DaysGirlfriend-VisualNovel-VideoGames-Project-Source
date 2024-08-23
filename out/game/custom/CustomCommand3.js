(function (CommandExecute) {
    var chatTrigger;
    function customCommand_2001(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.sendTextMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2001 = customCommand_2001;
    function customCommandPrecompile_2001(commandPage, cmd, index, p) {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    CommandExecute.customCommandPrecompile_2001 = customCommandPrecompile_2001;
    function customCommand_2002(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = cp.content;
        chatUI.sendImageMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2002 = customCommand_2002;
    function customCommand_2003(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = cp.content;
        chatUI.sendAnimationMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2003 = customCommand_2003;
    function customCommand_2004(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = cp.content;
        chatUI.sendVoiceMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2004 = customCommand_2004;
    function customCommand_2005(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.sendSystemMessage(content);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2005 = customCommand_2005;
    function customCommand_2006(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = cp.content;
        chatUI.sendVideoMessage(cp.actor, content, cp.mode == 0);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2006 = customCommand_2006;
    function customCommandPrecompile_2005(commandPage, cmd, index, p) {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    CommandExecute.customCommandPrecompile_2005 = customCommandPrecompile_2005;
    function customCommand_2009(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        chatUI.clearMessages();
    }
    CommandExecute.customCommand_2009 = customCommand_2009;
    function customCommand_2010(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.changeBackgroundImage(content, cp.time * 1000);
        if (cp.continueByClick) {
            chatTrigger = trigger;
            trigger.pause = true;
            trigger.offset(1);
            chatUI.dialogList.once(EventObject.CLICK, this, function () {
                CommandPage.executeEvent(trigger);
            });
        }
    }
    CommandExecute.customCommand_2010 = customCommand_2010;
    function customCommandPrecompile_2010(commandPage, cmd, index, p) {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.content);
    }
    CommandExecute.customCommandPrecompile_2010 = customCommandPrecompile_2010;
    function customCommand_2011(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var chatUI = GUI_ChatBox.self;
        if (!chatUI)
            return;
        var content = Variable.margeDynamicText(cmd.paramsCompiled[0], triggerPlayer, trigger);
        chatUI.title.text = content;
    }
    CommandExecute.customCommand_2011 = customCommand_2011;
    function customCommandPrecompile_2011(commandPage, cmd, index, p) {
        cmd.paramsCompiled = [];
        cmd.paramsCompiled[0] = Variable.splitDynamicText(p.title);
    }
    CommandExecute.customCommandPrecompile_2011 = customCommandPrecompile_2011;
    if (!Config.BEHAVIOR_EDIT_MODE) {
        var restoreChatTriggerInfo_1;
        SinglePlayerGame.regSaveCustomData("cmdChatBoxMessage", Callback.New(function () {
            var chatBox = GUI_ChatBox.self;
            if (!chatBox)
                return null;
            var o = chatBox.getSaveData();
            return { chatbox: o, chatboxTitle: chatBox.title.text, chatTrigger: chatTrigger ? true : false, chatTriggerInfo: { mainType: chatTrigger === null || chatTrigger === void 0 ? void 0 : chatTrigger.mainType, indexType: chatTrigger === null || chatTrigger === void 0 ? void 0 : chatTrigger.indexType, from: chatTrigger === null || chatTrigger === void 0 ? void 0 : chatTrigger.from } };
        }, {}));
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(function () {
            var o = SinglePlayerGame.getSaveCustomData("cmdChatBoxMessage");
            if (o) {
                restoreChatTriggerInfo_1 = o.chatTrigger ? o.chatTriggerInfo : null;
            }
            var chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI);
            if (chatBox && o) {
                chatBox.restoreSaveData(o.chatbox);
                chatBox.title.text = o.chatboxTitle;
            }
            else if (!chatBox && o) {
                EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, function (uiID) {
                    if (uiID == PLUGIN_GUI_CHAT_MAIN_UI) {
                        var onHappen = arguments.callee;
                        EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, onHappen, GameUI);
                        chatBox = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI);
                        chatBox.restoreSaveData(o.chatbox);
                        chatBox.title.text = o.chatboxTitle;
                        return;
                    }
                }, GameUI);
            }
        }, {}, null));
        EventUtils.addEventListenerFunction(SinglePlayerGame, SinglePlayerGame.EVENT_RECOVER_TRIGGER, function (trigger) {
            if (restoreChatTriggerInfo_1) {
                if (restoreChatTriggerInfo_1.mainType == trigger.mainType && restoreChatTriggerInfo_1.indexType == trigger.indexType && restoreChatTriggerInfo_1.from == trigger.from) {
                    var chatBox_1 = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI);
                    if (chatBox_1) {
                        chatBox_1.dialogList.once(EventObject.CLICK, chatBox_1, function () {
                            CommandPage.executeEvent(trigger);
                        });
                    }
                    else {
                        EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, function (uiID) {
                            if (uiID == PLUGIN_GUI_CHAT_MAIN_UI) {
                                var onHappen = arguments.callee;
                                EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, onHappen, GameUI);
                                chatBox_1 = GameUI.get(PLUGIN_GUI_CHAT_MAIN_UI);
                                chatBox_1.dialogList.once(EventObject.CLICK, chatBox_1, function () {
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
    var PLUGIN_COMMAND_CHAT_MESSAGE_PICTURE = 2002;
    var PLUGIN_COMMAND_CHAT_MESSAGE_ANIMATION = 2003;
    var PLUGIN_COMMAND_CHAT_MESSAGE_BACKGROUND = 2010;
    var preloadCommandPageInfo = {};
    var oldPreLoadCommandPage = AssetManager.preLoadCommandPage;
    AssetManager.preLoadCommandPage = function (commandPage, complete, syncCallbackWhenAssetExist, autoDispose) {
        if (complete === void 0) { complete = null; }
        if (syncCallbackWhenAssetExist === void 0) { syncCallbackWhenAssetExist = false; }
        if (autoDispose === void 0) { autoDispose = false; }
        var imageArr = [];
        var aniArr = [];
        var standAvatarArr = [];
        var uiArr = [];
        preloadCommandPageInfo[commandPage.id] = {
            imageArr: imageArr,
            aniArr: aniArr,
            standAvatarArr: standAvatarArr,
            uiArr: uiArr
        };
        for (var i = 0; i < commandPage.commands.length; i++) {
            var cmd = commandPage.commands[i];
            if (cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_PICTURE || cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_BACKGROUND) {
                var cp = cmd.params[0];
                imageArr.push(cp.content);
            }
            else if (cmd.customID == PLUGIN_COMMAND_CHAT_MESSAGE_ANIMATION) {
                var cp = cmd.params[0];
                aniArr.push(cp.content);
            }
        }
        var oldArgs = arguments;
        var totalCount = 1 + aniArr.length + standAvatarArr.length + uiArr.length;
        var currentLoad = 0;
        function onLoadOver() {
            currentLoad++;
            if (totalCount == currentLoad) {
                oldPreLoadCommandPage.apply(this, oldArgs);
            }
        }
        var onLoadOverCB = Callback.New(onLoadOver, this);
        AssetManager.loadImages(imageArr, onLoadOverCB, true, true, true);
        for (var i = 0; i < aniArr.length; i++) {
            AssetManager.preLoadAnimationAsset(aniArr[i], onLoadOverCB, true, false, true);
        }
    };
    var oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage) {
        var cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            var imageCache = cache.imageArr, animationCache = cache.aniArr;
            AssetManager.disposeImages(imageCache);
            for (var s = 0; s < animationCache.length; s++)
                AssetManager.disposeAnimationAsset(animationCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    };
})(CommandExecute || (CommandExecute = {}));
//# sourceMappingURL=CustomCommand3.js.map