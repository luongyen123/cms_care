<template>
  <div class="row">
    <div class="col-12">
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="form-inline">
          <label for="inline-form-input-start">Start date</label>
          <b-input
            id="inline-form-input-start"
            placeholder="Start date"
            type="date"
            v-model="formData.start_date"
          ></b-input>
          <!-- <label for="inline-form-input-end">End date</label> -->
          <b-input
            id="inline-form-input-end"
            placeholder="End date"
            type="date"
            v-model="formData.end_date"
          ></b-input>
          <b-select v-model="formData.city_code" v-on:change="getDistrict">
            <option value="">- Please select city --</option>
            <option
              v-for="(item, index) in dataLocation"
              :key="index"
              v-bind:value="item['code']"
            >{{item['show_name']}}({{item['original_name']}})</option>
          </b-select>
          <b-select v-model="formData.district_code">
            <option value="" selected>- Please select district --</option>
            <option
              v-for="(item, index) in dataDistrict"
              :key="index"
              v-bind:value="item['code']"
            >{{item['show_name']}}({{item['original_name']}})</option>
          </b-select>
          <b-button variant="primary" v-on:click="fetch(1)">Search</b-button>
        </div>
        <div class="col-md-4 pull-right" style="margin-top:20px">
          <input
            v-for="(item, index) in totalPage"
            v-bind:key="index"
            v-on:click="fetch(item)"
            v-bind:value="item"
            name="page"
            type="button"
            class="btn btn-sm btn-primary active"
            v-bind:disabled="item === pageActive"
          />
        </div>
        <div slot="raw-content" class="table-responsive">
          <paper-table
            :data="this.data"
            :columns="table1.columns"
            :columnIndxs="table1.columnIndxs"
            :typeUser="1"
          ></paper-table>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = [
  "Name",
  "City",
  "District",
  "Age",
  "Number interest",
  "Rate",
  "Start date care",
  "End date care",
  "Action"
];
const columnIndxs = [
  "name",
  "city",
  "district",
  "birthday",
  "number_like",
  "rate",
  "start_date",
  "end_date"
];
export default {
  name: "nurse-list",
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "List Nurse app",
        subTitle: "",
        columns: [...tableColumns],
        columnIndxs: [...columnIndxs]
      },
      totalPage: 0,
      data: [],
      pageActive: 0,
      formData: {
        next_page: 1,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: ""
      },
      dataLocation: [],
      dataDistrict: [],
      locationGet: {
        key: ""
      },
      districtGet: {
        city_code: "",
        key: ""
      }
    };
  },
  created() {
    this.fetch(1);
    this.fetch_locaion();
  },
  methods: {
    async fetch(page) {
      if (page) {
        this.formData.next_page = page;
      }
      this.$store.dispatch("nure/home", this.formData).then(reponse => {
        this.data = reponse.datas;
        this.totalPage = reponse.total_page;
        this.pageActive = page === 1 ? 1 : page;
      });
    },
    async fetch_locaion() {
      this.$store
        .dispatch("location/listCity", this.locationGet)
        .then(reponse => {
          this.dataLocation = reponse;
        });
    },
    getDistrict(e) {
      if (e) {
        this.districtGet = {
          city_code: e,
          key: ""
        };
        this.$store
          .dispatch("district/listDistrict", this.districtGet)
          .then(reponse => {
            this.dataDistrict = reponse;
          });
      }
    }
  },
  computed: {}
};
</script>
<style>
</style>
