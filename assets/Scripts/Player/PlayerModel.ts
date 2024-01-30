import { _decorator } from 'cc';
import { PlayerIdleState } from './PlayerStates/PlayerIdleState';
import { PlayerMoveState } from './PlayerStates/PlayerMoveState';
import { PlayerController } from './PlayerController';
import { PlayerBaseState } from './PlayerStates/PlayerBaseState';
import { PlayerDeadState } from './PlayerStates/PlayerDeadState';
const { ccclass, property } = _decorator;

@ccclass('PlayerModel')
export class PlayerModel {
    private isDead: boolean = false;
    private damage: number = 0;
    private speed: number = 0;
    private isPoweredUp: boolean = false;
    private powerUpDuration: number = 0;
    private shootInterval: number = 0;

    private playerController: PlayerController = null;

    private playerIdleState: PlayerIdleState = null;
    private playerMoveState: PlayerMoveState = null;
    private playerDeadState: PlayerDeadState = null;
    private currentState: PlayerBaseState = null;

    constructor(damage: number, speed: number, shootInterval: number) {
        this.damage = damage;
        this.speed = speed;
        this.shootInterval = shootInterval;
        this.isPoweredUp = false;
        this.powerUpDuration = 0;
        this.isDead = false;
    }

    public initializeStates(): void {
        this.playerIdleState = new PlayerIdleState(this.playerController);
        this.playerMoveState = new PlayerMoveState(this.playerController);
        this.playerDeadState = new PlayerDeadState(this.playerController);
        
        // this.currentState = this.playerIdleState;
    }

    public getCurrentState(): PlayerBaseState {
        return this.currentState;
    }

    public getState(stateName: string): PlayerBaseState {
        switch (stateName) {
            case 'Idle':
                return this.playerIdleState;
            case 'Move':
                return this.playerMoveState;
            case 'Dead':
                return this.playerDeadState;
            default:
                return null;
        }
    }

    public getIsDead(): boolean {
        return this.isDead;
    }

    public setIsDead(isDead: boolean): void {
        this.isDead = isDead;
    }

    public getDamage(): number {
        return this.damage;
    }

    public setDamage(damage: number): void {
        this.damage = damage;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public getIsPoweredUp(): boolean {
        return this.isPoweredUp;
    }

    public setIsPoweredUp(isPoweredUp: boolean): void {
        this.isPoweredUp = isPoweredUp;
    }

    public getPowerUpDuration(): number {
        return this.powerUpDuration;
    }

    public setPowerUpDuration(powerUpDuration: number): void {
        this.powerUpDuration = powerUpDuration;
    }

    public getShootInterval(): number {
        return this.shootInterval;
    }

    public setShootInterval(shootInterval: number): void {
        if (shootInterval >= 0 && shootInterval <= 1) {
            this.shootInterval = shootInterval;
        } else {
            console.warn("Invalid shootInterval value. It should be between 0 and 1.");
        }
    }

    public setPlayerController(playerController: PlayerController): void {
        this.playerController = playerController;
    }

    public destroyStates(): void {
        this.playerIdleState = null;
        this.playerMoveState = null;
        this.playerDeadState = null;
        this.currentState = null;
    }
}


