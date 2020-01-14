<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title" :subTitle="table1.subTitle">
            <input 
            v-for="(item, index) in formData.totalPage"
            v-bind:key="index"
            v-on:click="fetch(item)"
            v-bind:value="item"
            name="page"
            type="button"/>
          <div slot="raw-content" class="table-responsive">
            <paper-table :data="this.data" :columns="table1.columns" :columnIndxs="table1.columnIndxs">

            </paper-table>
          </div> 
        </card>
      </div>
    </div>
</template>
<script>
import { PaperTable } from "@/components";
const tableColumns = ["Name","City","District", "Age","Number interest","Rate", "Start date care", "End date care"];
const columnIndxs = ["name","city","district","birthday","number_like","rate","start_date","end_date"]
export default {
  name:"nurse-list",
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
      data: [],
      pageActive: 0,
      formData: {
        totalPage: 0,
        start_date: 0,
        end_date: 0,
        city_code: "",
        district_code: "",
      }
    };
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch(page) {
      if(page) {
        this.formData.next_page = page
      }
      this.pageActive = page
      this.$store.dispatch("nure/home", this.formData)
      .then((reponse)=>{
        this.data = reponse.datas
        this.formData.totalPage = reponse.total_page
      })
    },
  },
  computed: {
  }
};
</script>
<style>
</style>
