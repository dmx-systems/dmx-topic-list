<template>
  <div class="dm5-assoc-line" :style="{'border-top-color': assoc.color}"></div>
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
  border-top: 3px solid;
  transform: rotate(-2deg);
}
</style>
