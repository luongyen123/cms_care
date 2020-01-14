<template>
  <div class="form-group">
    <select placeholder="type to search..." v-bind:name="nameList" v-model="selected">
        <input type="text" />
      <option
        v-for="(item, index) in data"
        :key="index"
        v-bind:value="item[code]"
      >{{item[show_name]}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "list-location",
  data() {
    return {
      selected: 1
    };
  },
  props: {
    data: Array,
    nameList: String,
    code: String,
    show_name: String
  }
};
</script>