<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <!-- ================= Song Name ================= -->
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>

      <!-- Delete Btn -->
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="handleDeleteAction"
      >
        <i class="fa fa-times"></i>
      </button>

      <!-- Edit Btn -->
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>

    <!-- ================= Form ================= -->
    <div v-show="showForm">
      <!-- Alert -->
      <div
        v-if="show_alert"
        class="flex items-center justify-between text-white font-bold p-4 mb-4 rounded"
        :class="alert_variant"
      >
        <span>{{ alert_message }}</span>
        <button
          @click="show_alert = false"
          class="text-white hover:opacity-80 transition-opacity"
        >
          <i class="fa fa-times"></i>
        </button>
      </div>

      <!-- Form -->
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <!-- Title -->
        <div class="mb-3">
          <label class="inline-block mb-2">
            {{ t("composition.songTitle") }}
          </label>
          <vee-field
            type="text"
            name="modified_name"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="t('composition.enterSongTitle')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>

        <!-- Genre -->
        <div class="mb-3">
          <label class="inline-block mb-2">
            {{ t("composition.genre") }}
          </label>
          <vee-field
            type="text"
            name="genre"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="t('composition.enterGenre')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>

        <!-- Action Btns -->
        <div class="flex gap-3">
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="in_submission"
          >
            {{ t("composition.submit") }}
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            :disabled="in_submission"
            @click.prevent="showForm = false"
          >
            {{ t("composition.goBack") }}
          </button>
        </div>
      </vee-form>
    </div>

    <!-- Confirm Delete Dialog -->
    <ConfirmDeleteDialog
      v-model="showDeleteDialog"
      title="Delete Song?"
      :message="`Are you sure you want to permanently delete '${song.modified_name}'? This action cannot be undone.`"
      @delete-confirm="deleteSong"
    />
  </div>
</template>

<script>
import { songsCollection, storage } from "@/includes/firebase";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue";
import { useI18n } from "vue-i18n";

export default {
  name: "CompositionItem",

  components: {
    ConfirmDeleteDialog,
  },

  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },

  setup() {
    const { t } = useI18n();
    return { t };
  },

  data() {
    return {
      showForm: false,
      showDeleteDialog: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_message: this.t("composition.submit"),
      alertTimeout: null,
    };
  },

  methods: {
    handleDeleteAction() {
      this.showDeleteDialog = true;
    },

    dismissAlert() {
      this.show_alert = false;

      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout);
      }
    },

    async edit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_message = "Please wait! Updating song info.";

      try {
        await songsCollection.doc(this.song.docID)?.update(values);
      } catch (error) {
        this.alert_variant = "bg-red-500";
        this.alert_message = "Something went wrong. Please try again later.";
        console.log(error);
      } finally {
        this.in_submission = false;
      }

      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.alert_variant = "bg-green-600";
      this.alert_message = "Song info updated successfully!";

      // Auto-dismiss success alert after 3 seconds
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout);
      }
      this.alertTimeout = setTimeout(() => {
        this.show_alert = false;
      }, 5000);
    },

    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);

      await songRef.delete();

      await songsCollection.doc(this.song.docID).delete();

      this.removeSong(this.index);
    },
  },
};
</script>

<style lang="scss"></style>
