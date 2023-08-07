<template>
    <div class="grid grid-cols-12 border border-gray-300 text-sm leading-relaxed text-gray-600 rounded py-3 pl-3 mb-2">
        <div class="col-span-2 flex mt-1">
            <div>{{ id }}</div>
            <div class="absolute left-12">{{ funcname }}</div>
        </div>
        <p class="col-span-2 mt-1 ">{{ tag }}</p>
        <div class="col-span-4 flex ">
            <p class="flex-auto mt-1 font-bold">{{ cron }}</p>
            <p class="flex-auto justify-center mt-1 truncate " v-if="nexttime==''">——</p>
            <p class="flex-auto justify-center mt-1 truncate " :title="nexttime" v-else >{{ nexttime }}</p>
        </div>
        <div v-if="status==0"  class="col-span-1 mt-1" ><el-tag>开启</el-tag></div>
        <div v-else class="col-span-1 mt-1"><el-tag type="warning">停止</el-tag></div>
        <!-- 0 成功 1 失败 -->
        <div v-if="isRunning"  class="col-span-1 mt-1"><el-tag type="success">运行中</el-tag></div>
        <div v-else class="col-span-1 mt-1"><el-tag type="danger">未运行</el-tag></div>
        <div class="col-span-2 flex mt-1">
            <div class="flex-auto">
                <!-- 0 启用 1 禁用 -->
                <el-button v-if="status==1" size="small" color="#626aef" @click="enableFunc(id)"  plain>启用</el-button>
                <el-button  v-else size="small" color="#626aef" @click="disableFunc(id)" plain>禁用</el-button>
                <!-- <el-button size="small" color="#626aef" @click="runFunc(tag)">执行</el-button> -->
            </div>
            <div class="flex-auto ml-2">
                <el-dropdown @command="handlefunc">
                    <span class="el-dropdown-link">
                        <p class="font-bold text-xl">···</p>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="{type:'edit',id:id}">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{type:'delete',id:id}">删除</el-dropdown-item>
                        <el-dropdown-item @click="runFunc(tag)" command="c">执行</el-dropdown-item>
                        <!-- <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item command="e" divided>Action 5</el-dropdown-item> -->
                      </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            
        </div>
        
    </div>
</template>
<script setup lang="ts">
defineProps<{
  id :number,
  funcname:string
  tag:string
  cron:string
  nexttime:string
  status:number
  isRunning:boolean
  disableFunc:any
  enableFunc:any
  runFunc:any
  handlefunc:any
}>()
</script>
