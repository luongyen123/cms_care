<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="form-group form-inline">
          <div class="form-group">
            <label for="start_date">Start date:</label>
            <input type="date" class="form-control" id="start_date" />
          </div>
          <div class="form-group">
            <label for="end_date">End date:</label>
            <input type="date" class="form-control" id="end_date" />
          </div>
          <list-location :data="dataLocation" :nameList="locationColums.nameList" :code="locationColums.code" :show_name="locationColums.show_name"/>
          <button type="submit" class="btn btn-default">Search</button>
        </div>
        <input
              v-for="(item, index) in formData.totalPage"
              v-bind:key="index"
              v-on:click="fetch(item)"
              v-bind:value="item"
              name="page"
              type="button"
            />
        <div slot="raw-content" class="table-responsive">
          <paper-table
            :data="this.data"
            :columns="table1.columns"
            :columnIndxs="table1.columnIndxs"
          ></paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
import ListLocation from '@/components/ListLocation.vue'
const locationColums = {
  nameList: "city_code",
  code: "code",
  show_name: "show_name"
}
const tableColumns = [
  "Name",
  "City",
  "District",
  "Age",
  "Number interest",
  "Start date",
  "End Date"
];
const columnIndxs = [
  "name",
  "city",
  "district",
  "birthday",
  "number_like",
  "start_date",
  "end_date"
];
export default {
  components: {
    PaperTable,
    ListLocation
  },
  data() {
    return {
      table1: {
        title: "List patient app",
        subTitle: "",
        columns: [...tableColumns],
        columnIndxs: [...columnIndxs]
      },
      data: [],
      pageActive: 0,
      formData: {
        totalPage: 0,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: ""
      },
      locationGet: {
        key:""
      },
      locationColums,
      dataLocation: []
    };
  },
  created() {
    this.fetch();
    this.fetch_locaion()
  },
  methods: {
    async fetch(page) {
      if (page) {
        this.formData.next_page = page;
      }
      this.pageActive = page;
      this.$store.dispatch("patient/home", this.formData).then(reponse => {
        this.data = reponse.datas;
        this.formData.totalPage = reponse.total_page;
      });
    },
    async fetch_locaion() {
      this.$store.dispatch("location/listCity", this.locationGet).then(reponse => {
        this.dataLocation = reponse;
      });
    }
  },
  computed: {}
};
</script>
<style>
</style>
