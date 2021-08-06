// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
@property(cc.Integer)
BulletSpeed=0;
   

   

     update (dt) 
     { 
         console.log("Group Name: " + this.node.group);
        
         this.node.setPosition(this.node.position.x+=this.node.up.x * this.BulletSpeed * dt,this.node.position.y+=this.node.up.y*this.BulletSpeed * dt);
     }
}
