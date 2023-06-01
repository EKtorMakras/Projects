<template>
  <div>
    <!-- ======= Alert ======= -->
    <div
      v-if="loginAlert.show"
      class="text-white text-center font-bold p-4 rounded mb-4"
      :class="loginAlert.variant"
    >
      {{ loginAlert.msg }}
    </div>

    <!-- ======= Form  ======= -->
    <vee-form :validation-schema="loginSchema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage name="email" class="text-red-600" />
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field
          name="password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage name="password" class="text-red-600" />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="loginInSubmission"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";

export default {
  name: "LoginForm",

  components: { ErrorMessage },

  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:7|max:40|excluded:password",
      },

      loginInSubmission: false,

      loginAlert: {
        show: false,
        variant: "bg-blue-500",
        msg: "Please wait. We are logging you in.",
      },
    };
  },

  methods: {
    login(values) {
      this.loginInSubmission = true;
      this.loginAlert.show = true;
      this.loginAlert.variant = "bg-blue-500";
      this.loginAlert.msg = "Please wait. Your account is being created.";

      this.loginAlert.variant = "bg-green-500";
      this.loginAlert.msg = "Success! Your are now logged in.";
      console.log(values);
    },
  },
};
</script>

<style lang="scss" scoped></style>
