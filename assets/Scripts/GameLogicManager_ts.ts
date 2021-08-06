

export var bulletPool:cc.NodePool=null;
export var bulletPrefab:cc.Prefab=null;
export var listOfEnemy: cc.Node[]=[];
export var myParentNode:cc.Node=null;
const {ccclass, property} = cc._decorator;

@ccclass
export default class Gm extends cc.Component {

//Properties
@property(cc.Prefab)
EnemyPrefab:cc.Prefab;
@property(cc.Prefab)
BulletPrefab:cc.Prefab;
@property
noOfEnemy:number;
@property
bulletPoolAmount:number;
    onLoad()
    {
        
        bulletPrefab=this.BulletPrefab;   
        myParentNode=this.node.parent;
        this.RandomEnemyGenerate();
        this.BulletPooling();
    }


//End of Life Cylcle..

    RandomEnemyGenerate()
    {
    
         //check the screen bounds size and generate upto that space..
         let screenX_Width:number=(this.node.parent.width/2)-40;
         let screenY_Height:number=(this.node.parent.height/2)-40;
      
        console.log("Screeen Y: " + screenY_Height);
         let enemy_node:cc.Node=null;
       for(var i=0;i<this.noOfEnemy;i++)
       {
          
        enemy_node=cc.instantiate(this.EnemyPrefab);
        //Randomizing Position
        let randomX_Pos=Math.random() * (screenX_Width - (-screenX_Width)) + (-screenX_Width);
        console.log("random Screeen x: " + randomX_Pos);
        let randomY_Pos=Math.random() * (screenY_Height - 0) + 0;
        enemy_node.setPosition(randomX_Pos,randomY_Pos);
        enemy_node.parent=this.node.parent;
        //Adding enemy to the array
        listOfEnemy.push(enemy_node);
       }
    }

    //Bullet Node Pooling Logic...
    BulletPooling()
    {
        bulletPool=new cc.NodePool();
        for(let i=0;i<this.bulletPoolAmount;i++)
        {
            let bulObj:cc.Node=cc.instantiate(this.BulletPrefab);
            bulletPool.put(bulObj);
        }
      
    }
}



