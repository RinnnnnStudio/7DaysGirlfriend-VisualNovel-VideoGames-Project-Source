EventUtils.addEventListener(UIBase, UIBase.EVENT_COMPONENT_CONSTRUCTOR_INIT, Callback.New(uiComponentInit, this, [false]));
function uiComponentInit(isRoot, uiComp) {
    var hasMouseEvent = false;
    var hasCommandName = isRoot ? "hasRootCommand" : "hasCommand";
    var allEvents = [
        EventObject.CLICK,
        EventObject.MOUSE_OVER,
        EventObject.MOUSE_OUT,
        EventObject.DISPLAY,
        EventObject.UNDISPLAY,
        EventObject.MOUSE_DOWN,
        EventObject.MOUSE_UP,
        EventObject.DOUBLE_CLICK,
        EventObject.MOUSE_MOVE,
        EventObject.RIGHT_MOUSE_DOWN,
        EventObject.RIGHT_MOUSE_UP,
        EventObject.RIGHT_CLICK
    ];
    for (var i = 0; i < 12; i++) {
        var hasCommand = uiComp[hasCommandName][i];
        if (hasCommand) {
            if (i != 3 && i != 4) {
                hasMouseEvent = true;
            }
            if (i == 1)
                continue;
            var evType = allEvents[i];
            uiComp.on(evType, uiComp, function (uiComp, i) {
                if (i == 3 && !uiComp.visible)
                    return;
                else if (i == 4 && !uiComp.visible)
                    return;
                var commandInputMessage;
                if (uiComp.commandInputMessage instanceof Callback) {
                    commandInputMessage = uiComp.commandInputMessage.run();
                }
                else {
                    commandInputMessage = uiComp.commandInputMessage;
                }
                GameCommand.startUICommand(uiComp, i, commandInputMessage);
            }, [uiComp, i]);
        }
    }
    if (hasMouseEvent) {
        var p = uiComp;
        while (p) {
            p.mouseEnabled = true;
            if (p == uiComp.guiRoot) {
                break;
            }
            p = p.parent;
        }
    }
    if (uiComp instanceof UIButton || uiComp[hasCommandName][1]) {
        uiComp.on(EventObject.MOUSE_OVER, uiComp, function (uiComp) {
            if (uiComp[hasCommandName][1]) {
                var commandInputMessage = void 0;
                if (uiComp.commandInputMessage instanceof Callback) {
                    commandInputMessage = uiComp.commandInputMessage.run();
                }
                else {
                    commandInputMessage = uiComp.commandInputMessage;
                }
                GameCommand.startUICommand(uiComp, 1, commandInputMessage);
            }
        }, [uiComp]);
    }
    if (uiComp[hasCommandName][3] || uiComp[hasCommandName][4]) {
        uiComp.on(UIBase.ON_VISIBLE_CHANGE, uiComp, function () {
            var commandInputMessage;
            if (uiComp.commandInputMessage instanceof Callback) {
                commandInputMessage = uiComp.commandInputMessage.run();
            }
            else {
                commandInputMessage = uiComp.commandInputMessage;
            }
            if (uiComp[hasCommandName][3] && uiComp.visible) {
                GameCommand.startUICommand(uiComp, 3, commandInputMessage);
            }
            else if (uiComp[hasCommandName][4] && !uiComp.visible) {
                GameCommand.startUICommand(uiComp, 4, commandInputMessage);
            }
        });
    }
}
EventUtils.addEventListener(GameUI, GameUI.EVENT_CREATE_UI, Callback.New(function (ui) {
    uiComponentInit.apply(ui, [true, ui]);
}, this));
var isPlayTS = false;
var ___dialogFromSaveFileData = false;
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_BEFORE_RECOVERY_DIALOG, Callback.New(function (isOption, content, options, name, head, expression, audioURL, speed) {
    ___dialogFromSaveFileData = true;
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_START, Callback.New(function (isOption, content, options, name, head, expression, audioURL, speed) {
    isPlayTS = audioURL ? true : false;
    if (!isOption && !___dialogFromSaveFileData) {
        var d = new DataStructure_dialogRecordInfo();
        d.tsURL = audioURL;
        d.dialogName = name;
        d.dialogContent = StringUtils.clearHtmlTag(content).replace(/\[p\d+\]|\[\.=\]|\[\.s\]/g, "");
        WorldData.dialogRecords.push(d);
    }
    ___dialogFromSaveFileData = false;
    GameCommand.startCommonCommand(14012);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_CLOSE, Callback.New(function (gameDialog) {
    GameCommand.startCommonCommand(14013);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_WORD_PLAY, Callback.New(function () {
    GameCommand.startCommonCommand(14014);
    if (ClientWorld.data.dialogSE)
        GameAudio.playSE(ClientWorld.data.dialogSE);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_DIALOG_WORD_PLAY_COMPLETE, Callback.New(function () {
    GameCommand.startCommonCommand(14015);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_TS_PLAY_COMPLETE, Callback.New(function () {
    GameCommand.startCommonCommand(14016);
}, this));
EventUtils.addEventListener(GameDialog, GameDialog.EVENT_WAIT_PALYER_OPERATION, Callback.New(function (state) {
    GameCommand.startCommonCommand(state == 0 ? 14017 : 14018);
}, this));
var ___lastSetOption = GameDialog.prototype["setOption"];
GameDialog.prototype["setOption"] = function (options, defaultIndex, cancelIndex) {
    if (defaultIndex === void 0) { defaultIndex = -1; }
    if (cancelIndex === void 0) { cancelIndex = -1; }
    ___lastSetOption.apply(this, arguments);
    var optionList = this.optionList;
    if (optionList) {
        optionList.overSelectMode = true;
    }
};
function ___listSEPlay(state) {
    if (state == 0 && WorldData.selectSE) {
        GameAudio.playSE(WorldData.selectSE);
    }
}
var ___dialogShowDialog = GameDialog["showDialog"];
GameDialog["showDialog"] = function (dialogID, head, name, speed, comicSceneObjectIndex, msg, submitCallback, audio, exp, nameColor, changeData, dialogMaterialEnabled) {
    if (submitCallback === void 0) { submitCallback = null; }
    if (dialogMaterialEnabled === void 0) { dialogMaterialEnabled = true; }
    return ___dialogShowDialog.apply(this, [dialogID, head, name, speed, comicSceneObjectIndex, msg, submitCallback, audio, exp, nameColor, changeData, dialogMaterialEnabled]);
};
var ___dialogShowOption = GameDialog["showOption"];
GameDialog["showOption"] = function (dialogID, options, isShowOptionWithLastDialog, defaultIndex, cancelIndex, hideIndexs) {
    if (isShowOptionWithLastDialog === void 0) { isShowOptionWithLastDialog = false; }
    if (defaultIndex === void 0) { defaultIndex = -1; }
    if (cancelIndex === void 0) { cancelIndex = -1; }
    if (hideIndexs === void 0) { hideIndexs = []; }
    GameCommand.startCommonCommand(14019);
    return ___dialogShowOption.apply(this, arguments);
};
//# sourceMappingURL=UIExtend.js.map