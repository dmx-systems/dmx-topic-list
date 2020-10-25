<template>
  <div class="dm5-assoc-item">
    <dm5-topic :topic="assoc.player1.topic"></dm5-topic>
    <dm5-assoc-line :assoc="assoc"></dm5-assoc-line>
    <dm5-topic :topic="assoc.player2.topic"></dm5-topic>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  props: {
    assoc: {type: dm5.Assoc, required: true}
  },

  components: {
    'dm5-topic': require('./dm5-topic').default,
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
  margin-left: 16px;
  margin-right: 16px;
}
</style>
