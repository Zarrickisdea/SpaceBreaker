import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseState')
export abstract class BaseState {

    protected stateTimer: number = 0;

    public enter() { }
    public exit() { }
    public touchStart(event) { }
    public touchMove(event) { }
    public touchEnd(event) { }
    public touchCancel(event) { }
}


