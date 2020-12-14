<template>
  <div class="dmx-topic-item">
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
import dmx from 'dmx-api'

export default {

  mounted () {
    // console.log('dmx-topic-item mouted', this.topic)
    if (this.isHtml) {
      this.$el.querySelectorAll('video.ql-video').forEach(video => {
        video.addEventListener('click', e => {
          e.stopPropagation()     // prevent parent from emitting 'topic-click' event
        })
      })
    }
  },

  props: {
    topic: {type: dmx.Topic, required: true},
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
.dmx-topic-item .topic {
  display: flex;
  align-items: baseline;
}

.dmx-topic-item .icon {
  margin-right: var(--icon-spacing);
}

.dmx-topic-item .icon:hover {
  cursor: pointer;
}

.dmx-topic-item .value {
  line-height: var(--line-height);
}

.dmx-topic-item .value.html img {
  max-width: 100%;
}

.dmx-topic-item .type {
  margin-bottom: 6px;
}

.dmx-topic-item .assoc {
  margin-top: 6px;
}
</style>
