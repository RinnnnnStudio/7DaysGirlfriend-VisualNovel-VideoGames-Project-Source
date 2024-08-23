(function (CommandExecute) {
    function customCommand_3010(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
        }
        var toDpX, toDpY, toDpScaleX, toDpScaleY;
        if (cp.posUseVar) {
            toDpX = Game.player.variable.getVariable(cp.dpXVar);
            toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            toDpX = cp.dpX;
            toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            toDpScaleX = cp.dpScaleX;
            toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        var a = GameUI.load(uiID, cp.showType == 1);
        a.useDPCoordScaleMode = true;
        GameImageLayer.setImageSprite(passageID, a);
        if (cp.showType == 1) {
            Game.layer.imageLayer.addChild(a);
            a.dpDisplayPriority = passageID;
            a.useDPCoord = true;
            if (cp.setAttr) {
                a.dpX = toDpX;
                a.dpY = toDpY;
                a.dpZ = toDpZ;
                a.dpScaleX = toDpScaleX;
                a.dpScaleY = toDpScaleY;
                a.rotation1 = toRotation;
                a.opacity = toOpacity;
            }
            a.dpCoordToRealCoord();
        }
        else {
            GameUI.show(uiID);
            if (cp.setAttr) {
                a.x = toDpX;
                a.y = toDpY;
                a.scaleX = toDpScaleX;
                a.scaleY = toDpScaleY;
                a.rotation1 = toRotation;
                a.opacity = toOpacity;
            }
        }
    }
    CommandExecute.customCommand_3010 = customCommand_3010;
    function customCommand_3011(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
        }
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof GUI_BASE))
            return;
        var sign = "gcUIMove";
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        var toDpX, toDpY, toDpScaleX, toDpScaleY;
        if (cp.posUseVar) {
            toDpX = Game.player.variable.getVariable(cp.dpXVar);
            toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            toDpX = cp.dpX;
            toDpY = cp.dpY;
        }
        var toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            toDpScaleX = cp.dpScaleX;
            toDpScaleY = cp.dpScaleY;
        }
        var toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        var toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        if (cp.timeType == 0) {
            if (cp.showType == 1) {
                a.dpX = toDpX;
                a.dpY = toDpY;
                a.dpZ = toDpZ;
                a.dpScaleX = toDpScaleX;
                a.dpScaleY = toDpScaleY;
                a.dpCoordToRealCoord();
            }
            else {
                a.x = toDpX;
                a.y = toDpY;
                a.scaleX = toDpScaleX;
                a.scaleY = toDpScaleY;
            }
            a.rotation1 = toRotation;
            a.opacity = toOpacity;
        }
        else {
            var cX = void 0, cY = void 0, cScaleX = void 0, cScaleY = void 0;
            if (cp.showType == 1) {
                cX = a.dpX;
                cY = a.dpY;
                cScaleX = a.dpScaleX;
                cScaleY = a.dpScaleY;
            }
            else {
                cX = a.x;
                cY = a.y;
                cScaleX = a.scaleX;
                cScaleY = a.scaleY;
            }
            var m = {
                time: cp.time,
                curTime: 1,
                x: cX,
                y: cY,
                z: a.dpZ,
                scaleX: cScaleX,
                scaleY: cScaleY,
                rotation: a.rotation1,
                opacity: a.opacity,
                x2: toDpX - cX,
                y2: toDpY - cY,
                z2: toDpZ - a.dpZ,
                scaleX2: toDpScaleX - cScaleX,
                scaleY2: toDpScaleY - cScaleY,
                rotation2: toRotation - a.rotation1,
                opacity2: toOpacity - a.opacity,
                transData: GameUtils.getTransData(cp.trans)
            };
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUIMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            gcUIMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    CommandExecute.customCommand_3011 = customCommand_3011;
    function customCommand_3012(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        var uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        else {
            passageID = 1000000 + uiID;
            GameUI.hide(uiID);
        }
    }
    CommandExecute.customCommand_3012 = customCommand_3012;
    function customCommand_3013(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        if (!cp.changeUIAttr || !Array.isArray(cp.changeUIAttr))
            return;
        var cmdParam = cp.changeUIAttr[1];
        if (!cmdParam)
            return;
        var atts = cmdParam[2];
        if (!atts || !atts.uiID)
            return;
        var uiID = atts.uiID;
        var passageID = 1000000 + uiID;
        var a = GameImageLayer.getImageSprite(passageID);
        if (!a || !(a instanceof GUI_BASE))
            return;
        var sign = "gcUICompMove" + ObjectUtils.getRandID();
        if (cmdParam[5] == 0) {
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var attValue = attsValues[attName];
                        if (attName == "materialData") {
                            refreshCompMaterials.apply({}, [attValue, uiComp]);
                        }
                        else {
                            if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                                if (useVarAndTransitionAttrs[attName].type == 0) {
                                    attValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                                }
                                else if (useVarAndTransitionAttrs[attName].type == 1) {
                                    attValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                                }
                                else if (useVarAndTransitionAttrs[attName].type == 2) {
                                    attValue = Game.player.variable.getSwitch(useVarAndTransitionAttrs[attName].index) ? true : false;
                                }
                            }
                            uiComp[attName] = attValue;
                        }
                    }
                }
            }
        }
        else {
            var m = {
                time: cmdParam[0],
                curTime: 1,
                transData: GameUtils.getTransData(cmdParam[1]),
                attrInfos: []
            };
            var comps = GameUI.getAllCompChildren(a, true);
            for (var compID in atts.atts) {
                var uiComp = comps.keyValue[compID];
                if (uiComp) {
                    var attsValues = atts.atts[compID][1];
                    var useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (var attName in attsValues) {
                        var oldValue = uiComp[attName];
                        var needTween = typeof oldValue == "number";
                        if (attName == "materialData")
                            needTween = true;
                        var useVarAndTransition = useVarAndTransitionAttrs[attName];
                        if (useVarAndTransition) {
                            if (!useVarAndTransition.change) {
                                needTween = false;
                            }
                        }
                        var newValue = attsValues[attName];
                        if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                            if (useVarAndTransitionAttrs[attName].type == 0) {
                                newValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 1) {
                                newValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                            }
                            else if (useVarAndTransitionAttrs[attName].type == 2) {
                                newValue = Game.player.variable.getSwitch(useVarAndTransitionAttrs[attName].index) ? true : false;
                            }
                        }
                        var attrInfo = { uiComp: uiComp, uiCompID: uiComp.id, attName: attName, oldValue: oldValue, needTween: needTween, newValue: newValue };
                        m.attrInfos.push(attrInfo);
                    }
                }
            }
            var thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUICompMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cmdParam[3]], sign);
            gcUICompMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cmdParam[3]]);
        }
    }
    CommandExecute.customCommand_3013 = customCommand_3013;
    function customCommand_3017(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        Game.player.toScene(cp.scene);
    }
    CommandExecute.customCommand_3017 = customCommand_3017;
    var isWaitingUICloseInfos = [];
    var extSaveSign = "waitCloseUIListener";
    function customCommand_3020(commandPage, cmd, trigger, triggerPlayer, playerInput, p) {
        var uiID = p.useVar == 1 ? Game.player.variable.getVariable(p.uiVar) : p.uiID;
        if (GameUI.isOpened(uiID)) {
            trigger.pause = true;
            trigger.offset(1);
            listenerWhenUIClose(uiID, trigger);
        }
    }
    CommandExecute.customCommand_3020 = customCommand_3020;
    SinglePlayerGame.regSaveCustomData(extSaveSign, Callback.New(function () {
        return isWaitingUICloseInfos;
    }, null));
    EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_RECOVER_TRIGGER, Callback.New(function (trigger) {
        var listers = SinglePlayerGame.getSaveCustomData(extSaveSign);
        var lister = ArrayUtils.matchAttributes(listers, { triggerMainType: trigger.mainType, triggerIndexType: trigger.indexType, triggerFrom: trigger.from }, true)[0];
        if (lister) {
            listenerWhenUIClose(lister.uiID, trigger);
        }
    }, null));
    function listenerWhenUIClose(uiID, trigger) {
        var _this = this;
        var t = { uiID: uiID, triggerMainType: trigger.mainType, triggerIndexType: trigger.indexType, triggerFrom: trigger.from };
        isWaitingUICloseInfos.push(t);
        EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, function (closeUIID) {
            if (closeUIID == uiID) {
                ArrayUtils.remove(isWaitingUICloseInfos, t);
                EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, arguments.callee, _this);
                CommandPage.executeEvent(trigger, []);
            }
        }, this);
    }
    function customCommand_5001(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var bgmURL = cp.advanceSetting && cp.bgmUseVar ? Game.player.variable.getString(cp.bgmVarID) : cp.bgm;
        var volume = 1;
        var pitch = 1;
        if (bgmURL) {
            var bgmURLArr = bgmURL.split(",");
            if (bgmURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(bgmURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(bgmURLArr[2]) / 100);
            }
        }
        var fadeIn = MathUtils.int(cp.advanceSetting && cp.fadeInTimeUseVar ? Game.player.variable.getVariable(cp.fadeInTimeVarID) : cp.fadeInTime);
        GameAudio.playBGM(bgmURL, volume, 99999, fadeIn != 0, fadeIn * 1000, pitch);
    }
    CommandExecute.customCommand_5001 = customCommand_5001;
    function customCommand_5002(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var fadeOut = MathUtils.int(cp.fadeOutTimeUseVar ? Game.player.variable.getVariable(cp.fadeOutTimeVarID) : cp.fadeOutTime);
        GameAudio.stopBGM(fadeOut != 0, fadeOut * 1000);
    }
    CommandExecute.customCommand_5002 = customCommand_5002;
    function customCommand_5003(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var bgsURL = cp.advanceSetting && cp.bgsUseVar ? Game.player.variable.getString(cp.bgsVarID) : cp.bgs;
        var volume = 1;
        var pitch = 1;
        if (bgsURL) {
            var bgsURLArr = bgsURL.split(",");
            if (bgsURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(bgsURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(bgsURLArr[2]) / 100);
            }
        }
        var fadeIn = MathUtils.int(cp.advanceSetting && cp.fadeInTimeUseVar ? Game.player.variable.getVariable(cp.fadeInTimeVarID) : cp.fadeInTime);
        GameAudio.playBGS(bgsURL, volume, 99999, fadeIn != 0, fadeIn * 1000, pitch);
    }
    CommandExecute.customCommand_5003 = customCommand_5003;
    function customCommand_5004(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var fadeOut = MathUtils.int(cp.fadeOutTimeUseVar ? Game.player.variable.getVariable(cp.fadeOutTimeVarID) : cp.fadeOutTime);
        GameAudio.stopBGS(fadeOut != 0, fadeOut * 1000);
    }
    CommandExecute.customCommand_5004 = customCommand_5004;
    function customCommand_5005(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var seURL;
        if (cp.systemSE) {
            switch (cp.systemSEType) {
                case 0:
                    seURL = WorldData.selectSE;
                    break;
                case 1:
                    seURL = WorldData.sureSE;
                    break;
                case 2:
                    seURL = WorldData.cancelSE;
                    break;
                case 3:
                    seURL = WorldData.disalbeSE;
                    break;
                default:
                    return;
            }
            GameAudio.playSE(seURL);
        }
        else {
            seURL = (cp.seUseVar ? Game.player.variable.getString(cp.seVarID) : cp.se);
            var volume = 1;
            var pitch = 1;
            if (seURL) {
                var seURLArr = seURL.split(",");
                if (seURLArr.length == 3) {
                    volume = MathUtils.float(parseFloat(seURLArr[1]) / 100);
                    pitch = MathUtils.float(parseFloat(seURLArr[2]) / 100);
                }
            }
            GameAudio.playSE(seURL, volume, pitch);
        }
    }
    CommandExecute.customCommand_5005 = customCommand_5005;
    function customCommand_5006(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        GameAudio.stopSE();
    }
    CommandExecute.customCommand_5006 = customCommand_5006;
    function customCommand_5007(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        var soc = null;
        var tsURL = cp.tsUseVar ? Game.player.variable.getString(cp.tsVarID) : cp.ts;
        var volume = 1;
        var pitch = 1;
        if (tsURL) {
            var tsURLArr = tsURL.split(",");
            if (tsURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(tsURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(tsURLArr[2]) / 100);
            }
        }
        GameAudio.playTS(tsURL, volume, pitch, soc);
    }
    CommandExecute.customCommand_5007 = customCommand_5007;
    function customCommand_5008(commandPage, cmd, trigger, triggerPlayer, playerInput, cp) {
        GameAudio.stopTS();
    }
    CommandExecute.customCommand_5008 = customCommand_5008;
    function gcUIMoveFrameUpdate(a, m, passageID, sign) {
        if (!a || a.isDisposed) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            return;
        }
        var per = m.curTime / m.time;
        var value = GameUtils.getValueByTransData(m.transData, per);
        if (a.useDPCoord) {
            a.dpX = m.x2 * value + m.x;
            a.dpY = m.y2 * value + m.y;
            a.dpZ = m.z2 * value + m.z;
            a.dpScaleX = m.scaleX2 * value + m.scaleX;
            a.dpScaleY = m.scaleY2 * value + m.scaleY;
            a.dpCoordToRealCoord();
        }
        else {
            a.x = m.x2 * value + m.x;
            a.y = m.y2 * value + m.y;
            a.scaleX = m.scaleX2 * value + m.scaleX;
            a.scaleY = m.scaleY2 * value + m.scaleY;
        }
        a.rotation1 = m.rotation2 * value + m.rotation;
        a.opacity = m.opacity2 * value + m.opacity;
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    CommandExecute.gcUIMoveFrameUpdate = gcUIMoveFrameUpdate;
    function gcUICompMoveFrameUpdate(a, m, passageID, sign, nonTweenType) {
        var per = m.curTime / m.time;
        for (var i = 0; i < m.attrInfos.length; i++) {
            var attrInfo = m.attrInfos[i];
            if (!attrInfo.needTween) {
                if ((nonTweenType == 0 && m.curTime == 1) || (nonTweenType == 1 && per == 1)) {
                    if (attrInfo.attName == "materialData") {
                        refreshCompMaterials.apply({}, [attrInfo.newValue, attrInfo.uiComp]);
                    }
                    else {
                        attrInfo.uiComp[attrInfo.attName] = attrInfo.newValue;
                    }
                }
            }
            else {
                var valuePer = GameUtils.getValueByTransData(m.transData, per);
                if (attrInfo.attName == "materialData") {
                    var materials = refreshCompMaterialsTrans.apply({}, [attrInfo.newValue, attrInfo.oldValue, valuePer, nonTweenType, m.curTime]);
                    refreshCompMaterials.apply({}, [materials, attrInfo.uiComp]);
                }
                else {
                    attrInfo.uiComp[attrInfo.attName] = (attrInfo.newValue - attrInfo.oldValue) * valuePer + attrInfo.oldValue;
                }
            }
        }
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    CommandExecute.gcUICompMoveFrameUpdate = gcUICompMoveFrameUpdate;
    var useOnceUIInfos = {};
    EventUtils.addEventListener(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, Callback.New(function (uiID) {
        var passageID = 1000000 + uiID;
        var ui = GameUI.get(uiID);
        if (!ui)
            return;
        var useOnceUIInfo = useOnceUIInfos[uiID];
        if (useOnceUIInfo) {
            for (var i in useOnceUIInfo) {
                if (i == "uiCompInfo")
                    continue;
                ui[i] = useOnceUIInfo[i];
            }
            var childs = GameUI.getAllCompChildren(ui, true, function (uiComp) {
                if (uiComp instanceof UIList) {
                    return false;
                }
            }).keyValue;
            for (var uiCompID in useOnceUIInfo.uiCompInfo) {
                var uiComp = childs[uiCompID];
                if (!uiComp)
                    continue;
                var uiCompInfo = useOnceUIInfo.uiCompInfo[uiCompID];
                for (var varName in uiCompInfo) {
                    uiComp[varName] = uiCompInfo[varName];
                }
            }
            delete useOnceUIInfos[uiID];
        }
        GameImageLayer.setImageSprite(passageID, ui);
    }, null));
    EventUtils.addEventListener(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, Callback.New(function (uiID) {
        var passageID = 1000000 + uiID;
    }, null));
    if (!Config.BEHAVIOR_EDIT_MODE) {
        SinglePlayerGame.regSaveCustomData("cmdImagerLayer", Callback.New(function () {
            var imageSpriteInfos = {};
            for (var passageIDStr in GameImageLayer.imageSprites) {
                var disobjectInfo = GameImageLayer.imageSprites[passageIDStr];
                var sp = disobjectInfo.displayObject;
                var displayObjectAttrs = {};
                var materialData = sp.getAllMaterialDatas();
                displayObjectAttrs["___materialData"] = materialData;
                var saveAttrs = void 0;
                if (sp instanceof GUI_BASE) {
                    if (!sp.stage)
                        continue;
                    if (sp.useDPCoord) {
                        saveAttrs = ["useDPCoord", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "blendMode"];
                    }
                    else {
                        saveAttrs = ["useDPCoord", "x", "y", "scaleX", "scaleY", "rotation1", "rotation2", "opacity", "blendMode"];
                        displayObjectAttrs["___childIndex"] = Game.layer.uiLayer.getChildIndex(sp);
                    }
                    for (var i in saveAttrs) {
                        var attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["guiID"] = sp.guiID;
                    imageSpriteInfos[passageIDStr] = {
                        type: "GUI_BASE",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                else {
                    continue;
                }
            }
            var passageFrameUpdateDatas = {};
            var passageFrameUpdates = GameImageLayer.getPassageFrameUpdates();
            for (var passageIDStr in passageFrameUpdates) {
                var pArr = passageFrameUpdates[passageIDStr];
                if (pArr) {
                    var pDataArr = passageFrameUpdateDatas[passageIDStr] = [];
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var args = p.args.concat();
                        args.shift();
                        if (p.sign.indexOf("gcUICompMove") != -1) {
                            var m = args[0];
                            var newM = {
                                time: m.time,
                                curTime: m.curTime,
                                transData: m.transData,
                                attrInfos: []
                            };
                            for (var k = 0; k < m.attrInfos.length; k++) {
                                var oldAttrInfo = m.attrInfos[k];
                                var oldComp = oldAttrInfo.uiComp;
                                oldAttrInfo.uiComp = null;
                                newM.attrInfos[k] = ObjectUtils.depthClone(oldAttrInfo);
                                oldAttrInfo.uiComp = oldComp;
                            }
                            args[0] = newM;
                        }
                        pDataArr.push({ sign: p.sign, args: args });
                    }
                }
            }
            var allSystemGroupUIs = GameUI.getAllSystemGroupUIs();
            var saveDataUseOnceUIInfo = {};
            var BASE_ATTRS_OBJ = { x: true, y: true, width: true, height: true, rotation: true, show: true, opacity: true, mouseEventEnabledData: true };
            var _loop_1 = function (o) {
                var uiID = parseInt(o);
                var ui = allSystemGroupUIs[o];
                if (!ui)
                    return "continue";
                var uiPosData = {
                    x: ui.x, y: ui.y, scaleX: ui.scaleX, scaleY: ui.scaleX, rotation1: ui.rotation1, rotation2: ui.rotation2, opacity: ui.opacity,
                    uiCompInfo: {}
                };
                saveDataUseOnceUIInfo[uiID] = uiPosData;
                var allComps = GameUI.getAllCompChildren(ui, false).arr;
                allComps.forEach(function (comp) {
                    if (comp instanceof UIBase) {
                        var uiCompAtts = uiPosData.uiCompInfo[comp.id] = {};
                        for (var b in BASE_ATTRS_OBJ) {
                            uiCompAtts[b] = comp[b];
                        }
                        var __compCustomAttributes = GameUI["__compCustomAttributes"];
                        if (__compCustomAttributes) {
                            var customAttrs = __compCustomAttributes[comp.className];
                            for (var c in customAttrs) {
                                var b = customAttrs[c];
                                uiCompAtts[b] = comp[b];
                            }
                        }
                    }
                });
            };
            for (var o in allSystemGroupUIs) {
                _loop_1(o);
            }
            var imageLayer = Game.layer.imageLayer;
            var cameraInfo = {
                x: imageLayer.camera.viewPort.x,
                y: imageLayer.camera.viewPort.y,
                z: imageLayer.camera.z,
                rotation: imageLayer.camera.rotation
            };
            var imageLayerMaterialData = Game.layer.imageLayer.getAllMaterialDatas();
            var uiLayerMaterialData = Game.layer.uiLayer.getAllMaterialDatas();
            var screenMaterialData = Game.layer.getAllMaterialDatas();
            var sceneLayerMaterialData = Game.layer.sceneLayer.getAllMaterialDatas();
            return { cameraInfo: cameraInfo, imageSpriteInfos: imageSpriteInfos, passageFrameUpdateDatas: passageFrameUpdateDatas, saveDataUseOnceUIInfo: saveDataUseOnceUIInfo, imageLayerMaterialData: imageLayerMaterialData, uiLayerMaterialData: uiLayerMaterialData, screenMaterialData: screenMaterialData, sceneLayerMaterialData: sceneLayerMaterialData };
        }, {}));
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(function () {
            GameDialog.stop();
            for (var pi in GameImageLayer.imageSprites) {
                var passageID = parseInt(pi);
                var sp = GameImageLayer.getImageSprite(passageID);
                if (sp instanceof GUI_BASE && (sp.guiID == 1 || sp.guiID == 2 || sp.guiID == 2003)) {
                }
                else {
                    GameImageLayer.deletePassage(passageID);
                    if (sp instanceof GUI_BASE) {
                        if (sp == GameUI.get(sp.guiID)) {
                            GameUI.dispose(sp.guiID);
                        }
                    }
                }
            }
            Game.layer.imageLayer.clearMaterials();
            function installMaterialData(sp, materialData) {
                if (!materialData || materialData.length == 0)
                    return;
                sp.installMaterialData(materialData, false);
            }
            var o = SinglePlayerGame.getSaveCustomData("cmdImagerLayer");
            if (!o)
                return;
            useOnceUIInfos = o.saveDataUseOnceUIInfo;
            var imageSpriteInfos = o.imageSpriteInfos;
            for (var passageIDStr in imageSpriteInfos) {
                var passageID = MathUtils.int(passageIDStr);
                var imageSpriteInfo = imageSpriteInfos[passageIDStr];
                if (imageSpriteInfo.type == "GUI_BASE") {
                    var uiID = imageSpriteInfo.displayObjectAttrs["guiID"];
                    var useDPCoord = imageSpriteInfo.displayObjectAttrs["useDPCoord"];
                    var d = GameUI.load(uiID, useDPCoord);
                    GameImageLayer.setImageSprite(passageID, d);
                    d.useDPCoordScaleMode = true;
                    if (useDPCoord) {
                        Game.layer.imageLayer.addChild(d);
                        d.dpDisplayPriority = passageID;
                    }
                    else {
                        d.dpDisplayPriority = imageSpriteInfo.displayObjectAttrs["___childIndex"];
                        GameUI.show(uiID);
                    }
                    for (var i in imageSpriteInfo.displayObjectAttrs) {
                        d[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(d, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
            }
            var uiChilds = [];
            var uiChildLength = Game.layer.uiLayer.numChildren;
            for (var s = 0; s < uiChildLength; s++) {
                uiChilds.push(Game.layer.uiLayer.getChildAt(s));
            }
            uiChilds.sort(function (a, b) {
                return a.dpDisplayPriority < b.dpDisplayPriority ? -1 : 1;
            });
            for (var j = 0; j < uiChildLength; j++) {
                Game.layer.uiLayer.setChildIndex(uiChilds[j], j);
            }
            var imageLayer = Game.layer.imageLayer;
            imageLayer.camera.viewPort.x = o.cameraInfo.x;
            imageLayer.camera.viewPort.y = o.cameraInfo.y;
            imageLayer.camera.z = o.cameraInfo.z;
            imageLayer.camera.rotation = o.cameraInfo.rotation;
            Game.layer.imageLayer.updateFrame(true);
            var passageFrameUpdateDatas = o.passageFrameUpdateDatas;
            for (var passageIDStr in passageFrameUpdateDatas) {
                var passageID = MathUtils.int(passageIDStr);
                var pArr = passageFrameUpdateDatas[passageIDStr];
                if (pArr) {
                    for (var s = 0; s < pArr.length; s++) {
                        var p = pArr[s];
                        var thisPtr = {};
                        if (p.sign == "gcUIMove") {
                            var ui = GameImageLayer.getImageSprite(passageID);
                            if (!ui || !(ui instanceof GUI_BASE))
                                continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUIMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                        else if (p.sign.indexOf("gcUICompMove") != -1) {
                            var ui = GameImageLayer.getImageSprite(passageID);
                            if (!ui || !(ui instanceof GUI_BASE))
                                continue;
                            var m = p.args[0];
                            var uiComps = GameUI.getAllCompChildren(ui, true);
                            for (var k = 0; k < m.attrInfos.length; k++) {
                                var attrInfo = m.attrInfos[k];
                                attrInfo.uiComp = uiComps.keyValue[attrInfo.uiCompID];
                                if (!attrInfo.uiComp) {
                                    m.attrInfos.splice(k, 1);
                                    k--;
                                }
                            }
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUICompMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                    }
                }
            }
            installMaterialData(Game.layer.imageLayer, o.imageLayerMaterialData);
            if (o.uiLayerMaterialData)
                installMaterialData(Game.layer.uiLayer, o.uiLayerMaterialData);
            if (o.screenMaterialData)
                installMaterialData(Game.layer, o.screenMaterialData);
            if (o.sceneLayerMaterialData)
                installMaterialData(Game.layer.sceneLayer, o.sceneLayerMaterialData);
        }, {}, null));
    }
    var PLUGIN_COMMAND_SHOWUI = 3010;
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
            if (cmd.customID == PLUGIN_COMMAND_SHOWUI) {
                var cp4 = cmd.params[0];
                if (!cp4.objectUseVar) {
                    uiArr.push(cp4.uiID);
                }
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
        for (var i = 0; i < standAvatarArr.length; i++) {
            AssetManager.preLoadStandAvatarAsset(standAvatarArr[i], onLoadOverCB, true, false, true);
        }
        for (var i = 0; i < uiArr.length; i++) {
            AssetManager.preLoadUIAsset(uiArr[i], onLoadOverCB, true, false, true);
        }
    };
    var oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage) {
        var cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            var imageCache = cache.imageArr, uiCache = cache.uiArr, animationCache = cache.aniArr, standAvatarCache = cache.standAvatarArr;
            AssetManager.disposeImages(imageCache);
            for (var s = 0; s < uiCache.length; s++)
                AssetManager.disposeUIAsset(uiCache[s]);
            for (var s = 0; s < animationCache.length; s++)
                AssetManager.disposeAnimationAsset(animationCache[s]);
            for (var s = 0; s < standAvatarCache.length; s++)
                AssetManager.disposeStandAvatarAsset(standAvatarCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    };
    function refreshCompMaterialsTrans(newValue, oldValue, per, nonTweenType, curTime) {
        var materials = ObjectUtils.depthClone(newValue);
        for (var i = 0; i < materials.length; i++) {
            var pass1 = materials[i];
            var pass2 = oldValue[i];
            if (!pass1 || !pass1.materials || !pass2 || !pass2.materials)
                continue;
            for (var m = 0; m < pass1.materials.length; m++) {
                var material1 = pass1.materials[m];
                var material2 = pass2.materials[m];
                if (material2 && material1.id == material2.id) {
                    for (var key in material1) {
                        if (key == "id" || key == "____timeInfo")
                            continue;
                        var materialValue1 = material1[key];
                        var materialValue2 = material2[key];
                        if (typeof materialValue1 == "number" && typeof materialValue2 == "number") {
                            material1[key] = (materialValue1 - materialValue2) * per + materialValue2;
                        }
                        else {
                            if ((nonTweenType == 0 && curTime != 1) || (nonTweenType == 1 && per != 1)) {
                                material1[key] = materialValue2;
                            }
                        }
                    }
                }
            }
        }
        return materials;
    }
    function refreshCompMaterials(attValue, uiComp) {
        if (attValue.length != uiComp.materialData.length) {
            uiComp.materialData = attValue;
            uiComp.installMaterialData(uiComp.materialData);
            return;
        }
        for (var i = 0; i < attValue.length; i++) {
            var pass1 = attValue[i];
            var pass2 = uiComp.materialData[i];
            if (!pass1 || !pass1.materials || !pass2 || !pass2.materials)
                continue;
            if (pass1.materials.length != pass2.materials.length) {
                uiComp.clearMaterials();
                uiComp.materialData = attValue;
                uiComp.installMaterialData(uiComp.materialData);
                return;
            }
            for (var j = 0; j < pass1.materials.length; j++) {
                var material1 = pass1.materials[j];
                var material2 = pass2.materials[j];
                if (material1.id != material2.id) {
                    uiComp.materialData = attValue;
                    uiComp.installMaterialData(uiComp.materialData);
                    return;
                }
                var materialValues = {};
                for (var key in material1) {
                    if (key == "id" || key == "____timeInfo")
                        continue;
                    var materialValue1 = material1[key];
                    var materialValue2 = material2[key];
                    if (materialValue1 != materialValue2) {
                        if (typeof materialValue1 == "number" && typeof materialValue1 == "number") {
                            materialValues["mu" + material1.id + "_" + key] = materialValue1;
                        }
                        else {
                            uiComp.materialData = attValue;
                            uiComp.installMaterialData(uiComp.materialData);
                            return;
                        }
                    }
                }
                uiComp.setMaterialValueFast(materialValues, j);
            }
        }
        uiComp.materialData = attValue;
    }
})(CommandExecute || (CommandExecute = {}));
//# sourceMappingURL=CustomCommand2.js.map