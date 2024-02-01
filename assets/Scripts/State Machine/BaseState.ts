import { _decorator } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseState')
export abstract class BaseState {

    protected stateTimer: number = 0;

    public enter() { }
    public exit() { }
}


