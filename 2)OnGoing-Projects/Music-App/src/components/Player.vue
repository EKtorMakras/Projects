<template>
  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="song-title font-bold">{{ current_song.modified_name }}</span>
      <span class="mx-2 text-slate-600" v-if="current_song.display_name"
        >by</span
      >
      <span class="song-artist">{{ current_song.display_name }}</span>
    </div>

    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="togglePlay">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-pause': isPlaying, 'fa-play': !isPlaying }"
        ></i>
      </button>

      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        ref="progressBar"
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        @click.prevent="handleProgressClick"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>

        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>

      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
      <!-- Volume Slider -->
      <div class="ml-4 flex items-center gap-2">
        <button
          type="button"
          class="text-gray-500"
          @click.prevent="toggleMute"
          :aria-label="volume === 0 ? 'Unmute' : 'Mute'"
        >
          <span class="w-5 inline-flex justify-center">
            <i
              class="text-gray-500"
              :class="{
                'fas fa-volume-off': volume === 0,
                'fas fa-volume-down': volume > 0 && volume <= 50,
                'fas fa-volume-up': volume > 50,
              }"
            ></i>
          </span>
        </button>

        <RangeSlider
          :value="volume"
          @input="handleVolumeInput"
          aria-label="Volume"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import usePlayerStore from "@/stores/player";
import RangeSlider from "@/components/RangeSlider.vue";

export default {
  name: "AppPlayer",
  components: {
    RangeSlider,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(usePlayerStore, ["togglePlay", "updateSeek", "updateVolume"]),
    handleVolumeInput(payload) {
      const raw = payload?.target?.value ?? payload; // support Event or value
      const v = Number(raw);

      if (!Number.isFinite(v)) return;

      this.updateVolume(v);
    },

    toggleMute() {
      // toggle between mute (0) and previous volume
      if (this.volume === 0) {
        // restore previousVolume if set, otherwise default to 60
        const restore = this._previousVolume ?? 60;
        this.updateVolume(restore);
        this._previousVolume = undefined;
      } else {
        this._previousVolume = this.volume;
        this.updateVolume(0);
      }
    },

    handleProgressClick(evt) {
      this.updateSeek(evt);
    },
  },
  computed: {
    ...mapState(usePlayerStore, [
      "seek",
      "duration",
      "isPlaying",
      "playerProgress",
      "current_song",
      "volume",
    ]),
  },
};
</script>
