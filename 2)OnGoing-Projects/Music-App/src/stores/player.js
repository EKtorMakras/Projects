import { defineStore } from "pinia";
import { Howl } from "howler";
import { formatTime } from "@/includes/helper.js";

export default defineStore("player", {
  state: () => ({
    current_song: {},
    sound: {},
    seek: "00:00",
    duration: "00:00",
    playerProgress: "0%",
    volume: 100,
    ticking: false,
  }),

  actions: {
    async newSong(song) {
      if (!song.url) return;

      this.ticking = false;

      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.current_song = song;

      // Stop and unload previous sound if exists
      if (this.sound && typeof this.sound.unload === "function") {
        this.sound.unload();
      }

      this.sound = new Howl({
        src: [song.url],
        html5: true,
        format: ["mp3"],
        volume: this.volume / 100,
      });

      this.sound.play();

      this.sound.on("play", () => {
        this.ticking = true;
        requestAnimationFrame(this.progress);
      });

      this.sound.on("pause", () => (this.ticking = false));
      this.sound.on("stop", () => (this.ticking = false));
      this.sound.on("end", () => (this.ticking = false));
    },

    updateVolume(payload) {
      const raw = payload?.target?.value ?? payload;
      const v = Number(raw);

      if (!Number.isFinite(v)) return;

      // clamp 0..100
      const vol = Math.max(0, Math.min(100, v));
      this.volume = vol;

      // Howler expects 0..1
      const howlVol = vol / 100;

      if (this.sound instanceof Howl) {
        this.sound.volume(howlVol);
      }
    },

    togglePlay() {
      if (!(this.sound instanceof Howl)) return;
      this.sound.playing() ? this.sound.pause() : this.sound.play();
    },

    progress() {
      this.seek = formatTime(this.sound.seek());
      this.duration = formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      if (this.ticking) requestAnimationFrame(this.progress);
    },

    updateSeek(evt) {
      if (!(this.sound instanceof Howl)) return;

      const { x, width } = evt.currentTarget.getBoundingClientRect();
      const clickX = evt.clientX - x;
      const percentage = Math.min(1, Math.max(0, clickX / width));
      const seekTime = this.sound.duration() * percentage;

      this.sound.seek(seekTime);

      // update UI immediately (works even when paused)
      this.progress();
    },
  },

  getters: {
    isPlaying: (state) => {
      if (!state.sound.playing) return false;
      return state.sound.playing();
    },
  },
});
