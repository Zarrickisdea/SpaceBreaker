import { _decorator, Component, director, Node, randomRange, randomRangeInt } from 'cc';
import { ShipView } from '../Ship/ShipView';
const { ccclass, property } = _decorator;

@ccclass('ButtonTest')
export class ButtonTest extends Component {

    private shipsAttachedToParent: Node[] = [];

    protected onLoad(): void {
        this.shipsAttachedToParent = this.node.parent.children;    
    }

    public setPositionTest(): void {
        let i = randomRangeInt(0, this.shipsAttachedToParent.length);
        let shipView = this.shipsAttachedToParent[i].getComponent(ShipView);
        if (shipView) {
            let relativeWorldPosition = shipView.node.worldPosition;
            console.log(relativeWorldPosition);
            shipView.setShipParent(director.getScene().getChildByName('Canvas'));
            shipView.setShipWorldPosition(relativeWorldPosition);
        }
    }
}


