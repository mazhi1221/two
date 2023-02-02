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
                        @click="handDetailleClick"
                        >Detail</el-button
                    >
                    <el-button link type="primary" size="small">Edit</el-button>
                    <el-button link type="primary" size="small">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
const tableData = [];
for (let i = 0; i < 10; i++) {
    tableData.push({
        deviceName: "路由器" + i,
        deviceAddress: "192.168.40.174",
        deviceStatus: "开启",
        turnOnTime: "2023-03-02 15:00",
        sensorsNum: "49",
    })
} 
</script>