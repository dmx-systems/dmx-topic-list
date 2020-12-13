<template>
  <div class="dm5-topic-list">
    <div class="header" v-if="!noSortMenu">
      <div class="list-label label">{{listLabel}}</div>
      <div class="sort-widget" v-if="size">
        <span class="label">sort by</span>
        <el-select v-model="sortMode_" @input="sortChange">
          <el-option label="Topic" value="topic" v-if="!isAssocResult"></el-option>
          <el-option :label="typeSortLabel" value="type"></el-option>
          <el-option label="Association Type" value="assoc" v-if="isRelTopics"></el-option>
        </el-select>
      </div>
    </div>
    <template v-if="size">
      <div class="group" v-for="group in groups">
        <div class="field-label" v-if="!topicSort">{{group.title}} ({{group.topics.length}})</div>
        <div>
          <template v-if="!isAssocResult">
            <!--
              Note: the same topic might appear more than once (e.g. in a "what's related" list).
              In order to avoid a key clash we use the loop index. ### FIXME
            -->
            <dmx-topic-item v-for="(topic, i) in group.topics" :topic="topic" :omit="omit"
              :class="['list-item', {marked: markTopic(topic)}]" :key="i"
              @click.native="topicClick(topic)" @icon-click="iconClick(topic)">
            </dmx-topic-item>
          </template>
          <template v-if="isAssocResult">
            <!--
              Note: assoc-item has nested topic-items, all are hoverable, and we want the assoc-hover to disappear as
              soon as a topic-item becomes hovered. So in contrast to topic-hovering, assoc-hovering can't rely solely
              on CSS. We need handling of mouseover/out events. With CSS alone the assoc would stay hovered even when
              the mouse cursor actually hovers a player topic.
            -->
            <dmx-assoc-item v-for="assoc in group.topics" :assoc="assoc" :marker-topic-ids="markerTopicIds"
              :class="['list-item', {marked: markAssoc(assoc)}]" :key="assoc.id"
              @mouseover.native="mouseover" @mouseout.native="mouseout"
              @mouseenter.native="mouseenter" @mouseleave.native="mouseleave"
              @click.native="assocClick(assoc)" @topic-click="topicClick" @icon-click="iconClick">
            </dmx-assoc-item>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dmx from 'dmx-api'

export default {

  created () {
    // console.log('dm5-topic-list created', this.topics, this.topics.length)
  },

  mixins: [
    require('./mixins/marker').default
  ],

  props: {
    topics: {
      type: Array,
      required: true,       // TODO: don't require?
      validator: topics => topics.every(topic => {
        const ok = topic instanceof dmx.Topic || topic instanceof dmx.Assoc
        !ok && console.warn('"topics" array passed to dm5-topic-list contains a non-Topic/Assoc element:', topic, '(' +
          topic.constructor.name + ')')
        return ok
      })
    },
    sortMode: {             // topic list sort mode: 'topic', 'type', 'assoc'
      type: String,
      default: 'type'
    },
    noSortMenu: Boolean,
    topicsLabel: String,
    emptyText: String       // TODO: rename to "emptyLabel"/"topicsLabelEmpty"?
  },

  data () {
    return {
      sortMode_: this.sortMode,
      emptyTextDefault: 'No Data'
    }
  },

  computed: {

    size () {
      return this.topics.length
    },

    listLabel () {
      return this.size ? `${this.topicsLabel ? this.topicsLabel + ': ' : ''}${this.size} ${this.resultLabel}` :
        this.emptyText || this.emptyTextDefault
    },

    isRelTopics () {
      return this.topics[0] instanceof dmx.RelatedTopic
    },

    isAssocResult () {
      return this.topics[0] instanceof dmx.Assoc
    },

    resultLabel () {
      return this.isAssocResult ? 'Associations' : 'Topics'
    },

    typeSortLabel () {
      return this.isAssocResult ? 'Association Type' : 'Topic Type'
    },

    groups () {
      const groups = []
      // Note: as "topics" is reactive state in-place sorting would trigger re-computation of "groups" ad infinitum
      const _topics = this.topics.slice()   // shallow copy
      _topics.sort(this.compareFn)          // in-place sort
      if (this.topicSort) {
        // no grouping (put all topics in one group)
        groups.push({topics: _topics})
      } else {
        // do grouping
        const select = selectFn[this.sortMode_]
        let title   // current title
        let group   // current group
        _topics.forEach(topic => {
          const _title = startGroup()
          if (_title) {
            // start new group
            title = _title
            group = {title, topics: [topic]}
            groups.push(group)
          } else {
            // append to current group
            group.topics.push(topic)
          }

          function startGroup () {
            const _title = select(topic)
            return _title !== title && _title
          }
        })
      }
      return groups
    },

    compareFn () {
      const select = selectFn[this.sortMode_]
      return (t1, t2) => {
        const v1 = select(t1)
        const v2 = select(t2)
        if (v1 === v2) {
          // topics belong to same group -- compare topic values
          return t1.value.localeCompare ? t1.value.localeCompare(t2.value) : t1.value - t2.value
        } else {
          // topic belong to different groups -- compare groups
          return v1.localeCompare ? v1.localeCompare(v2) : v1 - v2
        }
        // Note: numbers and booleans does not have a "localeCompare" method
      }
    },

    topicSort () {
      return this.sortMode_ === 'topic'
    },

    omit () {
      // Note: dm5-topic-item expects a String (or undefined)
      if (!this.topicSort) {
        return this.sortMode_
      }
    }
  },

  watch: {
    isAssocResult (val) {
      console.log('isAssocResult', val)
      if (val) {
        this.sortMode_ = 'type'
      }
    }
  },

  methods: {

    mouseover (e) {
      setProperty('hover', true, e)
    },

    mouseout (e) {
      setProperty('hover', false, e)
    },

    mouseenter (e) {
      setProperty('showLabels', true, e)
    },

    mouseleave (e) {
      setProperty('showLabels', false, e)
    },

    topicClick (topic) {
      this.$emit('topic-click', topic)
    },

    iconClick (topic) {
      this.$emit('icon-click', topic)
    },

    assocClick (assoc) {
      this.$emit('assoc-click', assoc)
    },

    sortChange (sortMode) {
      this.$emit('sort-change', sortMode)
    }
  },

  components: {
    'dmx-topic-item': require('./dmx-topic-item').default,
    'dmx-assoc-item': require('./dmx-assoc-item').default
  }
}

const selectFn = {
  topic: topic => topic.value,
  type:  topic => topic.typeName,
  assoc: topic => topic.assoc.typeName
}

function setProperty(prop, value, e) {
  if (e.target.classList.contains('dm5-assoc-item')) {
    e.target.__vue__[prop] = value
  }
}
</script>

<style>
.dm5-topic-list .header {
  display: flex;
  align-items: baseline;
}

.dm5-topic-list .header .list-label {
  flex: auto;
}

.dm5-topic-list .header .sort-widget {
  margin-bottom: 1.6em;
}

.dm5-topic-list .header .sort-widget .el-select {
  width: 140px;
}

.dm5-topic-list .header .sort-widget .el-input__inner {
  font-size: var(--label-font-size) !important;
  line-height: 24px;    /* was 28px */
  height: 24px;         /* was 28px */
  color: var(--label-color);
}

.dm5-topic-list .header .sort-widget .el-select__caret {
  font-size: var(--label-font-size);
  line-height: 24px;    /* was 28px */
}

.dm5-topic-list .group + .group {
  margin-top: 1.6em;
}

/* principle copy in dm5-comp-def-list.vue */
.dm5-topic-list .group .dm5-topic-item,
.dm5-topic-list .group .dm5-assoc-item {
  border-bottom: 1px solid var(--border-color);
  border-left:   1px solid var(--border-color);
  border-right:  3px solid var(--border-color);
  background-color: white;
  transition: background-color 0.25s;
  padding: var(--object-item-padding);
}

.dm5-topic-list .group .free-item,
.dm5-topic-list .group .list-item:nth-child(1) {
  border-top: 1px solid var(--border-color);
}

.dm5-topic-list .group .dm5-topic-item.marked,
.dm5-topic-list .group .dm5-assoc-item.marked {
  border-right-color: var(--color-topic-icon);
}

.dm5-topic-list .group .dm5-topic-item:hover,
.dm5-topic-list .group .dm5-assoc-item.hover {    /* assoc-item hovering is different, see note in template */
  background-color: var(--background-color-darker) !important;
}
</style>
