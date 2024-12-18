<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>

      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
          :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent="upload"
        >
          <h5>Drop your files here</h5>
        </div>

        <input type="file" multiple @change="upload($event)" />

        <hr class="my-6" />

        <!-- Progess Bars -->
        <div class="mb-4" v-for="upload in uploads" :key="upload.name">
          <!-- File Name -->
          <div class="font-bold text-sm" :class="upload.text_class">
            <i :class="upload.icon"></i>
            {{ upload.name }}
          </div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              :class="upload.variant"
              :style="{ width: upload.currentProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songsCollection } from "@/includes/firebase";

export default {
  name: "UploadFile",

  props: ["addSong"],

  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },

  methods: {
    upload(evt) {
      // Step 1: Reset the dragover state
      this.is_dragover = false;

      // Step 2: Retrieve the files from the event
      const files = this.getFiles(evt);

      // Step 3: Process each file
      files.forEach((file) => {
        if (file.type === "audio/mpeg") {
          this.startUpload(file);
        }
      });
    },

    getFiles(evt) {
      return evt.dataTransfer
        ? [...evt.dataTransfer.files] // Drag-and-drop files
        : [...evt.target.files]; // Input field files
    },

    startUpload(file) {
      const storageRef = storage.ref();
      const songsRef = storageRef.child(`songs/${file.name}`);
      const task = songsRef.put(file);

      // Add to uploads array and get the index
      const newUpload = {
        task,
        currentProgress: 0,
        name: file.name,
        variance: "bg-blue-400",
        icon: "fas fa-spinner fa-spin",
        text_class: "",
      };

      // Step 3.4: Add the new upload object to the uploads array
      this.uploads.push(newUpload);

      // Step 3.5: Get the index of the newly added upload
      const uploadIndex = this.uploads.length - 1;

      // Monitor upload task
      task.on(
        "state_changed",
        (snapshot) => this.updateProgress(snapshot, uploadIndex),
        (error) => this.handleUploadError(error, uploadIndex),
        () => this.finalizeUpload(task, uploadIndex)
      );
    },

    async finalizeUpload(task, uploadIndex) {
      const song = await this.createSongObject(task);

      const songRef = await songsCollection.add(song);
      const songSnapshot = await songRef.get();

      // Add the song to the local state
      this.addSong(songSnapshot);

      // Update the upload object to reflect success
      this.uploads[uploadIndex].variant = "bg-green-400";
      this.uploads[uploadIndex].icon = "fas fa-check";
      this.uploads[uploadIndex].text_class = "text-green-400";
    },

    async createSongObject(task) {
      const url = await task.snapshot.ref.getDownloadURL();

      return {
        uid: auth.currentUser.uid,
        display_name: auth.currentUser.displayName,
        original_name: task.snapshot.ref.name,
        modified_name: task.snapshot.ref.name,
        genre: "",
        comment_count: 0,
        url,
      };
    },

    handleUploadError(error, uploadIndex) {
      this.uploads[uploadIndex].variant = "bg-red-400";
      this.uploads[uploadIndex].icon = "fas fa-times";
      this.uploads[uploadIndex].text_class = "text-red-400";
      console.error(error);
    },

    updateProgress(snapshot, uploadIndex) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.uploads[uploadIndex].currentProgress = progress;
    },

    cancelUploads() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
      });
    },
  },

  beforeUnmount() {
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
};
</script>
