<script>
import {
  songsCollection,
  commentsCollection,
  auth,
  usersCollection,
} from "@/includes/firebase";
import { mapState, mapActions } from "pinia";
import useUserStore from "@/stores/user.js";
import usePlayerStore from "@/stores/player.js";
import CommentItem from "@/components/CommentItem.vue";

export default {
  name: "SongView",

  components: {
    CommentItem,
  },
  data() {
    return {
      id: this.$route.params.id,
      song: {},
      schema: {
        comment: "required|min:3|max:500",
      },
      sort: "1",
      comments: [],
      comment_in_submission: false,
      comment_show_alert: false,
      comment_alert_variant: "bg-blue-500",
      comment_alert_message:
        "Please wait while your comment is being submitted.",
    };
  },
  methods: {
    ...mapActions(usePlayerStore, ["newSong", "togglePlay"]),
    playPauseHandler() {
      // If the currently loaded song in player is this song, just toggle play/pause
      if (this.current_song && this.current_song.docId === this.song.docId) {
        this.togglePlay();
        return;
      }

      // Otherwise, load and play this song
      this.newSong(this.song);
    },
    async addComment(values, { resetForm }) {
      this.comment_in_submission = true;
      this.comment_show_alert = true;
      this.comment_alert_variant = "bg-blue-500";
      this.comment_alert_message =
        "Please wait while your comment is being submitted.";

      // Get user name from displayName or fetch from Firestore
      let userName = auth.currentUser.displayName;

      if (!userName) {
        const userDoc = await usersCollection.doc(auth.currentUser.uid).get();
        userName = userDoc.data()?.name || "Anonymous";
      }

      const commentData = {
        content: values.comment,
        datePosted: new Date().toISOString(),
        sid: this.$route.params.id,
        name: userName,
        uid: auth.currentUser.uid,
      };

      await commentsCollection.add(commentData);

      this.song.comment_count += 1;

      await songsCollection.doc(this.$route.params.id).update({
        comment_count: this.song.comment_count,
      });

      this.getComments();

      this.comment_in_submission = false;
      this.comment_alert_variant = "bg-green-500";
      this.comment_alert_message = "Your comment has been submitted!";

      resetForm();

      // Refresh comments
      this.getComments();
    },

    async getComments() {
      const snapShots = await commentsCollection
        .where("sid", "==", this.$route.params.id)
        .get();

      this.comments = [];

      snapShots.forEach((doc) => {
        this.comments.push({
          docId: doc.id,
          ...doc.data(),
        });
      });

      // Sync comment_count with actual comments from Firestore
      if (this.song.comment_count !== snapShots.size) {
        this.song.comment_count = snapShots.size;

        // Update in Firestore
        await songsCollection.doc(this.$route.params.id).update({
          comment_count: snapShots.size,
        });
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ["userLoggedIn"]),
    ...mapState(usePlayerStore, ["isPlaying", "current_song"]),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sort === "1") {
          return new Date(b.datePosted) - new Date(a.datePosted);
        }
        return new Date(a.datePosted) - new Date(b.datePosted);
      });
    },
    isThisSongPlaying() {
      return (
        this.current_song &&
        this.current_song.docId === this.song.docId &&
        this.isPlaying
      );
    },
  },

  async beforeRouteEnter(to, from, next) {
    const songDoc = await songsCollection.doc(to.params.id).get();

    next((vm) => {
      if (!songDoc.exists) {
        vm.$router.push({
          name: "notfound",
          params: {
            title: "Song Not Found",
            message:
              "The song you're looking for doesn't exist or has been removed.",
          },
        });

        return;
      }

      const { sort } = vm.$route.query;

      vm.sort = sort === "1" || sort === "2" ? sort : "1";

      vm.song = {
        docId: songDoc.id,
        ...songDoc.data(),
      };

      vm.getComments();
    });
  },

  watch: {
    sort(newVal) {
      if (newVal === this.$route.query.sort) return;

      this.$router.push({
        query: {
          sort: newVal,
        },
      });
    },
  },
};
</script>

<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="playPauseHandler"
        >
          <i
            class="fa"
            :class="{
              'fa-pause': isThisSongPlaying,
              'fa-play': !isThisSongPlaying,
            }"
          ></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div
        class="bg-white rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">
            {{
              $t("song.comment_count", song.comment_count, {
                count: song.comment_count,
              })
            }}
          </span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            v-if="comment_show_alert"
            class="text-white text-center font-bold mb-4 p-4"
            :class="comment_alert_variant"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form
            :validation-schema="schema"
            @submit="addComment"
            v-if="userLoggedIn"
          >
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              :placeholder="$t('song.commentPlaceholder')"
            ></vee-field>
            <ErrorMessage class="text-red-600 mb-4" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              {{ $t("auth.submit") }}
            </button>
          </vee-form>

          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="sort"
          >
            <option value="1">{{ $t("song.latestComments") }}</option>
            <option value="2">{{ $t("song.oldestComments") }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="container mx-auto" id="comments">
      <comment-item
        v-for="comment in sortedComments"
        :key="comment.docId"
        :comment="comment"
        :song-id="id"
        @comment-deleted="getComments"
        @comment-updated="getComments"
      />
    </ul>
  </main>
</template>
