<script>
import dayjs from "@/includes/dayjs";
import { auth, commentsCollection, songsCollection } from "@/includes/firebase";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.vue";
import ActionMenu from "./ActionMenu.vue";
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";

export default {
  name: "CommentItem",

  components: {
    ConfirmDeleteDialog,
    ActionMenu,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
    songId: {
      type: String,
      required: true,
    },
  },

  emits: ["comment-deleted", "comment-updated"],

  data() {
    return {
      isEditing: false,
      editedContent: "",
      isSaving: false,
      showDeleteDialog: false,
      commentActions: [
        {
          id: "edit",
          label: "Edit",
          icon: "fa-edit",
          color: "#3b82f6",
        },
        {
          id: "delete",
          label: "Delete",
          icon: "fa-trash",
          color: "#ef4444",
        },
      ],
      test: auth.currentUser,
      commentAuthorName: "",
    };
  },

  computed: {
    ...mapStores(useUserStore),

    formattedDate() {
      return dayjs(this.comment.datePosted).format("MMM DD, YYYY [at] h:mm A");
    },

    isCommentOwner() {
      return auth.currentUser && auth.currentUser.uid === this.comment.uid;
    },
  },

  methods: {
    async fetchCommentAuthorName() {
      if (this.comment.uid) {
        this.commentAuthorName = await this.userStore.fetchUserName(
          this.comment.uid
        );
      }
    },

    handleAction(actionId) {
      if (actionId === "edit") {
        this.startEdit();
      } else if (actionId === "delete") {
        this.confirmDelete();
      }
    },

    startEdit() {
      this.editedContent = this.comment.content;
      this.isEditing = true;
    },

    async saveEdit() {
      if (!this.editedContent.trim()) {
        alert("Comment cannot be empty");
        return;
      }

      this.isSaving = true;

      try {
        await commentsCollection.doc(this.comment.docId).update({
          content: this.editedContent,
        });

        this.isEditing = false;
        this.$emit("comment-updated", {
          ...this.comment,
          content: this.editedContent,
        });
      } catch (error) {
        console.error("Error updating comment:", error);
        alert("Failed to update comment. Please try again.");
      } finally {
        this.isSaving = false;
      }
    },

    cancelEdit() {
      this.isEditing = false;
      this.editedContent = "";
    },

    confirmDelete() {
      this.showDeleteDialog = true;
    },

    async deleteComment() {
      try {
        await commentsCollection.doc(this.comment.docId).delete();

        const songRef = songsCollection.doc(this.songId);
        const songDoc = await songRef.get();
        const currentCount = songDoc.data().comment_count || 0;

        if (currentCount > 0) {
          await songRef.update({
            comment_count: currentCount - 1,
          });
        }

        this.$emit("comment-deleted", this.comment.docId);
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment. Please try again.");
      }
    },
  },

  mounted() {
    this.fetchCommentAuthorName();
  },

  beforeUnmount() {
    // Cleanup if needed
  },
};
</script>

<template>
  <li class="p-6 bg-gray-50 border border-gray-200 relative">
    <!-- Comment Header with Author and Menu -->
    <div class="flex justify-between items-start mb-5">
      <div>
        <div class="font-bold">{{ commentAuthorName || comment.name }}</div>
        <time class="text-sm text-gray-500">{{ formattedDate }}</time>
      </div>

      <!-- Menu Button (only show for comment owner) -->
      <action-menu
        v-if="isCommentOwner"
        :actions="commentActions"
        @action="handleAction"
      />
    </div>

    <!-- Edit Mode -->
    <div v-if="isEditing" class="mb-4">
      <textarea
        v-model="editedContent"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-3"
        rows="3"
      ></textarea>
      <div class="flex gap-2">
        <button
          @click="saveEdit"
          :disabled="isSaving"
          class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {{ isSaving ? "Saving..." : "Save" }}
        </button>
        <button
          @click="cancelEdit"
          :disabled="isSaving"
          class="px-3 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500 transition disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
    <!-- Comment Content (when not editing) -->
    <p v-if="!isEditing" class="text-gray-700">
      {{ comment.content }}
    </p>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDeleteDialog
      v-model="showDeleteDialog"
      title="Delete Comment?"
      message="Are you sure you want to delete this comment? This action cannot be undone."
      @delete-confirm="deleteComment"
    />
  </li>
</template>
