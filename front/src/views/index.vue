<template>
  <div class="index">
    <div class="head">
      <div class="nav">
        <ul>
          <li :class="{'cur':cur==index}" @click="change(index)" v-for="(item,index) in nav" :key="index" >
            <a>{{item}}</a>
          </li>
        </ul>
      </div>
      <div class="search">
        <a class="s_btn"></a>
      </div>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="goinfo(item._id)">
          <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="something">
              <span class="m_r10">{{item.type}} - {{item.media}}</span>
              <span>{{gettime(item.pubtime)}}</span>
            </div>
          </div>
          <div class="img">
            <img v-if="item.picture!==null" v-bind:src="item.picture" />
            <span class="noimg" v-else>
              无图
            </span>

          </div>
        </li>

       
      </ul>
    </div>
    <div class="foot">
      <a>
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
  name: "index",
  data() {
    return {
      cur: 0,
      nav:['科技','财经'],
      list:[]
    };
  },
  mounted() {
    this.getlist(this.nav[0])
  },
  methods: {
    change(index){
      this.getlist(this.nav[index]);
      this.cur = index;
    },
    goinfo(id){
      // console.log(id)
      this.$router.push({
        name:'info',
        params:{
          id
        }
      })
    },
    gettime(time){
      let d = new Date(parseInt(time));
      // 今天的显示 时 分,   今天之前的显示 年 月  , 今年之前之前的显示 年 月 日
      return `${d.getMonth()+1}月${d.getDate()}日`
    },

    getlist(type){
      this.$axios.post('/news',{type:type}).then(res=>{
        if(res.data.status == 'success'){
          this.list = res.data.data;
          console.log(this.list)
        }else{
          this.$weui.toast(res.data.msg,2000)
        }
      }).catch(err=>{
        this.$weui.alert('网络错误')
      })
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
  }

  .nav {
    flex: 1;
    overflow-x: auto;
  }
  .nav > ul {
    display: flex;
    height: 40px;
    align-items: center;
    flex-wrap: nowrap;
  }

  .nav > ul > li {
    margin-right: 20px;
    flex-shrink: 0;
  }

  .nav > ul > li.cur a {
    font-size: 19px;
    font-weight: 600;
  }
  .nav > ul > li > a {
    color: #ffffff;
    font-size: 16px;
  }

  .search {
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .s_btn {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url(../assets/images/search.png) no-repeat;
    background-size: contain;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
  }

  .content > ul > li {
    display: flex;
    height: 100px;
    border-bottom: 1px solid #f3f3f3;
    box-sizing: border-box;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  .content > ul > li:last-child {
    border-bottom: 0;
  }

  .info {
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;
  }

  .title {
    font-size: 18px;
    color: #222222;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .something {
    color: #a5a5a5;
    font-size: 12px;
  }

  .img {
    width: 115px;
    height: 72px;
    overflow: hidden;
  }

  .img > img {
    width: 100%;
  }

    .img> .noimg{
      display: inline-block;
      width: 113px;
      height: 70px;
      border: 1px solid #a5a5a5;
      text-align: center;
      line-height: 70px;
      color: #a5a5a5;
    }

  .foot {
    height: 40px;
    width: 100%;
    border-top: 1px solid #c4c4c4;
    display: flex;
  }

  .foot > a {
    flex: 1;
    height: 40px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .foot > a.sel > span:nth-child(2) {
    color: #de3232;
  }
  .foot > a.sel > .indexicon {
    background: url(../assets/images/index2.png);
    background-size: contain;
  }

  .foot > a.sel > .myicon {
    background: url(../assets/images/my2.png);
    background-size: contain;
  }

  .indexicon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../assets/images/index1.png);
    background-size: contain;
  }
  .myicon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(../assets/images/my1.png);
    background-size: contain;
  }

  .foot > a > span:nth-child(2) {
    color: #787878;
    font-size: 12px;
    margin-top: -10px;
  }
</style>


