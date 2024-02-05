import { _decorator, Component, Layout, Node, Prefab, UITransform } from 'cc';
import { ShipController } from './ShipController';
import { ShipModel } from './ShipModel';
import { ScoreKeeper } from '../Score/ScoreKeeper';
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
    private enemyLayouts: Node = null;

    @property
    private numberOfShipsToSpawn: number = 0;

    @property({ type: Node })
    private scoreKeeperNode: Node = null;

    private scoreKeeper: ScoreKeeper = null;
    private currentEnemyLayout: Node = null;
    private numberOfAliveShips: number = 0;

    private emptyNodes: Node[] = [];

    public onShipDestroyed(ship: Node): void {
        if (!this.currentEnemyLayout || !ship) {
            console.log('no current enemy layout or ship');
            return;
        }
        this.numberOfAliveShips--;

        ship.destroy();
        const destroyEmpty = this.emptyNodes.pop();
        if (destroyEmpty) {
            destroyEmpty.destroy();
        }
        this.currentEnemyLayout.getComponent(Layout).updateLayout();

        if (this.numberOfAliveShips <= 0) {
            setTimeout(() => {
                this.spawnShipsInLayout();
            }, 1000);
        }
    }

    public updateScore(): void {
        if (this.scoreKeeper) {
            this.scoreKeeper.addScore();
        }
    }

    protected onLoad(): void {
        this.scoreKeeper = this.scoreKeeperNode.getComponent(ScoreKeeper);

    }

    protected start(): void {
        this.currentEnemyLayout = this.spawnEnemyShipLayoutNode();
        this.spawnShipsInLayout();
    }

    private spawnShipsInLayout() {
        for (let i = 0; i < this.numberOfShipsToSpawn; i++) {
            let spawnEmptiness = Math.random() < 0.35;
            if (spawnEmptiness) {
                const emptyNode = this.spawnEmptyNode();
                this.emptyNodes.push(emptyNode);
            }
            const shipController = this.spawnShip();
        }

        this.numberOfAliveShips = this.numberOfShipsToSpawn;
    }

    private getRandomHitsToKill(): number {
        return Math.floor(Math.random() * (this.maxHitsToKill - this.minHitsToKill + 1)) + this.minHitsToKill;
    }

    private getRandomShipViewPrefab(): Prefab {
        if (this.shipViewPrefabs != null) {
            const randomIndex = Math.floor(Math.random() * this.shipViewPrefabs.length);
            return this.shipViewPrefabs[randomIndex];
        }
    }

    // private getRandomLayoutNode(): Node {
    //     console.log('getting random layout node');
    //     const randomIndex = Math.floor(Math.random() * this.enemyLayouts.length);
    //     if(!this.enemyLayouts[randomIndex].activeInHierarchy) {
    //         return this.enemyLayouts[randomIndex];
    //     }
    // }

    private spawnEnemyShipLayoutNode(): Node {
        if (!this.enemyLayouts) {
            return;
        }
        return this.enemyLayouts;
    }

    private spawnShip(): ShipController {
        const shipViewPrefab = this.getRandomShipViewPrefab();
        const hitsToKill = this.getRandomHitsToKill();
        const shipModel = new ShipModel(hitsToKill);
        if (shipViewPrefab != null) {
            const shipController = new ShipController(shipViewPrefab, shipModel);
            this.currentEnemyLayout?.getComponent(Layout).updateLayout();
            shipController.getShipView().setShipParent(this.currentEnemyLayout);
            this.currentEnemyLayout?.getComponent(Layout).updateLayout();
            shipController.setShipSpawner(this);
            return shipController;
        }
    }

    private spawnEmptyNode(): Node {
        const emptyNode = new Node();
        let transform = emptyNode.addComponent(UITransform);
        transform.height = 36;
        transform.width = 72;
        emptyNode.setParent(this.currentEnemyLayout);
        return emptyNode;
    }
}


