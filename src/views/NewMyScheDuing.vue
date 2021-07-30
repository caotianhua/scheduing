<template>
  <div class="home">
    <div class="content"
         id="external-events">
      <a-row>
        <a-col :span="2">
          <div class="perlist">
            <div class="pdleft">
              <!-- ghostClass="hostClass" -->
              <!-- :group="{ name: 'site',  put: false }" -->
              <draggable group="site"
                         @start="onStart"
                         class="oldbox"
                         @end="onEnd"
                         @change="handleDraggableFormItemChange"
                         v-model="list">
                <!-- <transition-group> -->
                <div v-for="item in list"
                     :key="item.xm"
                     class="dragItem">
                  <div class="site">

                    <span color="#ecf3f7">
                      {{item.xm}}
                    </span>
                    <a-tag color="purple">
                      {{item.hsnjmc}}
                    </a-tag>

                  </div>

                </div>
                <!-- </transition-group> -->
              </draggable>
              <!-- ghostClass="ghostClass"

                       dragClass="dragClass"
                       :disabled="true"
                       animation="300"
                       @update="datadragEnd"
                       @start="onStart"
                       @end="onEnd"
                       :move="onMove" -->
            </div>
          </div>
        </a-col>
        <a-col :span="19">
          <a-popconfirm :title="tableweekdatatitle"
                        class="tableweekdatapopconfirm"
                        id="tableweekdatapopconfirm"
                        :visible="tableweekdatavisible"
                        ok-text="Yes"
                        cancel-text="No"
                        @visibleChange="handleVisibleChange"
                        @confirm="tableweekdataconfirm"
                        @cancel="tableweekdatacancel">
          </a-popconfirm>
          <div class="tablist">
            <div class="tablecolumsheader">
              <a-table :columns="tablecolumsheader"
                       :pagination="false"
                       :row-key="record => record.fzmc"
                       :expandedRowKeys="expandedRowKeys "
                       :showHeader="true"
                       :row-class-name="isRedRow"
                       :data-source="tabledata">
                <!-- <a-table slot-scope="record"
                         slot="expandedRowRender"
                         :showHeader="false"
                         class="paibantablitem"
                         :columns="tablecolumsheaderchildren"
                         :pagination="false"
                         :dataSource="record.fzArry">
                </a-table> -->
                <template slot="operation"
                          slot-scope="text,record">
                  <div v-for="item in record.fzArry"
                       :key="item.xm"
                       class="dragItem">
                    <div class="site">

                      <span color="#ecf3f7">
                        {{item.xm}}
                      </span>
                      <a-tag color="purple">
                        {{item.hsnjmc}}
                      </a-tag>

                    </div>
                  </div>
                </template>
              </a-table>
            </div>
            <div class="table paibantabl">

              <a-table :columns="columns"
                       :pagination="false"
                       :row-key="record => record.fzmc"
                       :defaultExpandAllRows="true"
                       :expandedRowKeys="expandedRowKeys "
                       :data-source="tabledata">
                <!-- <template slot="operation"
                          slot-scope="text,record">
                  <draggable class="oldbox"
                             :id="record.fzmc"
                             group="site"
                             @end="ontoEnd"
                             @change="tohandleDraggableFormItemChange"
                             v-model="record.fzArry">
                    <div class="site"
                         @click="perclick(item)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.xm}}
                      </span>
                      <a-tag color="purple">
                        {{record.hsnjmc}}
                      </a-tag>
                    </div>
                  </draggable>
                </template> -->

                <a-table slot-scope="record"
                         slot="expandedRowRender"
                         :showHeader="false"
                         class="paibantablitem"
                         :columns="childrencolumns"
                         :pagination="false"
                         @change="onChange"
                         :dataSource="record.fzArry">
                  <template slot="xm"
                            slot-scope="text,record">
                    <div class="site"
                         @click="perclick(record)"
                         :distance="1">
                      <span @click="movexm(record,'up')"
                            class="jiantou jiantou-left">
                        <a-icon type="arrow-up" />
                      </span>
                      <span color="#ecf3f7">
                        {{record.xm}}
                      </span>
                      <a-tag color="purple">
                        {{record.hsnjmc}}
                      </a-tag>
                      <span @click="movexm(record,'down')"
                            class="jiantou jiantou-right">
                        <a-icon type="arrow-down" />
                      </span>
                    </div>
                    <div @click="perclick(record)"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.fzmc"
                                 group="site"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".site"
                                 @move="onMove"
                                 v-model="record.fzArry">
                        <!-- <div class="dargBtn">
                      </div> -->
                      </draggable>
                    </div>
                  </template>
                  <template slot="mon"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.mon}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.mon">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'mon')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>

                    </div>

                  </template>
                  <template slot="tue"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.tue}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.tue">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'tue')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>
                  <template slot="wed"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.wed}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.wed">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'wed')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>
                  <template slot="thu"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.thu}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.thu">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'thu')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>
                  <template slot="fri"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.fri}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.fri">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'fri')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>
                  <template slot="sat"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.sat}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.sat">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'sat')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>
                  <template slot="sun"
                            slot-scope="text,record">
                    <div class="dargBtn"
                         @click="perclick(record)"
                         :distance="1">
                      <span color="#ecf3f7">
                        {{record.sun}}
                      </span>
                      <span class="bancipaiban"
                            v-if="!record.sun">
                        0
                      </span>
                    </div>
                    <div @click="tableweekdataclick(record,'sun')"
                         class="tableweekdatataghover"
                         :distance="1">
                      <draggable class="oldbox"
                                 :id="record.id"
                                 group="banci"
                                 @start="ontoStart"
                                 @end="ontoEnd"
                                 handle=".dargBtn"
                                 :distance="1"
                                 @move="onMove"
                                 v-model="record.fzArry">
                      </draggable>
                    </div>
                  </template>

                </a-table>

              </a-table>
            </div>
          </div>
        </a-col>
        <!-- <a-col :span="15">
          <div class="dullcalendarcontent">
            <FullCalendar id="fullCalendar"
                          ref="fullCalendar"
                          :options="calendarOptions" />
          </div>
        </a-col> -->
        <a-col :span="3">
          <div style="padding-left:10px">
            <a-button type="primary"
                      size="small"
                      @click="changrounping('班次类型')"
                      class="functionbutton">
              班次类型
            </a-button>
            <a-button type="primary"
                      size="small"
                      @click="changrounping('班次分组')"
                      class="functionbutton">
              班次分组
            </a-button>
            <div class="shifttypecontent">
              <div v-if="changrounpingshow">
                <div class="fc-event"
                     v-for="(item,index) in fceventarry1"
                     :key="index">
                  <draggable :group="{ name: 'banci', pull: 'clone',  put: false }"
                             @start="onStart"
                             class="oldbox"
                             @end="onschedulingEnd"
                             @change="handleDraggableFormItemChange"
                             @move="checkMove"
                             v-model="fceventarry1"
                             :id="item.id">
                    <div class="dragItemdiv">
                      <div class="banci">
                        <!-- <span color="#ecf3f7">
                              {{item.name}}
                            </span> -->
                        <a-tag color="#f50">{{item.name}}</a-tag>
                      </div>

                    </div>
                  </draggable>
                  <div>
                    <!-- <span>{{item.name}}</span> -->
                    <!-- <a-tag color="#f50">{{item.name}}</a-tag> -->
                  </div>
                </div>
              </div>
              <div class="perlist"
                   v-if="!changrounpingshow">
                <div class="pdleft pdright">
                  <div class="dragItembox">
                    <div v-for="item in fceventarry1"
                         :key="item.id"
                         class="dragItem">
                      <draggable :group="{ name: 'banci', pull: 'clone',  put: false }"
                                 @start="onStart"
                                 class="oldbox"
                                 @end="onschedulingEnd"
                                 @change="handleDraggableFormItemChange"
                                 @move="checkMove"
                                 v-model="fceventarry1"
                                 :id="item.id">
                        <div class="dragItemdiv">
                          <div class="banci">
                            <span color="#ecf3f7">
                              {{item.name}}
                            </span>
                          </div>

                        </div>
                      </draggable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
      <!-- <tes></tes> -->
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
// @ is an alias to /src
import 'jquery'
// import moment from 'moment'
import { getResPersonnelData } from '../assets/js/newScheDuing.js'
import { getPbjhList } from '@/api/scheduing'
// import '../assets/js/v-drag.js'
// import tes from './tuiCalender.vue'
export default {
  name: 'NewScheDuing',
  components: {
    // FullCalendar,
    draggable
    // Schedule
    // CRMFullScreenDetail: () =>
    //   import('@/components/CRMFullScreenDetail')
  },
  // 这个是根据上面定义的 至于上面定义的方法(带@的都是方法)  可以自己打印试下
  data () {
    return {
      loading: false,
      list: [
        {
          "xm": "黄大萍",
          "bcmc": null,
          "mon": "ff班",
          "tue": null,
          "wed": null,
          "thu": null,
          "fri": null,
          "sat": null,
          "sun": null,
          "sqgs": 0.0,
          "sqgsTotal": null,
          "fzmc": "id4",
          "fzgc": "1-40",
          "id": "122",
          "yhid": "122",
          "hsnjmc": "N1",
          "jhid": null,
          "ksid": null,
          "jhsj": null,
          "bz": null
        },
        {
          "bcmc": null,
          "xm": "唐小薇",
          "mon": "d班",
          "tue": null,
          "wed": null,
          "thu": null,
          "fri": null,
          "sat": null,
          "sun": null,
          "sqgs": 0.0,
          "sqgsTotal": null,
          "fzmc": "id5机动组",
          "fzgc": null,
          "hsnjmc": "N3",
          "id": "123",
          "yhid": "123",
          "jhid": null,
          "ksid": null,
          "jhsj": null,
          "bz": null
        }],
      // data: [
      //   {
      //     key: '1',
      //     fzArry: [
      //       { xm: 'aaa', id: 1 },
      //       { xm: 'bbb', id: 2 }
      //     ],
      //     name: 'John Brown',

      //   },
      // ],
      tabledata: [],
      columns: [

        // {
        //   title: 'Name',
        //   dataIndex: 'name',
        //   customRender: (text, row, index) => {
        //     if (index < 4) {
        //       return <a href="javascript:;">{text}</a>;
        //     }
        //     return {
        //       children: <a href="javascript:;">{text}</a>,
        //       attrs: {
        //         colSpan: 5,
        //       },
        //     };
        //   },
        // },
        {
          title: '',
          align: 'center',
          dataIndex: 'fzmc',
          width: '130px',
          // customRender: renderContent,
          customHeaderCell: this.customHeaderCell
        },
        // {
        //   title: '',
        //   dataIndex: 'operation',
        //   width: '150px',
        //   scopedSlots: { customRender: 'operation' },
        //   customHeaderCell: this.customHeaderCell
        // },
        {
          title: '周一',
          align: 'center',
          // dataIndex: 'operation',
          dataIndex: 'mon',
          // width: '150px',
          scopedSlots: { customRender: 'mon' }
          // dataIndex: 'mon'
        },
        {
          title: '周二',
          align: 'center',
          dataIndex: 'tue',
          scopedSlots: { customRender: 'tue' }
        },
        {
          title: '周三',
          align: 'center',
          dataIndex: 'wed',
          scopedSlots: { customRender: 'wed' }
        },
        {
          title: '周四',
          align: 'center',
          dataIndex: 'thu',
          scopedSlots: { customRender: 'thu' }
        },
        {
          title: '周五',
          align: 'center',
          dataIndex: 'fri',
          scopedSlots: { customRender: 'fri' }
        },
        {
          title: '周六',
          align: 'center',
          scopedSlots: { customRender: 'sat' },
          dataIndex: 'sat'
        },
        {
          title: '周日',
          align: 'center',
          scopedSlots: { customRender: 'sun' },
          dataIndex: 'sun'
        },
        {
          title: '本周工时',
          width: '38px',
          align: 'center',
          scopedSlots: { customRender: 'sqgsTotal' },
          dataIndex: 'sqgs'
        },
        {
          title: '多周工时',
          align: 'center',
          width: '38px'
        },
        {
          title: '全部工时',
          align: 'center',
          width: '50px',
          scopedSlots: { customRender: 'sqgsTotal' },
          dataIndex: 'sqgsTotal'
        }
      ],
      expandedRowKeys: [], // 父表格默认展开所有的子表格
      temp: {}, //当前重复的值,支持多列
      tablecolumsheader: [
        {
          // title: '分组名称',
          dataIndex: 'fzmc',
          width: '60px',
          align: 'center'
        },
        {
          title: '',
          dataIndex: 'operation',
          width: '1px',
          scopedSlots: { customRender: 'operation' },
          customHeaderCell: this.customHeaderCell
        }
      ],
      // tablecolumsheaderchildren: [],
      childrencolumns: [
        // {
        //   // title: '分组名称',
        //   dataIndex: 'fzmc',
        //   width: '100px',
        //   align: 'center',
        //   sorter: (a, b) => a.fzmc - b.fzmc,
        //   // scopedSlots: { customRender: 'fzmc' },
        //   customRender: (value, row, index) => {
        //     const obj = {
        //       children: value,
        //       attrs: {}
        //     }
        //     // console.log(value, row, index)
        //     // 此处value为此数据分组的名称，遍历elementsdata
        //     this.elementsdata.map(per => {
        //       if (per.fzmc === value) {
        //         // 此处就是当前所在的数组中的位置，处理表格合并
        //         obj.attrs.rowSpan = this.mergeCellKey(value, per.fzArry, 'fzmc', '', '')
        //       } else {
        //         return false
        //       }
        //     })

        //     return obj
        //   }
        // },
        // {
        //   // title: '分组名称',
        //   dataIndex: 'fzmc',
        //   width: '100px',
        //   sorter: (a, b) => a.fzmc - b.fzmc,
        //   align: 'center'
        // },
        {
          title: 'xm',
          dataIndex: 'xm',
          align: 'center',
          width: '126px',
          key: 'xm',
          scopedSlots: { customRender: 'xm' },
          sorter: (a, b) => a.xm - b.xm,
          customHeaderCell: this.customHeaderCell
        },
        // {
        //   title: '',
        //   // dataIndex: 'operation',
        //   width: '150px',
        //   key: 'id',
        //   scopedSlots: { customRender: 'operation' },
        //   customHeaderCell: this.customHeaderCell
        // },
        {
          title: '周一',
          align: 'center',
          // dataIndex: 'operation',
          dataIndex: 'mon',
          // width: '150px',
          width: '90px',
          key: 'mon',
          scopedSlots: { customRender: 'mon' }
          // dataIndex: 'mon'
        },
        {
          title: '周二',
          align: 'center',
          dataIndex: 'tue',
          width: '90px',
          key: 'tue',
          scopedSlots: { customRender: 'tue' }
        },
        {
          title: '周三',
          align: 'center',
          width: '90px',
          dataIndex: 'wed',
          key: 'wed',
          scopedSlots: { customRender: 'wed' }
        },
        {
          title: '周四',
          align: 'center',
          width: '90px',
          dataIndex: 'thu',
          key: 'thu',
          scopedSlots: { customRender: 'thu' }
        },
        {
          title: '周五',
          align: 'center',
          dataIndex: 'fri',
          width: '90px',
          key: 'fri',
          scopedSlots: { customRender: 'fri' }
        },
        {
          title: '周六',
          align: 'center',
          key: 'sat',
          width: '90px',
          scopedSlots: { customRender: 'sat' },
          dataIndex: 'sat'
        },
        {
          title: '周日',
          align: 'center',
          width: '90px',
          key: 'sun',
          scopedSlots: { customRender: 'sun' },
          dataIndex: 'sun'
        },
        {
          title: '本周工时',
          width: '38px',
          align: 'center',
          scopedSlots: { customRender: 'sqgs' },
          dataIndex: 'sqgs'
        },
        {
          title: '多周工时',
          align: 'center',
          width: '38px',
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
          width: '50px',
          scopedSlots: { customRender: 'sqgsTotal' },
          dataIndex: 'sqgsTotal',
          customRender: (value, row, index) => {
            if (row.sqgsTotal) {
              return row.sqgsTotal
            } else {
              return '空'
            }
          }
        }
      ],
      toelmentobj: '', // 被拖拽的元素对象
      drag: false,
      contentHeight: document.documentElement.clientHeight - 80,
      fceventarry1: [
        {
          name: '白班',
          leve: '1',
          id: '白班'
        },
        {
          name: '夜班',
          leve: '2',
          id: '夜班'
        },
        {
          name: '巡',
          leve: '4',
          id: '巡'
        },
        {
          name: 'A班',
          leve: '4',
          id: 'A班'
        }
      ],
      events: [
        {
          id: '1',
          "resourceId": "650167",
          "title": "绑定测试1",
          // "start": "2021-07-19"
          "start": "Fri Jul 23 2021 08:00:00 GMT+0800 (中国标准时间)"

          // "end": "2021-07-20T15:00:00+00:00"
        }, {
          id: '2',
          "resourceId": "650428",
          "title": "绑定测试 2",
          "start": "Sun Jul 18 2021 08:00:00 GMT+0800 (中国标准时间)"
          // "end": "2021-07-22T14:00:00+00:00"
        }
      ],
      currentEvents: [],
      tableweekdatavisible: false,
      changrounpingshow: true,
      tableweekdatatitle: '',
      condition: true
    }
  },
  methods: {
    onChange (pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter)
    },
    isRedRow (record, index) {
      // console.log(record, index)
      return 'tablecolumsheadertd'
      // if (record.hasVerdict !== '1') {
      //   return 'tablecolumsheadertd'
      // } else {
      //   return ''
      // }
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
    customHeaderCell (column) {
      console.log(column)
      return this.renderTdBackground(column)
    },
    renderTdBackground (record) {
      return {
        style: {
          // 行背景色
          'cursor': 'pointer',
          'background-color': '#ecf3f7'

        }
        // on: {
        //     // 鼠标单击行
        //     click: event => {
        //         console.log(123);
        //         this.meetingroomBook()
        //     },
        // },
      }
    },
    customHeaderRow (column, index) {
      if (index === 0) {
        console.log(column, index)
      }
    },
    fetch (params) {
      this.loading = true
      this.queryData(params)
    },

    queryData (params) {
      // return this.axios.get('./列表.json', { params: params })

      getPbjhList(params.bqid, params.searchDate).then(data => {
        if (data) {
          console.log(data)
          this.loading = false
          console.log(data)
          // 在此处理成表格所需要的数据
          // getResPersonnelData(data.rows)
          console.log(getResPersonnelData(data.rows))
          // 在此处理给elementsdata赋值
          // this.elementsdata
          let resdata = getResPersonnelData(data.rows)
          // this.$store.dispatch("updateElementsAsync", resdata)
          this.$store.commit("updateElements", resdata)
          this.tabledata = this.elementsdata
          // this.tabledata = resdata
          this.openallchildrentable()
          this.$forceUpdate()
        }
      })
    },
    openallchildrentable () {
      this.elementsdata.map(per => {
        this.expandedRowKeys.push(per.fzmc)
      })
      console.log(this.expandedRowKeys)
    },
    updated (data) {
      console.log(data)
    },
    getdata (data) {
      console.log(data)
    },
    onMove (e) {
      console.log(e)
      console.log('onMove', e.draggedContext.futureIndex)
      // if (e.draggedContext.futureIndex <= 1) return false;
      // return true;
      return true
    },
    //开始拖拽事件
    onStart () {
      this.drag = true
    },
    //拖拽结束事件
    onEnd (e) {
      this.drag = false
      console.log(e)
      // 此处获得目的地的分组名称e.to.id
      let toid = e.to.id
      // var idn = e.to.newIndex
      var idn = e.newIndex
      console.log('改变被拖拽元素的分组名称', this.toelmentobj, toid, idn, this.temp)
      if (this.toelmentobj) {
        this.toelmentobj.fzmc = toid // 改变被拖拽元素的分组名称
        // 把数据更新到表格中去
        this.tabledata.map(per => {
          if (per.fzmc === toid) {
            console.log('把数据更新到被拖拽元素的分组中', this.toelmentobj, toid, idn, idn - 0)
            let tonewIndex = e.to.parentElement.parentElement.rowIndex
            console.log('把数据更新到被拖拽元素的分组中的位置', tonewIndex)
            per.fzArry.splice(tonewIndex, 0, this.toelmentobj)
            // per.fzArry.splice(idn + 1, 0, this.toelmentobj)
            // per.fzArry.push(this.toelmentobj)
            // per.fzarry[] = this.toelmentobj
            // 在此更新下storn中的表格数据
            this.temp = {}
            // this.$store.commit("updateElements", this.tabledata)

            // this.tabledata = this.elementsdata
            console.log('左侧拖拽完成后更新下storn中的表格数据')
            this.$forceUpdate()
          }
        })
      }

      // 在这里可以去渲染日历资源的组件了
    },
    ontoStart (e) {
      console.log('ontoStart开始拖拽', e)
      let toid = e.to.id
      let fromid = e.from.id
      if (toid === fromid) {
        console.log('ontoEnd在同一表格拖拽', e)
        this.drag = false
        return false
      } else {
        this.drag = true
      }
    },
    ontoEnd (e, va) {
      this.drag = false
      console.log('ontoEnd排班安排的目的地', e)
      // 此处获得排班安排的目的地
      let toid = e.to.id
      let fromid = e.from.id
      console.log('改变被拖拽元素的分组名称', this.toelmentobj, toid)
      if (toid === fromid) {
        console.log('同组拖拽元素的分组名称', fromid, toid)
        return false
      }
      if (this.toelmentobj.fzmc) {
        this.toelmentobj.fzmc = toid // 改变被拖拽元素的分组名称
      } else {
        return false
      }

      // 在这里可以去渲染日历资源的组件了
    },
    onschedulingEnd (e, va) {
      this.drag = false
      console.log('onschedulingEnd排班安排的目的地', e)
      let toid = e.to.id
      let fromid = e.from.id
      // 在这里可以去渲染日历资源的表格中的排班信息了
      this.elementsdata.map((per, index) => {
        per.fzArry.map((per1, index2) => {
          // arry.push(per1)

          if (per1.id === toid) {
            // console.log('onschedulingEnd的elementsdata  per1', per1)
            // 这里给拖拽到的表格项位置赋值
            let newads = e.to.parentElement.parentElement.__vue__.column.dataIndex
            console.log('onschedulingEnd的newads  per1', newads)
            switch (newads) {
              case 'mon': per1.mon = fromid
                break
              case 'tue': per1.tue = fromid
                break
              case 'wed': per1.wed = fromid
                break
              case 'thu': per1.thu = fromid
                break
              case 'fri': per1.fri = fromid
                break
              case 'sat': per1.sat = fromid
                break
              case 'sun': per1.sun = fromid
                break
            }
            // this.$forceUpdate()
            // return false
          }
        })
      })
      // console.log('改变被拖拽元素的分组名称', this.toelmentobj, toid)
    },
    datadragEnd (list) {
      console.log('datadragEnd排班安排的目的地', list)
      this.$message({
        type: 'success',
        message: '修改排序成功!'
      })
    },
    checkMove (evt) {
      console.log('checkMove排班安排的目的地', evt)
      // return (evt.draggedContext.element.name!=='apple');
      // return false
    },
    handleDateSelect (selectInfo) {
      let title = prompt('Please enter a new title for your event')
      console.log(selectInfo, '事件')
      console.log('selectInfo', selectInfo)
      let calendarApi = selectInfo.view.calendar

      // calendarApi.unselect() // clear date selection

      // if (title) {
      //   calendarApi.addEvent({
      //     id: '113',
      //     title,
      //     start: selectInfo.startStr,
      //     end: selectInfo.endStr,
      //     allDay: selectInfo.allDay
      //   })
      // }
    },
    handleDraggableFormItemChange (e, originale, to) {
      console.log(`handleDraggableFormItemChange拖拽回调:`, e, originale, to)
      console.log(`拖拽到目的地回调:`, e, originale, to)
      if (e.added) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.added.element
      }
      if (e.moved) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.moved.element
      }
      if (e.removed) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.removed.element
        return false
      }
      return false
    },
    tohandleDraggableFormItemChange (e, originale, to) {
      console.log(`拖拽到目的地回调:`, e, originale, to)
      if (e.added) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.added.element
      }
      if (e.moved) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.moved.element
      }
      if (e.removed) {
        console.log(`拖拽到目的地回调增加事件:`, e)
        this.toelmentobj = e.removed.element
      }
    },
    movexm (record, any) {
      console.log('上下移动', record, any)
      if (any === 'up') {
        // 向上移动
      }
      if (any === 'down') {
        // 向下移动
      }
    },
    perclick (record) {
      console.log(record)
    },
    tableweekdataclick (record, day) {
      console.log(record, day)
      this.tableweekdatavisible = true
      let daystr = this.returnweekday(day)
      this.tableweekdatatitle = '您确定要取消  ' + record.xm + '   ' + '   ' + daystr + '的日程安排吗'
    },
    tableweekdataconfirm (e) {
      console.log(e)
      this.tableweekdatavisible = false
      this.$message.success('Click on Yes')
    },
    tableweekdatacancel (e) {
      console.log(e)
      this.tableweekdatavisible = false
      this.$message.error('Click on No')
    },
    handleVisibleChange (visible) {
      if (!visible) {
        this.tableweekdatavisible = false
        return
      }
      // Determining condition before show the popconfirm.
      console.log(this.condition)
      if (this.condition) {
        this.tableweekdataconfirm() // next step
      } else {
        this.tableweekdatavisible = true
      }
    },
    returnweekday (day) {
      switch (day) {
        case 'mon': return '星期一'
          break
        case 'tue': return '星期二'
          break
        case 'wed': return '星期三'
          break
        case 'thu': return '星期四'
          break
        case 'fri': return '星期五'
          break
        case 'sat': return '星期六'
          break
        case 'sun': return '星期日'
          break
      }
    },
    // 渲染之后 自定义html
    eventRender (info) {
      // 改变表格的头部资源
      document.getElementsByClassName('fc-cell-text')[0].innerText = 'DKM行程'
      console.log(info, 'eventRenderDKM行程')
      var span = document.createElement('span')
      // span.style.color = 'black'
      if (info.event.extendedProps.change_data) {
        span.classList.add('popBox_icon')
      }
      // span.style.border='solid 1px red'
      span.innerHTML = '<i class=' + info.event.extendedProps.icon_class + '></i>'
      info.el.childNodes[0].childNodes[0].insertBefore(span, info.el.childNodes[0].childNodes[0].childNodes[0])
      // info.el.childNodes[0].childNodes[0].classList.add('newClass')
    },
    // 获取当月 下月时间
    // getMonthBeginEnd (n) {
    //   var n = n
    //   const obj = { start: '', end: '' }
    //   obj.start = moment(moment().month(moment().month() + n).startOf('month').valueOf()).format('YYYY-MM-DD')
    //   obj.end = moment(moment().month(moment().month() + (n + 1)).startOf('month').valueOf()).format('YYYY-MM-DD')
    //   // obj.start =  moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD')
    //   // obj.end =moment().month(moment().month() - 1).endOf('month').format('YYYY-MM-DD')

    //   return obj
    // },

    eventReceive (info, bb) {
      // var that = this
      console.log(info, '外部事件拖拽到日历', bb)
    },
    eventClick (info) {
      // var that = this
      console.log(info, 'eventClick事件')
      console.log(this.$refs.fullCalendar)
      var resourceA = this.$refs.fullCalendar.getApi().getResourceById('650167')
      console.log(resourceA)
      if (confirm(`Are you sure you want to delete the event '${info.event.title}'`)) {
        info.event.remove()
      }
      // console.log(this.fullcalendarApi = Object.getOwnPropertyDescriptor(this.$refs.fullCalendar, 'getApi')?.value())
    },
    updateView (info, bb) {
      console.log(info, 'updateView事件', bb)
      // if (this.fullcalendarApi == null) {
      //   this.fullcalendarApi = Object.getOwnPropertyDescriptor(this.fullcalendar, 'getApi')?.value();
      // }
      // const viewContent = this.dayCellNewContent();
      // this.fullcalendarApi?.changeView('dayGridMonth', viewContent['dayGridMonth'] as DateRangeInput | DateInput);
    },
    eventMouseLeave (info) {
      // var that = this
      console.log(info, '事件')
    },
    drops (info) {
      // var that = this
      console.log(info, '事件')
    },
    eventsSet (events) {
      // var that = this
      this.currentEvents = events
      console.log(events, 'events事件')
    },
    eventResize (info) {
      // var that = this
      console.log(info, '事件')
    },
    eventMouseEnter (info) {
      // var that = this
      console.log(info, '事件')
    },
    eventChange (info) {
      // var that = this
      console.log(info, '事件')
    },
    resourceGroupField (info) {
      // var that = this
      console.log(info, 'resourceGroupField事件')
      return (info)
    },
    btn (info) {
      console.log(info, '事件')
    },
    changrounping (info) {
      console.log(info, '班次类型')
      if (info === '班次类型') {
        // 打开班次类型事件组
        this.changrounpingshow = true
      } else {
        // 打开班次分组事件组
        this.changrounpingshow = false
      }
    },
    toggleWeekends: function () {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
    }    // 日程保存

  },
  created () {
  },

  mounted () {
    this.fetch({
      bqid: 270, // 暂时写死
      pageSize: 12,
      page: 1,
      searchDate: '2021-07-12'
    })
    console.log(this.elementsdata)

    // 为了防止火狐浏览器拖拽的时候以新标签打开
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  computed: {
    // resources() {
    //   return this.$store.state.app.idno
    // }
    elementsdata: {
      // console.log('storn elements', this.$store.state.elements)
      // return this.$store.state.elements
      get () {
        console.log('storn elements', this.$store.state.elements)
        return this.$store.state.elements
      },
      set (value) {
        // this.$store.dispatch("updateElementsAsync", value)
        this.$store.commit("updateElements", value)
        console.log('storn setupdateElements', this.$store.state.elements)
      }
    }
  },
  watch: {
    elementsdata: {
      handler (newV, oldV) {
        console.log('elementsdata changed', newV, oldV)
        // // 在这里给resourcesdata赋值
        // let arry = []
        // newV.map((per, index) => {
        //   per.fzArry.map((per1, index2) => {
        //     arry.push(per1)
        //   })
        // })
        // this.$forceUpdate()
      },
      deep: true
    }
  }

}
</script>
<style lang="less">
.shipdt_content {
  position: relative;
  top: 50px;
  overflow: hidden;
}
.shipdt_main {
  position: relative;
}
.shipdt_content .main_select {
  width: 485px;
  height: 76px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.shipmaps {
  width: 100%;
  height: 100%;
}
.myEcharts {
  width: 532px;
  height: 316px;
  padding: 0px 10px 10px 10px;
  background-color: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  overflow: hidden;
}
.echarts_title {
  height: 32px;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 0px 10px;
  margin-bottom: 12px;
  cursor: move;
  .title_p {
    color: #282828;
    font-size: 14px;
    font-weight: 600;
  }
  .icon_delect {
    font-size: 14px;
    cursor: pointer;
  }
}
.echarts_main {
  width: 532px;
  height: 258px;
}
.shifttypecontent {
  .fc-event {
    width: 50%;
    display: inline-block;
    .ant-tag {
      margin: 0 0px 8px;
      padding: 8px 12px;
      width: 50px;
      display: inline-block;
    }
  }
  .dragItembox {
    .dragItem {
      width: 46%;
      border: 1px solid #c5dae9;
      text-align: center;
      display: inline-block;
      .oldbox {
        border: none;
      }
      .dragItemdiv {
        text-align: center;
      }
    }
  }
}

.col {
  & > div {
    min-height: 100px;
    border: 14px solid purple;
    border-radius: 4px;
  }
}
.dragItem {
  .name {
    font-weight: 600;
    span {
      color: red;
    }
  }
  border: 1px solid #c5dae9;
  border-bottom: none;
  border-radius: 1px;
  padding: 7.3px;
  margin-bottom: 0px;
  background-color: #ecf3f7;
}
.tablist {
  // flex: 0 0 auto;
  // float: left;
  // padding-top: 58px;
}
.perlist {
  background-color: #fff;
  padding-right: 10px;
  // flex: 0 0 auto;
  // float: left;
  // padding-top: 58px;
  .site {
    height: 26px;
    line-height: 26px;
    text-align: center;
  }
}
.pdleft {
  min-height: 800px;
  height: 100%;
  background-color: #ecf3f7;
}
.pdright {
  padding: 6px;
}
.oldbox:last-child {
  border-bottom: 1px solid #979797;
}
.tablist .oldbox:last-child {
  border-bottom: none;
}
.table {
  min-height: 800px;
  background-color: #ecf3f7;
  table {
    // background-color: #ecf3f7;
  }
}
.paibantabl {
  overflow: hidden;
  padding-left: 60px;
}
.bancipaiban {
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
  opacity: 0;
}
</style>
<style>
/* 禁止日历滚动 */
.bancituozhuai {
  height: 10px;
  width: 10px;
  display: inline;
}

.paibantabl .ant-table table,
.paibantabl .ant-table table tr {
  border: 1px solid #c5dae9;
  border-left: none;
  /* margin-bottom: 2px; */
}
.paibantabl .ant-table table tr {
  border: 1px solid #c5dae9;
  margin-bottom: 0px;
}
.paibantablitem table {
  border-top: none !important;
  border-bottom: none !important;
}
.paibantablitem .ant-table table tr td {
  border: 1px solid #c5dae9;
}
.paibantabl .ant-table-row-cell-break-word {
  border-bottom: 1px solid #c5dae9;
}
.paibantabl ant-table-row:nth-child() {
  border-bottom: none;
}
.paibantabl .ant-table-thead {
  height: 37px !important;
}
.paibantabl .ant-table-thead th {
  padding: 0px 0px !important;
}

/* #external-events .paibantabl .ant-table-thead > tr > th,
#external-events .paibantabl .ant-table-tbody > tr > td {
  padding: 14px 8px !important;
} */
.paibantablitem .ant-table-thead > tr > th,
.paibantablitem .ant-table-tbody > tr > td {
  padding: 2px 2px !important;
  position: relative;
}
#external-events .paibantablitem .ant-table-thead > tr > th .dargBtn,
#external-events .paibantablitem .ant-table-tbody > tr > td .dargBtn {
  height: 32px !important;
  line-height: 32px;
}
#external-events .paibantablitem .ant-table-tbody > tr > td .oldbox {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
}
.paibantabl
  > .ant-table-wrapper
  > .ant-spin-nested-loading
  > .ant-spin-container
  > .ant-table
  > .ant-table-content
  > .ant-table-body
  > table
  > .ant-table-tbody
  > .ant-table-row-level-0 {
  display: none;
  /* width: 30px;
    position: absolute;
    left: -41px; */
}
.paibantabl
  > .ant-table-wrapper
  > .ant-spin-nested-loading
  > .ant-spin-container
  > .ant-table
  td {
  white-space: nowrap;
}
.paibantabl thead tr th {
  background: #ecf3f7;
}
/* .paibantabl
  > .ant-table-wrapper
  > .ant-spin-nested-loading
  > .ant-spin-container
  > .ant-table
  > .ant-table-content
  > .ant-table-body
  > table
  > .ant-table-tbody
  > .ant-table-row-level-1 {
  padding: 2px !important;
} */
.paibantablitem {
  padding: 16px 0px;
}
.tablecolumsheader {
  /* padding-top: 44px; */
  width: 60px;
  position: absolute;
  z-index: 10;
  left: 34px;
}
.tablecolumsheader table {
  /* border-top: none !important;
  border-bottom: none !important; */
  border-top: 1px solid #c5dae9;
}
.tablecolumsheader .ant-table-thead th:first-child {
  overflow: hidden;
  height: 43px;
  display: inline-block;
  border: 1px solid #c5dae9;
  /* border-top: 1px solid #c5dae9; */
  border-bottom: none !important;
  padding: 0 !important;
}
.tablecolumsheader .ant-table-thead th:last-child {
  overflow: hidden;
  width: 1px;
  height: 43px;
  display: inline-block;
  border-top: none !important;
  border-bottom: none !important;
  padding: 0 !important;
}
.tablecolumsheadertd {
  margin-bottom: 0px;
}

.tablecolumsheadertd .ant-table-thead th:last-child() {
  overflow: hidden;
  width: 1px;
  height: auto;
  display: inline-block;
  border-top: none !important;
  border-bottom: none !important;
}
.tablecolumsheadertd td:nth-child(2n) {
  overflow: hidden;
  width: 1px;
  height: auto;
  display: inline-block;
  border-top: none !important;
  border-bottom: none !important;
}
.tablecolumsheadertd td:nth-child(2n-1) {
  border: 1px solid #c5dae9;
  background-color: #fff;
}
.tablecolumsheadertd td:nth-child(2n) .dragItem {
  height: 38px;
  width: 1px;
  overflow: hidden;
  border: 1px solid #c5dae9;
}

/* .dragItembox:nth-child(2n-1) {
  margin-left: 20px !important;
} */
.dragItembox .dragItem:nth-child(2n-1) {
  margin-right: 2% !important;
}
.tableweekdatataghover {
  cursor: pointer;
}
.tableweekdatapopconfirm {
  width: 100%;
  top: 500px !important;
  left: 300px !important;
  z-index: 9999 !important;
}
.jiantou-left {
  position: absolute;
  left: 6px;
  z-index: 40;
}
.jiantou-right {
  position: absolute;
  right: 6px;
  z-index: 40;
}
.ant-popover {
  position: fixed !important;
  width: 300px;
  /* top: 500px !important;
  left: 300px !important; */
  z-index: 9999 !important;
  top: 50% !important;
  left: 50% !important;
  margin-left: -5% !important;
  margin-top: -5% !important;
}
</style>
