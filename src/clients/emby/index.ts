import { Client } from ".."; 

export class EmbyClient extends Client {

    /* 初始化入口 */
    init() {
        this.initWatcher();
    }
    initWatcher() {
        throw new Error('Method not implemented.');
    }

    initUI() {

        throw new Error('Method not implemented.');
    }
    createButton() {
        throw new Error('Method not implemented.');
    }
    getElementsByInnerText() {
        throw new Error('Method not implemented.');
    }
}
