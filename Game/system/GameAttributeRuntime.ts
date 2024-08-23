class WorldData {
    static readonly screenMode: number; // = 0; 移动端屏幕布局模式
    static readonly saveFileMax: number; // = 10; 存档总数
    static readonly bornScene: number; // = 0; 游戏初始场景
    static dialogRecords: DataStructure_dialogRecordInfo[]; // = [];
    static myCG: number[]; // = [];
    static myMusic: string[]; // = [];
    static readonly selectSE: string; // = ""; 光标
    static readonly sureSE: string; // = ""; 确定
    static readonly cancelSE: string; // = ""; 取消
    static readonly disalbeSE: string; // = ""; 禁用
    static readonly dialogSE: string; // = ""; 文本播放音效
}
class PlayerData {
    sceneObject: SceneObject;
}