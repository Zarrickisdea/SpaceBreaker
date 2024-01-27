import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseState')
export abstract class BaseState {

    public enter() { }
    public exit() { }
    public touchStart() { }
    public touchMove() { }
    public touchEnd() { }
    public touchCancel() { }
}


