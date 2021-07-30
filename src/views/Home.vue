<template>
  <div class="home">
    <ScheDuling></ScheDuling>
  </div>
</template>

<script>
// @ is an alias to /src
import ScheDuling from '../views/ScheDuling.vue'

export default {
  name: 'Home',
  components: {
    ScheDuling
  }
}
</script>
<style lang="less" scoped>
.aa {
  background: red;
}
</style>
