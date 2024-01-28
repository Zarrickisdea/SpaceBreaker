import { _decorator, Component, Node, Prefab } from 'cc';
import { ShipController } from './ShipController';
import { ShipModel } from './ShipModel';
const { ccclass, property } = _decorator;

@ccclass('ShipSpawner')
export class ShipSpawner extends Component {

    @property({ type: Prefab })
    private shipViewPrefabs: Prefab[] = [];

    @property({ range: [1, 3] })
    private minHitsToKill: number = 0;

    @property({ range: [4, 6] })
    private maxHitsToKill: number = 0;

    @property({ type: Node })
    private enemyLayout: Node = null;

    private parentCanvas: Node = null;

    private getRandomHitsToKill(): number {
        return Math.floor(Math.random() * (this.maxHitsToKill - this.minHitsToKill + 1)) + this.minHitsToKill;
    }

    private getRandomShipViewPrefab(): Prefab {
        const randomIndex = Math.floor(Math.random() * this.shipViewPrefabs.length);
        return this.shipViewPrefabs[randomIndex];
    }

    private spawnShip(): ShipController {
        const shipViewPrefab = this.getRandomShipViewPrefab();
        const hitsToKill = this.getRandomHitsToKill();
        const shipModel = new ShipModel(hitsToKill);
        const shipController = new ShipController(shipViewPrefab, shipModel);
        shipController.getShipView().setShipParent(this.enemyLayout);
        // shipController.getShipView().setShipPosition(this.node.position);
        return shipController;
    }

    protected onLoad(): void {
        this.parentCanvas = this.node.parent;
    }

    protected start(): void {
        for (let i = 0; i < 20; i++) {
            this.spawnShip();
        }
    }
}


