var GameGate = (function () {
    function GameGate() {
    }
    GameGate.start = function () {
        EventUtils.addEventListener(ClientScene, ClientScene.EVENT_IN_NEW_SCENE, Callback.New(GameGate.onInNewScene, GameGate));
        EventUtils.addEventListener(ClientWorld, ClientWorld.EVENT_INITED, Callback.New(GameGate.onWorldInit, this), true);
    };
    GameGate.onWorldInit = function () {
        GUI_Setting.init();
        ProjectUtils.init();
        if (Browser.onMobile) {
            stage.screenMode = ClientWorld.data.screenMode == 0 ? "horizontal" : "vertical";
            stage.setScreenSize(Browser.width, Browser.height);
        }
        Config["BORN"].sceneID = WorldData.bornScene;
        GameCommand.startCommonCommand(14001);
    };
    GameGate.onInNewScene = function (sceneID, inNewSceneState) {
        GameGate.inNewSceneState = inNewSceneState;
        if (inNewSceneState == 0) {
            WorldData.dialogRecords.length = 0;
        }
        if (this.gateState != null && this.gateState < GameGate.STATE_3_IN_SCENE_COMPLETE)
            return;
        GameGate.gateState = GameGate.STATE_0_START_EXECUTE_LEAVE_SCENE_EVENT;
        EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
        var startEvents = [14011, 14003, 14005];
        GameCommand.startCommonCommand(startEvents[inNewSceneState], [], Callback.New(disposeLastScene, this));
        function disposeLastScene() {
            GameGate.gateState = GameGate.STATE_1_START_LOAD_SCENE;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            if (Game.currentScene) {
                if (Game.player.sceneObject.inScene)
                    Game.currentScene.removeSceneObject(Game.player.sceneObject);
                var lastScene = Game.currentScene;
                Game.layer.sceneLayer.removeChildren();
                if (inNewSceneState == 0)
                    AssetManager.disposeScene(lastScene.id);
                lastScene.dispose();
                Game.currentScene = null;
            }
            loadPlayerAsset();
        }
        function loadPlayerAsset() {
            if (inNewSceneState != 0)
                AssetManager.preLoadSceneObjectAsset(Game.player.data.sceneObject, Callback.New(loadNewScene, this));
            else
                loadNewScene.apply(this);
        }
        function loadNewScene() {
            var _this = this;
            AssetManager.preLoadSceneAsset(sceneID, Callback.New(function () {
                ClientScene.createScene(sceneID, null, Callback.New(onLoadedNewScene, _this), true);
            }, this), true, false, true);
        }
        function onLoadedNewScene(scene) {
            Game.currentScene = scene;
            var insertNewPostion = inNewSceneState != 2;
            if (!GameGate.inSceneInited) {
                GameGate.addPlayerSceneObject(Game.player.data.sceneObject, false, insertNewPostion);
            }
            else {
                GameGate.addPlayerSceneObject(Game.player.sceneObject, true, insertNewPostion);
            }
            Game.currentScene.startRender();
            Game.layer.sceneLayer.addChild(Game.currentScene.displayObject);
            if (inNewSceneState == 2) {
                SinglePlayerGame.recoveryData();
            }
            startExecuteSceneLoadedEvent.apply(this);
        }
        function startExecuteSceneLoadedEvent() {
            GameGate.gateState = GameGate.STATE_2_START_EXECUTE_IN_SCENE_EVENT;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            var endEvents = [14010, 14004, 14006];
            GameCommand.startCommonCommand(endEvents[inNewSceneState], [], Callback.New(inSceneComplete, this));
        }
        function inSceneComplete() {
            GameGate.gateState = GameGate.STATE_3_IN_SCENE_COMPLETE;
            EventUtils.happen(GameGate, GameGate.EVENT_IN_SCENE_STATE_CHANGE, [inNewSceneState]);
            if (!GameGate.inSceneInited) {
                GameGate.inSceneInited = true;
                GameCommand.startCommonCommand(14002);
            }
            if (inNewSceneState != 2) {
                var sceneCmdTypeIndex = 0;
                var commandPageInScene = Game.currentScene.customCommandPages[sceneCmdTypeIndex];
                var inSceneCmdLength = commandPageInScene.commands.length;
                if (inSceneCmdLength > 0) {
                    var commandTriggerInScene = Game.player.sceneObject.getCommandTrigger(CommandTrigger.COMMAND_MAIN_TYPE_SCENE, sceneCmdTypeIndex, Game.currentScene, Game.player.sceneObject);
                    EventUtils.addEventListener(commandTriggerInScene, CommandTrigger.EVENT_OVER, Callback.New(function () {
                    }, this, []), true);
                    commandPageInScene.startTriggerEvent(commandTriggerInScene);
                }
            }
        }
    };
    GameGate.addPlayerSceneObject = function (so, isEntity, insertNewPostion) {
        if (isEntity === void 0) { isEntity = false; }
        if (insertNewPostion === void 0) { insertNewPostion = true; }
        if (!Game.currentScene)
            return;
        if (!isEntity)
            delete so.player;
        if (insertNewPostion) {
            var newIndex = ArrayUtils.getNullPosition(Game.currentScene.sceneObjects);
            so.index = newIndex;
        }
        var soc = Game.currentScene.addSceneObject(so, isEntity, true);
        Game.player.sceneObject = soc;
        soc.player = Game.player;
    };
    GameGate.EVENT_IN_SCENE_STATE_CHANGE = "GameGateEVENT_SCENE_STATE_CHANGE";
    GameGate.STATE_0_START_EXECUTE_LEAVE_SCENE_EVENT = 0;
    GameGate.STATE_1_START_LOAD_SCENE = 1;
    GameGate.STATE_2_START_EXECUTE_IN_SCENE_EVENT = 2;
    GameGate.STATE_3_IN_SCENE_COMPLETE = 3;
    return GameGate;
}());
//# sourceMappingURL=GameGate.js.map