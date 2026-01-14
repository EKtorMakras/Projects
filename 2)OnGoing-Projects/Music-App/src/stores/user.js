import { defineStore } from "pinia";
import { auth, usersCollection } from "@/includes/firebase";

export default defineStore("user", {
  state() {
    return {
      userLoggedIn: false,
      currentUser: {
        displayName: "",
        email: "",
        uid: "",
      },
      userNamesCache: {}, // Cache for user names { uid: name }
    };
  },

  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
      });

      await userCred.user.updateProfile({
        displayName: values.name,
      });

      await userCred.user.reload();

      this.userLoggedIn = true;
      this.updateCurrentUser(userCred.user);
    },

    async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password);

      this.userLoggedIn = true;
      if (auth.currentUser) {
        this.updateCurrentUser(auth.currentUser);
      }
    },

    async signOut() {
      await auth.signOut();

      this.userLoggedIn = false;
      this.currentUser = {
        displayName: "",
        email: "",
        uid: "",
      };
    },

    updateCurrentUser(user) {
      if (user) {
        this.currentUser = {
          displayName: user.displayName || "",
          email: user.email || "",
          uid: user.uid || "",
        };
      }
    },

    initializeUser() {
      if (auth.currentUser) {
        this.updateCurrentUser(auth.currentUser);
        this.userLoggedIn = true;
      }
    },

    async fetchUserName(uid) {
      // Check if we already have this user's name in cache
      if (this.userNamesCache[uid]) {
        return this.userNamesCache[uid];
      }

      try {
        const userDoc = await usersCollection.doc(uid).get();
        const userName = userDoc.data()?.name || "Unknown";

        // Store in cache for future use
        this.userNamesCache[uid] = userName;

        return userName;
      } catch (error) {
        console.error("Error fetching user name:", error);
        return "Unknown";
      }
    },
  },
});
