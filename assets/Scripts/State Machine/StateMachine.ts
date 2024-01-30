import { _decorator, Component, Node } from 'cc';
import { BaseState } from './BaseState';
const { ccclass, property } = _decorator;

@ccclass('StateMachine')
export class StateMachine {
    private currentState: any = null;

    public initialize(startingState: any) {
        this.currentState = startingState;
        this.currentState.enter();
    }

    public changeState(newState: any) {
        if (this.currentState) {
            this.currentState.exit();
        }

        this.currentState = newState;
        this.currentState.enter();
    }

    public getCurrentState(): any {
        return this.currentState;
    }
}


