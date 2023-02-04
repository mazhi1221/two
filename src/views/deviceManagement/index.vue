<template>
  <div class="deviceManagement">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="deviceName" label="设备名称" />
      <el-table-column prop="deviceAddress" label="设备地址" />
      <el-table-column prop="deviceStatus" label="设备状态" />
      <el-table-column prop="turnOnTime" label="开机时间" />
      <el-table-column prop="sensorsNum" label="传感器数量" />
      <el-table-column label="操作" width="200">
        <template #default>
          <el-button
            link
            type="primary"
            size="small"
            @click="dialogVisible = true"
            >查看</el-button
          >
          <el-button link type="primary" size="small">修改</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="dialogVisible"
      title="传感器详情"
      width="50%"
      :before-close="handleClose"
    >
      <el-row :gutter="20">
        <el-col :span="12"
          ><div class="grid-content ep-bg-purple" />
          <el-table
            :data="sensorsTableData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="sensorsName" label="名称" width="100" />
            <el-table-column prop="sensorsStatus" label="状态" width="60" />
            <el-table-column prop="turnOnTime" label="在线时长" />
          </el-table>
        </el-col>
        <el-col :span="12"
          ><div class="grid-content ep-bg-purple-light" />
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="Select date and time"
          />
          <line-chart :params="chartdata" width="450px" height="300px" />
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import lineChart from '/src/components/charts/lineChart.vue'
const tableData = []
const sensorsTableData = []
for (let i = 0; i < 10; i++) {
  tableData.push({
    deviceName: '路由器' + i,
    deviceAddress: '192.168.40.174',
    deviceStatus: '开启',
    turnOnTime: '2023-03-02 15:00',
    sensorsNum: '49'
  })
}

for (let i = 0; i < 5; i++) {
  sensorsTableData.push({
    sensorsName: '传感器' + i,
    sensorsStatus: '开',
    turnOnTime: '2023-03-02 15:00'
  })
}

const dialogVisible = ref(false)
const value1 = ref('')
const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const multipleSelection = ref([])
const chartdata = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
  chartdata = val.map((item) => {})
}
</script>