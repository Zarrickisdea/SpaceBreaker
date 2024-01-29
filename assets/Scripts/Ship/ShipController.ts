import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { ShipView } from './ShipView';
import { ShipModel } from './ShipModel';
import { StateMachine } from '../State Machine/StateMachine';
import { ShipIdleState } from './ShipStates/ShipIdleState';
const { ccclass, property } = _decorator;

@ccclass('ShipController')
export class ShipController {

    private shipView: ShipView = null;
    private shipModel: ShipModel = null;

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

    public fireBullet(): void {
        this.shipView.getBulletSpawner().getBullet().FireBullet(this.direction, 2, 'expoIn');
    }

    public changeState(newState: string): void {
        this.shipStateMachine.changeState(this.shipModel.getState(newState));
    }

    public update(deltaTime: number): void {
        this.shipStateMachine.getCurrentState().update(deltaTime);
    }
}


