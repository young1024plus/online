<template>
  
    <div class="index">
       
        <div class="my">
            <div class="userinfo">
                <img v-if="user.userinfo" :src="'http://www.young1024.com:82/avatar/'+user.userinfo.avatar">
                <span v-if="user.userinfo" >{{user.userinfo.username}}</span>
            </div>

            <div class="mylist">
                <ul>
                    <li><a @click="go(user.userinfo._id)">我的收藏</a></li>
                </ul>
            </div>


            <div class="btnbox">
                <a class="logout" @click="exit">退出</a>
            </div>

        </div>
        <div class="foot">
            <a @click="$router.replace({name:'index'})">
                <span class="indexicon"></span>
                <span>首页</span>
            </a>
            <a class="sel">
                <span class="myicon"></span>
                <span>我的</span>
            </a>
        </div>
    </div>
    
</template>

<script>



export default {
  name:'my',
  data(){
    return {
      user:{}
    }
  },

  mounted(){
    var u = localStorage.getItem('user');
    if(u){
      this.user = JSON.parse(u)
    }
  },


  methods:{
    go(uid){
      this.$router.push({name:'collect'})
    },
    exit(){
      localStorage.removeItem('user');
      this.$router.replace({name:'login'})
    }
  }
}
</script>


<style scoped>
   .index{
            box-sizing: border-box;
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
        }
       
        .my{
            flex: 1;
            overflow-y: auto;
            box-sizing: border-box;
        }


        .foot{
            height: 40px;
            width: 100%;
            border-top: 1px solid #c4c4c4;
            display: flex;
        }

        .foot>a{
            flex: 1;
            height: 40px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
        }
        .foot>a.sel>span:nth-child(2){
            color: #de3232;
        }
        .foot>a.sel>.indexicon{
            background: url(../assets/images/index2.png);
            background-size: contain;
        }

        .foot>a.sel>.myicon{
            background: url(../assets/images/my2.png);
            background-size: contain;
        }

        
        .indexicon{
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url(../assets/images/index1.png);
            background-size: contain;
        }
        .myicon{
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url(../assets/images/my1.png);
            background-size: contain;
        }
        
        .foot>a>span:nth-child(2){
            color: #787878;
            font-size: 12px;
            margin-top: -10px;
        }

        .userinfo{
            height: 180px;
            width: 100%;
            background-color: #dd3635;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .userinfo>img{
            width: 80px;
            height: 80px;
            border-radius: 40px;
        }
        .userinfo>span{
            font-size: 24px;
            color: #ffffff;
        }
        .mylist{
            box-sizing: border-box;
            padding:20px 0;
        }

        .mylist>ul>li{
            background-color: #c4c4c4;
            box-sizing: border-box;
            height: 38px;
            padding-left: 10px;
            padding-right: 10px;
        }
        .mylist>ul>li>a{
            display: flex;
            width: 100%;
            height: 38px;
            color: #ffffff;
            font-size: 18px;
            justify-content: space-between;
            align-items: center;
        }

        .mylist>ul>li>a::after{
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            border-right: 3px solid #ffffff;
            border-bottom: 3px solid #ffffff;
            transform: rotate(-45deg);
        }


        .btnbox{
            height: 100px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .logout{
            display: inline-block;
            width: 65%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background-color: #dd3635;
            border-radius: 5px;
            color: #ffffff;
            font-size: 14px;
        }
</style>


