<template>
  <div class="row">
    <div class="col-12">
      <div>
        <b-button
          variant="danger"
          class="tab"
          v-bind:disabled="tabActive === 1"
          v-on:click="ActiveTab(1)"
        >List Patient</b-button>
        <b-button
          variant="info"
          class="tab"
          v-bind:disabled="tabActive === 2"
          v-on:click="ActiveTab(2)"
        >List Nurse</b-button>
        <b-button
          variant="success"
          class="tab"
          v-bind:disabled="tabActive === 3"
          v-on:click="ActiveTab(3)"
        >List Account</b-button>
      </div>
      <card :title="table1.title" :subTitle="table1.subTitle">
        <div class="form-inline" v-if="tabActive !== 3">
          <!-- <label for="inline-form-input-start">Start date</label> -->
          <b-input
            id="inline-form-input-start"
            placeholder="Start date"
            type="date"
            v-model="formData.start_date"
            v-on:change="fetch(1)"
          ></b-input>
          <!-- <label for="inline-form-input-end">End date</label> -->
          <b-input
            id="inline-form-input-end"
            placeholder="End date"
            type="date"
            v-model="formData.end_date"
            v-on:change="fetch(1)"
          ></b-input>
          <b-select v-model="formData.city_code" v-on:change="getDistrict">
            <option value>- Please select city --</option>
            <option
              v-for="(item, index) in dataLocation"
              :key="index"
              v-bind:value="item['code']"
            >{{item['show_name']}}</option>
          </b-select>
          <b-select v-model="formData.district_code" v-on:change="fetch(1)">
            <option value>- Please select district --</option>
            <option
              v-for="(item, index) in dataDistrict"
              :key="index"
              v-bind:value="item['code']"
            >{{item['show_name']}}</option>
          </b-select>
          <b-button variant="primary" v-on:click="reset" class="btn btn-primary" style="margin-left: 5px"><span class="ti-reload"></span> Reset search</b-button>
        </div>
        <div class="form-inline" v-if="tabActive === 3">
          <div class="input-group mb-3">
            <label>Filter by name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Keyword search"
              v-model="formData.name"
              v-on:keyup="fetch(1)"
            />
          </div>
        </div>
        <div class="col-md-4 pull-right" style="margin-top:20px" v-if="totalPage >1">
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
        <div slot="raw-content" class="table-responsive">
          <paper-table
            :data="this.data"
            :columns="table1.columns"
            :columnIndxs="table1.columnIndxs"
            :typeUser="tabActive"
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
  "Start date",
  "End Date",
  "Action"
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
const tableNurseColumns = [
  "Name",
  "Age",
  "Number interest",
  "Rate",
  "Start date care",
  "End date care",
  "Action"
];
const columnNurseIndxs = [
  "name",
  "birthday",
  "number_like",
  "rate",
  "start_date",
  "end_date"
];
const tableAccountColums = [
  "User ID",
  "Name",
  "Email",
  "Phone",
  "Type",
  "Type Account",
  "Age"
];
const AcountColumIndexs = [
  "user_id",
  "name",
  "email",
  "phone",
  "type",
  "type_account",
  "birthday"
];
export default {
  components: {
    PaperTable
  },
  data() {
    return {
      table1: {
        title: "List patient app",
        subTitle: "",
        columns: [...tableColumns],
        columnIndxs: [...columnIndxs]
      },
      name_router: "patient/home",
      data: [],
      tabActive: 1,
      pageActive: 1,
      totalPage: 0,
      formData: {
        next_page: 1,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: "",
        name: ""
      },
      locationGet: {
        key: ""
      },
      districtGet: {
        city_code: "",
        key: ""
      },
      dataLocation: [],
      dataDistrict: []
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
      this.$store.dispatch(this.name_router, this.formData).then(reponse => {
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
      this.fetch(1)
    },
    ActiveTab(tab) {
      this.tabActive = tab;
      this.formData = {
        next_page: 1,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: ""
      };
      if (tab === 1) {
        this.table1 = {
          title: "List patient app",
          subTitle: "",
          columns: [...tableColumns],
          columnIndxs: [...columnIndxs]
        };
        this.name_router = "patient/home";
      } else if (tab === 2) {
        this.table1 = {
          title: "List Nurse app",
          subTitle: "",
          columns: [...tableNurseColumns],
          columnIndxs: [...columnNurseIndxs]
        };
        this.name_router = "nure/home";
      } else {
        this.table1 = {
          title: "List Account Manager",
          subTitle: "",
          columns: [...tableAccountColums],
          columnIndxs: [...AcountColumIndexs]
        };
        this.name_router = "user/getList";
      }
      this.fetch(1);
    },
    reset() {
      this.formData = {
        next_page: 1,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: ""
      };
      this.fetch(1);
    }
  },
  computed: {}
};
</script>
<style>
.form-inline .form-control {
  border: 1px solid #ced4da;
  background-color: #fff;
  display: inline-block;
  width: auto;
  vertical-align: middle;
  font-size: 1rem;
}
.card label {
  font-size: 1rem;
  margin-bottom: 5px;
}
.tab {
  margin-right: 10px;
}
</style>
