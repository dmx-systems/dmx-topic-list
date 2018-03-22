<template>
  <div class="dm5-topic-list">
    <div class="info field-label">{{count}} Topics, sorted by</div>
    <el-select v-model="sort">
      <el-option label="Topic" value="topic"></el-option>
      <el-option label="Topic Type" value="type"></el-option>
      <el-option label="Association Type" value="assoc"></el-option>
    </el-select>
    <div class="groups">
      <template v-for="group in groups">
        <div class="title" v-if="!topicSort">
          {{group.title}} <span class="count">({{group.topics.length}})</span>
        </div>
        <div>
          <!-- Note: the same topic might appear more than once (e.g. in a "what's related" list).
               In order to avoid a key clash we use the loop index. -->
          <dm5-topic v-for="(topic, i) in group.topics" :topic="topic" :omit="omit" :key="i"
            @click.native="click(topic)">
          </dm5-topic>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {

  props: ['topics'],    // undefined at creation

  data () {
    return {
      sort: 'type'      // selected sort mode: "topic", "type", "assoc"
    }
  },

  computed: {

    count () {
      return this.topics && this.topics.length
    },

    groups () {
      const groups = []
      if (this.topics) {
        this.topics.sort(this.compareFn())
        if (this.topicSort) {
          groups.push({topics: this.topics})
        } else {
          const select = selectFn[this.sort]
          let title   // current title
          let group   // current group
          this.topics.forEach(topic => {
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
      }
      return groups
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

    compareFn () {
      const select = selectFn[this.sort]
      return (t1, t2) => select(t1).localeCompare(select(t2))
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
.dm5-topic-list .info {
  margin-top: 1em;
}

.dm5-topic-list .groups {
  margin-top: 2em;
}

.dm5-topic-list .groups .title {
  margin-top: 1.8em;
  margin-bottom: 1em;
  font-weight: bold;
}

.dm5-topic-list .groups .title .count {
  font-weight: initial;
}

.dm5-topic-list .dm5-topic {
  border-bottom: 1px solid var(--border-color);
  background-color: white;
  transition: background-color 0.25s;
  padding: 12px;
}

.dm5-topic-list .dm5-topic:nth-child(1) {
  border-top: 1px solid var(--border-color);
}

.dm5-topic-list .dm5-topic:hover {
  background-color: var(--background-color-darker);
}
</style>
