<script>
import { useI18n } from "vue-i18n";
import { auth, usersCollection } from "@/includes/firebase";
import useUserStore from "@/stores/user";
import CountrySelector from "@/components/CountrySelector.vue";

export default {
  name: "SettingsView",

  components: {
    CountrySelector,
  },

  setup() {
    const { t } = useI18n();
    const userStore = useUserStore();
    return { t, userStore };
  },

  data() {
    return {
      isEditing: false,
      isSaving: false,
      currentUser: {
        email: "",
        username: "",
        country: "",
      },
      editedUser: {
        email: "",
        username: "",
        country: "",
      },
      errors: {
        email: "",
        username: "",
        country: "",
      },
    };
  },

  methods: {
    toggleEditMode() {
      this.isEditing = true;
      this.editedUser.email = this.currentUser.email;
      this.editedUser.username = this.currentUser.username;
      this.editedUser.country = this.currentUser.country;
    },

    cancelEdit() {
      this.isEditing = false;
      // Reset edited values to current user data
      this.editedUser.email = this.currentUser.email;
      this.editedUser.username = this.currentUser.username;
      this.editedUser.country = this.currentUser.country;

      // Clear any error messages
      this.errors.email = "";
      this.errors.username = "";
      this.errors.country = "";
    },

    async saveChanges() {
      // Clear previous errors
      this.errors.email = "";
      this.errors.username = "";
      this.errors.country = "";

      let hasErrors = false;

      // Validate username
      if (!this.editedUser.username || !this.editedUser.username.trim()) {
        this.errors.username = "Username cannot be empty";
        hasErrors = true;
      } else if (this.editedUser.username.trim().length < 2) {
        this.errors.username = "Username must be at least 2 characters long";
        hasErrors = true;
      }

      // Validate email
      if (!this.editedUser.email || !this.editedUser.email.trim()) {
        this.errors.email = "Email cannot be empty";
        hasErrors = true;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(this.editedUser.email)) {
          this.errors.email = "Please enter a valid email address";
          hasErrors = true;
        }
      }

      // Validate country
      if (!this.editedUser.country || !this.editedUser.country.trim()) {
        this.errors.country = "Country cannot be empty";
        hasErrors = true;
      }

      // If there are errors, don't proceed
      if (hasErrors) {
        return;
      }

      this.isSaving = true;

      try {
        const user = auth.currentUser;

        if (user) {
          // Update display name in Firebase Auth
          await user.updateProfile({
            displayName: this.editedUser.username,
          });

          // Update email in Firebase Auth if it changed
          if (this.editedUser.email !== this.currentUser.email) {
            await user.updateEmail(this.editedUser.email);
          }

          // Update user data in Firestore
          await usersCollection.doc(user.uid).update({
            name: this.editedUser.username,
            email: this.editedUser.email,
            country: this.editedUser.country,
          });

          // Update local state
          this.currentUser.username = this.editedUser.username;
          this.currentUser.email = this.editedUser.email;
          this.currentUser.country = this.editedUser.country;

          // Update the Pinia store so other components react to the change
          await user.reload();
          this.userStore.updateCurrentUser(user);

          this.isEditing = false;
        }
      } catch (error) {
        console.error("Error updating user:", error);
        if (error.code === "auth/requires-recent-login") {
          this.errors.email =
            "For security reasons, please sign out and sign back in before changing your email";
        } else if (error.message) {
          this.errors.email = "Error: " + error.message;
        }
      } finally {
        this.isSaving = false;
      }
    },
  },

  created() {
    // Check if user is already loaded
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      // Fetch user data from Firestore to get country
      usersCollection
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            this.currentUser = {
              email: auth.currentUser.email,
              username: auth.currentUser.displayName || "",
              country: userData.country || "",
            };
            this.editedUser.email = this.currentUser.email;
            this.editedUser.username = this.currentUser.username;
            this.editedUser.country = this.currentUser.country;
          }
        });
    }

    // Also listen for auth state changes in case it updates
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Fetch user data from Firestore
        usersCollection
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();
              this.currentUser = {
                email: user.email,
                username: user.displayName || "",
                country: userData.country || "",
              };
              this.editedUser.email = this.currentUser.email;
              this.editedUser.username = this.currentUser.username;
              this.editedUser.country = this.currentUser.country;
            }
          });
      }
    });
  },
};
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-700 mb-8">
        {{ t("settings.title") || "Settings" }}
      </h1>

      <div class="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <!-- Edit Button -->
        <div class="flex justify-end mb-6">
          <button
            v-if="!isEditing"
            @click="toggleEditMode"
            class="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            <i class="fas fa-edit" />
            {{ t("settings.edit") }}
          </button>
          <div v-else class="flex gap-2">
            <button
              @click="saveChanges"
              :disabled="isSaving"
              class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
            >
              <i class="fas fa-check" />
              {{ isSaving ? t("settings.saving") : t("settings.save") }}
            </button>
            <button
              @click="cancelEdit"
              class="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <i class="fas fa-times" />
              {{ t("settings.cancel") }}
            </button>
          </div>
        </div>

        <!-- User Info Section -->
        <div class="space-y-4">
          <!-- Email (Editable) -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("auth.email") }}
            </label>
            <input
              v-model="editedUser.email"
              type="email"
              :readonly="!isEditing"
              :class="[
                'w-full px-3 py-2 border rounded-md transition-colors',
                isEditing
                  ? 'border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 cursor-not-allowed',
              ]"
            />
            <span v-if="errors.email" class="text-red-600 text-sm mt-1 block">
              {{ errors.email }}
            </span>
          </div>

          <!-- Username (Editable) -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("auth.name") }}
            </label>
            <input
              v-model="editedUser.username"
              type="text"
              :readonly="!isEditing"
              :class="[
                'w-full px-3 py-2 border rounded-md transition-colors',
                isEditing
                  ? 'border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white'
                  : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 cursor-not-allowed',
              ]"
            />
            <span
              v-if="errors.username"
              class="text-red-600 text-sm mt-1 block"
            >
              {{ errors.username }}
            </span>
          </div>

          <!-- Country (Editable with CountrySelector) -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {{ t("auth.country") }}
            </label>
            <!-- Read-only input when not editing -->
            <input
              v-if="!isEditing"
              v-model="currentUser.country"
              type="text"
              readonly
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 cursor-not-allowed rounded-md"
            />
            <!-- CountrySelector when editing -->
            <CountrySelector
              v-else
              v-model="editedUser.country"
              direction="bottom"
              variant="dark"
            />
            <span v-if="errors.country" class="text-red-600 text-sm mt-1 block">
              {{ errors.country }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
