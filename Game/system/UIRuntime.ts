/**
 * 该文件为GameCreator编辑器自动生成的代码，请勿修改
 */

/**
 * 1-标题界面 [BASE]
 */
class GUI_1 extends GUI_BASE {
   界面背景:UIBitmap;
   标题内容容器:UIRoot;
   标题:UIString;
   标题装饰:UIString;
   渐变底色:UIBitmap;
   开始游戏按钮:UIButton;
   设置容器:UIRoot;
   图标:UIBitmap;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;

   constructor(){
      super(1);
   }
}
class ListItem_1 extends UIListItemData {
   界面背景:string;
   标题:string;
   标题装饰:string;
   渐变底色:string;
   图标:string;

}

/**
 * 2-读档界面 [BASE]
 */
class GUI_2 extends GUI_BASE {
   通用背景:GUI_15;
   list:UIList; // Item=1001
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   设置容器:UIRoot;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   选中的线:UIBitmap;
   标题:UIString;
   constructor(){
      super(2);
   }
}
class ListItem_2 extends UIListItemData {
   通用背景:number;
   list:UIListItemData[];
   底色:string;
   图标:string;
   选中的线:string;
   标题:string;
}

/**
 * 3-对话菜单 [BASE]
 */
class GUI_3 extends GUI_BASE {
   黑色底色:UIBitmap;
   constructor(){
      super(3);
   }
}
class ListItem_3 extends UIListItemData {
   黑色底色:string;
}

/**
 * 4-聊天主界面 [BASE]
 */
class GUI_4 extends GUI_BASE {
   background:UIBitmap;
   dialogList:UIRoot;
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   设置容器:UIRoot;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   title:UIString;
   constructor(){
      super(4);
   }
}
class ListItem_4 extends UIListItemData {
   background:string;
   底色:string;
   图标:string;
   title:string;
}

/**
 * 5-存档界面 [BASE]
 */
class GUI_5 extends GUI_BASE {
   通用背景:GUI_15;
   list:UIList; // Item=1001
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   设置容器:UIRoot;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   选中的线:UIBitmap;
   标题:UIString;
   constructor(){
      super(5);
   }
}
class ListItem_5 extends UIListItemData {
   通用背景:number;
   list:UIListItemData[];
   底色:string;
   图标:string;
   选中的线:string;
   标题:string;
}

/**
 * 6-系统设置 [BASE]
 */
class GUI_6 extends GUI_BASE {
   通用背景:GUI_15;
   容器:UIRoot;
   设置容器:UIRoot;
   背景音乐音量文本:UIString;
   bgmSlider:UISlider;
   环境音效音量文本:UIString;
   bgsSlider:UISlider;
   音效音量文本:UIString;
   seSlider:UISlider;
   语音音量文本:UIString;
   tsSlider:UISlider;
   全屏勾选框:UISwitch;
   全屏文本:UIString;
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   选中的线:UIBitmap;
   标题:UIString;
   constructor(){
      super(6);
   }
}
class ListItem_6 extends UIListItemData {
   通用背景:number;
   背景音乐音量文本:string;
   bgmSlider:number;
   环境音效音量文本:string;
   bgsSlider:number;
   音效音量文本:string;
   seSlider:number;
   语音音量文本:string;
   tsSlider:number;
   全屏勾选框:number;
   全屏文本:string;
   底色:string;
   图标:string;
   选中的线:string;
   标题:string;
}

/**
 * 7-文本输入界面 [BASE]
 */
class GUI_7 extends GUI_BASE {
   黑色底色:UIBitmap;
   底色:UIBitmap;
   input:UIInput;
   提交输入按钮:UIButton;
   constructor(){
      super(7);
   }
}
class ListItem_7 extends UIListItemData {
   黑色底色:string;
   底色:string;
   input:string;

}

/**
 * 8-数字输入界面 [BASE]
 */
class GUI_8 extends GUI_BASE {
   黑色底色:UIBitmap;
   底色:UIBitmap;
   input:UIInput;
   提交输入按钮:UIButton;
   constructor(){
      super(8);
   }
}
class ListItem_8 extends UIListItemData {
   黑色底色:string;
   底色:string;
   input:string;

}

/**
 * 9-密码输入界面 [BASE]
 */
class GUI_9 extends GUI_BASE {
   黑色底色:UIBitmap;
   底色:UIBitmap;
   input:UIInput;
   提交输入按钮:UIButton;
   constructor(){
      super(9);
   }
}
class ListItem_9 extends UIListItemData {
   黑色底色:string;
   底色:string;
   input:string;

}

/**
 * 10-游戏结束界面 [BASE]
 */
class GUI_10 extends GUI_BASE {
   通用背景:GUI_15;
   GameOver文本:UIString;
   constructor(){
      super(10);
   }
}
class ListItem_10 extends UIListItemData {
   通用背景:number;
   GameOver文本:string;
}

/**
 * 11-CG鉴赏 [BASE]
 */
class GUI_11 extends GUI_BASE {
   通用背景:GUI_15;
   cgList:UIList; // Item=1003
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   设置容器:UIRoot;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   选中的线:UIBitmap;
   标题:UIString;
   constructor(){
      super(11);
   }
}
class ListItem_11 extends UIListItemData {
   通用背景:number;
   cgList:UIListItemData[];
   底色:string;
   图标:string;
   选中的线:string;
   标题:string;
}

/**
 * 12-CG鉴赏大图 [BASE]
 */
class GUI_12 extends GUI_BASE {
   透明背景:UIBitmap;
   bigCG:UIBitmap;
   关闭鉴赏大图按钮:UIButton;
   constructor(){
      super(12);
   }
}
class ListItem_12 extends UIListItemData {
   透明背景:string;
   bigCG:string;

}

/**
 * 13-提示框 [BASE]
 */
class GUI_13 extends GUI_BASE {
   透明背景:UIBitmap;
   界面背景:UIBitmap;
   提示框标题文本:UIString;
   提示框内容文本:UIString;
   确定按钮:UIButton;
   取消按钮:UIButton;
   constructor(){
      super(13);
   }
}
class ListItem_13 extends UIListItemData {
   透明背景:string;
   界面背景:string;
   提示框标题文本:string;
   提示框内容文本:string;

}

/**
 * 14-音乐鉴赏 [BASE]
 */
class GUI_14 extends GUI_BASE {
   通用背景:GUI_15;
   立绘:UIStandAvatar;
   界面背景框:UIBitmap;
   musicList:UIList; // Item=1004
   播放进度条:UIRoot;
   timeProgress:UISlider;
   previousBtn:UIButton;
   playCheckBox:UICheckBox;
   timePosition:UIString;
   timeDuration:UIString;
   nextBtn:UIButton;
   状态栏容器:UIRoot;
   底色:UIBitmap;
   退出容器:UIRoot;
   图标:UIBitmap;
   设置容器:UIRoot;
   CG鉴赏容器:UIRoot;
   音乐鉴赏容器:UIRoot;
   读档容器:UIRoot;
   存档容器:UIRoot;
   选中的线:UIBitmap;
   标题:UIString;
   constructor(){
      super(14);
   }
}
class ListItem_14 extends UIListItemData {
   通用背景:number;
   立绘:number;
   界面背景框:string;
   musicList:UIListItemData[];
   timeProgress:number;
   playCheckBox:boolean;
   timePosition:string;
   timeDuration:string;
   底色:string;
   图标:string;
   选中的线:string;
   标题:string;
}

/**
 * 15-通用背景 [BASE]
 */
class GUI_15 extends GUI_BASE {
   溢出隐藏容器:UIRoot;
   界面背景:UIBitmap;
   黑色底色:UIBitmap;
   constructor(){
      super(15);
   }
}
class ListItem_15 extends UIListItemData {
   界面背景:string;
   黑色底色:string;
}

/**
 * 1001-档案Item [BASE]
 */
class GUI_1001 extends GUI_BASE {
   裁剪容器:UIRoot;
   screenshotImg:UIBitmap;
   档案背景:UIBitmap;
   delBtn:UIRoot;
   底色:UIBitmap;
   图标:UIButton;
   sceneName:UIString;
   dateStr:UIString;
   no:UIString;
   gameTimeStr:UIString;
   分割线:UIBitmap;
   constructor(){
      super(1001);
   }
}
class ListItem_1001 extends UIListItemData {
   screenshotImg:string;
   档案背景:string;
   底色:string;
   sceneName:string;
   dateStr:string;
   no:string;
   gameTimeStr:string;
   分割线:string;
}

/**
 * 1002- [BASE]
 */
class GUI_1002 extends GUI_BASE {

   constructor(){
      super(1002);
   }
}
class ListItem_1002 extends UIListItemData {

}

/**
 * 1003-图片鉴赏Item [BASE]
 */
class GUI_1003 extends GUI_BASE {
   背景:UIBitmap;
   裁剪容器:UIRoot;
   cg:UIBitmap;
   constructor(){
      super(1003);
   }
}
class ListItem_1003 extends UIListItemData {
   背景:string;
   cg:string;
}

/**
 * 1004-音乐鉴赏Item [BASE]
 */
class GUI_1004 extends GUI_BASE {
   music:UIString;
   musicSelected:UIString;
   constructor(){
      super(1004);
   }
}
class ListItem_1004 extends UIListItemData {
   music:string;
   musicSelected:string;
}

/**
 * 1005- [BASE]
 */
class GUI_1005 extends GUI_BASE {

   constructor(){
      super(1005);
   }
}
class ListItem_1005 extends UIListItemData {

}

/**
 * 1006- [BASE]
 */
class GUI_1006 extends GUI_BASE {

   constructor(){
      super(1006);
   }
}
class ListItem_1006 extends UIListItemData {

}

/**
 * 1007-左边消息 [BASE]
 */
class GUI_1007 extends GUI_BASE {
   face:UIBitmap;
   background:UIBitmap;
   contentText:UIString;
   contentImage:UIBitmap;
   contentAnimation:UIAnimation;
   speakerName:UIString;
   constructor(){
      super(1007);
   }
}
class ListItem_1007 extends UIListItemData {
   face:string;
   background:string;
   contentText:string;
   contentImage:string;
   contentAnimation:number;
   speakerName:string;
}

/**
 * 1008-右边消息 [BASE]
 */
class GUI_1008 extends GUI_BASE {
   face:UIBitmap;
   background:UIBitmap;
   contentText:UIString;
   contentImage:UIBitmap;
   contentAnimation:UIAnimation;
   speakerName:UIString;
   constructor(){
      super(1008);
   }
}
class ListItem_1008 extends UIListItemData {
   face:string;
   background:string;
   contentText:string;
   contentImage:string;
   contentAnimation:number;
   speakerName:string;
}

/**
 * 1009-系统消息 [BASE]
 */
class GUI_1009 extends GUI_BASE {
   background:UIBitmap;
   contentText:UIString;
   constructor(){
      super(1009);
   }
}
class ListItem_1009 extends UIListItemData {
   background:string;
   contentText:string;
}

/**
 * 1010-角色信息 [BASE]
 */
class GUI_1010 extends GUI_BASE {
   通用背景:GUI_15;
   face:UIBitmap;
   nameLabel:UIString;
   infoLabel:UIString;
   状态栏容器:UIRoot;
   底色:UIBitmap;
   backBtn:UIRoot;
   图标:UIBitmap;
   标题:UIString;
   constructor(){
      super(1010);
   }
}
class ListItem_1010 extends UIListItemData {
   通用背景:number;
   face:string;
   nameLabel:string;
   infoLabel:string;
   底色:string;
   图标:string;
   标题:string;
}

/**
 * 1011-图片放大界面 [BASE]
 */
class GUI_1011 extends GUI_BASE {
   图片:UIBitmap;
   constructor(){
      super(1011);
   }
}
class ListItem_1011 extends UIListItemData {
   图片:string;
}

/**
 * 2001-启动载入界面 [BASE]
 */
class GUI_2001 extends GUI_BASE {
   界面背景:UIBitmap;
   黑色遮罩:UIBitmap;
   标题内容容器:UIRoot;
   标题:UIString;
   标题装饰:UIString;
   loadingComp:UISlider;
   进度数值容器:UIRoot;
   进度数值:UIString;
   进度文本:UIString;
   constructor(){
      super(2001);
   }
}
class ListItem_2001 extends UIListItemData {
   界面背景:string;
   黑色遮罩:string;
   标题:string;
   标题装饰:string;
   loadingComp:number;
   进度文本:string;
}

/**
 * 2002-新游戏载入界面 [BASE]
 */
class GUI_2002 extends GUI_BASE {
   背景裁切容器:UIRoot;
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2002);
   }
}
class ListItem_2002 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2003-读档载入界面 [BASE]
 */
class GUI_2003 extends GUI_BASE {
   背景裁切容器:UIRoot;
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2003);
   }
}
class ListItem_2003 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2004-场景载入界面 [BASE]
 */
class GUI_2004 extends GUI_BASE {
   背景裁切容器:UIRoot;
   界面背景:UIBitmap;
   加载动画:UIAnimation;
   constructor(){
      super(2004);
   }
}
class ListItem_2004 extends UIListItemData {
   界面背景:string;
   加载动画:number;
}

/**
 * 2005-返回标题时过渡界面 [BASE]
 */
class GUI_2005 extends GUI_BASE {
   背景裁切容器:UIRoot;
   界面背景:UIBitmap;
   constructor(){
      super(2005);
   }
}
class ListItem_2005 extends UIListItemData {
   界面背景:string;
}

/**
 * 2006-打开界面载入 [BASE]
 */
class GUI_2006 extends GUI_BASE {
   loadingComp:UISlider;
   进度数值容器:UIRoot;
   进度数值:UIString;
   进度文本:UIString;
   constructor(){
      super(2006);
   }
}
class ListItem_2006 extends UIListItemData {
   loadingComp:number;
   进度文本:string;
}

/**
 * 3001-我的界面示例 [BASE]
 */
class GUI_3001 extends GUI_BASE {
   图片:UIBitmap;
   按钮:UIButton;
   文本:UIString;
   constructor(){
      super(3001);
   }
}
class ListItem_3001 extends UIListItemData {
   图片:string;
   文本:string;
}

/**
 * 3002- [BASE]
 */
class GUI_3002 extends GUI_BASE {

   constructor(){
      super(3002);
   }
}
class ListItem_3002 extends UIListItemData {

}

/**
 * 3003- [BASE]
 */
class GUI_3003 extends GUI_BASE {

   constructor(){
      super(3003);
   }
}
class ListItem_3003 extends UIListItemData {

}

/**
 * 3004- [BASE]
 */
class GUI_3004 extends GUI_BASE {

   constructor(){
      super(3004);
   }
}
class ListItem_3004 extends UIListItemData {

}

/**
 * 3005- [BASE]
 */
class GUI_3005 extends GUI_BASE {

   constructor(){
      super(3005);
   }
}
class ListItem_3005 extends UIListItemData {

}

/**
 * 15001- [BASE]
 */
class GUI_15001 extends GUI_BASE {

   constructor(){
      super(15001);
   }
}
class ListItem_15001 extends UIListItemData {

}
GameUI["__compCustomAttributes"] = {"UIRoot":["enabledLimitView","scrollShowType","hScrollBar","hScrollBg","vScrollBar","vScrollBg","scrollWidth","slowmotionType","enabledWheel","hScrollValue","vScrollValue"],"UIButton":["label","image1","grid9img1","image2","grid9img2","image3","grid9img3","fontSize","color","overColor","clickColor","bold","italic","smooth","align","valign","letterSpacing","font","textDx","textDy","textStroke","textStrokeColor"],"UIBitmap":["image","grid9","flip","isTile","pivotType"],"UIString":["text","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor","onChangeFragEvent"],"UIVariable":["varID","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor","onChangeFragEvent"],"UICustomGameNumber":["customData","previewNum","previewFixed","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor"],"UICustomGameString":["customData","inEditorText","fontSize","color","bold","italic","smooth","align","valign","leading","letterSpacing","font","wordWrap","overflow","shadowEnabled","shadowColor","shadowDx","shadowDy","stroke","strokeColor"],"UIAvatar":["avatarID","scaleNumberX","scaleNumberY","orientationIndex","avatarFPS","playOnce","isPlay","avatarFrame","actionID","avatarHue"],"UIStandAvatar":["avatarID","actionID","scaleNumberX","scaleNumberY","flip","playOnce","isPlay","avatarFrame","avatarFPS","avatarHue"],"UIAnimation":["animationID","scaleNumberX","scaleNumberY","aniFrame","playFps","playType","showHitEffect","silentMode"],"UIInput":["text","fontSize","color","prompt","promptColor","bold","italic","smooth","align","leading","font","wordWrap","restrict","inputMode","maxChars","shadowEnabled","shadowColor","shadowDx","shadowDy","onInputFragEvent","onEnterFragEvent"],"UICheckBox":["selected","image1","grid9img1","image2","grid9img2","onChangeFragEvent"],"UISwitch":["selected","image1","grid9img1","image2","grid9img2","previewselected","onChangeFragEvent"],"UITabBox":["selectedIndex","itemImage1","grid9img1","itemImage2","grid9img2","itemWidth","itemHeight","items","rowMode","spacing","labelSize","labelColor","labelFont","labelBold","labelItalic","smooth","labelAlign","labelValign","labelLetterSpacing","labelSelectedColor","labelDx","labelDy","labelStroke","labelStrokeColor","onChangeFragEvent"],"UISlider":["image1","bgGrid9","image2","blockGrid9","image3","blockFillGrid9","step","min","max","value","transverseMode","blockFillMode","blockPosMode","fillStrething","isBindingVarID","bindingVarID","onChangeFragEvent"],"UIGUI":["guiID","instanceClassName"],"UIList":["itemModelGUI","previewSize","selectEnable","repeatX","itemWidth","itemHeight","spaceX","spaceY","scrollShowType","hScrollBar","hScrollBg","vScrollBar","vScrollBg","scrollWidth","selectImageURL","selectImageGrid9","selectedImageAlpha","selectedImageOnTop","overImageURL","overImageGrid9","overImageAlpha","overImageOnTop","overSelectMode","slowmotionType","onChangeFragEvent1","onChangeFragEvent2"],"UIComboBox":["itemLabels","selectedIndex","bgSkin","bgGrid9","fontSize","color","bold","italic","smooth","align","valign","letterSpacing","font","textDx","textStroke","textStrokeColor","displayItemSize","listScrollBg","listScrollBar","listAlpha","listBgColor","itemHeight","itemFontSize","itemColor","itemBold","itemItalic","itemAlign","itemValign","itemLetterSpacing","itemFont","itemOverColor","itemOverBgColor","itemTextDx","itemTextDy","itemTextStroke","itemTextStrokeColor","onChangeFragEvent"],"UIVideo":["videoURL","playType","volume","playbackRate","currentTime","muted","loop","pivotType","flip","onLoadedFragEvent","onErrorFragEvent","onCompleteFragEvent"]};
