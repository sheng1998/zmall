<template>
  <div class="back-top">
    <el-backtop :bottom="50" :visibility-height='200' style="dispaly: fixed;">
      <el-tooltip
        class="item"
        effect="dark"
        content="返回顶部"
        placement="left"
      >
        <div class="to-top xmf-flex">
          <span>
            <i class="iconfont iconfanhuidingbu"></i>
          </span>
        </div>
      </el-tooltip>
    </el-backtop>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.back-top {
  .to-top {
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    border-radius: 50%;
    color: #fff;
    font-size: 20px;
    border: 1px solid #fafafa;

    i {
      color: #409eff;
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
