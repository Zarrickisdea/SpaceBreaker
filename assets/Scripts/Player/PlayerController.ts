import { _decorator, Component, director, game, instantiate, Node, NodeEventType, Prefab, Vec3 } from 'cc';
import { PlayerModel } from './PlayerModel';
import { PlayerView } from './PlayerView';
import { StateMachine } from '../State Machine/StateMachine';
import { BulletSpawner } from '../Bullets/BulletSpawner';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController {

    private playerModel: PlayerModel = null;
    private playerView: PlayerView = null;
    private playerStateMachine: StateMachine = null;

    constructor(playerViewPrefab: Prefab, playerModel: PlayerModel) {
        this.playerModel = playerModel;

        const playerPrefab = instantiate(playerViewPrefab);
        if (playerPrefab) {
            this.playerView = playerPrefab.getComponent(PlayerView);
            if (this.playerView) {
                this.attachTouchEvents();
            }
        }

        this.playerModel.setPlayerController(this);
        this.playerModel.initializeStates();

        this.playerStateMachine = new StateMachine();
        this.playerStateMachine.initialize(this.playerModel.getCurrentState());

        this.playerView.setPlayerController(this);
    }

    public onTouchStart(event) {
        this.playerStateMachine.getCurrentState().touchStart(event);
    }

    public onTouchEnd(event) {
        this.playerStateMachine.getCurrentState().touchEnd(event);
    }

    public onTouchMove(event) {
        this.playerStateMachine.getCurrentState().touchMove(event);
    }

    public onTouchCancel(event) {
        this.playerStateMachine.getCurrentState().touchCancel(event);
    }

    public getPlayerView(): PlayerView {
        return this.playerView;
    }

    public getPlayerModel(): PlayerModel {
        return this.playerModel;
    }

    public getBulletSpawner(): BulletSpawner{
        return this.playerView.getBulletSpawner();
    }

    public changeState(PlayerBaseState) {
        this.playerStateMachine.changeState(PlayerBaseState);
    }

    private attachTouchEvents(): void {
        const touchEvents = [
            { eventType: NodeEventType.TOUCH_START, handler: this.onTouchStart },
            { eventType: NodeEventType.TOUCH_MOVE, handler: this.onTouchMove },
            { eventType: NodeEventType.TOUCH_END, handler: this.onTouchEnd },
            { eventType: NodeEventType.TOUCH_CANCEL, handler: this.onTouchCancel },
        ];
    
        for (const event of touchEvents) {
            this.playerView.node.on(event.eventType, event.handler, this);
        }
    }
}


