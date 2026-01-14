<script>
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "SongItem",
  props: ["song"],

  data() {
    return {
      uploaderName: "",
    };
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async fetchUploaderName() {
      if (this.song.uid) {
        this.uploaderName = await this.userStore.fetchUserName(this.song.uid);
      }
    },
  },

  mounted() {
    this.fetchUploaderName();
  },
};
</script>

<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docId } }"
        class="font-bold block text-gray-600"
        >{{ song.modified_name }}
      </router-link>
      <span class="text-gray-500 text-sm">{{ uploaderName }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>
