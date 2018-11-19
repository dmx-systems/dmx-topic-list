<template>
  <div class="dm5-topic-list">
    <div class="field-label" v-if="!noSortMenu">{{sortLabel}}</div>
    <template v-if="size">
      <el-select class="sort-menu" v-model="sort" v-if="!noSortMenu">
        <el-option label="Topic" value="topic"></el-option>
        <el-option label="Topic Type" value="type"></el-option>
        <el-option label="Association Type" value="assoc" v-if="isRelTopics"></el-option>
      </el-select>
      <div class="group" v-for="group in groups">
        <div class="field-label" v-if="!topicSort">{{group.title}} ({{group.topics.length}})</div>
        <div>
          <!-- Note: the same topic might appear more than once (e.g. in a "what's related" list).
               In order to avoid a key clash we use the loop index. -->
          <dm5-topic v-for="(topic, i) in group.topics" :topic="topic" :omit="omit" :marked="marked(topic)" :key="i"
            @click.native="click(topic)">
          </dm5-topic>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dm5 from 'dm5'

export default {

  created () {
    // console.log('dm5-topic-list created', this.markerIds)
  },

  props: {
    topics: {type: Array, required: true},    // TODO: don't require?
    noSortMenu: Boolean,    // TODO: revise wording and semantics
    noSort: Boolean,        // TODO: revise wording and semantics
    emptyText: String,
    markerIds: Array        // IDs of topics to render as "marked"
  },

  data () {
    return {
      sort: 'type',     // selected sort mode: 'topic', 'type', 'assoc'
      emptyTextDefault: 'No Data'
    }
  },

  computed: {

    size () {
      return this.topics.length
    },

    sortLabel () {
      return this.size ? `${this.size} Topics, sorted by` : this.emptyText || this.emptyTextDefault
    },

    isRelTopics () {
      return this.topics[0] instanceof dm5.RelatedTopic
    },

    groups () {
      const groups = []
      // Note: as "topics" is reactive state in-place sorting would trigger re-computation of "groups" ad infinitum
      const _topics = this.topics.slice()           // shallow copy
      !this.noSort && _topics.sort(this.compareFn)  // in-place sort
      if (this.topicSort) {
        groups.push({topics: _topics})
      } else {
        const select = selectFn[this.sort]
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
      const select = selectFn[this.sort]
      return (t1, t2) => {
        const v1 = select(t1)
        const v2 = select(t2)
        return v1 === v2 ? t1.value.localeCompare(t2.value) : v1.localeCompare(v2)
      }
    },

    topicSort () {
      return this.sort === 'topic'
    },

    omit () {
      // Note: dm5-topic expects a String (or undefined)
      if (!this.topicSort) {
        return this.sort
      }
    }
  },

  methods: {

    marked (topic) {
      return this.markerIds && this.markerIds.includes(topic.id)
    },

    click (topic) {
      this.$emit('topic-click', topic)
    }
  },

  components: {
    'dm5-topic': require('./dm5-topic').default
  }
}

const selectFn = {
  topic: topic => topic.value,
  type:  topic => topic.typeName,
  assoc: topic => topic.assoc.typeName
}
</script>

<style>
.dm5-topic-list .sort-menu {
  margin-bottom: 2em;
}

.dm5-topic-list .group + .group {
  margin-top: 1.6em;
}

.dm5-topic-list .dm5-topic {
  border-bottom: 1px solid var(--border-color);
  border-left:   1px solid var(--border-color);
  background-color: white;
  transition: background-color 0.25s;
  padding: 8px;
}

.dm5-topic-list .dm5-topic:nth-child(1) {
  border-top: 1px solid var(--border-color);
}

.dm5-topic-list .dm5-topic:hover {
  background-color: var(--background-color-darker);
}
</style>
