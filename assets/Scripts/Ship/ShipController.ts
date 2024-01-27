import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { ShipView } from './ShipView';
import { ShipModel } from './ShipModel';
const { ccclass, property } = _decorator;

@ccclass('ShipController')
export class ShipController {

    private shipView: ShipView = null;
    private shipModel: ShipModel = null;

    constructor(shipViewPrefab: Prefab, shipModel: ShipModel) {
        this.shipModel = shipModel;
        const shipPrefab = instantiate(shipViewPrefab);
        if (shipPrefab) {
            this.shipView = shipPrefab.getComponent(ShipView);
        }
        this.shipView.setShipController(this);
    }

    public getShipView(): ShipView {
        return this.shipView;
    }
}


