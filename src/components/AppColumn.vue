<template>
  <div class="column p-3 mr-4 rounded bg-gray-199 cursor-move">
    <div class="flex justify-between">
      <a href="#" class="text-sm text-right block text text-gray-600">
        Delete
      </a>
      <a href="#" class="text-sm text-right block text-gray-600">
        Create Card
      </a>
    </div>
    <h3
      class="
        mb-3
        text-gray-700
        font-semibold font-sans
        tracking-wide
        text-xl text-center
      "
    >
      {{ column.name }}
    </h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppColumn",
  props: {
    column: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.column {
  flex-basis: 25%;
}
</style>