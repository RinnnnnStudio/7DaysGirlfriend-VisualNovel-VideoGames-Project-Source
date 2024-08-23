/**
 * 项目层工具类
 * Created by 黑暗之神KDS on 2020-09-13 22:48:37.
 */
class ProjectUtils {
    // 最近的鼠标滚动值
    static mouseWhileValue: number = 0;
    /**
     * 回调函数辅助者：重用实例
     */
    static callbackHelper: Callback = new Callback;
    /**
     * 点辅助者：重用实例
     */
    static pointHelper: Point = new Point;
    /**
     * 矩形辅助者：重用实例
     */
    static rectangleHelper: Rectangle = new Rectangle;
    /**
     * 当前按键的事件对象
     */
    static keyboardEvent: EventObject;
    static keyboardEvents: { keyCode: number }[] = [];
    /**
     * 矩形对象池
     */
    private static rectanglePool: PoolUtils = new PoolUtils(Rectangle);
    //------------------------------------------------------------------------------------------------------
    // 初始化
    //------------------------------------------------------------------------------------------------------
    static init() {
        // 鼠标滚动值
        stage.on(EventObject.MOUSE_WHEEL, this, (e: EventObject) => { ProjectUtils.mouseWhileValue = e.delta; });
        // 注册键盘点击事件
        stage.on(EventObject.KEY_DOWN, this, (e: EventObject) => { this.keyboardEvent = e; if (ArrayUtils.matchAttributes(this.keyboardEvents, { keyCode: e.keyCode }, true).length == 0) { this.keyboardEvents.push({ keyCode: e.keyCode } as any); } });
        // 注册键盘弹起事件
        stage.on(EventObject.KEY_UP, this, (e: EventObject) => { ArrayUtils.remove(this.keyboardEvents, ArrayUtils.matchAttributes(this.keyboardEvents, { keyCode: e.keyCode }, true)[0]); this.keyboardEvent = null; });
    }
    //------------------------------------------------------------------------------------------------------
    // Rectangle
    //------------------------------------------------------------------------------------------------------
    /**
     * 创建Rectangle
     */
    static takeoutRect(): Rectangle {
        return ProjectUtils.rectanglePool.takeout();
    }
    /**
     * 返还Rectangle
     * @param rect 
     */
    static freeRect(rect: Rectangle): void {
        ProjectUtils.rectanglePool.free(rect);
    }
    //------------------------------------------------------------------------------------------------------
    // 时间
    //------------------------------------------------------------------------------------------------------
    /**
     * 格式化日期
     * @param fmt 格式化字符串规格 如 "YYYY-mm-dd HH:MM"
     * @param date 
     * @return [String] 
     */
    static dateFormat(fmt: string, date: Date): string {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    }
    /**
     * 格式化计时器
     * @param time 时间段（毫秒）
     * @return [string] 
     */
    static timerFormat(time: number): string {
        let S = 1000;
        let M = S * 60;
        let H = M * 60;
        let hTotal = Math.floor(time / H);
        let hStr = MathUtils.fixIntDigit(hTotal, 2);
        time -= H * hTotal;
        let mTotal = Math.floor(time / M);
        let mStr = MathUtils.fixIntDigit(mTotal, 2);
        time -= M * mTotal;
        let sTotal = Math.floor(time / S);
        let sStr = MathUtils.fixIntDigit(sTotal, 2);
        return hStr + ":" + mStr + ":" + sStr;
    }
}