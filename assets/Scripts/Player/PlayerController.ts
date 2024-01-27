import { _decorator, Component, director, game, instantiate, Node, NodeEventType, Prefab, Vec3 } from 'cc';
import { PlayerModel } from './PlayerModel';
import { PlayerView } from './PlayerView';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController {

    private playerModel: PlayerModel = null;
    private playerView: PlayerView = null;
    private isTouchActive: boolean = false;
    private touchHoldTimer: number = 0;

    constructor(playerViewPrefab: Prefab, playerModel: PlayerModel) {
        this.playerModel = playerModel;

        const playerPrefab = instantiate(playerViewPrefab);
        if (playerPrefab) {
            this.playerView = playerPrefab.getComponent(PlayerView);
            if (this.playerView) {
                this.attachTouchEvents();
            }
        }

        this.playerView.setPlayerController(this);
    }

    public IsTouchActive(): boolean {
        return this.isTouchActive;
    }

    public onTouchStart(event) {
        this.isTouchActive = true;
        this.touchHoldTimer = 0;
        // this.onTouchHoldUpdate();
    }

    public onTouchEnd(event) {
        this.isTouchActive = false;
        this.touchHoldTimer = 0;
    }

    public onTouchMove(event) {
        this.isTouchActive = true;
        if (this.isTouchActive) {
            this.MovePlayer(event);
            // this.onTouchHoldUpdate();
        }
    }

    public onTouchCancel(event) {
        this.isTouchActive = false;
        this.touchHoldTimer = 0;
    }

    private onTouchHoldUpdate() {
        if (this.isTouchActive) {
            this.touchHoldTimer += game.deltaTime;
            if (this.touchHoldTimer > 0.5) {
                this.Fire();
            }
        }
    }

    public getPlayerView(): PlayerView {
        return this.playerView;
    }

    public Fire() {
        console.log("Fire");
    }

    public MovePlayer(event) {
        let deltaX = event.touch.getUILocationX();
        let deltaY = event.touch.getUILocationY();
        let newPos = new Vec3(deltaX, deltaY, 0);
        this.playerView.setPlayerWorldPosition(newPos);
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


