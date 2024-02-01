import { _decorator, Component, Layout, Node, Prefab, UITransform, Vec3, EventTarget } from 'cc';
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
    private numberOfAliveShips: number = 0;

    public onShipDestroyed(): void {
        this.numberOfAliveShips--;
        console.log('ships alive: ' + this.numberOfAliveShips);

        if (this.numberOfAliveShips <= 0) {
            this.currentEnemyLayout.active = false;
            this.currentEnemyLayout.removeAllChildren();
            this.spawnShipsInLayout();
        }
    }

    protected onLoad(): void {
        this.parentCanvas = this.node.parent;
    }

    protected start(): void {
        this.spawnShipsInLayout();
    }

    private spawnShipsInLayout() {
        this.currentEnemyLayout = this.spawnEnemyShipLayoutNode();

        for (let i = 0; i < this.numberOfShipsToSpawn; i++) {
            let spawnEmptiness = Math.random() < 0.35;
            if (spawnEmptiness) {
                const emptyNode = this.spawnEmptyNode();
            }
            const shipController = this.spawnShip();
        }

        this.numberOfAliveShips = this.numberOfShipsToSpawn;
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
        shipController.setShipSpawner(this);
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


