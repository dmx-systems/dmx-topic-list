<template>
  <div :class="['dmx-assoc-item', {hover}]">
    <dmx-topic-item :topic="topic1" :class="['free-item', {marked: markTopic(topic1), match: isMatch(topic1)}]"
      @click.native.stop="topicClick(topic1)" @icon-click="iconClick(topic1)">
    </dmx-topic-item>
    <dmx-assoc-line :assoc="assoc" :show-labels="showLabels"></dmx-assoc-line>
    <dmx-topic-item :topic="topic2" :class="['free-item', {marked: markTopic(topic2), match: isMatch(topic2)}]"
      @click.native.stop="topicClick(topic2)" @icon-click="iconClick(topic2)">
    </dmx-topic-item>
  </div>
</template>

<script>
import dmx from 'dmx-api'

export default {

  created () {
    // console.log('dm5-assoc-item created', this.topic1, this.topic2)
  },

  mixins: [
    require('./mixins/marker').default
  ],

  props: {
    assoc: {type: dmx.Assoc, required: true}
  },

  data () {
    return {
      hover: false,       // set by parent component, see setProperty() in dm5-topic-list.vue
      showLabels: false   // set by parent component, see setProperty() in dm5-topic-list.vue
    }
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

    isMatch (topic) {
      const isMatch = topic.children['dmx.core.is_match']
      return isMatch && isMatch.value
    },

    topicClick (topic) {
      this.$emit('topic-click', topic)
    },

    iconClick (topic) {
      this.$emit('icon-click', topic)
    }
  },

  components: {
    'dmx-topic-item': require('./dmx-topic-item').default,
    'dmx-assoc-line': require('./dmx-assoc-line').default
  }
}
</script>

<style>
.dmx-assoc-item {
  display: flex;
  align-items: center;
}

.dmx-assoc-item .dmx-topic-item.match {
  background-color: var(--background-color) !important;
}

.dmx-assoc-item .dmx-assoc-line {
  flex: auto;
}
</style>
