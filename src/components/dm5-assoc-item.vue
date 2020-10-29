<template>
  <div :class="['dm5-assoc-item', {hover}]">
    <dm5-topic-item :topic="topic1" :class="['free-item', {'marked': markTopic(topic1)}]"
      @click.native.stop="topicClick(topic1)" @icon-click="iconClick(topic1)">
    </dm5-topic-item>
    <dm5-assoc-line :assoc="assoc" :show-labels="showLabels"></dm5-assoc-line>
    <dm5-topic-item :topic="topic2" :class="['free-item', {'marked': markTopic(topic2)}]"
      @click.native.stop="topicClick(topic2)" @icon-click="iconClick(topic2)">
    </dm5-topic-item>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  mixins: [
    require('./mixins/marker').default
  ],

  props: {
    assoc: {type: dm5.Assoc, required: true}
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
