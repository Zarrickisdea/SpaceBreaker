import { _decorator, Component, Node, Vec3 } from 'cc';
import { ShipController } from './ShipController';
const { ccclass, property } = _decorator;

@ccclass('ShipView')
export class ShipView extends Component {

    private shipController: ShipController = null;

    public setShipController(shipController: ShipController): void {
        this.shipController = shipController;
    }

    public setShipPosition(position: Vec3): void {
        this.node.setPosition(position);
    }

    public setShipWorldPosition(position: Vec3): void {
        this.node.setWorldPosition(position);
    }

    public setShipParent(parent: Node): void {
        this.node.setParent(parent);
    }

    public setParentCanvas(parentCanvas: Node): void {
        this.node.setParent(parentCanvas);
    }
}


