import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerModel')
export class PlayerModel {
    private isDead: boolean = false;
    private hitsToKill: number = 0;
    private damage: number = 0;
    private speed: number = 0;
    private isPoweredUp: boolean = false;
    private powerUpDuration: number = 0;

    constructor(hitsToKill: number, damage: number, speed: number) {
        this.hitsToKill = hitsToKill;
        this.damage = damage;
        this.speed = speed;
    }

    public getIsDead(): boolean {
        return this.isDead;
    }

    public setIsDead(isDead: boolean): void {
        this.isDead = isDead;
    }

    public getHitsToKill(): number {
        return this.hitsToKill;
    }

    public setHitsToKill(hitsToKill: number): void {
        this.hitsToKill = hitsToKill;
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
}


