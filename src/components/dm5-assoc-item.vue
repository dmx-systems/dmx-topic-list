<template>
  <div class="dm5-assoc-item">
    <dm5-topic-item :topic="topic1" class="object" @click.native.stop="topicClick(topic1)" @icon-click="iconClick(topic1)">
    </dm5-topic-item>
    <dm5-assoc-line :assoc="assoc"></dm5-assoc-line>
    <dm5-topic-item :topic="topic2" class="object" @click.native.stop="topicClick(topic2)" @icon-click="iconClick(topic2)">
    </dm5-topic-item>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  props: {
    assoc: {type: dm5.Assoc, required: true}
  },

  computed: {

    topic1 () {
      return this.assoc.player1.topic
    },

    topic2 () {
      return this.assoc.player2.topic
    }
  },

  methods: {

    topicClick (topic) {
      this.$emit('topic-click', topic)
    },

    iconClick (topic) {
      this.$emit('icon-click', topic)
    }
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
