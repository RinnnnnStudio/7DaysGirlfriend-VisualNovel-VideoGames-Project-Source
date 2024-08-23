/**
 * 该文件为GameCreator编辑器自动生成的代码，请勿修改
 */
/**
* 自定义指令 1-预加载资源
*/
class CustomCommandParams_1 {
    preloadAssets: DataStructure_preloadAsset[]; // = [];
    isShowLoadingUI: boolean; // = false; 显示加载界面
    bindingUI: { uiID: number, compName:string, compID:string, varName:string }; // 加载组件
}
/**
* 自定义指令 2-等待玩家输入文本
*/
class CustomCommandParams_2 {
    inputUI: number; // = 8; 弹出的界面
    defText: string; // = ""; 默认文本
    defTextVarID: number; // = 1; 默认文本
    useVar: number; // = 0; 模式
}
/**
* 自定义指令 3-按键事件
*/
class CustomCommandParams_3 {
    type: number; // = 0; 生命周期
    isMulKey: number; // = 0;
    recordListen: boolean; // = false; 记录监听
    key: number; // = 0; 按键
    systemKey: number; // = 0; 系统按键
    evType: number; // = 0; 类别
    evType2: number; // = 0; 类别
    keys: number[]; // = [];
    systemKeys: number[]; // = [];
    CTRL: boolean; // = false;
    SHIFT: boolean; // = false;
    ALT: boolean; // = false;
    eventPage: string; // = ""; 执行
    recordListenVar: number; // = 1; 记录至
}
/**
* 自定义指令 4-鼠标事件
*/
class CustomCommandParams_4 {
    type: number; // = 0; 生命周期
    mouseType: number; // = 0; 鼠标
    eventPage: string; // = ""; 执行
    recordListen: boolean; // = false; 记录监听
    recordListenVar: number; // = 1; 记录至
}
/**
* 自定义指令 5-取消按键事件
*/
class CustomCommandParams_5 {
    recordListenVar: number; // = 1; 指定监听按键的标识
}
/**
* 自定义指令 6-取消鼠标事件
*/
class CustomCommandParams_6 {
    recordListenVar: number; // = 1; 指定监听鼠标的标识
}
/**
* 自定义指令 7-获得鉴赏图片
*/
class CustomCommandParams_7 {
    cg: number; // = 1; CG鉴赏图
}
/**
* 自定义指令 8-获得鉴赏音乐
*/
class CustomCommandParams_8 {
    bgm: string; // = ""; 选择
}
/**
* 自定义指令 9-
*/
class CustomCommandParams_9 {
}
/**
* 自定义指令 10-
*/
class CustomCommandParams_10 {
}
/**
* 自定义指令 11-提交信息
*/
class CustomCommandParams_11 {
    messages: DataStructure_inputMessage[]; // = [];
}
/**
* 自定义指令 2001-发送消息
*/
class CustomCommandParams_2001 {
    useVar: number; // = 0; 模式
    actor: number; // = 1; 角色
    actorVarID: number; // = 1; 角色
    mode: number; // = 0; 位置
    content: string; // = ""; 内容
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2002-发送图片
*/
class CustomCommandParams_2002 {
    useVar: number; // = 0; 模式
    actor: number; // = 1; 角色
    actorVarID: number; // = 1; 角色
    mode: number; // = 0; 位置
    content: string; // = ""; 图片
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2003-发送动画
*/
class CustomCommandParams_2003 {
    useVar: number; // = 0; 模式
    actor: number; // = 1; 角色
    actorVarID: number; // = 1; 角色
    mode: number; // = 0; 位置
    content: number; // = 1; 动画
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2004-发送语音消息
*/
class CustomCommandParams_2004 {
    useVar: number; // = 0; 模式
    actor: number; // = 1; 角色
    actorVarID: number; // = 1; 角色
    mode: number; // = 0; 位置
    content: string; // = "1"; 语音
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2005-发送系统消息
*/
class CustomCommandParams_2005 {
    content: string; // = ""; 内容
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2006-发送视频
*/
class CustomCommandParams_2006 {
    useVar: number; // = 0; 模式
    actor: number; // = 1; 角色
    actorVarID: number; // = 1; 角色
    mode: number; // = 0; 位置
    content: string; // = ""; 视频
    continueByClick: boolean; // = true; 点击后继续执行
}
/**
* 自定义指令 2007-
*/
class CustomCommandParams_2007 {
}
/**
* 自定义指令 2008-
*/
class CustomCommandParams_2008 {
}
/**
* 自定义指令 2009-清理消息
*/
class CustomCommandParams_2009 {
}
/**
* 自定义指令 2010-更换背景
*/
class CustomCommandParams_2010 {
    content: string; // = ""; 背景
    continueByClick: boolean; // = true; 点击后继续执行
    time: number; // = 0.3; 变化时间
}
/**
* 自定义指令 2011-更换标题
*/
class CustomCommandParams_2011 {
    title: string; // = ""; 标题内容
}
/**
* 自定义指令 3001-
*/
class CustomCommandParams_3001 {
}
/**
* 自定义指令 3002-
*/
class CustomCommandParams_3002 {
}
/**
* 自定义指令 3003-
*/
class CustomCommandParams_3003 {
}
/**
* 自定义指令 3004-
*/
class CustomCommandParams_3004 {
}
/**
* 自定义指令 3005-
*/
class CustomCommandParams_3005 {
}
/**
* 自定义指令 3006-
*/
class CustomCommandParams_3006 {
}
/**
* 自定义指令 3007-
*/
class CustomCommandParams_3007 {
}
/**
* 自定义指令 3008-
*/
class CustomCommandParams_3008 {
}
/**
* 自定义指令 3009-
*/
class CustomCommandParams_3009 {
}
/**
* 自定义指令 3010-显示界面
*/
class CustomCommandParams_3010 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    setAttr: boolean; // = true; 设置属性
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    refObjectEnabled: boolean; // = false; 模拟参考界面
    higher: boolean; // = false; 高级设定
    refObject: number; // = 1; 参考界面
    objectUseVar: boolean; // = false; 界面使用变量
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 缩放使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
}
/**
* 自定义指令 3011-移动界面
*/
class CustomCommandParams_3011 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    timeType: number; // = 1; 变更方式
    time: number; // = 30; 持续帧数
    trans: string; // = ""; 过渡
    dpX: number; // = 0; x
    dpXVar: number; // = 1; x
    dpY: number; // = 0; y
    dpYVar: number; // = 1; y
    dpZ: number; // = 100; z
    dpZVar: number; // = 1; z
    dpScaleX: number; // = 1; 水平缩放
    dpScaleXVar: number; // = 1; 水平缩放
    dpScaleY: number; // = 1; 垂直缩放
    dpScaleYVar: number; // = 1; 垂直缩放
    rotation: number; // = 0; 旋转度
    rotationVar: number; // = 1; 旋转度
    opacity: number; // = 1; 透明度
    opacityVar: number; // = 1; 透明度
    refObjectEnabled: boolean; // = false; 模拟参考界面
    higher: boolean; // = false; 高级设定
    refObject: number; // = 0; 参考界面
    posUseVar: boolean; // = false; 坐标使用变量
    sizeUseVar: boolean; // = false; 尺寸使用变量
    zUseVar: boolean; // = false; 深度使用变量
    opacityUseVar: boolean; // = false; 透明度使用变量
    rotationUseVar: boolean; // = false; 旋转度使用变量
    passageIDUseVar: boolean; // = false; 编号使用变量
    objectUseVar: boolean; // = false; 界面使用变量
}
/**
* 自定义指令 3012-关闭界面
*/
class CustomCommandParams_3012 {
    showType: number; // = 0; 层级
    passageID: number; // = 1; 编号
    passageIDVar: number; // = 1; 编号
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
    passageIDUseVar: boolean; // = false; 编号使用变量
    objectUseVar: boolean; // = false; 界面使用变量
}
/**
* 自定义指令 3013-移动界面内的元件
*/
class CustomCommandParams_3013 {
    changeUIAttr: any; // 修改界面元件
}
/**
* 自定义指令 3014-
*/
class CustomCommandParams_3014 {
}
/**
* 自定义指令 3015-
*/
class CustomCommandParams_3015 {
}
/**
* 自定义指令 3016-
*/
class CustomCommandParams_3016 {
}
/**
* 自定义指令 3017-更换场景
*/
class CustomCommandParams_3017 {
    scene: number; // = 0; 场景
}
/**
* 自定义指令 3018-
*/
class CustomCommandParams_3018 {
}
/**
* 自定义指令 3019-
*/
class CustomCommandParams_3019 {
}
/**
* 自定义指令 3020-等待关闭界面
*/
class CustomCommandParams_3020 {
    useVar: number; // = 0; 类别
    uiID: number; // = 1; 界面
    uiVar: number; // = 1; 界面
}
/**
* 自定义指令 4001-全屏设置
*/
class CustomCommandParams_4001 {
    fullScreen: boolean; // = false; 全屏化
}
/**
* 自定义指令 4002-
*/
class CustomCommandParams_4002 {
}
/**
* 自定义指令 4003-
*/
class CustomCommandParams_4003 {
}
/**
* 自定义指令 4004-
*/
class CustomCommandParams_4004 {
}
/**
* 自定义指令 4005-开始游戏
*/
class CustomCommandParams_4005 {
}
/**
* 自定义指令 4006-存档
*/
class CustomCommandParams_4006 {
    saveType: number; // = 0; 档案类别
    saveID: number; // = 1; 编号
    silenceMode: boolean; // = false; 静默执行
}
/**
* 自定义指令 4007-
*/
class CustomCommandParams_4007 {
}
/**
* 自定义指令 4008-返回标题界面
*/
class CustomCommandParams_4008 {
}
/**
* 自定义指令 4009-
*/
class CustomCommandParams_4009 {
}
/**
* 自定义指令 4010-
*/
class CustomCommandParams_4010 {
}
/**
* 自定义指令 4011-关闭游戏窗口
*/
class CustomCommandParams_4011 {
}
/**
* 自定义指令 4012-设置世界属性
*/
class CustomCommandParams_4012 {
    worldData: CustomCompData; // 世界设定
}
/**
* 自定义指令 5001-播放背景音乐
*/
class CustomCommandParams_5001 {
    bgm: string; // = ""; 选择
    bgmVarID: number; // = 1; 选择
    fadeInTime: number; // = 0; 淡入效果
    fadeInTimeVarID: number; // = 1; 淡入效果
    advanceSetting: boolean; // = false; 高级设置
    bgmUseVar: boolean; // = false; 音乐地址使用变量
    fadeInTimeUseVar: boolean; // = false; 淡入效果使用变量
}
/**
* 自定义指令 5002-停止背景音乐
*/
class CustomCommandParams_5002 {
    fadeOutTime: number; // = 0; 淡出效果
    fadeOutTimeVarID: number; // = 1; 淡出效果
    fadeOutTimeUseVar: boolean; // = false; 使用变量
}
/**
* 自定义指令 5003-播放环境声效
*/
class CustomCommandParams_5003 {
    bgs: string; // = ""; 选择
    bgsVarID: number; // = 1; 选择
    fadeInTime: number; // = 0; 淡入效果
    fadeInTimeVarID: number; // = 1; 淡入效果
    advanceSetting: boolean; // = false; 高级设置
    bgsUseVar: boolean; // = false; 音乐地址使用变量
    fadeInTimeUseVar: boolean; // = false; 淡入效果使用变量
}
/**
* 自定义指令 5004-停止环境声效
*/
class CustomCommandParams_5004 {
    fadeOutTime: number; // = 0; 淡出效果
    fadeOutTimeVarID: number; // = 1; 淡出效果
    fadeOutTimeUseVar: boolean; // = false; 使用变量
}
/**
* 自定义指令 5005-播放音效
*/
class CustomCommandParams_5005 {
    se: string; // = ""; 选择
    seVarID: number; // = 1; 选择
    systemSEType: number; // = 1; 选择
    systemSE: boolean; // = false; 系统音效
    seUseVar: boolean; // = false; 使用变量
}
/**
* 自定义指令 5006-停止音效
*/
class CustomCommandParams_5006 {
}
/**
* 自定义指令 5007-播放语音
*/
class CustomCommandParams_5007 {
    ts: string; // = ""; 选择
    tsVarID: number; // = 1; 选择
    tsUseVar: boolean; // = false; 使用变量
}
/**
* 自定义指令 5008-停止语音
*/
class CustomCommandParams_5008 {
}
/**
* 自定义指令 15001-
*/
class CustomCommandParams_15001 {
}
/**
* 自定义指令 15002-
*/
class CustomCommandParams_15002 {
}
