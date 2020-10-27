<template>
  <div class="dm5-topic-item">
    <div class="type label" v-if="showType">{{topic.typeName}}</div>
    <div class="topic">
      <div class="fa icon" :style="{color: topic.iconColor}" @click.stop="clickIcon">{{topic.icon}}</div>
      <div>
        <div class="value html" v-if="isHtml" v-html="topic.value"></div>
        <div class="value" v-else>{{topic.value}}</div>
        <div class="assoc label" v-if="showAssoc">{{assoc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  props: {
    topic: {type: dm5.Topic, required: true},
    omit: String      // optional: the part that is ommitted from rendering: 'type', 'assoc'
  },

  computed: {

    showType () {
      return this.omit !== 'type'
    },

    showAssoc () {
      return this.omit !== 'assoc' && this.topic.assoc
    },

    isHtml () {
      return this.topic.type.dataTypeUri === 'dmx.core.html'
    },

    assoc () {
      const _value = this.topic.assoc.value
      const value = _value && `: ${_value}`
      return `${this.topic.assoc.typeName}${value}`
    }
  },

  methods: {
    clickIcon () {
      this.$emit('icon-click')
    }
  }
}
</script>

<style>
.dm5-topic-item .topic {
  display: flex;
  align-items: baseline;
}

.dm5-topic-item .icon {
  margin-right: var(--icon-spacing);
}

.dm5-topic-item .icon:hover {
  cursor: pointer;
}

.dm5-topic-item .value {
  line-height: var(--line-height);
}

.dm5-topic-item .value.html img {
  max-width: 100%;
}

.dm5-topic-item .type {
  margin-bottom: 6px;
}

.dm5-topic-item .assoc {
  margin-top: 6px;
}
</style>
