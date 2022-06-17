<template>
  <img :src="userAvatar" alt="avatar" class="w-8 h-8 rounded-full" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "UserAvatar",
  setup() {
    const store = useStore();
    const UserAvatar = computed(
      () => store.getters["userModule/getUserAvatar"]
    );

    return { UserAvatar };
  },
};
</script>

<style>
</style>