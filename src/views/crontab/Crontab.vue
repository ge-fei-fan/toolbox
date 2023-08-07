<template>
    <div >
      <!-- <h1 class="pl-10 text-lg font-bold pt-8 pb-3  ">定时任务管理</h1>
      <div class="flex justify-center" ><div class=" border-b  border-gray-300 border-opacity-50 w-11/12"></div></div> -->
      <div class="my-5 mx-5">
        <ElScrollbar height="600px">
            <div class="grid grid-cols-12 pl-3 mb-2 font-bold text-gray-400	text-inherit font-sans text-sm">
                <div class="col-span-2 pl-8 ">
                    <!-- <div>序号</div> -->
                    <div>任务名称</div>
                </div>
                <p class="col-span-2">标签</p>
                <div class="col-span-4 flex">
                    <p class="flex-auto">corn表达式</p>
                    <p class="flex-auto">下次执行时间</p>
                </div>
                <p class="col-span-1">状态</p>
                <p class="col-span-1">结果</p>
                <div class="col-span-2 flex justify-around">
                    <p >操作</p>
                    <IconPark class="cursor-pointer" :icon="Plus" size="16" theme="outline" @click="openDialog"/>
                    <IconPark class="cursor-pointer" :icon="Redo" size="16" theme="outline" @click="refresh"/>
                </div>
                
            </div>
            <CronItem
                v-for="item in crontabList.list"
                :id=item.ID
                :funcname=item.func
                :tag=item.tag
                :cron=item.cron
                :nexttime=item.nextTime
                :status=item.status
                :isRunning =item.isRunning
                :disableFunc="disable"
                :enableFunc="enable"
                :runFunc="run"
                :handlefunc="handleFunc"
            ></CronItem>
        </ElScrollbar>
      </div>
      
      <el-dialog v-model="dialogFormVisible" title="添加定时任务">
        <el-form :model="form"  label-width="120px">
        <el-form-item v-if="isCreate" label="函数名称">
            <el-input v-model="form.funcname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="标签" >
            <el-input v-model="form.tag" autocomplete="off" />
        </el-form-item>
        <el-form-item label="运行间隔">
            <el-input v-model="form.cron" autocomplete="off" />
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="add">保存</el-button>
        </span>
        </template>
    </el-dialog>
    </div>
    
</template>

<script setup lang="ts">
 import CronItem from "@/components/common/CronItem.vue";
 import {Redo,Plus,Experiment,FolderOpen,} from '@icon-park/vue-next'
 import { useCrontabStore } from "@/stores/crontab";
 import { storeToRefs } from "pinia";
 import { onMounted, reactive, ref } from "vue";
 import type { crontabItem } from "@/models/crontab";
import { ElMessage } from "element-plus";
import type { cronChange } from "@/models/bilibili";
import { usecorntabList } from "@/utils/api";
    const CrontabStore = useCrontabStore()
    const {crontabList,cronitem} = storeToRefs(useCrontabStore())
    const dialogFormVisible = ref(false)
    const isCreate = ref(true)
    // const ruleFormRef = ref<FormInstance>()
    // const rules = reactive<FormRules>({
    //     funcname: [
    //         { required: true, message: '函数名必填', trigger: 'blur' },
    //     ],
    //     tag: [
    //         { required: true, message: '标签必填', trigger: 'blur' },
    //     ],
    //     cron: [
    //         { required: true, message: '运行间隔必填', trigger: 'blur' },
    //     ],
    // })
    onMounted(() => {
        CrontabStore.corntabList()
        form.cron=""
        form.funcname = ""
        form.tag = ""
    });
    const form = reactive({
        id:0,
        funcname: '',
        tag: '',
        cron: '',
    })
    const refresh = async()=>{
        await CrontabStore.corntabList();
    }
    // const add = async(formEl: FormInstance | undefined)=>{
        
    //     dialogFormVisible.value = false
    //     CrontabStore.corntabList();
    //     if (!formEl) return
    //     await formEl.validate((valid, fields) => {
    //         if (valid) {
    //         console.log(form)
    //         console.log('submit!')
    //         } else {
    //         console.log('error submit!', fields)
    //         }
    //     })
    // }
    const openDialog =()=>{
        isCreate.value = true
        dialogFormVisible.value = true
        form.cron=""
        form.funcname = ""
        form.tag = ""
    }
    const editDialog =async(id:number)=>{
        isCreate.value = false
        const res = await usecorntabList(id,0)
        if (res.code == 0) {
            if(res.data.list.length==1){
                form.id = id
                form.cron=res.data.list[0].cron
                form.funcname = res.data.list[0].func
                form.tag = res.data.list[0].tag
                dialogFormVisible.value = true
                return
            }
        }else{
            ElMessage.error({
                message:res.msg,
            });
        }
        form.cron=""
        form.funcname = ""
        form.tag = ""
        dialogFormVisible.value = true
        
    }
    const add = async()=>{
        dialogFormVisible.value = false
        console.log(form)
        if (form.id==0){
            await CrontabStore.createCron(form.funcname,form.tag,form.cron)
        }else{
            await CrontabStore.updateCron(form.id,form.tag,form.cron)
        }
        
    }
    const disable = async (id:number)=>{
        await CrontabStore.disableCron(id)
    }
    const enable = async (id:number)=>{
        await CrontabStore.enableCron(id)
    }
    const run = async (tag:string)=>{
        await CrontabStore.runCron(tag)
    }
    const handleFunc = async(command: cronChange) => {
        if(command.type =="edit"){
            editDialog(command.id)
        }else if(command.type =="delete"){
            await CrontabStore.deleteCron(command.id)
        }
        
    }
    
</script>


<style lang="scss">
</style>