<template>
  <div>
    <div class="groupingbox">
      <div class="grouping">
        <a-row>
          <!-- <a-col :span="24">
            <span class="groupingname">
              班次列表 :
            </span>
          </a-col> -->
          <a-col :span="12">
            <span class="groupingname">
              班次名称 :
            </span>
            <a-input style="width: 100px"
                     v-model="querygroupingname" />
            <a-button type="primary"
                      @click="addpersonnelGrouping('查询')"
                      class="functionbutton querybtn">
              查询
            </a-button>
            <a-button type="primary"
                      @click="addpersonnelGrouping('增加')"
                      class=" functionbutton">
              增加班次
            </a-button>
          </a-col>
          <a-col :span="12">

            <!-- <a-button type="primary"
                      class=" functionbutton">
              修改
            </a-button>
            <a-button type="danger"
                      class=" functionbutton"
                      @click="shiftGrouping">
              删除
            </a-button> -->

          </a-col>
        </a-row>
      </div>
      <div class="groupingcontent">
        <a-table :columns="columns"
                 :row-key="record => record.yhid"
                 :data-source="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <template slot="xsys"
                    slot-scope="text, record">
            <a-tag :color="text"
                   style="width:20px;height:20px"></a-tag>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <a-button type="primary"
                      size="small"
                      @click="addGrouping(record, '修改')"
                      class=" functionbutton">
              修改
            </a-button>
            <a-popconfirm title="确定你要删除此班次吗?"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="() => addGrouping(record, '删除')">
              <!-- <a href="javascript:;">删除</a> -->
              <a-button type="danger"
                        size="small"
                        class=" functionbutton">
                删除
              </a-button>
            </a-popconfirm>

          </template>
        </a-table>
      </div>
    </div>
    <a-modal v-model="visible"
             :destroyOnClose="true"
             :title="modaltitle">
      <template slot="footer">
        <a-button key="back"
                  @click="handleCancel">
          退出
        </a-button>
        <!-- <a-button key="submit"
                  type="primary"
                  :loading="loading"
                  @click="handleOk">
          保存
        </a-button> -->
      </template>
      <div class="newgroupingbox">
        <a-form-model :model="form"
                      ref="ruleForm"
                      :rules="rules"
                      :label-col="labelCol"
                      :wrapper-col="wrapperCol">
          <a-form-model-item label="班次名称"
                             prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="班次类别"
                             prop="bclb">
            <a-select v-model="form.bclb"
                      style="width: 120px"
                      @change="handleChange">
              <a-select-option value="0">
                白班
              </a-select-option>
              <a-select-option value="1">
                晚班
              </a-select-option>
              <a-select-option value="2"
                               disabled>
                夜班
              </a-select-option>
              <a-select-option value="3">
                非工作
              </a-select-option>
              <a-select-option value="4">
                其它
              </a-select-option>
            </a-select>
            <!-- <a-input v-model="form.index" /> -->
          </a-form-model-item>
          <a-form-model-item label="排队序号"
                             prop="index">
            <a-input-number @change="formindexchange"
                            v-model="form.index" />
            <!-- <a-input v-model="form.index" /> -->
          </a-form-model-item>
          <!-- <a-form-model-item label="Activity zone">
      <a-select v-model="form.region" placeholder="please select your zone">
        <a-select-option value="shanghai">
          Zone one
        </a-select-option>
        <a-select-option value="beijing">
          Zone two
        </a-select-option>
      </a-select>
    </a-form-model-item> -->
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary"
                      @click="onSubmit(modaltitle)">
              提交
            </a-button>
            <!-- <a-button style="margin-left: 10px;">
              取消
            </a-button> -->
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { getPbjhList, getPbyhfzxxById, getPbbcxx, deletePbyhfzxx } from '@/api/scheduing'

export default {
  name: 'SchedulingShift',
  data () {
    return {
      loading: false,
      visible: false,
      querygroupingname: '',
      columns: [
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center',
          customRender: (value, row, index) => {
            return '通用'
          }
        },
        {
          title: '班次名称',
          dataIndex: 'bcmc',
          align: 'center'
        },
        {
          title: '类别',
          dataIndex: 'bclb',
          align: 'center',
          customRender: (value, row, index) => {
            if (value === 0) {
              return '白班'
            }
            if (value === 1) {
              return '晚班'
            }
            if (value === 2) {
              return '夜班'
            }
            if (value === 3) {
              return '非工作'
            }
            if (value === 4) {
              return '其他'
            }
          }
        },
        {
          title: '时段1开始',
          dataIndex: 'sd1ks',
          align: 'center'
        },
        {
          title: '时段1结束',
          dataIndex: 'sd1js',
          align: 'center'
        },
        {
          title: '时段2开始',
          dataIndex: 'sd2ks',
          align: 'center'
        },
        {
          title: '时段2结束',
          dataIndex: 'sd2js',
          align: 'center'
        },
        {
          title: '时段3开始',
          dataIndex: 'sd3ks',
          align: 'center'
        },
        {
          title: '时段3结束',
          dataIndex: 'sd3js',
          align: 'center'
        },
        {
          title: '工时',
          dataIndex: 'gs',
          align: 'center'
        },
        {
          title: '系数',
          dataIndex: 'xs',
          align: 'center'
        },
        {
          title: '颜色',
          dataIndex: 'xsys',
          align: 'center',
          scopedSlots: { customRender: 'xsys' }
        },
        {
          title: '备注',
          dataIndex: 'bz',
          align: 'center'
        },
        {
          title: '管床',
          dataIndex: 'gc',
          align: 'center'
        },
        {
          title: '班次序号',
          dataIndex: 'plxh',
          align: 'center'
          // filters: [
          //   { text: 'Male', value: 'male' },
          //   { text: 'Female', value: 'female' },
          // ],
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [],
      pagination: {
      },
      modaltitle: '',
      // rowSelection: {
      //  onChange: (selectedRowKeys, selectedRows) => {
      //     this.selecteds = selectedRows
      //     this.selectedsKey = selectedRowKeys
      //     if (this.selecteds.length > 0) {
      //       this.adddisabled = true
      //     } else {
      //       this.adddisabled = false
      //     }
      //     console.log('selectedRowKeys', selectedRowKeys)
      //   },
      //   columnWidth: '41px'
      // },
      // selecteds: [], // 选中的值
      // selectedsKey:[],
      labelCol: { span: 4 },
      wrapperCol: { span: 4 },
      form: {
        name: '',
        bclb: '',
        index: ''

      },
      rules: {
        name: [
          { required: true, message: '班次名称为必填项', trigger: 'blur' },
          { min: 1, message: '班次名称最小为一个字符', trigger: 'blur' }
        ],
        index: [
          // { required: true, type: 'number', trigger: 'blur' },
          // { message: '请为新增的分组排序', trigger: 'blur' },
          {
            required: true,
            type: 'number',
            trigger: 'blur',
            message: '请为新增的班次排序',
            transform (value) {
              if (value) {
                // 将输入的值转为数字
                // 方案1
                var val = Number(value)
                return val
                // // 正则表达式校验输入的数字是否在0-100之内并且属于整数
                // if return val..replace(/[\u4E00-\u9FA5]/g,'') return val
                // // 返回false即为校验失败
                // return false
                // var val = value.replace(/[\u4E00-\u9FA5]/g, '')
                // console.log(val, value);
                // // val = Number(value)
                // return Number(val)
              }
            }
          }
        ],
        bclb: [
          { required: true, message: '班次类别为必选项', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    showModal () {
      this.visible = true
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
    handleChange () { },
    shiftGrouping () { },
    personnelGrouping () { },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        bqid: '', // 270暂时写死
        bcmc: '',
        pageSize: pagination.pageSize,
        page: pagination.current
      })
    },
    fetch (params) {
      this.loading = true
      this.getQueryData(params)
    },
    queryData (params) {
      return this.axios.get('./人员分组.json', { params: params })
    },
    getQueryData (params) {
      getPbbcxx(params.bqid, params.bcmc, params.page, params.pageSize).then(data => {
        console.log(data)
        if (data) {
          const pagination = { ...this.pagination }
          // Read total count from server

          console.log(data)
          // pagination.total = data.totalCount;
          pagination.total = 10
          this.loading = false
          this.data = data.rows
          this.pagination = pagination
        }
      })
    },
    onSubmit (modaltitle) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // alert('submit!');
          // 在这里判断是修改还是添加
          if (modaltitle === '修改班次') {
            this.$message.info('修改班次submit!')
            // 刷新分组列表
            this.getQueryData()
            // 刷新排班列表
          }
          if (modaltitle === '增加班次') {
            this.$message.info('增加班次submit!')
            // 刷新分组列表
            this.getQueryData()
            // 刷新排班列表
          }
          console.log(this.form)
          // 在这里提交新增加的分组信息
          let newgrouping = {
            bcmc: this.form.name,
            plxh: this.form.index
          }
          // getSavePbyhfzxx(newgrouping).then(res=>{
          // console.log(res);
          // })
        } else {
          this.$message.info('error submit!!')
          console.log(this.form)
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    addGrouping (rod, str) {
      console.log(rod, str)
      if (str === '修改') {
        this.modaltitle = '修改班次'
        // 打开modal框
        // 请求分组信息
        // getPbyhfzxxById(rod.fzid).then(res => {
        //   console.log(res)
        //   if (res && res.data) {
        //     // 请求接口
        //     this.form.name = res.data.bcmc
        //     this.form.index = res.data.plxh
        //     this.showModal()
        //   }
        // })
        this.form.name = rod.bcmc
        this.form.index = rod.plxh
        this.form.bclb = rod.bclb
        this.showModal()
      }
      if (str === '删除') {
        // 请求接口删除列表
        deletePbyhfzxx(rod.fzid).then(res => {
          console.log(res)
          if (res && res.data) {
            // 刷新分组列表
            this.getQueryData()
            // 刷新排班列表
          }
        })
      }
    },
    addpersonnelGrouping (str) {
      console.log(str)
      if (str === '增加') {
        this.modaltitle = '增加班次'
        // 清空数据
        this.form.name = ''
        this.form.index = ''
        // 打开modal框
        this.showModal()
      }
      if (str === '查询') {
        if (this.querygroupingname) {
          console.log('查询' + this.querygroupingname)
        } else {
          this.$message.warn('查询条件为空')
        }
      }
    },
    formindexchange (val) {
      console.log(val)
      this.$forceUpdate()
    }
  },
  mounted () {
    this.fetch(
      {
        bqid: '', //270 暂时写死
        bcmc: '',
        pageSize: 30,
        page: 1
      }
    )
  }
}
</script>
<style lang="less">
.groupingbox {
  border: 1px solid #e8e8e8;
  padding: 8px;
}
.querybtn {
  background: rgb(193, 240, 193);
  border: 1px solid rgb(193, 240, 193);
}
.querybtn:hover,
.querybtn:focus {
  background: lightgreen;
  border: 1px solid lightgreen;
}
.functionbutton {
  margin: 10px 6px;
  color: #fff;
}
</style>