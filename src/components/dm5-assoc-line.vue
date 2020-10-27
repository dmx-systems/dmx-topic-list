<template>
  <div class="dm5-assoc-line" :style="lineStyle">
    <div class="value label">{{assoc.value || '&nbsp;'}}</div>
    <div class="aux-node" :style="lineStyle">&nbsp;</div>
    <div class="role-types">
      <div class="label">{{roleType1}}</div>
      <div class="label">{{roleType2}}</div>
    </div>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {

  props: {
    assoc: {type: dm5.Assoc, required: true}
  },

  computed: {

    lineStyle () {
      return {
        'background-color': this.assoc.color
      }
    },

    roleType1 () {
      return roleTypeLabel(this.assoc.player1)
    },

    roleType2 () {
      return roleTypeLabel(this.assoc.player2)
    }
  }
}

function roleTypeLabel (player) {
  return player.roleTypeUri !== 'dmx.core.default' ? player.roleTypeName : ''
}
</script>

<style>
.dm5-assoc-line {
  display: flex;
  flex-direction: column;
  height: 3px;
  transform: rotate(-2deg);
}

.dm5-assoc-line .value {
  text-align: center;
  margin-top: -20px;
}

.dm5-assoc-line .aux-node {
  align-self: center;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-top: 3px;
  margin-bottom: 2px;
}

.dm5-assoc-line .role-types {
  display: flex;
}

.dm5-assoc-line .role-types div {
  flex: auto;
  text-align: center;
}
</style>
