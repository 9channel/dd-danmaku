const uiTimerKey = '_ui_watcher';

export default function () {
    if (!window.ddd.timers[uiTimerKey]) {
        window.ddd.timers[uiTimerKey] = setInterval(() => {
            window.ddd.client.initUI();
        }, check_interval);
    }
}
