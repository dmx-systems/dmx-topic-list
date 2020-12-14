<template>
  <div class="dmx-assoc-line" :style="lineStyle">
    <div class="aux-node" :style="lineStyle">&nbsp;</div>
    <div class="labels" v-show="showLabels">
      <div class="value label">{{assoc.value || '&nbsp;'}}</div>
      <div class="role-types">
        <div class="label">{{roleType1}}</div>
        <div class="label">{{roleType2}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dmx from 'dmx-api'

export default {

  props: {
    assoc: {type: dmx.Assoc, required: true},
    showLabels: Boolean
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
.dmx-assoc-line {
  display: flex;
  flex-direction: column;
  height: 3px;
  transform: rotate(-2deg);
  pointer-events: none;
}

.dmx-assoc-line .value {
  text-align: center;
  margin-top: -24px;
}

.dmx-assoc-line .aux-node {
  align-self: center;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-top: -1px;
}

.dmx-assoc-line .role-types {
  display: flex;
  margin-top: 9px;
}

.dmx-assoc-line .role-types div {
  flex: auto;
  text-align: center;
}
</style>
