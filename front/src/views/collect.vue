<template>
  
    <div class="index">
        <div class="head">
            <a class="back_btn" @click="$router.back()">返回</a>
        </div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="goinfo(item.aid._id)">
                    <div class="info">
                        <div class="title">{{item.aid.title}}</div>
                        <div class="something">
                            <span class="m_r10">{{item.aid.media}}-{{item.aid.type}}</span>
                            <span>{{item.aid.pubtime}}</span>
                        </div>
                    </div>
                    <div class="img">
                        <img :src="item.aid.picture">
                    </div>
                </li>

            </ul>
        </div>
      
    </div>

    

    
</template>

<script>



export default {
  name:'collect',
  data(){
    return {
      list:[]
    }
  },
  methods:{
    goinfo(aid){
      this.$router.push({name:'info',params:{id:aid}})
    }
  },
  mounted(){
    var u = localStorage.getItem('user');

    var that = this;
    if(u){
      var user = JSON.parse(u);
      var uid = user.userinfo._id;
      this.$axios.post('/clist',{uid}).then(res=>{
        // console.log(res)
        if(res.data.status == 'success'){
          this.list = res.data.data
        }else{
          this.$weui.alert(res.data.msg)
        }
      })  
    }else{
      this.$weui.toast('登录失效',{
        duration:2000,
        callback:function(){
          that.$router.replace({name:'login'})
        }
      })
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
.head{
    height: 40px;
    width: 100%;
    background-color: #dd3635;
    display: flex;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
}
.content{
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
}


.content>ul>li{
    display: flex;
    height: 100px;
    border-bottom: 1px solid #f3f3f3;
    box-sizing: border-box;
    padding-top: 14px;
    padding-bottom: 14px;
}
.content>ul>li:last-child{
    border-bottom: 0;
}

.info{
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;
}


.title{
    font-size: 18px;
    color: #222222;
    overflow:hidden;
    display:-webkit-box;
    text-overflow:ellipsis;
    -webkit-line-clamp:2; 
    -webkit-box-orient:vertical; 
    white-space:normal;
}

.something{
    color: #a5a5a5;
    font-size: 12px;
}


.img{
    width: 115px;
    height: 72px;
    overflow: hidden;
}

.img>img{
    width: 100%;
}

.back_btn{
    color: #ffffff;
    font-size: 16px;
}

.back_btn::before{
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-left: 3px solid #ffffff;
    border-top: 3px solid #ffffff;
    transform: rotate(-45deg);
}

</style>


