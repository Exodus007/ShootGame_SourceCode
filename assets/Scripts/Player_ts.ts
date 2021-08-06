
import  GameManagerClass from './GameLogicManager_ts';//Default Importing as alias..
import { bulletPool } from './GameLogicManager_ts';
import { bulletPrefab } from './GameLogicManager_ts';
import { listOfEnemy } from './GameLogicManager_ts';
import { myParentNode } from './GameLogicManager_ts';

export var PlayerNode:cc.Node=null;
var actionCompleted:boolean=false;
var ButtonFlag:string=null;
var oneTimePerformAction:boolean=true;
const {ccclass, property} = cc._decorator;
@ccclass
export default class PlayerClass extends cc.Component {

@property(cc.Integer)
rotationAngle=0;
@property(cc.Node)
ShootPoint:cc.Node;
@property
canShoot:boolean;
@property(cc.Label)
GameCompleted:cc.Label=null;

onLoad()
{
    
    this.canShoot=false;
    PlayerNode=this.node;
}
update(dt)
{
    if(actionCompleted)
    {   this.canShoot=true;
         this.GetBulletDirection_Shoot();
        actionCompleted=false;
    }
}
    // LIFE-CYCLE CALLBACKS:
    /*KeyBoardInputs()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.OnKeyDownCallback,this);
    }
    OnKeyDownCallback(event:cc.Event.EventKeyboard)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
            //Rotate towards left side..
            
            this.node.angle+=this.rotationAngle;
            console.log("left side go!");
            break;
            case cc.macro.KEY.d:
                //rotate towards right side...
               this.node.angle-=this.rotationAngle;
                break;
            
        }
    }*/


    ShootButtonFun(eve,eventData)
    {
       //let curre9ntBullet:cc.Node=gmClass.GetBullet(bulletPool);//erro one..
       ButtonFlag=eventData;
       if(ButtonFlag=="Player")
       {
        this.CheckDistanceOfEnemy();
       }
       if(ButtonFlag=="Shoot")
       {
        //Perform the logic only for one Time
        if(oneTimePerformAction)
        {
            this.CheckDistanceOfEnemy();
            oneTimePerformAction=false;
        }else
        {
            //only shoot
            if(this.canShoot)
            {
            this.GetBulletDirection_Shoot();
            }
           
        }
    
       }
     
    }
    GetBulletDirection_Shoot()
    {
        
        if(ButtonFlag=="Shoot" && this.canShoot)
        {
            let currentBullet:cc.Node=GetBullet();
            let convertedPos_ShootPoint=this.ShootPoint.parent.convertToWorldSpaceAR(this.ShootPoint.position);
            let relativeToCanvasPos=this.node.parent.convertToNodeSpaceAR(convertedPos_ShootPoint);
            currentBullet.setPosition(relativeToCanvasPos.x,relativeToCanvasPos.y);
            //Getting and setting angle
            let getAngle:number=this.node.angle;
            currentBullet.angle=getAngle;
            this.canShoot=false;
        }
     
    }
  
    LookTheTarget(target:cc.Node)
    {
        var diff = {
            'x' : target.position.x - this.node.position.x,
            'y':target.position.y - this.node.position.y 
            };
    
        var radians = Math.atan2(diff.x, diff.y);
        var angle=radians * (180/Math.PI);
        let myAction:cc.Tween=new cc.Tween()
        //Calculating Direction & shoot  the bullet..
        .target(this.node).then(cc.rotateTo(0.5,angle)).call(this.CheckActionComplete).start();
        //In this callback the instance method and variables won't work..
        //this.node.angle=-angle;//Negative because the rotation in cocos is antiClock wise in positive.
  
    }
    CheckActionComplete()
    {
       
        actionCompleted=true;
   
    }
    CheckDistanceOfEnemy()
    {
        let min=9999;
        let nearestNode:cc.Node=null;
        if(listOfEnemy.length>0)
        {
            for(let i=0;i<listOfEnemy.length;i++)
            {
                if(listOfEnemy[i].position.y<min)
                {
                    min=listOfEnemy[i].position.y;
                    nearestNode=listOfEnemy[i];
                }
            }
            //Lock the Target or we can say looking to the target..
            this.LookTheTarget(nearestNode);
            //remove that target from the array/list..
            let index=listOfEnemy.indexOf(nearestNode,0);
            if (index > -1) {
                listOfEnemy.splice(index, 1);
             }
        }else{
            //show Game Completed Mesaage..
          this.GameCompleted.string="Congratulations!";
          this.GameCompleted.enabled=true;
        }
  
       
         
    }
}
function GetBullet()
{
     
    let bullet:cc.Node=null;
    if(bulletPool.size()>0)//mean it is not empty..
    {
    bullet=bulletPool.get();
    }else{
        //not enough in the pool so instantiate the new one..
        bullet=cc.instantiate(bulletPrefab);
    }
    bullet.parent=myParentNode;
    return bullet;

}
