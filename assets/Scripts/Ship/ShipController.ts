import { _decorator, Component, Node, Prefab, instantiate, EventTarget, director } from 'cc';
import { ShipView } from './ShipView';
import { ShipModel } from './ShipModel';
import { StateMachine } from '../State Machine/StateMachine';
import { ShipBaseState } from './ShipStates/ShipBaseState';
import { ShipSpawner } from './ShipSpawner';
const { ccclass, property } = _decorator;;

@ccclass('ShipController')
export class ShipController {

    private shipView: ShipView = null;
    private shipModel: ShipModel = null;
    private shipSpawner: ShipSpawner = null;

    private shipStateMachine: StateMachine = null;

    private direction: number = 0;

    constructor(shipViewPrefab: Prefab, shipModel: ShipModel) {
        this.shipModel = shipModel;
        const shipPrefab = instantiate(shipViewPrefab);
        if (shipPrefab) {
            this.shipView = shipPrefab.getComponent(ShipView);
        }
        this.shipModel.setShipController(this);
        this.shipModel.initializeStates();

        this.shipStateMachine = new StateMachine();
        this.shipStateMachine.initialize(this.shipModel.getState('Idle'));

        this.shipView.setShipController(this);

        this.direction = -1;
    }

    public getShipView(): ShipView {
        return this.shipView;
    }

    public getShipModel(): ShipModel {
        return this.shipModel;
    }

    public getShipSpawner(): ShipSpawner {
        return this.shipSpawner;
    }

    public setShipSpawner(shipSpawner: ShipSpawner): void {
        this.shipSpawner = shipSpawner;
    }

    public setViewStatus(status: boolean): void {
        this.shipView.node.active = status;
    }

    public fireBullet(): void {
        // console.log('Firing bullet from: ' + this.shipView.node.name);
        this.shipView.getBulletSpawner().getBullet().FireBullet(this.direction, 3, 'fade');
    }

    public ShipDestroyedEvent(): void {
        this.shipSpawner.onShipDestroyed(this.shipView.node);
    }

    public getCurrentState(): ShipBaseState {
        return this.shipStateMachine.getCurrentState();
    }

    public changeState(newState: ShipBaseState): void {
        this.shipStateMachine.changeState(newState);
    }

    public stopAllStates(): void {
        this.shipModel.setStatesInactive();
    }

    public onHit(): void {
        let hitPoints = this.shipModel.getHitsToKill();
        this.shipModel.setHitsToKill(hitPoints - 1);
    }

    public checkIfDead(): boolean {
        return this.shipModel.getHitsToKill() <= 0;
    }

    public update(deltaTime: number): void {
        if (this.shipStateMachine.getCurrentState()) {
            this.shipStateMachine.getCurrentState().update(deltaTime);
        }
    }
}


