var CustomGameString;
(function (CustomGameString) {
    function f1(trigger, p) {
        var _a;
        switch (p.type) {
            case 0:
                return (_a = Game.currentScene) === null || _a === void 0 ? void 0 : _a.name;
        }
        return "";
    }
    CustomGameString.f1 = f1;
    function f2(trigger, p) {
        var uiID = p.uiComp.uiID;
        var ui = GameUI.get(uiID);
        if (!ui)
            return "";
        var comp = ui.compsIDInfo[p.uiComp.compID];
        if (!comp)
            return "";
        var value = comp[p.uiComp.varName];
        return value == null ? "" : value.toString();
    }
    CustomGameString.f2 = f2;
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
            return "";
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
        if (moduleData[varName] == undefined || moduleData[varName] == null)
            return "";
        return moduleData[varName].toString();
    }
    CustomGameString.f3 = f3;
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
        if (WorldData[varName] == undefined || WorldData[varName] == null)
            return "";
        return WorldData[varName].toString();
    }
    CustomGameString.f4 = f4;
    function f5(trigger, p) {
        switch (p.type) {
            case 0:
                return GameAudio.lastBgmURL + "," + GameAudio.lastBGMVolume + "," + GameAudio.lastBGMPitch;
            case 1:
                return GameAudio.lastBgsURL + "," + GameAudio.lastBGSVolume + "," + GameAudio.lastBGSPitch;
        }
    }
    CustomGameString.f5 = f5;
})(CustomGameString || (CustomGameString = {}));
//# sourceMappingURL=CustomGameString.js.map