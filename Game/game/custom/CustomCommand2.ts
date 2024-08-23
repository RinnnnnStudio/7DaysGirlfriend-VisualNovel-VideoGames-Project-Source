/**
 * 自定义事件命令
 * -- 图像/动画/立绘/界面/视频显示相关的指令
 * -- 对于图像显示以及移动过程追加了存档读档支持
 * Created by 黑暗之神KDS on 2018-12-18 17:17:50.
 */
module CommandExecute {
    //------------------------------------------------------------------------------------------------------
    // 图像系统基础指令运行时
    //------------------------------------------------------------------------------------------------------
    /**
     * 显示界面
     */
    export function customCommand_3010(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3010): void {
        // 获取通道
        let passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        let uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
        }
        // 清理通道
        // GameImageLayer.deletePassage(passageID);
        // 获取属性
        let toDpX: number, toDpY: number, toDpScaleX: number, toDpScaleY: number;
        if (cp.posUseVar) {
            toDpX = Game.player.variable.getVariable(cp.dpXVar);
            toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            toDpX = cp.dpX;
            toDpY = cp.dpY;
        }
        let toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            toDpScaleX = cp.dpScaleX;
            toDpScaleY = cp.dpScaleY;
        }
        let toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        let toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        // 创建图片显示对象
        let a = GameUI.load(uiID, cp.showType == 1);
        // a.syncLoadWhenAssetExist = true;
        // 设定显示优先度，以便在同Z轴时，编号越大，显示在越前方
        a.useDPCoordScaleMode = true;
        // 设置通道由该显示对象占用
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
            // 刷新坐标
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
    /**
     * 移动界面
     */
    export function customCommand_3011(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3011): void {
        // 获取通道
        let passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        let uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
        }
        // 获取通道显示对象
        let a: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
        if (!a || !(a instanceof GUI_BASE)) return;
        // 标识：用于注册图像层帧刷时的标识，以便可用此标识取消该类型帧刷
        let sign = "gcUIMove";
        // 清理同一个通道的移动图像效果
        GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        // 获取属性
        let toDpX: number, toDpY: number, toDpScaleX: number, toDpScaleY: number;
        if (cp.posUseVar) {
            toDpX = Game.player.variable.getVariable(cp.dpXVar);
            toDpY = Game.player.variable.getVariable(cp.dpYVar);
        }
        else {
            toDpX = cp.dpX;
            toDpY = cp.dpY;
        }
        let toDpZ = cp.zUseVar ? Game.player.variable.getVariable(cp.dpZVar) : cp.dpZ;
        if (cp.sizeUseVar) {
            toDpScaleX = Game.player.variable.getVariable(cp.dpScaleXVar);
            toDpScaleY = Game.player.variable.getVariable(cp.dpScaleYVar);
        }
        else {
            toDpScaleX = cp.dpScaleX;
            toDpScaleY = cp.dpScaleY;
        }
        let toRotation = cp.rotationUseVar ? Game.player.variable.getVariable(cp.rotationVar) : cp.rotation;
        let toOpacity = cp.opacityUseVar ? Game.player.variable.getVariable(cp.opacityVar) : cp.opacity;
        //
        // 立即模式：无需清理此行为
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
        // 过渡模式：由于注册了帧刷，需要清理
        else {
            // 下一帧开始移动 1/MAX
            // GameUtils.getValueByTransData(null, );
            let cX: number, cY: number, cScaleX: number, cScaleY: number;
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
            let m: ScaleSpriteMoveParams = {
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
            }
            let thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUIMoveFrameUpdate, thisPtr, [a, m, passageID, sign], sign);
            // 立刻开始执行一帧
            gcUIMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign]);
        }
    }
    /**
     * 关闭界面
     */
    export function customCommand_3012(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3012): void {
        // 获取通道
        let passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        passageID = MathUtils.int(passageID);
        // 界面ID
        let uiID = cp.objectUseVar ? Game.player.variable.getVariable(cp.uiVar) : cp.uiID;
        // -- 图像层的场合
        if (cp.showType == 1) {
            passageID = cp.passageIDUseVar ? Game.player.variable.getVariable(cp.passageIDVar) : cp.passageID;
        }
        // -- 界面层的场合
        else {
            passageID = 1000000 + uiID;
            GameUI.hide(uiID);
        }
        // 清理通道
        // GameImageLayer.deletePassage(passageID);
    }
    /**
     * 移动界面元件
     */
    export function customCommand_3013(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3013): void {
        // 解析移动数据
        if (!cp.changeUIAttr || !Array.isArray(cp.changeUIAttr)) return;
        let cmdParam = cp.changeUIAttr[1];
        if (!cmdParam) return;
        let atts: { uiID: number, atts: { [compID: string]: [number, { [attrName: string]: any }] } } = cmdParam[2];
        if (!atts || !atts.uiID) return;
        // 获取通道
        let uiID = atts.uiID;
        // -- 图像层的场合
        let passageID = 1000000 + uiID;
        // 获取通道显示对象
        //@ts-ignore
        let a: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
        //@ts-ignore
        if (!a || !(a instanceof GUI_BASE)) return;
        // 标识：由于移动界面元件支持对同一个界面多次叠加，此处sign则是唯一
        let sign = "gcUICompMove" + ObjectUtils.getRandID();
        // 立即模式：无需清理此行为
        if (cmdParam[5] == 0) {
            let comps = GameUI.getAllCompChildren(a, true);
            for (let compID in atts.atts) {
                let uiComp = comps.keyValue[compID];
                if (uiComp) {
                    let attsValues = atts.atts[compID][1];
                    //@ts-ignore
                    let useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (let attName in attsValues) {
                        let attValue = attsValues[attName];
                        //同步材质
                        if (attName == "materialData") {
                            refreshCompMaterials.apply({}, [attValue, uiComp]);
                        } else {
                            //变量
                            //@ts-ignore
                            if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                                //@ts-ignore
                                if (useVarAndTransitionAttrs[attName].type == 0) {
                                    //@ts-ignore
                                    attValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                                }
                                //@ts-ignore
                                else if (useVarAndTransitionAttrs[attName].type == 1) {
                                    //@ts-ignore
                                    attValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                                }
                                //@ts-ignore
                                else if (useVarAndTransitionAttrs[attName].type == 2) {
                                    //@ts-ignore
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
            let m = {
                time: cmdParam[0],
                curTime: 1,
                transData: GameUtils.getTransData(cmdParam[1]),
                attrInfos: []
            }
            let comps = GameUI.getAllCompChildren(a, true);
            for (let compID in atts.atts) {
                let uiComp = comps.keyValue[compID];
                if (uiComp) {
                    let attsValues = atts.atts[compID][1];
                    //@ts-ignore
                    let useVarAndTransitionAttrs = atts.atts[compID][2];
                    for (let attName in attsValues) {
                        let oldValue = uiComp[attName];
                        let needTween = typeof oldValue == "number";
                        if (attName == "materialData") needTween = true;
                        //@ts-ignore
                        let useVarAndTransition: { index: number, change: boolean, type: number } = useVarAndTransitionAttrs[attName];
                        if (useVarAndTransition) {
                            // 如果并非过渡渐变的话则表示立即变更，效果会受到「无法渐变的属性处理」影响
                            if (!useVarAndTransition.change) {
                                needTween = false;
                            }
                        }
                        let newValue = attsValues[attName];
                        //变量
                        //@ts-ignore
                        if (useVarAndTransitionAttrs && useVarAndTransitionAttrs[attName].type != null) {
                            //@ts-ignore
                            if (useVarAndTransitionAttrs[attName].type == 0) {
                                //@ts-ignore
                                newValue = Game.player.variable.getVariable(useVarAndTransitionAttrs[attName].index);
                            }
                            //@ts-ignore
                            else if (useVarAndTransitionAttrs[attName].type == 1) {
                                //@ts-ignore
                                newValue = Game.player.variable.getString(useVarAndTransitionAttrs[attName].index);
                            }
                            //@ts-ignore
                            else if (useVarAndTransitionAttrs[attName].type == 2) {
                                //@ts-ignore
                                newValue = Game.player.variable.getSwitch(useVarAndTransitionAttrs[attName].index) ? true : false;
                            }
                        }
                        let attrInfo = { uiComp: uiComp, uiCompID: uiComp.id, attName: attName, oldValue: oldValue, needTween: needTween, newValue: newValue };
                        //@ts-ignore
                        m.attrInfos.push(attrInfo);
                    }
                }
            }
            //
            let thisPtr = {};
            GameImageLayer.regPassageFrameUpdate(passageID, gcUICompMoveFrameUpdate, thisPtr, [a, m, passageID, sign, cmdParam[3]], sign);
            // 立刻开始执行一帧
            gcUICompMoveFrameUpdate.apply(thisPtr, [a, m, passageID, sign, cmdParam[3]]);
        }
    }
    /**
     * 切换场景
     */
    export function customCommand_3017(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_3017): void {
        Game.player.toScene(cp.scene);
    }
    /**
     * 记录监听的界面以及对应的触发器标识
     */
    var isWaitingUICloseInfos: { uiID: number, triggerMainType: number, triggerIndexType: number, triggerFrom: any }[] = []
    /**
     * 额外的存档标识
     */
    var extSaveSign: string = "waitCloseUIListener";
    /**
     * 等待指定界面关闭
     */
    export function customCommand_3020(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], p: CustomCommandParams_3020): void {
        // 根据常量或变量或者界面编号
        var uiID = p.useVar == 1 ? Game.player.variable.getVariable(p.uiVar) : p.uiID;
        // 如果该界面已打开的话则暂停并监听关闭后继续事件
        if (GameUI.isOpened(uiID)) {
            trigger.pause = true;
            trigger.offset(1);
            listenerWhenUIClose(uiID, trigger);
        }
    }
    /**
     * 存档时保存额外的信息：记录正处于监听界面关闭的状态
     */
    SinglePlayerGame.regSaveCustomData(extSaveSign, Callback.New(() => {
        return isWaitingUICloseInfos;
    }, null));
    /**
     * 读档：重新恢复监听界面关闭的状态
     */
    EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_RECOVER_TRIGGER, Callback.New((trigger: CommandTrigger) => {
        var listers: { uiID: number, triggerMainType: number, triggerIndexType: number, from: any }[] = SinglePlayerGame.getSaveCustomData(extSaveSign);
        // 检查该触发器是否在listers中
        var lister = ArrayUtils.matchAttributes(listers, { triggerMainType: trigger.mainType, triggerIndexType: trigger.indexType, triggerFrom: trigger.from }, true)[0];
        if (lister) {
            listenerWhenUIClose(lister.uiID, trigger);
        }
    }, null));
    /**
     * 监听当窗口关闭时的状态
     * @param uiID 系统界面组中的界面编号
     * @param trigger 触发器
     */
    function listenerWhenUIClose(uiID: number, trigger: CommandTrigger) {
        // 添加监听记录至列表，以便读档后恢复
        var t = { uiID: uiID, triggerMainType: trigger.mainType, triggerIndexType: trigger.indexType, triggerFrom: trigger.from };
        isWaitingUICloseInfos.push(t);
        // 添加监听指定的界面关闭时事件
        EventUtils.addEventListenerFunction(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, (closeUIID: number) => {
            if (closeUIID == uiID) {
                ArrayUtils.remove(isWaitingUICloseInfos, t);
                //@ts-ignore
                EventUtils.removeEventListenerFunction(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, arguments.callee, this);
                CommandPage.executeEvent(trigger, []);
            }
        }, this);
    }
    //------------------------------------------------------------------------------------------------------
    //  音频
    //------------------------------------------------------------------------------------------------------
    /**
     * 播放背景音乐
     */
    export function customCommand_5001(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5001): void {
        let bgmURL = cp.advanceSetting && cp.bgmUseVar ? Game.player.variable.getString(cp.bgmVarID) : cp.bgm;
        let volume = 1;
        let pitch = 1;
        if (bgmURL) {
            let bgmURLArr = bgmURL.split(",");
            if (bgmURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(bgmURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(bgmURLArr[2]) / 100);
            }
        }
        let fadeIn = MathUtils.int(cp.advanceSetting && cp.fadeInTimeUseVar ? Game.player.variable.getVariable(cp.fadeInTimeVarID) : cp.fadeInTime);
        GameAudio.playBGM(bgmURL, volume, 99999, fadeIn != 0, fadeIn * 1000, pitch);
    }
    /**
     * 停止背景音乐
     */
    export function customCommand_5002(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5002): void {
        let fadeOut = MathUtils.int(cp.fadeOutTimeUseVar ? Game.player.variable.getVariable(cp.fadeOutTimeVarID) : cp.fadeOutTime);
        GameAudio.stopBGM(fadeOut != 0, fadeOut * 1000);
    }
    /**
     * 播放环境声效
     */
    export function customCommand_5003(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5003): void {
        let bgsURL = cp.advanceSetting && cp.bgsUseVar ? Game.player.variable.getString(cp.bgsVarID) : cp.bgs;
        let volume = 1;
        let pitch = 1;
        if (bgsURL) {
            let bgsURLArr = bgsURL.split(",");
            if (bgsURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(bgsURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(bgsURLArr[2]) / 100);
            }
        }
        let fadeIn = MathUtils.int(cp.advanceSetting && cp.fadeInTimeUseVar ? Game.player.variable.getVariable(cp.fadeInTimeVarID) : cp.fadeInTime);
        GameAudio.playBGS(bgsURL, volume, 99999, fadeIn != 0, fadeIn * 1000, pitch);
    }
    /**
     * 停止环境声效
     */
    export function customCommand_5004(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5004): void {
        let fadeOut = MathUtils.int(cp.fadeOutTimeUseVar ? Game.player.variable.getVariable(cp.fadeOutTimeVarID) : cp.fadeOutTime);
        GameAudio.stopBGS(fadeOut != 0, fadeOut * 1000);
    }
    /**
     * 播放音效
     */
    export function customCommand_5005(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5005): void {
        let seURL: string;
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
            let volume = 1;
            let pitch = 1;
            if (seURL) {
                let seURLArr = seURL.split(",");
                if (seURLArr.length == 3) {
                    volume = MathUtils.float(parseFloat(seURLArr[1]) / 100);
                    pitch = MathUtils.float(parseFloat(seURLArr[2]) / 100);
                }
            }
            GameAudio.playSE(seURL, volume, pitch);
        }
    }
    /**
     * 停止全部音效
     */
    export function customCommand_5006(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5006): void {
        GameAudio.stopSE();
    }
    /**
     * 播放语音
     */
    export function customCommand_5007(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5007): void {
        let soc: ClientSceneObject = null;
        let tsURL = cp.tsUseVar ? Game.player.variable.getString(cp.tsVarID) : cp.ts;
        let volume = 1;
        let pitch = 1;
        if (tsURL) {
            let tsURLArr = tsURL.split(",");
            if (tsURLArr.length == 3) {
                volume = MathUtils.float(parseFloat(tsURLArr[1]) / 100);
                pitch = MathUtils.float(parseFloat(tsURLArr[2]) / 100);
            }
        }
        GameAudio.playTS(tsURL, volume, pitch, soc);
    }
    /**
     * 停止全部语音
     */
    export function customCommand_5008(commandPage: CommandPage, cmd: Command, trigger: CommandTrigger, triggerPlayer: ClientPlayer, playerInput: any[], cp: CustomCommandParams_5008): void {
        GameAudio.stopTS();
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    /**
     * 移动界面的逐帧执行的函数
     */
    export function gcUIMoveFrameUpdate(a: GUI_BASE, m: ScaleSpriteMoveParams, passageID: number, sign: string) {
        // 没有显示对象或已被释放的情况
        if (!a || a.isDisposed) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
            return;
        }
        // 计算过渡值
        let per = m.curTime / m.time;
        let value = GameUtils.getValueByTransData(m.transData, per);
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
    /**
     * 移动界面元件的逐帧执行的函数
     */
    export function gcUICompMoveFrameUpdate(a: GUI_BASE, m: UICompMoveParams, passageID: number, sign: string, nonTweenType: number) {
        let per = m.curTime / m.time;
        for (let i = 0; i < m.attrInfos.length; i++) {
            let attrInfo = m.attrInfos[i];
            if (!attrInfo.needTween) {
                // 无法渐变过渡的属性处理方式：在第一帧时变动/在最后一帧变动
                if ((nonTweenType == 0 && m.curTime == 1) || (nonTweenType == 1 && per == 1)) {
                    if (attrInfo.attName == "materialData") {
                        refreshCompMaterials.apply({}, [attrInfo.newValue, attrInfo.uiComp]);
                    } else {
                        attrInfo.uiComp[attrInfo.attName] = attrInfo.newValue;
                    }
                }
            }
            else {
                let valuePer = GameUtils.getValueByTransData(m.transData, per);
                //同步材质
                if (attrInfo.attName == "materialData") {
                    let materials = refreshCompMaterialsTrans.apply({}, [attrInfo.newValue, attrInfo.oldValue, valuePer, nonTweenType, m.curTime]);
                    refreshCompMaterials.apply({}, [materials, attrInfo.uiComp]);
                } else {
                    attrInfo.uiComp[attrInfo.attName] = (attrInfo.newValue - attrInfo.oldValue) * valuePer + attrInfo.oldValue;
                }
            }
        }
        m.curTime++;
        if (per == 1) {
            GameImageLayer.clearPassageFrameUpdate(passageID, sign);
        }
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    // 移动缩放类对象的参数伪类
    declare class ScaleSpriteMoveParams {
        time: number;
        curTime: number;
        x: number;
        y: number;
        z: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        opacity: number;
        x2: number;
        y2: number;
        z2: number;
        scaleX2: number;
        scaleY2: number;
        rotation2: number;
        opacity2: number;
        transData: TransData;
    }
    // 移动界面元件的参数伪类
    declare class UICompMoveParams {
        time: any;
        curTime: number;
        transData: TransData;
        attrInfos: { uiComp: UIBase; uiCompID: number; attName: string; oldValue: any; needTween: boolean; newValue: any; }[];
    }
    //------------------------------------------------------------------------------------------------------
    // 
    //------------------------------------------------------------------------------------------------------
    /**
     * 储存界面层的界面状态和界面内元件的状态，以便读档后打开界面时使用一次恢复
     */
    let useOnceUIInfos: {
        [uiID: number]: {
            // 界面基础属性
            x: number, y: number, scaleX: number, scaleY: number, rotation1: number, rotation2: number, opacity: number,
            // 界面内元件的属性
            uiCompInfo: { [uiCompID: string]: { [varName: string]: any }[] }
        }
    } = {} as any;
    /**
     * 监听界面打开：通过使用GameUI.show()打开的界面（位于界面层）
     */
    EventUtils.addEventListener(GameUI, GameUI.EVENT_OPEN_SYSTEM_UI, Callback.New((uiID: number) => {
        // -- 获取通道
        let passageID = 1000000 + uiID;
        let ui = GameUI.get(uiID);
        if (!ui) return;
        // -- 装载属性
        let useOnceUIInfo = useOnceUIInfos[uiID];
        if (useOnceUIInfo) {
            for (let i in useOnceUIInfo) {
                if (i == "uiCompInfo") continue;
                ui[i] = useOnceUIInfo[i];
            }
            let childs = GameUI.getAllCompChildren(ui, true, (uiComp: Sprite) => {
                // 列表的属性忽略，一般由创建时刷新
                if (uiComp instanceof UIList) {
                    return false;
                }
            }).keyValue;
            for (let uiCompID in useOnceUIInfo.uiCompInfo) {
                let uiComp = childs[uiCompID];
                if (!uiComp) continue;
                let uiCompInfo = useOnceUIInfo.uiCompInfo[uiCompID];
                for (let varName in uiCompInfo) {
                    uiComp[varName] = uiCompInfo[varName];
                }
            }
            delete useOnceUIInfos[uiID];
        }
        // -- 储存
        GameImageLayer.setImageSprite(passageID, ui);
    }, null));
    /**
     * 监听界面关闭
     */
    EventUtils.addEventListener(GameUI, GameUI.EVENT_CLOSE_SYSTEM_UI, Callback.New((uiID: number) => {
        // -- 获取通道
        let passageID = 1000000 + uiID;
        // -- 删除该通道
        // GameImageLayer.deletePassage(passageID);
    }, null));
    //------------------------------------------------------------------------------------------------------
    // 存档和读档-追加这些事件的修改的状态
    //------------------------------------------------------------------------------------------------------
    /**
     * 注册储存额外的自定义数据：
     * -- 当前显示的图像
     * -- 当前正在移动中的效果
     */
    if (!Config.BEHAVIOR_EDIT_MODE) {
        SinglePlayerGame.regSaveCustomData("cmdImagerLayer", Callback.New(() => {
            // 储存显示对象
            let imageSpriteInfos: { [id: string]: { type: string, displayObjectAttrs: any } } = {};
            for (let passageIDStr in GameImageLayer.imageSprites) {
                let disobjectInfo = GameImageLayer.imageSprites[passageIDStr];
                let sp: GameSprite = disobjectInfo.displayObject;
                let displayObjectAttrs = {};
                // 记录身上的材质
                let materialData = sp.getAllMaterialDatas();
                displayObjectAttrs["___materialData"] = materialData;
                let saveAttrs: string[];
                // 界面
                if (sp instanceof GUI_BASE) {
                    if (!sp.stage) continue;
                    if (sp.useDPCoord) {
                        saveAttrs = ["useDPCoord", "dpX", "dpY", "dpZ", "dpScaleX", "dpScaleY", "rotation1", "rotation2", "opacity", "blendMode"];
                    }
                    else {
                        saveAttrs = ["useDPCoord", "x", "y", "scaleX", "scaleY", "rotation1", "rotation2", "opacity", "blendMode"];
                        displayObjectAttrs["___childIndex"] = Game.layer.uiLayer.getChildIndex(sp);
                    }
                    for (let i in saveAttrs) {
                        let attrName = saveAttrs[i];
                        displayObjectAttrs[attrName] = sp[attrName];
                    }
                    displayObjectAttrs["guiID"] = (sp as GUI_BASE).guiID;
                    imageSpriteInfos[passageIDStr] = {
                        type: "GUI_BASE",
                        displayObjectAttrs: displayObjectAttrs
                    };
                }
                // 其他的情况
                else {
                    continue;
                }
            }
            // 储存移动效果
            let passageFrameUpdateDatas = {};
            let passageFrameUpdates = GameImageLayer.getPassageFrameUpdates();
            for (let passageIDStr in passageFrameUpdates) {
                let pArr = passageFrameUpdates[passageIDStr];
                if (pArr) {
                    let pDataArr = passageFrameUpdateDatas[passageIDStr] = [];
                    for (let s = 0; s < pArr.length; s++) {
                        let p = pArr[s];
                        let args = p.args.concat();
                        args.shift(); // 去除头-显示对象
                        // 移动界面元件时需要记录下
                        if (p.sign.indexOf("gcUICompMove") != -1) {
                            let m: UICompMoveParams = args[0];
                            let newM: UICompMoveParams = {
                                time: m.time,
                                curTime: m.curTime,
                                transData: m.transData,
                                attrInfos: []
                            };
                            for (let k = 0; k < m.attrInfos.length; k++) {
                                let oldAttrInfo = m.attrInfos[k];
                                let oldComp = oldAttrInfo.uiComp;
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
            // 储存界面层的系统组界面以及其元件状态
            let allSystemGroupUIs = GameUI.getAllSystemGroupUIs();
            let saveDataUseOnceUIInfo = {};
            let BASE_ATTRS_OBJ = { x: true, y: true, width: true, height: true, rotation: true, show: true, opacity: true, mouseEventEnabledData: true };
            for (let o in allSystemGroupUIs) {
                let uiID = parseInt(o);
                let ui: GUI_BASE = allSystemGroupUIs[o];
                if (!ui) continue;
                let uiPosData = {
                    // 界面基础属性
                    x: ui.x, y: ui.y, scaleX: ui.scaleX, scaleY: ui.scaleX, rotation1: ui.rotation1, rotation2: ui.rotation2, opacity: ui.opacity,
                    // 界面内元件的属性
                    uiCompInfo: {}
                }
                saveDataUseOnceUIInfo[uiID] = uiPosData;
                let allComps = GameUI.getAllCompChildren(ui, false).arr;
                allComps.forEach((comp: UIBase) => {
                    if (comp instanceof UIBase) {
                        let uiCompAtts = uiPosData.uiCompInfo[comp.id] = {};
                        // 基础属性记录
                        for (let b in BASE_ATTRS_OBJ) {
                            uiCompAtts[b] = comp[b];
                        }
                        // 自定义属性记录
                        let __compCustomAttributes = GameUI["__compCustomAttributes"];
                        if (__compCustomAttributes) {
                            let customAttrs: string[] = __compCustomAttributes[comp.className];
                            for (let c in customAttrs) {
                                let b = customAttrs[c];
                                uiCompAtts[b] = comp[b];
                            }
                        }
                    }
                });
            }
            // 储存当前镜头
            let imageLayer = Game.layer.imageLayer;
            let cameraInfo = {
                x: imageLayer.camera.viewPort.x,
                y: imageLayer.camera.viewPort.y,
                z: imageLayer.camera.z,
                rotation: imageLayer.camera.rotation
            };
            // 储存图像层的材质
            let imageLayerMaterialData = Game.layer.imageLayer.getAllMaterialDatas();
            // 储存界面层的材质
            let uiLayerMaterialData = Game.layer.uiLayer.getAllMaterialDatas();
            // 储存全画面的材质
            let screenMaterialData = Game.layer.getAllMaterialDatas();
            // 储存场景的材质
            let sceneLayerMaterialData = Game.layer.sceneLayer.getAllMaterialDatas();
            return { cameraInfo: cameraInfo, imageSpriteInfos: imageSpriteInfos, passageFrameUpdateDatas: passageFrameUpdateDatas, saveDataUseOnceUIInfo: saveDataUseOnceUIInfo, imageLayerMaterialData: imageLayerMaterialData, uiLayerMaterialData: uiLayerMaterialData, screenMaterialData: screenMaterialData, sceneLayerMaterialData: sceneLayerMaterialData };
        }, {}));
        /**
         * 监听读档恢复数据，恢复储存的自定义数据-图像相关事件
         */
        EventUtils.addEventListener(SinglePlayerGame, SinglePlayerGame.EVENT_ON_BEFORE_RECOVERY_DATA, Callback.New(() => {
            // 停止当前对话
            GameDialog.stop();
            // 清理所有图像
            for (let pi in GameImageLayer.imageSprites) {
                let passageID: number = parseInt(pi);
                let sp: GameSprite = GameImageLayer.getImageSprite(passageID);
                // 标题界面和读档界面以及对话菜单不释放
                if (sp instanceof GUI_BASE && ((sp as GUI_BASE).guiID == 1 || (sp as GUI_BASE).guiID == 2 || (sp as GUI_BASE).guiID == 2003)) {
                }
                else {
                    GameImageLayer.deletePassage(passageID);
                    if (sp instanceof GUI_BASE) {
                        if (sp == GameUI.get((sp as GUI_BASE).guiID)) {
                            GameUI.dispose((sp as GUI_BASE).guiID);
                        }
                    }
                }
            }
            // 清理图像层材质
            Game.layer.imageLayer.clearMaterials();
            // 安装材质的方法
            function installMaterialData(sp: GameSprite, materialData: any[]) {
                if (!materialData || materialData.length == 0) return;
                sp.installMaterialData(materialData, false);
            }
            let o = SinglePlayerGame.getSaveCustomData("cmdImagerLayer");
            if (!o) return;
            // 恢复 saveDataUseOnceUIInfo
            useOnceUIInfos = o.saveDataUseOnceUIInfo;
            // 显示对象
            let imageSpriteInfos: { [id: string]: { type: string, displayObjectAttrs: any } } = o.imageSpriteInfos;
            for (let passageIDStr in imageSpriteInfos) {
                let passageID = MathUtils.int(passageIDStr)
                let imageSpriteInfo = imageSpriteInfos[passageIDStr];
                // -- 界面
                if (imageSpriteInfo.type == "GUI_BASE") {
                    let uiID = imageSpriteInfo.displayObjectAttrs["guiID"];
                    let useDPCoord = imageSpriteInfo.displayObjectAttrs["useDPCoord"];
                    let d = GameUI.load(uiID, useDPCoord);
                    GameImageLayer.setImageSprite(passageID, d);
                    d.useDPCoordScaleMode = true;
                    if (useDPCoord) {
                        Game.layer.imageLayer.addChild(d);
                        d.dpDisplayPriority = passageID;
                    }
                    else {
                        // 记录显示层次，以便读档后
                        d.dpDisplayPriority = imageSpriteInfo.displayObjectAttrs["___childIndex"];
                        GameUI.show(uiID);
                    }
                    for (let i in imageSpriteInfo.displayObjectAttrs) {
                        d[i] = imageSpriteInfo.displayObjectAttrs[i];
                    }
                    installMaterialData(d, imageSpriteInfo.displayObjectAttrs["___materialData"]);
                }
            }
            // 界面层刷新层次 childIndex
            let uiChilds = [];
            let uiChildLength = Game.layer.uiLayer.numChildren;
            for (let s = 0; s < uiChildLength; s++) {
                uiChilds.push(Game.layer.uiLayer.getChildAt(s));
            }
            uiChilds.sort(function (a: GameSprite, b: GameSprite): number {
                return a.dpDisplayPriority < b.dpDisplayPriority ? -1 : 1;
            });
            for (let j: number = 0; j < uiChildLength; j++) {
                Game.layer.uiLayer.setChildIndex(uiChilds[j], j);
            }
            // 当前的镜头
            let imageLayer = Game.layer.imageLayer;
            imageLayer.camera.viewPort.x = o.cameraInfo.x;
            imageLayer.camera.viewPort.y = o.cameraInfo.y;
            imageLayer.camera.z = o.cameraInfo.z;
            imageLayer.camera.rotation = o.cameraInfo.rotation;
            // 图像层刷新
            Game.layer.imageLayer.updateFrame(true);
            // 移动中效果
            let passageFrameUpdateDatas: { [passageIDStr: string]: { sign: string, args: any }[] } = o.passageFrameUpdateDatas;
            for (let passageIDStr in passageFrameUpdateDatas) {
                let passageID = MathUtils.int(passageIDStr)
                let pArr = passageFrameUpdateDatas[passageIDStr];
                if (pArr) {
                    for (let s = 0; s < pArr.length; s++) {
                        let p = pArr[s];
                        let thisPtr = {};
                        if (p.sign == "gcUIMove") {
                            let ui: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
                            if (!ui || !(ui instanceof GUI_BASE)) continue;
                            GameImageLayer.regPassageFrameUpdate(passageID, CommandExecute.gcUIMoveFrameUpdate, thisPtr, [ui].concat(p.args), p.sign);
                        }
                        // 移动界面元件时需要记录下
                        else if (p.sign.indexOf("gcUICompMove") != -1) {
                            let ui: GUI_BASE = GameImageLayer.getImageSprite(passageID) as any;
                            if (!ui || !(ui instanceof GUI_BASE)) continue;
                            let m: UICompMoveParams = p.args[0];
                            let uiComps = GameUI.getAllCompChildren(ui, true);
                            for (let k = 0; k < m.attrInfos.length; k++) {
                                let attrInfo = m.attrInfos[k];
                                attrInfo.uiComp = uiComps.keyValue[attrInfo.uiCompID];
                                // 如果不存在组件的情况则无视该移动（可能新版本已无该组件）
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
            // 图像层材质
            installMaterialData(Game.layer.imageLayer, o.imageLayerMaterialData);
            // 界面层的材质
            if (o.uiLayerMaterialData) installMaterialData(Game.layer.uiLayer, o.uiLayerMaterialData);
            // 储存全画面的材质
            if (o.screenMaterialData) installMaterialData(Game.layer, o.screenMaterialData);
            // 储存场景的材质
            if (o.sceneLayerMaterialData) installMaterialData(Game.layer.sceneLayer, o.sceneLayerMaterialData);
        }, {}, null));
    }
    //------------------------------------------------------------------------------------------------------
    // 预加载和卸载
    //------------------------------------------------------------------------------------------------------
    // 使用资源的自定义指令编号
    let PLUGIN_COMMAND_SHOWUI: number = 3010;
    // 缓存
    let preloadCommandPageInfo: { [cmdPageID: number]: { imageArr: string[], aniArr: number[], standAvatarArr: number[], uiArr: number[] } } = {};
    // 重写预加载事件页
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
            if (cmd.customID == PLUGIN_COMMAND_SHOWUI) {
                let cp4: CustomCommandParams_3010 = cmd.params[0];
                if (!cp4.objectUseVar) {
                    uiArr.push(cp4.uiID);
                }
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
        for (let i = 0; i < standAvatarArr.length; i++) {
            AssetManager.preLoadStandAvatarAsset(standAvatarArr[i], onLoadOverCB, true, false, true);
        }
        for (let i = 0; i < uiArr.length; i++) {
            AssetManager.preLoadUIAsset(uiArr[i], onLoadOverCB, true, false, true);
        }
    }
    // 重写卸载事件页
    let oldDisposeCommandPage = AssetManager.disposeCommandPage;
    AssetManager.disposeCommandPage = function (commandPage: CommandPage) {
        let cache = preloadCommandPageInfo[commandPage.id];
        if (cache) {
            let imageCache = cache.imageArr, uiCache = cache.uiArr, animationCache = cache.aniArr, standAvatarCache = cache.standAvatarArr;
            AssetManager.disposeImages(imageCache);
            for (let s = 0; s < uiCache.length; s++)AssetManager.disposeUIAsset(uiCache[s]);
            for (let s = 0; s < animationCache.length; s++)AssetManager.disposeAnimationAsset(animationCache[s]);
            for (let s = 0; s < standAvatarCache.length; s++)AssetManager.disposeStandAvatarAsset(standAvatarCache[s]);
            delete preloadCommandPageInfo[commandPage.id];
        }
        oldDisposeCommandPage.apply(this, arguments);
    }
    //------------------------------------------------------------------------------------------------------
    // 材质
    //------------------------------------------------------------------------------------------------------
    function refreshCompMaterialsTrans(newValue: any, oldValue: any, per: number, nonTweenType: number, curTime: number) {
        let materials = ObjectUtils.depthClone(newValue);
        //材质组
        for (let i = 0; i < materials.length; i++) {
            let pass1 = materials[i];
            let pass2 = oldValue[i];
            if (!pass1 || !pass1.materials || !pass2 || !pass2.materials) continue;
            //对比材质
            for (let m = 0; m < pass1.materials.length; m++) {
                let material1 = pass1.materials[m];
                let material2 = pass2.materials[m];
                //存在相同材质才会过渡
                if (material2 && material1.id == material2.id) {
                    for (let key in material1) {
                        //id和过渡信息除外
                        if (key == "id" || key == "____timeInfo") continue;
                        let materialValue1 = material1[key];
                        let materialValue2 = material2[key];
                        //只支持number类型的数据过渡
                        if (typeof materialValue1 == "number" && typeof materialValue2 == "number") {
                            material1[key] = (materialValue1 - materialValue2) * per + materialValue2;
                        } else {
                            // 无法渐变过渡的属性处理方式：在第一帧时变动/在最后一帧变动
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
    type UIBase = /*unresolved*/ any
    //@ts-ignore
    function refreshCompMaterials(attValue: any, uiComp: UIBase) {
        //增删材质组
        if (attValue.length != uiComp.materialData.length) {
            uiComp.materialData = attValue;
            uiComp.installMaterialData(uiComp.materialData);
            return;
        }
        for (let i = 0; i < attValue.length; i++) {
            let pass1 = attValue[i];
            let pass2 = uiComp.materialData[i];
            if (!pass1 || !pass1.materials || !pass2 || !pass2.materials) continue;
            //增删材质
            if (pass1.materials.length != pass2.materials.length) {
                uiComp.clearMaterials();
                uiComp.materialData = attValue;
                uiComp.installMaterialData(uiComp.materialData);
                return;
            }
            for (let j = 0; j < pass1.materials.length; j++) {
                let material1 = pass1.materials[j];
                let material2 = pass2.materials[j];
                //替换材质
                if (material1.id != material2.id) {
                    uiComp.materialData = attValue;
                    uiComp.installMaterialData(uiComp.materialData);
                    return;
                }
                let materialValues = {} as any;
                for (let key in material1) {
                    //id和过渡信息除外
                    if (key == "id" || key == "____timeInfo") continue;
                    let materialValue1 = material1[key];
                    let materialValue2 = material2[key];
                    if (materialValue1 != materialValue2) {
                        //材质只支持fast设置number类型的数据
                        if (typeof materialValue1 == "number" && typeof materialValue1 == "number") {
                            materialValues[`mu${material1.id}_${key}`] = materialValue1;
                        } else {
                            uiComp.materialData = attValue;
                            uiComp.installMaterialData(uiComp.materialData);
                            return;
                        }
                    }
                }
                //设置材质效果
                uiComp.setMaterialValueFast(materialValues, j);
            }
        }
        //
        uiComp.materialData = attValue;
    }
}