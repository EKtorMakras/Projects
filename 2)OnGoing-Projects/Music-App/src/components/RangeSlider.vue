<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :value="value"
    @input="$emit('input', Number($event.target.value))"
    @mousedown.stop
    @touchstart.stop
    :aria-label="ariaLabel"
    :style="rangeBg"
    class="range-slider"
  />
</template>

<script>
export default {
  name: "RangeSlider",
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    ariaLabel: {
      type: String,
      default: "range",
    },
  },
  computed: {
    rangeBg() {
      const min = this.min;
      const max = this.max;
      const value = Math.min(max, Math.max(min, Number(this.value)));

      if (!max || max <= min) {
        return { background: "#e5e7eb" };
      }

      const percent = ((value - min) / (max - min)) * 100;

      return {
        background: `linear-gradient(90deg, #34d399 ${percent}%, #e5e7eb ${percent}%)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.range-slider {
  $thumb-color: #065f46;
  $thumb-size: 14px;

  -webkit-appearance: none;
  appearance: none;
  width: 6rem;
  height: 8px;
  background: transparent;
  position: relative;
  z-index: 50;
  pointer-events: auto;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    height: 8px;
    background: transparent;
    border-radius: 9999px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: $thumb-size;
    height: $thumb-size;
    background: $thumb-color;
    border-radius: 9999px;
    margin-top: -3px;
    box-shadow: 0 0 0 3px rgba($thumb-color, 0.15);
    cursor: pointer;
    position: relative;
    z-index: 60;
  }

  &::-moz-range-track {
    height: 8px;
    background: transparent;
    border-radius: 9999px;
  }

  &::-moz-range-thumb {
    width: $thumb-size;
    height: $thumb-size;
    background: $thumb-color;
    border-radius: 9999px;
    border: none;
  }

  &::-ms-track {
    height: 8px;
    background: transparent;
    border-color: transparent;
  }
}
</style>
