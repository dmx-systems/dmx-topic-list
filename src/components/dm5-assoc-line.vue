<template>
  <div class="dm5-assoc-line" :style="{'background-color': assoc.color}">
    <div class="aux-node"></div>
  </div>
</template>

<script>
import dm5 from 'dmx-api'

export default {
  props: {
    assoc: {type: dm5.Assoc, required: true}
  }
}
</script>

<style>
.dm5-assoc-line {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3px;
  transform: rotate(-2deg);
}

.dm5-assoc-line .aux-node {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: inherit;
}
</style>
