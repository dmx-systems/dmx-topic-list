<template>
  <div class="dm5-assoc-item">
    <dm5-topic-item :topic="assoc.player1.topic" class="object"></dm5-topic-item>
    <dm5-assoc-line :assoc="assoc"></dm5-assoc-line>
    <dm5-topic-item :topic="assoc.player2.topic" class="object"></dm5-topic-item>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  props: {
    assoc: {type: dm5.Assoc, required: true}
  },

  components: {
    'dm5-topic-item': require('./dm5-topic-item').default,
    'dm5-assoc-line': require('./dm5-assoc-line').default
  }
}
</script>

<style>
.dm5-assoc-item {
  display: flex;
  align-items: center;
}

.dm5-assoc-item .dm5-assoc-line {
  flex: auto;
}
</style>
