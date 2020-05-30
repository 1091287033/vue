<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="detail.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{detail.name}}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="detail.creator.avatarUrl" alt />
          <span class="name">{{detail.creator.nickname}}</span>
          <span class="time">{{detail.createTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <!-- 标签 -->
            <li v-for="(item,index) in detail.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{detail.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item ,index) in detail.tracks" :key="index">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alia!=''">{{item.alia}}</span>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>06:03</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number">({{hotCount}})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in hotComment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].uses.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">({{total}})</span>
          </p>
          <div class="comments-wrap" v-for="(item ,index) in newComment" :key="index">
            <div class="item">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //歌曲详情
      detail: {},
      //评论
      hotComment: [],
      //热门评论个数
      hotCount: 0,
      //最新评论个数
      newComment: []
    };
  },
  created() {
    //歌曲详情
    axios({
      url: "https://autumnfish.cn/playlist/detail",
      method: "get",
      params: {
        id: this.$route.query.p
      }
    }).then(res => {
      console.log(res);
      this.detail = res.data.playlist;
    });
    //热门pinglun
    axios({
      url: " https://autumnfish.cn/comment/hot",
      method: "get",
      params: {
        id: this.$route.query.p,
        type: 2
      }
    }).then(res => {
      console.log(res);
      this.hotComment = res.data.hotComments;
      this.hotCount = res.data.total;
    });
    //最新评论
    axios({
      url: "https://autumnfish.cn/comment/playlist",
      method: "get",
      params: {
        id: this.$route.query.p,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      /*     console.log(res); */
      this.newComment = res.data.comments;
      this.total = res.data.total;
    });
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      // 重新获取数据
      axios({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.p,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        // console.log(res)
        // 总个数
        this.total = res.data.total;
        // 评论数据
        this.newComment = res.data.comments;
      });
    }
  }
};
</script>

<style >
</style>
