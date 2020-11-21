<template>
  <div class="overflow-hidden top-0 left-0 relative h-screen w-screen">
    <div
      class="absolute left-0 top-0 h-screen w-screen bg-black opacity-25"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 h-64 w-64 bg-white shadow-xl rounded transform -translate-x-1/2 -translate-y-1/2"
    >
      <div class="text-center p-4 font-bold">Select your bid</div>
      <div class="grid grid-cols-4 px-2">
        <button
          class="col-auto p-2 text-center font-bold hover:bg-blue-500 hover:text-white rounded disabled:text-gray-300"
          v-for="i in 13"
          :key="i"
        >
          {{ i }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>