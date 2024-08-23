var CustomCondition;
(function (CustomCondition) {
    function f1(trigger, p) {
        var uiID;
        if (p.checkType == 0) {
            if (p.useVarID) {
                uiID = Game.player.variable.getVariable(p.uiIDVarID);
            }
            else {
                uiID = p.uiID;
            }
        }
        else {
            uiID = p.uiComp.uiID;
        }
        var ui = GameUI.get(uiID);
        if (!ui) {
            if (p.checkType == 0 && p.type == 3)
                return true;
            return false;
        }
        if (p.checkType == 1) {
            var comp = ui.compsIDInfo[p.uiComp.compID];
            if (!comp)
                return false;
            var value = comp[p.uiComp.varName];
            return value ? true : false;
        }
        if (p.type == 0)
            return true;
        if (p.type == 1)
            return false;
        if (p.type == 2)
            return ui.stage ? true : false;
        if (p.type == 3)
            return ui.stage ? false : true;
        if (p.type == 4)
            return Game.layer.uiLayer.getChildAt(Game.layer.uiLayer.numChildren - 1) == ui;
    }
    CustomCondition.f1 = f1;
    function f2(trigger, p) {
        if (p.sys == 0)
            return GameDialog.isInDialog;
        else if (p.sys == 1)
            return GameDialog.isPlaying;
        else if (p.sys == 2)
            return isPlayTS;
        else if (p.sys == 3)
            return os.fullscreen;
        else if (p.sys == 4)
            return Browser.onMobile;
        else if (p.sys == 5)
            return os.platform == 3 || os.platform == 0;
    }
    CustomCondition.f2 = f2;
    function f3(trigger, p) {
        var moduleID = p.modelData.moduleID;
        var dataID;
        if (p.modelData.dataIsUseVar) {
            dataID = Game.player.variable.getVariable(p.modelData.dataVarID);
        }
        else {
            dataID = p.modelData.dataID;
        }
        var moduleData = GameData.getModuleData(moduleID, dataID);
        if (!moduleData)
            return false;
        var varName;
        if (p.modelData.selectMode == 1) {
            var mode = p.modelData.inputModeInfo.mode;
            var constName = p.modelData.inputModeInfo.constName;
            var varNameIndex = p.modelData.inputModeInfo.varNameIndex;
            varName = mode == 0 ? constName : Game.player.variable.getString(varNameIndex);
        }
        else {
            varName = p.modelData.varName;
        }
        if (moduleData[varName] == undefined)
            return false;
        return !!moduleData[varName];
    }
    CustomCondition.f3 = f3;
    function f4(trigger, p) {
        var varName;
        if (p.worldData.selectMode == 1) {
            var mode = p.worldData.inputModeInfo.mode;
            var constName = p.worldData.inputModeInfo.constName;
            var varNameIndex = p.worldData.inputModeInfo.varNameIndex;
            varName = mode == 0 ? constName : Game.player.variable.getString(varNameIndex);
        }
        else {
            varName = p.worldData.varName;
        }
        if (WorldData[varName] == undefined)
            return false;
        return !!WorldData[varName];
    }
    CustomCondition.f4 = f4;
})(CustomCondition || (CustomCondition = {}));
//# sourceMappingURL=CustomCondition.js.map