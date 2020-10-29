export default {

  props: {
    markerTopicIds: Array,    // IDs of topics to render as "marked"
    markerAssocIds: Array     // IDs of assocs to render as "marked"
  },

  methods: {

    markTopic (topic) {
      return this.markerTopicIds && this.markerTopicIds.includes(topic.id)
    },

    markAssoc (assoc) {
      return this.markerAssocIds && this.markerAssocIds.includes(assoc.id)
    }
  }
}
