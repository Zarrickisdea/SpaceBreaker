import { _decorator, Component, Node } from 'cc';
import { BaseState } from '../../State Machine/BaseState';
import { PlayerController } from '../PlayerController';
import { PlayerBaseState } from './PlayerBaseState';
const { ccclass, property } = _decorator;

@ccclass('PlayerFireState')
export class PlayerFireState extends PlayerBaseState {
}


