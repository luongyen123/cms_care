<template>
  <div class="row">
    <div class="col-md-3">
      <div class="form-group row">
        <label>Filter by status</label>
        <select class="custom-select" v-model="formData.status" v-on:change="fetch(1)">
          <option value="-1" selected>Please select option</option>
          <option value="1">Taking care of</option>
          <option value="2">Pending</option>
          <option value="3">Finish</option>
        </select>
      </div>
      <div class="form-group row">
        <label>Filter by time start date</label>
        <input
          class="custom-select"
          type="date"
          v-model="formData.start_date"
          v-on:change="fetch(1)"
        />
      </div>
      <div class="form-group row">
        <label>Filter by time end date</label>
        <input class="custom-select" type="date" v-model="formData.end_date" v-on:change="fetch(1)" />
      </div>
      <button v-on:click="reset" class="btn btn-primary">Reset search</button>
    </div>
    <div class="col-md-9">
      <div style="margin-bottom:10px" v-if="totalPage >1">
        <input
          v-for="(item, index) in totalPage"
          v-bind:key="index"
          v-on:click="fetch(item)"
          v-bind:value="item"
          name="page"
          type="button"
          class="btn btn-sm btn-primary active"
          v-bind:disabled="item === pageActive"
          style="margin-right: 5px"
        />
      </div>
      <table class="table">
        <thead class="thead-dark">
          <slot name="columns">
            <th scope="col" v-for="column in columns" :key="column">{{column}}</th>
          </slot>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{itemIndex(index)}}</td>
            <slot :row="item">
              <td
                v-for="(columnIndx, index) in columsIndxs"
                :key="index"
              >{{itemValue(item,columnIndx)}}</td>
            </slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { formatTimeLog } from "../utils/dateFormat";
const columns = [
  "#",
  "Nurse",
  "Patient",
  "User Login",
  "Type",
  "Status",
  "Time"
];
const columsIndxs = [
  "nurse",
  "patient",
  "user_login",
  "type",
  "status",
  "created"
];
export default {
  name: "requested",
  data() {
    return {
      columns: [...columns],
      columsIndxs: [...columsIndxs],
      pageActive: 1,
      formData: {
        page: 1,
        status: -1,
        start_date: "",
        end_date: ""
      },
      data: [],
      totalPage: 0,
      name_router: "user/getRequest"
    };
  },
  created() {
    this.fetch(this.formData.page);
  },
  methods: {
    async fetch(page) {
      if (page) {
        this.formData.page = page;
      }
      this.$store.dispatch(this.name_router, this.formData).then(reponse => {
        this.data = reponse.datas;
        this.totalPage = reponse.total_page;
        this.pageActive = page === 1 ? 1 : page;
      });
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    itemValue(item, column) {
      switch (column) {
        case "nurse":
        case "patient":
        case "user_login":
          if (!this.isEmpty(item[column])) {
            return item[column].name;
          } else {
            return "_";
          }
        case "created":
          return formatTimeLog(item[column]);
        case "type":
          if (item[column] === 1) {
            return "Nurses send requests";
          } else if (item[column] === 2) {
            return "The patient sends a request";
          }
        case "status":
          if (item[column] == 1) {
            return "Taking care of";
          } else if (item[column] == 2) {
            return "Pending";
          } else {
            return "Finish";
          }
        default:
          return item[column];
      }
    },
    reset() {
      this.formData = {
        page: 1,
        status: -1,
        start_date: "",
        end_date: ""
      };
      this.fetch(1);
    },
    itemIndex(index){
        if(this.pageActive === 1){
            return index +1
        } else {
            return index +1 + 10*(this.pageActive -1)
        }
    }
  }
};
</script>

<style>
</style>