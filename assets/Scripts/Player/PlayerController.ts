import { _decorator, instantiate, NodeEventType, Prefab } from 'cc';
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

    private isTouching: boolean = false;
    private direction: number = 0;

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
        this.playerStateMachine.initialize(this.playerModel.getState('Idle'));

        this.playerView.setPlayerController(this);

        this.direction = 1;
    }

    public onTouchStart(event) {
        this.isTouching = true;
        this.playerStateMachine.getCurrentState().touchStart(event);
    }

    public onTouchEnd(event) {
        this.isTouching = false;
        this.playerStateMachine.getCurrentState().touchEnd(event);
    }

    public onTouchMove(event) {
        this.isTouching = true;
        this.playerStateMachine.getCurrentState().touchMove(event);
    }

    public onTouchCancel(event) {
        this.isTouching = false;
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

    public getTouchState(): boolean {
        return this.isTouching;
    }

    public changeState(PlayerBaseState) {
        this.playerStateMachine.changeState(PlayerBaseState);
    }

    public fireBullet(): void {
        this.playerView.getBulletSpawner().getBullet().FireBullet(this.direction);
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


