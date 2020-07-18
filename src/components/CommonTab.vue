<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="index"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="close(tag)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
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
    }),
    changeMenu(item) {
      this.$store.commit('selectMenu', item)
      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  padding: 1.25rem;
  .el-tag {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
