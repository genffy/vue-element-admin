<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <template v-if="isSubApp">
        <div>
          <div id="page-charts" />
          <div id="page-components" />
          <div id="page-nested" />
          <div id="page-table" />
        </div>
      </template>
      <template v-else>
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </template>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      isSubApp: false
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
    // isSubApp() {
    //   const hash = window.location.hash || ''
    //   const isSub = ['charts', 'components', 'nested', 'table'].some(key => {
    //     return hash.startsWith(`#/${key}`)
    //   })
    //   console.log('isSub', isSub)
    //   return isSub
    // }
  },
  watch: {
    $route() {
      const hash = window.location.hash || ''
      const isSub = ['charts', 'components', 'nested', 'table'].some(key => {
        return hash.startsWith(`#/${key}`)
      })
      console.log('isSub', isSub)
      this.isSubApp = isSub
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
