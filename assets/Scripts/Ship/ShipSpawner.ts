import { _decorator, Component, Layout, Node, Prefab, UITransform, Vec3 } from 'cc';
import { ShipController } from './ShipController';
import { ShipModel } from './ShipModel';
const { ccclass, property } = _decorator;

@ccclass('ShipSpawner')
export class ShipSpawner extends Component {

    @property({ type: Prefab })
    private shipViewPrefabs: Prefab[] = [];

    @property({ range: [3, 5] })
    private minHitsToKill: number = 0;

    @property({ range: [6, 10] })
    private maxHitsToKill: number = 0;

    @property({ type: Node })
    private enemyLayouts: Node[] = [];

    @property
    private numberOfShipsToSpawn: number = 0;

    private parentCanvas: Node = null;
    private currentEnemyLayout: Node = null;

    protected onLoad(): void {
        this.parentCanvas = this.node.parent;
    }

    protected start(): void {
        this.currentEnemyLayout = this.spawnEnemyShipLayoutNode();

        for (let i = 0; i < this.numberOfShipsToSpawn; i++) {
            let spawnEmptiness = Math.random() < 0.35;
            if (spawnEmptiness) {
                const emptyNode = this.spawnEmptyNode();
            }
            const shipController = this.spawnShip();
        }
    }

    private getRandomHitsToKill(): number {
        return Math.floor(Math.random() * (this.maxHitsToKill - this.minHitsToKill + 1)) + this.minHitsToKill;
    }

    private getRandomShipViewPrefab(): Prefab {
        const randomIndex = Math.floor(Math.random() * this.shipViewPrefabs.length);
        return this.shipViewPrefabs[randomIndex];
    }

    private getRandomLayoutNode(): Node {
        const randomIndex = Math.floor(Math.random() * this.enemyLayouts.length);
        if(!this.enemyLayouts[randomIndex].activeInHierarchy) {
            return this.enemyLayouts[randomIndex];
        } else {
            return this.getRandomLayoutNode();
        }
    }

    private spawnEnemyShipLayoutNode(): Node {
        const enemyLayoutNode = this.getRandomLayoutNode();
        enemyLayoutNode.active = true;
        return enemyLayoutNode;
    }

    private spawnShip(): ShipController {
        const shipViewPrefab = this.getRandomShipViewPrefab();
        const hitsToKill = this.getRandomHitsToKill();
        const shipModel = new ShipModel(hitsToKill);
        const shipController = new ShipController(shipViewPrefab, shipModel);
        this.currentEnemyLayout.getComponent(Layout).updateLayout();
        shipController.getShipView().setShipParent(this.currentEnemyLayout);
        this.currentEnemyLayout.getComponent(Layout).updateLayout();
        // console.log('layout');
        // console.log(shipController.getShipView().node.worldPosition);
        // let localPosition = shipController.getShipView().node.worldPosition;
        // shipController.getShipView().setShipParent(this.parentCanvas);
        // shipController.getShipView().setShipWorldPosition(new Vec3(localPosition.x, localPosition.y, localPosition.z));
        // console.log('canvas');
        // console.log(shipController.getShipView().node.worldPosition);
        return shipController;
    }

    private spawnEmptyNode(): Node {
        const emptyNode = new Node();
        emptyNode.layer = this.currentEnemyLayout.layer;
        let transform = emptyNode.addComponent(UITransform);
        transform.height = 36;
        transform.width = 72;
        emptyNode.setParent(this.currentEnemyLayout);
        return emptyNode;
    }
}


