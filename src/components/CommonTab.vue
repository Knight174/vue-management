<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="close(tag)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'commonTab',
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    })
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 1.25rem;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
