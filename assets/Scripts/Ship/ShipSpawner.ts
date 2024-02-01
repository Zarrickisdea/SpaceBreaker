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

    public onShipDestroyed(ship: Node): void {
        this.numberOfAliveShips--;
        console.log(this.currentEnemyLayout.children);
        console.log(this.numberOfAliveShips + this.numberOfShipsToSpawn);

        this.currentEnemyLayout.removeChild(ship);
        this.currentEnemyLayout.getComponent(Layout).updateLayout();

        if (this.numberOfAliveShips <= 0) {
            console.log('all ships destroyed');
            setTimeout(() => {
                this.currentEnemyLayout.removeAllChildren();
            }, 1);
            setTimeout(() => {
                this.spawnShipsInLayout();
            }, 5);
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
        console.log('current enemy layout: ' + this.currentEnemyLayout.name);

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
        console.log('getting random layout node');
        const randomIndex = Math.floor(Math.random() * this.enemyLayouts.length);
        if(!this.enemyLayouts[randomIndex].activeInHierarchy) {
            return this.enemyLayouts[randomIndex];
        }
    }

    private spawnEnemyShipLayoutNode(): Node {
        console.log('spawning enemy ship layout node');
        const enemyLayoutNode = this.enemyLayouts[0];
        enemyLayoutNode.active = true;
        return enemyLayoutNode;
    }

    private spawnShip(): ShipController {
        console.log('spawning ship');
        const shipViewPrefab = this.getRandomShipViewPrefab();
        console.log('setting hits to kill');
        const hitsToKill = this.getRandomHitsToKill();
        console.log('new ship model');
        const shipModel = new ShipModel(hitsToKill);
        console.log('new ship controller');
        const shipController = new ShipController(shipViewPrefab, shipModel);
        console.log('setting ship parent steps');
        console.log('update layout');
        this.currentEnemyLayout.getComponent(Layout).updateLayout();
        console.log('set ship parent');
        console.log(shipController.getShipView());
        console.log(this.currentEnemyLayout);
        shipController.getShipView().setShipParent(this.currentEnemyLayout);
        console.log('update layout');
        this.currentEnemyLayout.getComponent(Layout).updateLayout();
        shipController.setShipSpawner(this);
        return shipController;
    }

    private spawnEmptyNode(): Node {
        console.log('spawning empty node');
        const emptyNode = new Node();
        emptyNode.layer = this.currentEnemyLayout.layer;
        let transform = emptyNode.addComponent(UITransform);
        transform.height = 36;
        transform.width = 72;
        emptyNode.setParent(this.currentEnemyLayout);
        return emptyNode;
    }
}


