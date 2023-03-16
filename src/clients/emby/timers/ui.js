const uiTimerKey = '_ui_watcher';
const check_interval = 200;

export default function () {
    if (!window.ddd.timers[uiTimerKey]) {
        window.ddd.timers[uiTimerKey] = setInterval(() => {
            window.ddd.client.initUI();
        }, check_interval);
    }
}
