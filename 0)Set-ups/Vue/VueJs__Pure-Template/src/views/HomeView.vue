<script setup>
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/useLocaleStore.js";
import { useNotifications } from "@/composables/useNotifications.js";
import BaseCircularLoader from "@/components/base/BaseCircularLoader.vue";
import { ref } from "vue";

const { t, locale } = useI18n();
console.log(`Current locale: ${t("lang")}`);

const store = useLocaleStore();
const lang = ref(locale.value);
const { showSuccess, showError, showWarning, showInfo } = useNotifications();
const showLoaders = ref(false);

function changeLocale() {
    store.setLocale(lang.value);
}

function toggleLoaders() {
    showLoaders.value = !showLoaders.value;
}

// Test notification functions
function testSuccess() {
    showSuccess("Operation completed successfully!");
}

function testError() {
    showError("Something went wrong!", "Error");
}

function testWarning() {
    showWarning("Please check your input.", "Warning");
}

function testInfo() {
    showInfo("This is an informational message.");
}
</script>

<template>
    <h1>Home page</h1>

    <button
        class="toggle-loader-btn"
        @click="toggleLoaders"
    >
        {{ showLoaders ? "Hide Loaders" : "Show Loaders" }}
    </button>

    <div
        v-if="showLoaders"
        class="loader-section"
    >
        <h3>Circular Loader Examples:</h3>
        <div class="loader-examples">
            <BaseCircularLoader />
            <BaseCircularLoader
                :size="60"
                color="#ff0000"
            />
            <BaseCircularLoader
                :size="80"
                color="#2196f3"
            />
        </div>
    </div>

    <div class="test-buttons">
        <button @click="testSuccess">Success</button>
        <button @click="testError">Error</button>
        <button @click="testWarning">Warning</button>
        <button @click="testInfo">Info</button>
    </div>

    <select
        v-model="lang"
        @change="changeLocale"
    >
        <option value="el">ελληνικά</option>
        <option
            value="en"
            selected
        >
            english
        </option>
    </select>

    <p>{{ $t("lang") }}</p>
</template>

<style lang="scss" scoped>
.toggle-loader-btn {
    padding: 10px 20px;
    margin: 20px 0;
    cursor: pointer;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;

    &:hover {
        background-color: #35a372;
    }
}

.loader-section {
    margin: 30px 0;

    h3 {
        margin-bottom: 15px;
    }
}

.loader-examples {
    display: flex;
    gap: 30px;
    align-items: center;
}

.test-buttons {
    display: flex;
    gap: 10px;
    margin: 20px 0;

    button {
        padding: 10px 20px;
        cursor: pointer;
    }
}
</style>
