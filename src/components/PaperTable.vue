<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th v-for="column in columns" :key="column">{{column}}</th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(columnIndx, index) in columnIndxs" :key="index">{{itemValue(item,columnIndx)}}</td>
          <td>
            <b-button v-b-modal.modal-1 v-on:click="viewProfile(item['id'])" class="btn ti-eye"></b-button>
          </td>
        </slot>
      </tr>
    </tbody>
    <div>
      <b-modal id="modal-1" title="Profile">
        <p class="my-4">Hello from modal!</p>
      </b-modal>
    </div>
  </table>
</template>
<script>
import { Age, formatDate } from "../utils/dateFormat";
export default {
  name: "paper-table",
  components: {
    
  },
  data() {
    return {
      showModal: false
    };
  },
  props: {
    columnIndxs: Array,
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped"
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    typeUser: {
      type: Number,
      default: 0
    }
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    }
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      switch (column) {
        case "city":
        case "district":
          return item[column]["show_name"]+ " (" +item[column]["original_name"] +")";
        case "birthday":
          return Age(item[column]);
        case "start_date":
        case "end_date":
          return formatDate(item[column]);
        case "rate":
          if (item[column] === 0) {
            return "No Rate";
          } else {
            return item[column] + "/5";
          }
        default:
          return item[column];
      }
    },
    viewProfile(id) {
      console.log(typeUser)
    }
  }
};
</script>
<style>
</style>
