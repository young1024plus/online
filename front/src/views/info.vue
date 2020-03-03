<template>
  <div class="index">
    <div class="head">
      <a class="back_btn" @click="back">返回</a>
    </div>
    <div class="content_info">
      <div class="titlebox">
        <h1>{{info.title}}</h1>
        <div class="infoitem">
          <a :href="info.source" target="_blank" class="source">来源：{{info.media}}</a>
          <span class="pubtime">{{ settime(info.pubtime)}}</span>
        </div>
      </div>

      <div class="infobox" v-html="info.content">
      
      </div>
    </div>
    <div class="foot">
      <div class="cbox">
        <a class="coll_btn" v-if="!flag" @click="collec(info._id)">收藏</a>
        <a class="cancel_btn" v-else @click="cancel(info._id)">取消收藏</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  data() {
    return {
      info:{},
      uinfo:{},
      flag : false
    };
  },
  mounted(){
    // console.log(this.$route.params.id);
    this.$axios.post('/newsinfo',{newsid:this.$route.params.id}).then(res=>{
       if(res.data.status == 'success'){
         this.info = res.data.data

          var u = localStorage.getItem('user')
          if(u){
            this.uinfo = JSON.parse(u);
          }else{
            this.uinfo = u;
          }

          this.$axios.post('/checkcollect',{
            newsid: this.info._id,
            uid :  this.uinfo.userinfo._id
          }).then(res=>{
            // console.log(res)
            if(res.data.status=='success'){
              this.flag = res.data.data
            }
          })

       }else{
         this.$weui.alert(res.data.msg)
       }
    });



    

  },
  methods: {
    collec(aid){
      // console.log(aid)
      
      if(this.uinfo){
        this.$axios.post('/collect',{
          uid : this.uinfo.userinfo._id,
          aid : aid
        }).then(res=>{
          if(res.data.status == 'success'){
            this.flag = true
          }
        })
      }else{
        this.$weui.alert('请先登录!')
      }
    },
    cancel(aid){
      this.$axios.post('/cancelCollect',{
        uid : this.uinfo.userinfo._id,
        aid : aid
      }).then(res=>{
        if(res.data.status== 'success'){
          this.flag = false
        }
      })

    },


    back(){
      this.$router.go(-1)
    },
    settime(time){

      let d = new Date(parseInt(time));



      return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${d.getMinutes()} `

    }
  }
};
</script>


<style scoped>
  .index {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .head {
    height: 40px;
    width: 100%;
    background-color: #dd3635;
    display: flex;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    align-items: center;
  }
  .content_info {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }

  .back_btn {
    color: #ffffff;
    font-size: 16px;
  }

  .back_btn::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-left: 3px solid #ffffff;
    border-top: 3px solid #ffffff;
    transform: rotate(-45deg);
  }

  .foot {
    height: 40px;
    width: 100%;
    border-top: 1px solid #c4c4c4;
    display: flex;
  }

  .cbox {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }

  .coll_btn {
    display: inline-flex;
    font-size: 12px;
    color: #dd3635;
    align-items: center;
  }

  .coll_btn::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../assets/images/coll2.png) no-repeat;
    background-size: contain;
    margin-right: 5px;
  }

  .cancel_btn {
    display: inline-flex;
    font-size: 12px;
    color: #dd3635;
    align-items: center;
  }

  .cancel_btn::before {
    content: "";
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../assets/images/coll1.png) no-repeat;
    background-size: contain;
    margin-right: 5px;
  }

  .titlebox {
    box-sizing: border-box;
    padding: 12px 0;
  }

  .titlebox > h1 {
    font-size: 24px;
    color: #222222;
  }

  .infoitem {
    box-sizing: border-box;
    padding: 5px 0;
    display: flex;
    align-items: flex-end;
  }

  .source {
    color: #222222;
    font-size: 16px;
    margin-right: 8px;
    line-height: 20px;
  }
  .pubtime {
    font-size: 14px;
    color: #a5a5a5;
    line-height: 15px;
  }

  >>>.infobox > p.one-p {
    font-size: 16px;
    color: #222222;
    margin-bottom: 10px;
  }

  /deep/.infobox > p.one-p img {
    max-width: 100%;
  }
</style>


