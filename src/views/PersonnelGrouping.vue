<template>
  <div>
    <div class="groupingbox">
      <div class="grouping">
        <a-row>
          <a-col :span="12">
            <span class="groupingname">
              分组名称 :
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
              增加分组
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
                 :row-key="record => record.fzid"
                 :data-source="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange">
          <template slot="operation"
                    slot-scope="text, record">
            <a-button type="primary"
                      size="small"
                      @click="addGrouping(record, '修改')"
                      class=" functionbutton">
              修改
            </a-button>
            <a-popconfirm title="确定你要删除此分组吗?"
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
          <a-form-model-item label="分组名称"
                             prop="name">
            <a-input v-model="form.name" />
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
import { getPbjhList, getPbyhfzxx, getPbyhfzxxById, getSavePbyhfzxx, deletePbyhfzxx } from '@/api/scheduing'

export default {
  name: 'PersonnelGrouping',
  data () {
    return {
      loading: false,
      visible: false,
      querygroupingname: '',
      columns: [
        {
          title: '分组名称',
          dataIndex: 'fzmc',
          // sorter: true,
          align: 'center',
          width: '20%',
          scopedSlots: { customRender: 'fzmc' }
        },
        {
          title: '分组序号',
          dataIndex: 'plxh',
          align: 'center',
          // filters: [
          //   { text: 'Male', value: 'male' },
          //   { text: 'Female', value: 'female' },
          // ],
          width: '20%'
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
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['5', '10', '20'] // 每页数量选项
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
        name: ''

      },
      rules: {
        name: [
          { required: true, message: '分组名称为必填项', trigger: 'blur' },
          { min: 1, message: '分组名称最小为一个字符', trigger: 'blur' }
        ],
        index: [
          // { required: true, type: 'number', trigger: 'blur' },
          // { message: '请为新增的分组排序', trigger: 'blur' },
          {
            required: true,
            type: 'number',
            trigger: 'blur',
            message: '请为新增的分组排序',
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
    shiftGrouping () { },
    personnelGrouping () { },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        bqid: 270, // 暂时写死
        pageSize: pagination.pageSize,
        page: pagination.current
      })
    },
    fetch (params) {
      this.loading = true
      this.getQueryData(params)
    },
    getQueryData (params) {
      console.log(params)
      getPbyhfzxx(params.bqid, params.page, params.pageSize).then(data => {
        console.log(data)
        if (data) {
          const pagination = { ...this.pagination }
          // Read total count from server

          console.log(data)
          // pagination.total = data.totalCount;
          pagination.total = data.records
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
          if (modaltitle === '修改分组') {
            this.$message.info('修改分组submit!')
            console.log(this.form)
            // 在这里提交新增加的分组信息
            let newgrouping = {
              fzmc: this.form.name,
              plxh: this.form.index
            }
            // getSavePbyhfzxx(newgrouping).then(res=>{
            // console.log(res);
            // })
            // 刷新分组列表
            this.getQueryData()
            // 刷新排班列表
            // 暂时不刷新排班列表
          }
          if (modaltitle === '增加分组') {
            this.$message.info('增加分组submit!')
            // 刷新分组列表
            this.getQueryData()
            // 刷新排班列表
          }
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
        this.modaltitle = '修改分组'
        // 打开modal框
        // 请求分组信息
        getPbyhfzxxById(rod.fzid).then(res => {
          console.log(res)
          if (res && res.data) {
            // 请求接口
            this.form.name = res.data.fzmc
            this.form.index = res.data.plxh
            this.showModal()
          }
        })
        this.form.name = rod.fzmc
        this.form.index = rod.plxh
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
        this.modaltitle = '增加分组'
        // 清空数据
        this.form.name = ''
        this.form.index = ''
        // 打开modal框
        this.showModal()
      }
      if (str === '查询') {
        if (this.querygroupingname) {
          console.log('查询' + this.querygroupingname)
        }
        //  else {
        //   this.$message.warn('查询条件为空')
        // }
      }
    },
    formindexchange (val) {
      console.log(val)
      this.$forceUpdate()
    }
  },
  mounted () {
    this.fetch({
      bqid: 270, // 暂时写死
      pageSize: 10,
      page: 1
    })
  }
}
</script>
<style lang="less">
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