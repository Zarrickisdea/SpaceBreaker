import { _decorator, Component, Node } from 'cc';
import { BaseState } from './BaseState';
const { ccclass, property } = _decorator;

@ccclass('StateMachine')
export class StateMachine {
    private currentState: BaseState = null;

    public initialize(startingState: BaseState) {
        this.currentState = startingState;
        this.currentState.enter();
    }

    public changeState(newState: BaseState) {
        if (this.currentState) {
            this.currentState.exit();
        }

        this.currentState = newState;
        this.currentState.enter();
    }

    public getCurrentState(): BaseState {
        return this.currentState;
    }
}


