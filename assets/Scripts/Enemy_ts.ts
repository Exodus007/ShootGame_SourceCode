import { bulletPool } from "./GameLogicManager_ts";
import PlayerClass, { PlayerNode } from "./Player_ts";
//Global Variables
var oneTimeOffsetY:boolean=true;

const {ccclass, property} = cc._decorator;
@ccclass
export default class Enemy extends cc.Component {

//Variables
private myPos:cc.Vec3=new cc.Vec3(1,1,1);
collider:cc.CircleCollider;


//LifeCycle 
onLoad () 
{
    this.collider=this.getComponent(cc.CircleCollider);
   //Getting my First Initial Pos from the scene..
   this.myPos=this.node.position;
   let collisionManager:cc.CollisionManager=cc.director.getCollisionManager();
   collisionManager.enabled=true;
}
    //Collision Detection Callback..
    onCollisionStay(other,self)
    {
    //Logic to avoid the OverLap Placement..
    let selfClass:Enemy=self.getComponent(Enemy);
    let otherClass:Enemy;
    //for self enemy
      if(other.node.group=="Enemy")
      {
        otherClass=other.getComponent(Enemy);
        let maxVal=Math.max(otherClass.myPos.x,selfClass.myPos.x);
        let minVal=Math.min(otherClass.myPos.x,selfClass.myPos.x);
        let result=maxVal-minVal;
        let offsetVal=self.node.width - result;
        console.log("offset Val: "+ offsetVal);
        if(selfClass.myPos.x>otherClass.myPos.x)
        {
            //add offset to the self node
            let ck=self.node.position.x+(offsetVal/2);
            self.node.setPosition(ck,self.node.position.y);
            //console.log("final val:"+ck);
        }else{
            //minus offset to the self node.
            let ck=self.node.position.x-(offsetVal/2);
            self.node.setPosition(ck,self.node.position.y);
        }
        if(selfClass.myPos.x==otherClass.myPos.x)
        {
            //worst case... so change the y offset 
            if(oneTimeOffsetY)
            {
                let ck=self.node.position.y+(offsetVal/2);
                self.node.setPosition(self.node.position.x,ck);
                console.log("coming");
                oneTimeOffsetY=false;
            }
        }
      } 
    }
    onCollisionEnter(other,self)
    {
    //for Bullet
    if(other.node.group=="Bullet")
    {
       console.log("buller name: " + other.node.name)
       bulletPool.put(other.node);
       //Remove the collider for future collision ..
        this.collider.enabled=false;
       //Destroy the enemy..
       var myAction:cc.Tween=new cc.Tween()
       .target(this.node).then(cc.scaleTo(2,0)).call(this.EnemyDestroyDone).start();

     
    }
    }
    EnemyDestroyDone()
    {
        var PlayerScript=PlayerNode.getComponent(PlayerClass);//using class Name or  we can use script name in double" quotes
        PlayerScript.ShootButtonFun(this,'Player');
       
    }
    
   
}
