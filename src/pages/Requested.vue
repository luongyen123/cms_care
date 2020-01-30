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
      <button v-on:click="reset" class="btn btn-primary"><span class="ti-reload"></span> Reset search</button>
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
              <td>
                <button
                  class="btn ti-layout-tab-window"
                  v-b-modal.modal-1
                  v-on:click="detailRequest(item['id_request'])"
                ></button>
              </td>
            </slot>
          </tr>
        </tbody>
      </table>
      <b-modal id="modal-1" title="Detail request" size="lg">
        <div class="form-row" v-if="responseDetail.nurse">
          <div class="form-group col-md-12" style="margin-top: -34px;">
            <h4>Nurse Information</h4>
          </div>
          <div class="form-group col-md-4" v-if="responseDetail.nurse.name">
            <label>Name</label>
            <input type="Text" class="form-control" v-model="responseDetail.nurse.name" disabled />
          </div>
          <div class="form-group col-md-4" v-if="responseDetail.nurse.phone">
            <label>Phone</label>
            <input type="text" class="form-control" v-model="responseDetail.nurse.phone" disabled />
          </div>
          <div class="form-group col-md-4" v-if="responseDetail.nurse.email">
            <label>Email</label>
            <input type="text" class="form-control" v-model="responseDetail.nurse.email" disabled />
          </div>
        </div>
        <div class="form-row" v-if="responseDetail.patient">
          <div class="form-group col-md-12" style="margin-top: -34px;">
            <h4>Patient Information</h4>
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.patient.name">
            <label>Name</label>
            <input type="text" class="form-control" v-model="responseDetail.patient.name" disabled />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.patient.birthday">
            <label>Age</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="getAge(responseDetail.patient.birthday)"
              disabled
            />
          </div>
          <div class="form-group col-md-12" v-if="responseDetail.patient">
            <label style="font-size: 19px;">Contact</label>
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.patient.phone">
            <label>Phone</label>
            <input type="text" class="form-control" v-model="responseDetail.patient.phone" disabled />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.patient.email">
            <label>Email</label>
            <input type="text" class="form-control" v-model="responseDetail.patient.email" disabled />
          </div>
        </div>
        <div class="form-group col-md-12">
          <h4>Detail request</h4>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6" v-if="responseDetail.start_date">
            <label>Start date care</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="viewDate(responseDetail.start_date)"
              disabled
            />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.start_date">
            <label>End date care</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="viewDate(responseDetail.end_date)"
              disabled
            />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.start_time">
            <label>Start time care</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="itemValue(responseDetail,'start_time')"
              disabled
            />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.end_time">
            <label>End time care</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="itemValue(responseDetail,'end_time')"
              disabled
            />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.status">
            <label>Status</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="itemValue(responseDetail,'status')"
              disabled
            />
          </div>
          <div class="form-group col-md-6" v-if="responseDetail.type">
            <label>Type</label>
            <input
              type="text"
              class="form-control"
              v-bind:value="itemValue(responseDetail,'type')"
              disabled
            />
          </div>
          <div class="form-group col-md-6">
            <label>Rate {{responseDetail.rate +'/5'}}</label>
            <i class="fa fa-star" aria-hidden="true" v-for="(item, index) in 5" v-bind:key="index" v-bind:class="{ active: star(item,responseDetail.rate ) }"></i>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>
<script>
import {
  formatTimeLog,
  Age,
  formatDate,
  formatTime
} from "../utils/dateFormat";
const columns = [
  "#",
  "Nurse",
  "Patient",
  "User Login",
  "Type",
  "Status",
  "Time",
  "Action"
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
      detaiRequestForm: {
        id_request: 0
      },
      responseDetail: {},
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
        case "start_time":
        case "end_time":
          return formatTime(item[column]);
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
    itemIndex(index) {
      if (this.pageActive === 1) {
        return index + 1;
      } else {
        return index + 1 + 10 * (this.pageActive - 1);
      }
    },
    detailRequest(id_request) {
      this.detaiRequestForm = {
        id_request: id_request
      };
      this.$store
        .dispatch("user/detailRequest", this.detaiRequestForm)
        .then(reponse => {
          this.responseDetail = reponse;
          // console.log(this.responseDetail);
        });
    },
    getAge(birthday) {
      return Age(birthday);
    },
    viewDate(date) {
      return formatDate(date);
    },
    star(item, rate) {
      if(item <= rate) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>

<style>
.fa-star {
  font-size: 34px;
  margin: 8px;
}
.active {
  color: #ffe600;
}
</style>