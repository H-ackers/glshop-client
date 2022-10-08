<template>
  <div class="footer_guide">
    <router-link class="guide_item" active-class="on" to="/msite">
      <span class="item_icon">
        <i class="iconfont icon-dianpu"></i>
      </span>
      <span>外卖</span>
    </router-link>
    <router-link class="guide_item" active-class="on" to="/search">
      <span class="item_icon">
        <i class="iconfont icon-sousuo1"></i>
      </span>
      <span>搜索</span>
    </router-link>
    <router-link class="guide_item" active-class="on" to="/order">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </router-link>
    <router-link class="guide_item" active-class="on" to="/profile">
      <span class="item_icon">
        <i class="iconfont icon-wode3"></i>
      </span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>

  export default {
    name:'FooterGuide',
    
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>