<template>
  <div class="ScheDulingIndex">
    <a-layout>
      <a-layout-header>
        <!-- 这里先做控制区域 -->
        <div class="headfunction">
          <div class="headbox">
            <a-row>
              <a-col :span="11">
                <a-select default-value="lucy"
                          style="width: 120px"
                          @change="handleChange">
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                </a-select>
                <a-button class="direction">
                  <a-icon type="left" />
                </a-button>
                <a-button class="direction">
                  <a-icon type="right" />
                </a-button>
                <a-button class=" direction functionbutton">
                  本周
                </a-button>
                <a-button type="primary"
                          @click="editScheDuling"
                          class="functionbutton">
                  编辑
                </a-button>
              </a-col>
              <a-col :span="8">
                <a-button type="primary"
                          @click="personnelGrouping"
                          class=" functionbutton">
                  人员分组
                </a-button>
                <a-button type="primary"
                          @click="openSchedulingShift"
                          class=" functionbutton">
                  排班班次
                </a-button>
                <a-button type="primary"
                          class=" functionbutton"
                          @click="shiftGrouping">
                  班次分组
                </a-button>
              </a-col>
              <a-col :span="5">
                <a-button type="primary"
                          class=" functionbutton">
                  管床
                </a-button>
                <a-button type="primary"
                          class=" functionbutton">
                  导出
                </a-button>
                <a-button type="primary"
                          class=" functionbutton">
                  打印
                </a-button>
              </a-col>
            </a-row>

          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <a-table :columns="columns"
                 class="groupingtable"
                 :row-key="record => record.xm"
                 :data-source="data"
                 :pagination="false"
                 :loading="loading"
                 @change="handleTableChange">
          <template slot="xm"
                    slot-scope="xm"> {{xm }} {{ xm }} </template>
        </a-table>
        <div class="personnelgrouping">
          <a-modal v-model="schedulingvisible"
                   title="排班管理"
                   width="96%"
                   height="88%"
                   class="myscheduing"
                   :destroyOnClose="true"
                   :maskClosable="false">
            <template slot="footer">
              <a-button key="back"
                        @click="schedulinghandleCancel">
                退出排班管理
              </a-button>
              <!-- <a-button key="submit"
                        type="primary"
                        :loading="loading"
                        @click="handleOk">
                Submit
              </a-button> -->
            </template>
            <NewMyScheDuing></NewMyScheDuing>
            <!-- <ScheDuling v-if="1"></ScheDuling> -->
            <!-- <MyScheDuling></MyScheDuling> -->
            <!-- <Old></Old> -->

          </a-modal>
        </div>

        <div class="personnelgrouping">
          <a-modal v-model="visible"
                   title="人员分组"
                   width="800px"
                   height="88%"
                   :destroyOnClose="true"
                   :maskClosable="false"
                   on-ok="handleOk">
            <template slot="footer">
              <a-button key="back"
                        @click="handleCancel">
                退出人员分组
              </a-button>
              <!-- <a-button key="submit"
                        type="primary"
                        :loading="loading"
                        @click="handleOk">
                Submit
              </a-button> -->
            </template>
            <PersonnelGrouping></PersonnelGrouping>

          </a-modal>
        </div>
        <div class="personnelgrouping">
          <a-modal v-model="visibleSchedulingShift"
                   title="排班班次"
                   width="800px"
                   height="88%"
                   :destroyOnClose="true"
                   :maskClosable="false"
                   on-ok="handleOkSchedulingShift">
            <template slot="footer">
              <a-button key="back"
                        @click="handleCancelSchedulingShift">
                退出排班班次
              </a-button>
              <!-- <a-button key="submit"
                        type="primary"
                        :loading="loading"
                        @click="handleOk">
                Submit
              </a-button> -->
            </template>
            <SchedulingShift></SchedulingShift>

          </a-modal>
        </div>
      </a-layout-content>
      <a-layout-footer> </a-layout-footer>
    </a-layout>

  </div>
</template>

<script>
// @ is an alias to /src
// import Old from '../views/old.vue'
// import ScheDuling from '../views/ScheDuling.vue'
import NewMyScheDuing from '../views/NewMyScheDuing.vue'
// import MyScheDuling from '../views/MyScheDuling.vue'
import PersonnelGrouping from '../views/PersonnelGrouping.vue'
import SchedulingShift from '../views/SchedulingShift.vue'
import { getPbjhList } from '@/api/scheduing'
import { getResPersonnelData } from '../assets/js/scheduingindex.js'
export default {
  name: 'ScheDulingIndex',
  components: {
    // ScheDuling,
    PersonnelGrouping,
    // MyScheDuling,
    // Old,
    NewMyScheDuing,
    SchedulingShift
  },
  data () {
    return {
      options: [
      ],
      value: '',
      resData: [],
      temp: {}, //当前重复的值,支持多列
      columns: [
        {
          title: '分组名称',
          dataIndex: 'fzmc',
          width: '130px',
          align: 'center',
          // scopedSlots: { customRender: 'fzmc' },
          customRender: (value, row, index) => {
            // if (index- row.connt ) {
            //   return {
            //     children: <a href="javascript:;">{value}</a>,
            //     attrs: {
            //       rowSpan: row.connt - 1,
            //       // colSpan: 3,
            //     },
            //   };
            // } else return <a href="javascript:;">{value}</a>
            const obj = {
              children: value,
              attrs: {}
            }

            obj.attrs.rowSpan = this.mergeCellKey(value, this.data, 'fzmc', '', '')

            return obj
          }
        },
        {
          title: '姓名',
          dataIndex: 'xm',
          width: '120px',
          align: 'center',
          // scopedSlots: { customRender: 'groupclass' },
          customRender: (value, row, index) => {
            // var str = ''
            return value
          }
        },
        // {
        //   // title: 'mon',
        //   dataIndex: 'operation',
        //   align: 'center',
        //   scopedSlots: { customRender: 'operation' },
        //   // filters: [
        //   //   { text: 'Male', value: 'male' },
        //   //   { text: 'Female', value: 'female' }
        //   // ],
        //   width: '20%'
        // },
        {
          title: '周一',
          align: 'center',
          dataIndex: 'mon'
        },
        {
          title: '周二',
          align: 'center',
          dataIndex: 'tue'
        },
        {
          title: '周三',
          align: 'center',
          dataIndex: 'wed'
        },
        {
          title: '周四',
          align: 'center',
          dataIndex: 'thu'
        },
        {
          title: '周五',
          align: 'center',
          dataIndex: 'fri'
        },
        {
          title: '周六',
          align: 'center',
          dataIndex: 'sat'
        },
        {
          title: '周日',
          align: 'center',
          dataIndex: 'sun'
        },
        {
          title: '本周工时',
          width: '60px',
          align: 'center',
          scopedSlots: { customRender: 'sqgs' },
          dataIndex: 'sqgs'
        },
        {
          title: '多周工时',
          align: 'center',
          width: '60px',
          customRender: (value, row, index) => {
            if (row.sqgsTotal && row.sqgs) {
              return row.sqgsTotal - row.sqgs
            } else {
              return '空'
            }
          }
        },
        {
          title: '全部工时',
          align: 'center',
          width: '60px',
          scopedSlots: { customRender: 'sqgsTotal' },
          dataIndex: 'sqgsTotal'
        }
      ],
      data: [],
      pagination: {},
      loading: false,
      visible: false,
      visibleSchedulingShift: false,
      schedulingvisible: false
    }
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      // 当前选择的时间
      this.fetch({
        bqid: 270, // 暂时写死
        pageSize: pagination.pageSize,
        page: pagination.current,
        searchDate: '2021-07-12'
      })
    },
    fetch (params) {
      console.log(params)
      this.loading = true
      this.queryData(params)
    },
    queryData (params) {
      getPbjhList(params.bqid, params.searchDate).then(data => {
        if (data) {
          console.log(data)
          const pagination = { ...this.pagination }
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = data.records
          this.loading = false
          // 在此处理成表格所需要的数据
          this.data = getResPersonnelData(data.rows)
          this.pagination = pagination
          this.$forceUpdate()
        }
      })

      // return this.axios.get('https://randomuser.me/api', { params: params })
    },
    mergeCellKey (text, array, columns, arrayName, relateColumns) {
      //  单元格合并
      //  text 当前单元格内容
      //  array 表格所有数据
      //  columns 当前单元格对应的属性名
      //  arrayName 为了区别 同一个页面的不同表单中有同一个属性值
      //  relateColumns 若合并的单元格是根据另一列的合并情况做的合并，使用此参数
      let that = this
      let i = 0
      // 若有依赖的单元格
      if (relateColumns) {
        // 'relate'用来区分“当前列”和“依赖列”
        if (text !== that.temp[arrayName + 'relate' + relateColumns]) {
          that.temp[arrayName + 'relate' + relateColumns] = text
          for (let index = 0; index < array.length; index++) {
            // 依赖列的当前单元格数据 === 已经存储的值，则i+1
            if (array[index][relateColumns] === that.temp[arrayName + 'relate' + relateColumns]) {
              i += 1
            }
          }
        }
      } else {
        if (text !== that.temp[arrayName + columns]) {
          that.temp[arrayName + columns] = text
          for (let index = 0; index < array.length; index++) {
            if (array[index][columns] === that.temp[arrayName + columns]) {
              i += 1
            }
          }
        }
      }
      return i
    },
    personnelGrouping () {
      // 人员分组
      this.showModal()
    },
    openSchedulingShift () {
      // 排班班次
      this.showModalSchedulingShift()
    },
    shiftGrouping () {
      // 班次分组
      // this.showModalSchedulingShift()
    },
    showModal () {
      this.visible = true
    },
    showModalSchedulingShift () {
      this.visibleSchedulingShift = true
    },
    handleOk (e) {
      this.loading = true
      setTimeout(() => {
        this.visible = false
        this.loading = false
      }, 3000)
    },
    handleCancel (e) {
      this.visible = false
    },
    schedulingShowModal () {
      this.schedulingvisible = true
    },
    schedulinghandleCancel (e) {
      this.schedulingvisible = false
    },
    handleOkSchedulingShift (e) {
      this.loading = true
      setTimeout(() => {
        this.visibleSchedulingShift = false
        this.loading = false
      }, 3000)
    },
    handleCancelSchedulingShift (e) {
      this.visibleSchedulingShift = false
    },
    editScheDuling () {
      // 编辑排班
      // 打开排班页面
      this.schedulingShowModal()
    }
  },
  mounted () {
    this.fetch({
      bqid: 270, // 暂时写死
      pageSize: 12,
      page: 1,
      searchDate: '2021-07-12'

    })
  }
}
</script>
<style lang="less">
.ScheDulingIndex {
  .ant-layout-header {
    height: 54px;
    padding: 0 0 0 6px;
    line-height: 44px;
    background: #ecf3f7;
    .headbox {
      text-align: left;
    }
    .functionbutton {
      margin: 10px 6px;
      color: #fff;
    }
    .direction {
      margin-left: 6px;
      border: 1px solid #acbac2;
      background-color: #acbac2;
      color: #fff;
      .direction i {
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .groupingtable .ant-table-content {
    background: #ecf3f7;
  }
}
</style>
<style>
.groupingtable .ant-table table,
.groupingtable .ant-table table tr,
.groupingtable .ant-table table tr > td {
  border: 1px solid #c5dae9;
  padding: 8px 16px !important;
}
.ant-message {
  top: 30% !important;
}
.myscheduing .ant-modal {
  min-width: 1520px !important;
}
</style>