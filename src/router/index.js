import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //登录页
    {
      path: '/',
      name: 'loging',
      component:() => import('@/view/loging/index'),
    },
    /**@name 管理员-首页-------------------------------(1)--------*/
    {
      path: '/LabManager/index',
      name: 'LabManagerIndex',
      component:() => import('@/view/LabManager/index/index'),
    },
    /**@name 管理员-项目分配 */
    {
      path: '/itemsAllocation',
      name: 'itemsAllocation',
      component:() => import('@/view/LabManager/itemsAllocation/index'),
      redirect: '/itemsAllocation/unAllocation',
      children: [
          {
              path: 'unAllocation',
              name: 'unAllocation',
              component:() => import('@/view/LabManager/itemsAllocation/allocation/unAllocation'),
          },
          {
            path: 'distributed',
            name: 'distributed',
            component:() => import('@/view/LabManager/itemsAllocation/allocation/distributed'),
        },
      ]
    },
    //任务分配
    {
      path: '/teskAllioction',
      name:'teskAllioction',
      component: ()=> import('@/view/LabManager/itemsAllocation/teskAllioction/index')
    },
    /**@name 管理员-任务审核 */
    {
      path: '/Taskreview',
      name: 'Taskreview',
      component:() => import('@/view/LabManager/Taskreview/index'),
      redirect: '/Taskreview/report',
      children: [
          {
              path: 'report',
              name: 'report',
              component:() => import('@/view/LabManager/Taskreview/review/report/report'),
          },
          {
            path: 'measure',
            name: 'measure',
            component:() => import('@/view/LabManager/Taskreview/review/measure/measure'),
          },
          {
            path: 'material',
            name: 'material',
            component:() => import('@/view/LabManager/Taskreview/review/material/material'),
          },
          {
            path: 'equipment',
            name: 'equipment',
            component:() => import('@/view/LabManager/Taskreview/review/equipment/equipment'),
          },
          {
            path: 'Watch',
            name: 'Watch',
            component:() => import('@/view/LabManager/Taskreview/review/Watch/Watch'),
          },
          {
            path: 'teskMethod',
            name: 'teskMethod',
            component:() => import('@/view/LabManager/Taskreview/review/teskMethod/teskMethod'),
          },
          {
            path: 'toolingApplication',
            name: 'toolingApplication',
            component:() => import('@/view/LabManager/Taskreview/review/toolingApplication/toolingApplication'),
          },
          {
            path: 'infrastructure',
            name: 'infrastructure',
            component:() => import('@/view/LabManager/Taskreview/review/infrastructure/infrastructure'),
          },
      ]
    },
    /**@name 任务审核-详情页*/
    //申请报告
    {
      path: '/applicationReport',
      name: 'applicationReport',
        component:() => import('@/view/LabManager/Taskreview/review/report/applicationReport'),
    },
    //申请计量
    {
      path: '/applicationMeasure',
      name: 'applicationMeasure',
        component:() => import('@/view/LabManager/Taskreview/review/measure/applicationMeasure'),
    },
    //上传计量合同
    {
      path: '/updataMeasure',
      name: 'updataMeasure',
        component:() => import('@/view/LabManager/Taskreview/review/measure/updataMeasure'),
    },
    //申请物料
    {
      path: '/applicationMaterials',
      name: 'applicationMaterials',
        component:() => import('@/view/LabManager/Taskreview/review/material/applicationMaterials'),
    },
    //申请设备
    {
      path: '/applicationEquipment',
      name: 'applicationEquipment',
      component:() => import('@/view/LabManager/Taskreview/review/equipment/applicationEquipment'),
    },
    //申请值班
    {
      path: '/applicationWatch',
      name: 'applicationWatch',
      component:() => import('@/view/LabManager/Taskreview/review/Watch/applicationWatch'),
    },
    //申请试验方法
    {
      path: '/applicationMethod',
      name: 'applicationMethod',
      component:() => import('@/view/LabManager/Taskreview/review/teskMethod/applicationMethod'),
    },
    //申请工装
    {
      path: '/applicationTooling',
      name: 'applicationTooling',
      component:() => import('@/view/LabManager/Taskreview/review/toolingApplication/applicationTooling'),
    },
    //申请报修
    {
      path: '/applicationInfrastructure',
      name: 'applicationInfrastructure',
      component:() => import('@/view/LabManager/Taskreview/review/infrastructure/applicationInfrastructure'),
    },

    /**@name 管理事项 */
    {
      path: '/management',
      name: 'management',
      component:() => import('@/view/LabManager/management/index'),
      redirect: '/management/personnelManagement',
      children:[
        {
          path: 'personnelManagement',
          name: 'personnelManagement',
          component:() => import('@/view/LabManager/management/itemsList/personnelManagement/personnelManagement'),
        },
        {
          path: 'equipmentManagement',
          name: 'equipmentManagement',
          component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/equipmentManagement'),
        },
        {
          path: 'materialManagement',
          name: 'materialManagement',
          component:() => import('@/view/LabManager/management/itemsList/materialManagement/materialManagement'),
        },
        {
          path: 'testManagement',
          name: 'testManagement',
          component:() => import('@/view/LabManager/management/itemsList/testManagement/testManagement'),
        },
        {
          path: 'methodsManagement',
          name: 'methodsManagement',
          component:() => import('@/view/LabManager/management/itemsList/methodsManagement/methodsManagement'),
        },
        {
          path: 'historyManagement',
          name: 'historyManagement',
          component:() => import('@/view/LabManager/management/itemsList/historyManagement/historyManagement'),
        },
        {
          path: 'frockManagement',
          name: 'frockManagement',
          component:() => import('@/view/LabManager/management/itemsList/frockManagement/frockManagement'),
        },
      ]
    },
    /**@name 管理事项详情页面 */
    //设备查看
    {
      path: '/lookEquipment',
      name: 'lookEquipment',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/lookEquipment'),
    },
    //设备采购
    {
      path: '/purchaseEquipment',
      name: 'purchaseEquipment',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/purchaseEquipment'),
    },
    //设备文档
    {
      path: '/documentEquipment',
      name: 'documentEquipment',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/documentEquipment'),
    },
    //维修记录
    {
      path: '/maintenanceRecord',
      name: 'maintenanceRecord',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/maintenanceRecord'),
    },
    //维修流程
    {
      path: '/maintenanceProcess',
      name: 'maintenanceProcess',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/maintenanceProcess'),
    },
    //保养记录
    {
      path: '/upkeepRecord',
      name: 'upkeepRecord',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/upkeepRecord'),
    },
    //保养流程
    {
      path: '/upkeepProcess',
      name: 'upkeepProcess',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/upkeepProcess'),
    },
    //计量记录.vue
    {
      path: '/measureRecord',
      name: 'measureRecord',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/measureRecord'),
    },
    //计量流程.vue
    {
      path: '/measureProcess',
      name: 'measureProcess',
      component:() => import('@/view/LabManager/management/itemsList/equipmentManagement/measureProcess'),
    },
    //历史项目详情页面
    {
      path: '/histoyDetail',
      name: 'histoyDetail',
      component:() => import('@/view/LabManager/management/itemsList/historyManagement/histoyDetail'),
    },
    //历史编辑
    {
      path: '/historyEditDeteil',
      name: 'historyEditDeteil',
      component:() => import('@/view/LabManager/management/itemsList/historyManagement/historyEditDeteil'),
    },
    //工装流程
    {
      path: '/frockProcess',
      name: 'frockProcess',
      component:() => import('@/view/LabManager/management/itemsList/frockManagement/frockProcess'),
    },
    //新增公司
    {
      path: '/addCompany',
      name: 'addCompany',
      component:() => import('@/view/LabManager/management/itemsList/personnelManagement/addCompany'),
    },
    //新增部门
    {
      path: '/newDepartment',
      name: 'newDepartment',
      component:() => import('@/view/LabManager/management/itemsList/personnelManagement/newDepartment'),
    },
    /**@name 信息发布 */
    {
      path: '/informationPublish',
      name: 'informationPublish',
      component:() => import('@/view/LabManager/informationPublish/index'),
      redirect: '/informationPublish/announcement',
      children:[
        //实验室公告
        {
          path: 'announcement',
          name: 'announcement',
          component:() => import('@/view/LabManager/informationPublish/itemList/announcement')
        },
        //实验室能力介绍
        {
          path: 'abilityIntroduce',
          name: 'abilityIntroduce',
          component:() => import('@/view/LabManager/informationPublish/itemList/abilityIntroduce')
        },
        //实验室设备图片
        {
          path: 'equipmentImg',
          name: 'equipmentImg',
          component:() => import('@/view/LabManager/informationPublish/itemList/equipmentImg')
        }
      ]
    },

    /**@name 试验工程师-------------------------------------(2)-------------------------*/
    /**@name 首页 */
    {
      path: '/Testengineer/index',
      name: 'TestengineerIndex',
      component:() => import('@/view/Testengineer/index/index'),
      
    },
    //完成任务mission
    {
      path: '/Testengineer/missionUnaccomplish',
      name: 'missionUnaccomplish',
      component:() => import('@/view/Testengineer/missionUnaccomplish/index'),
      redirect: '/Testengineer/missionUnaccomplish/test',
      children:[
        {
          path: 'test',
          name: 'test',
          component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/test'),
        },
        {
          path: 'project',
          name: 'project',
          component:() => import('@/view/Testengineer/missionUnaccomplish/view/project/project'),
        },
      ]
    },
    //详情页
    {
      path: '/Testengineer/missionDetail',
      name: 'missionDetail',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/project/missionDetail'),
    },
    //实验流程
    {
      path: '/Testengineer/testProcess',
      name: 'testProcess',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/testProcess'),
    },
    //试验环境搭建
    {
      path: '/Testengineer/environmentActive',
      name: 'environmentActive',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/environmentActive'),
      redirect: '/Testengineer/environmentActive/material',
      children:[
        {
          path: 'material',
          name: 'material',
          component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/materialManage'),
        },
        {
          path: 'equipment',
          name: 'equipment',
          component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/equipmentManage'),
        },
        {
          path: 'methods',
          name: 'methods',
          component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/methodsManage'),
        },
      ]
    },
    //试验员安排
    {
      path: '/Testengineer/tester',
      name: 'tester',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/tester'),
    },
    //上传项目文件
    {
      path: '/Testengineer/upTestdata',
      name: 'upTestdata',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/upTestdata'),
    },
    //试验结果分析
    {
      path: '/Testengineer/experimental_result',
      name: 'experimental_result',
      component:() => import('@/view/Testengineer/missionUnaccomplish/view/test/process/experimental_result'),
    },
    /**@name 未完成任务 */
    {
      path: '/Testengineer/unMissionUnaccomplish',
      name: 'unMissionUnaccomplish',
      component:() => import('@/view/Testengineer/unMissionUnaccomplish/index'),
      redirect: '/Testengineer/unMissionUnaccomplish/unMissionUnaccomplishTest',
      children:[
        {
          path: 'unMissionUnaccomplishTest',
          name: 'unMissionUnaccomplishTest',
          component:() => import('@/view/Testengineer/unMissionUnaccomplish/view/test/test'),
        },
        {
          path: 'unMissionUnaccomplishProject',
          name: 'unMissionUnaccomplishProject',
          component:() => import('@/view/Testengineer/unMissionUnaccomplish/view/project/project'),
        },
      ]
    },
    //详情页面
    //申请保修
    {
      path: '/Testengineer/guarantee',
      name: 'guarantee',
      component:() => import('@/view/Testengineer/unMissionUnaccomplish/view/test/guarantee'),
    },
    //未完成任务查看
    {
      path: '/Testengineer/unMissionDetail',
      name: 'unMissionDetail',
      component:() => import('@/view/Testengineer/unMissionUnaccomplish/view/project/unMissionDetail'),
    },
    //项目文件上传
    {
      path: '/Testengineer/updataFile',
      name: 'updataFile',
      component:() => import('@/view/Testengineer/unMissionUnaccomplish/view/project/updataFile'),
    },
    /**@name 培养人员管理 */
    {
      path: '/Testengineer/cultivate',
      name: 'cultivate',
      component:() => import('@/view/Testengineer/cultivate/index'),
    },
    //合作的项目列表
    {
      path: '/Testengineer/cultivateDetailList',
      name: 'cultivateDetailList',
      component:() => import('@/view/Testengineer/cultivate/cultivateDetailList'),
    },
    /**@name 值班管理 */
    {
      path: '/Testengineer/watchManage',
      name: 'watchManage',
      component:() => import('@/view/Testengineer/WatchManage/index')
    },
    {
      path: '/Testengineer/watchManage/proposerSchedule',
      name: 'proposerSchedule',
      component:() => import('@/view/Testengineer/WatchManage/view/proposerSchedule'),
    },
    {
      path: '/Testengineer/watchManage/proposerWatch',
      name: 'proposerWatch',
      component:() => import('@/view/Testengineer/WatchManage/view/proposerWatch'),
    },
    /**@name 实验方法 */
    {
      path: '/Testengineer/testMethods',
      name: 'testMethods',
      component:() => import('@/view/Testengineer/testMethods/index'),
    },
    //上传实验方法
    {
      path: '/Testengineer/updataFileTest',
      name: 'updataFileTest',
      component:() => import('@/view/Testengineer/testMethods/updataFileTest'),
    },
    /**@name 实验标准 */
    {
      path: '/Testengineer/testStandard',
      name: 'testStandard',
      component:() => import('@/view/Testengineer/testStandard/index'),
    },
    /**@name 报警日志 */
    {
      path: '/Testengineer/testWarning',
      name: 'testWarning',
      component:() => import('@/view/Testengineer/testWarning/index'),
    },
    //新增警报
    {
      path: '/Testengineer/addWarning',
      name: 'addWarning',
      component:() => import('@/view/Testengineer/testWarning/addWarning'),
    },
    /**@name 试验设备工程师------------------------(3)----------------------- */
    {
      path: '/Equipmentengineer/index',
      name: 'EquipmentengineerIndex',
      component:() => import('@/view/Equipmentengineer/index'),
    },
    //故障设备管理
    {
      path: '/Equipmentengineer/malfunction',
      name: 'malfunction',
      component:() => import('@/view/Equipmentengineer/malfunction/malfunction'),
    },
    //故障流程
    {
      path: '/Equipmentengineer/malfunctionFlow',
      name: 'malfunctionFlow',
      component:() => import('@/view/Equipmentengineer/malfunction/malfunctionFlow'),
    },
    //故障详情
    {
      path: '/Equipmentengineer/malfunctionDetail',
      name: 'malfunctionDetail',
      component:() => import('@/view/Equipmentengineer/malfunction/malfunctionDetail'),
    },
    //工具物料申请
    {
      path: '/Equipmentengineer/malfunctionChange',
      name: 'malfunctionChange',
      component:() => import('@/view/Equipmentengineer/malfunction/malfunctionChange'),
    },
    //上传维修报告
    {
      path: '/Equipmentengineer/malfunctionReport',
      name: 'malfunctionReport',
      component:() => import('@/view/Equipmentengineer/malfunction/malfunctionReport'),
    },
    /**@name保养设备数 */
    {
      path: '/Equipmentengineer/upkeepEqupment',
      name: 'upkeepEqupment',
      component:() => import('@/view/Equipmentengineer/upkeep/upkeepEqupment'),
    },
    //保养流程
    {
      path: '/Equipmentengineer/upkeepFlow',
      name: 'upkeepFlow',
      component:() => import('@/view/Equipmentengineer/upkeep/upkeepFlow'),
    },
    //申请保养
    {
      path: '/Equipmentengineer/upkeepProposer',
      name: 'upkeepProposer',
      component:() => import('@/view/Equipmentengineer/upkeep/upkeepProposer'),
    },
    //工具物料申请--保养
    {
      path: '/Equipmentengineer/upkeepChange',
      name: 'upkeepChange',
      component:() => import('@/view/Equipmentengineer/upkeep/upkeepChange'),
    },
    //保养报告
    {
      path: '/Equipmentengineer/upkeepUpdataFile',
      name: 'upkeepUpdataFile',
      component:() => import('@/view/Equipmentengineer/upkeep/upkeepUpdataFile'),
    },
    /**@name 设备负责数 */
    {
      path: '/Equipmentengineer/responsible',
      name: 'responsible',
      component:() => import('@/view/Equipmentengineer/equipment/responsible'),
    },
    //新增设备数
    {
      path: '/Equipmentengineer/addEquipment',
      name: 'addEquipment',
      component:() => import('@/view/Equipmentengineer/equipment/addEquipment'),
    },
    //设备流程
    {
      path: '/Equipmentengineer/equipmentFlow',
      name: 'equipmentFlow',
      component:() => import('@/view/Equipmentengineer/equipment/equipmentFlow'),
    },
    //保养记录
    {
      path: '/Equipmentengineer/record',
      name: 'record',
      component:() => import('@/view/Equipmentengineer/equipment/record'),
    },
    //保养记录
    {
      path: '/Equipmentengineer/maintain',
      name: 'maintain',
      component:() => import('@/view/Equipmentengineer/equipment/maintain'),
    },
    //新增设备流程
    {
      path: '/Equipmentengineer/NewEquipmentFlow',
      name: 'NewEquipmentFlow',
      component:() => import('@/view/Equipmentengineer/equipment/NewEquipmentFlow'),
    },
    //申请设备
    {
      path: '/Equipmentengineer/proposerEquipment',
      name: 'proposerEquipment',
      component:() => import('@/view/Equipmentengineer/equipment/proposerEquipment'),
    },
    //上传调试报告
    {
      path: '/Equipmentengineer/updataReport',
      name: 'updataReport',
      component:() => import('@/view/Equipmentengineer/equipment/updataReport'),
    },
    /**@name 工装治具 */
    {
      path: '/Equipmentengineer/frock',
      name: 'frock',
      component:() => import('@/view/Equipmentengineer/frock/frock'),
    },
    //新增工装数
    {
      path: '/Equipmentengineer/addFrock',
      name: 'addFrock',
      component:() => import('@/view/Equipmentengineer/frock/addFrock'),
    },
    //工装流程
    {
      path: '/Equipmentengineer/frockFlow',
      name: 'frockFlow',
      component:() => import('@/view/Equipmentengineer/frock/frockFlow'),
    },
    //申请工装
    {
      path: '/Equipmentengineer/proposeFeock',
      name: 'proposeFeock',
      component:() => import('@/view/Equipmentengineer/frock/proposeFeock'),
    },
    //上传调试报告
    {
      path: '/Equipmentengineer/updatafrockReport',
      name: 'updatafrockReport',
      component:() => import('@/view/Equipmentengineer/frock/updatafrockReport'),
    },
    /**@name 设备人员安全指导书 */
    {
      path: '/Equipmentengineer/ReWirePerson',
      name: 'ReWirePerson',
      component:() => import('@/view/Equipmentengineer/ReWirePerson/ReWire'),
    },
    //上传设备操作指导书
    {
      path: '/Equipmentengineer/updataReWirePerson',
      name: 'updataReWirePerson',
      component:() => import('@/view/Equipmentengineer/ReWirePerson/updataReWire'),
    },
    /**@name 设备操作指导书 */
    {
      path: '/Equipmentengineer/ReWire',
      name: 'ReWire',
      component:() => import('@/view/Equipmentengineer/ReWire/ReWire'),
    },
    //上传设备操作指导书
    {
      path: '/Equipmentengineer/updataReWire',
      name: 'updataReWire',
      component:() => import('@/view/Equipmentengineer/ReWire/updataReWire'),
    },
    
    /**@name基础设施管理 */
    {
      path: '/Equipmentengineer/Infrastructure',
      name: 'Infrastructure',
      component:() => import('@/view/Equipmentengineer/Infrastructure/Infrastructure'),
    },
    //申请保修
    {
      path: '/Equipmentengineer/InfrastructurePropose',
      name: 'InfrastructurePropose',
      component:() => import('@/view/Equipmentengineer/Infrastructure/InfrastructurePropose'),
    },
    /**@name 物料工程师-------------------------------(4)-------------------------------- */
    {
      path: '/materialIndex/index',
      name: 'materialIndex',
      component:() => import('@/view/material/index'),
    },
    //物料管理
    {
      path: '/materialIndex/materialManagementTable',
      name: 'materialManagementTable',
      component:() => import('@/view/material/materialManagement/materialManagement'),
    },
    //新增物料
    {
      path: '/materialIndex/addMaterial',
      name: 'addMaterial',
      component:() => import('@/view/material/materialManagement/addMaterial'),
    },
    //申请物料
    {
      path: '/materialIndex/ediitMaterial',
      name: 'ediitMaterial',
      component:() => import('@/view/material/materialManagement/ediitMaterial'),
    },
    //物料分配
    {
      path: '/materialIndex/meterialAllocation',
      name: 'meterialAllocation',
      component:() => import('@/view/material/meterialAllocation/meterialAllocation'),
      redirect: '/materialIndex/meterialAllocation/materialTest',
      children:[
        {
          path: 'materialTest',
          name: 'materialTest',
          component:() => import('@/view/material/meterialAllocation/materialTest/index'),
        },
        {
          path: 'materialMaintain',
          name: 'materialMaintain',
          component:() => import('@/view/material/meterialAllocation/materialMaintain/index'),
        },
      ]
    },
     //分配试验物料
    {
      path: '/materialIndex/meterialAllocation/materialTest/allocationTest',
      name: 'allocationTest',
      component:() => import('@/view/material/meterialAllocation/materialTest/allocation'),
    },
    //分配维修物料
    {
      path: '/materialIndex/meterialAllocation/materialTest/allocationMaintain',
      name: 'allocationMaintain',
      component:() => import('@/view/material/meterialAllocation/materialMaintain/allocation'),
    },
    //物料归还
    {
      path: '/materialIndex/returnMaterial',
      name: 'returnMaterial',
      component:() => import('@/view/material/returnMaterial/index'),
      redirect: '/materialIndex/returnMaterial/returnTest',
      children:[
        {
          path: 'returnTest',
          name: 'returnTest',
          component:() => import('@/view/material/returnMaterial/returnTest/index'),
        },
        {
          path: 'returnMaintain',
          name: 'returnMaintain',
          component:() => import('@/view/material/returnMaterial/returnMaintain/index'),
        },
      ]
    },
    //归还试验物料
    {
      path: '/materialIndex/returnMaterial/returnTest/allocationReturnTest',
      name: 'allocationReturnTest',
      component:() => import('@/view/material/returnMaterial/returnTest/allocation'),
    },
    //归还维修物料
    {
      path: '/materialIndex/returnMaterial/returnMaterial/allocationReturnMaintain',
      name: 'allocationReturnMaintain',
      component:() => import('@/view/material/returnMaterial/returnMaintain/allocation'),
    },
    //物料入库
    {
      path: '/materialIndex/incoming/index',
      name: 'incoming',
      component:() => import('@/view/material/incoming/index'),
    },
    //样件确认
    {
      path: '/materialIndex/exemplar/index',
      name: 'exemplar',
      component:() => import('@/view/material/exemplar/index'),
    },
    //样件确认详情
    { 
      path: '/materialIndex/exemplar/exmplarDetail',
      name: 'exmplarDetail',
      component:() => import('@/view/material/exemplar/exmplarDetail'),
    },
    /**@name 物料计量员 */
    { 
      path: '/gaugerIndex/index',
      name: 'gaugerIndex',
      component:() => import('@/view/gauger/index/index'),
    },
    //已过计量期设备数
    { 
      path: '/gaugerIndex/overdue',
      name: 'overdue',
      component:() => import('@/view/gauger/overdue/index'),
    },
    //负责计量设备数
    { 
      path: '/gaugerIndex/principal',
      name: 'principal',
      component:() => import('@/view/gauger/principal/index'),
    },
    //负责计量设备数详情
    { 
      path: '/gaugerIndex/principalDetail',
      name: 'principalDetail',
      component:() => import('@/view/gauger/principal/principalDetail'),
    },
    //计量流程
    { 
      path: '/gaugerIndex/measureFlow',
      name: 'measureFlow',
      component:() => import('@/view/gauger/principal/measureFlow'),
    },
    //申请计量
    { 
      path: '/gaugerIndex/proposer',
      name: 'proposer',
      component:() => import('@/view/gauger/principal/flow/proposer'),
    },
    //计量进度
    { 
      path: '/gaugerIndex/schedule',
      name: 'schedule',
      component:() => import('@/view/gauger/principal/flow/schedule'),
    },
    //计量报告
    { 
      path: '/gaugerIndex/measureFlowReport',
      name: 'measureFlowReport',
      component:() => import('@/view/gauger/principal/flow/report'),
    },
    //30天未计量设备数 
    { 
      path: '/gaugerIndex/unMeasure',
      name: 'unMeasure',
      component:() => import('@/view/gauger/unMeasure/index'),
    },
    //计量中设备进度
    { 
      path: '/gaugerIndex/scheduleIndex',
      name: 'scheduleIndex',
      component:() => import('@/view/gauger/schedule/index'),
    },
    /**@name 产品经理 */
    { 
      path: '/ProjectManager/ProjectManagerIndex',
      name: 'ProjectManagerIndex',
      component:() => import('@/view/ProjectManager/index/index'),
    },
    //实验标准
    { 
      path: '/ProjectManager/projectStandard',
      name: 'projectStandard',
      component:() => import('@/view/ProjectManager/projectStandard/index'),
    },
    //预约项目
    { 
      path: '/ProjectManager/projectAppointment',
      name: 'projectAppointment',
      component:() => import('@/view/ProjectManager/projectAppointment/index'),
    },
    //预约项目流程
    { 
      path: '/ProjectManager/projectFlow',
      name: 'projectFlow',
      component:() => import('@/view/ProjectManager/projectAppointment/projectFlow'),
    },
    //试验管理
    { 
      path: '/ProjectManager/projectManageTest',
      name: 'projectManageTest',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/projectManage'),
    },
    //创建试验
    { 
      path: '/ProjectManager/addProjectTest',
      name: 'addProjectTest',
      component:() => import('@/view/ProjectManager/projectAppointment/addProjectTest'),
    },
    //历史项目
    { 
      path: '/ProjectManager/projectHistory',
      name: 'projectHistory',
      component:() => import('@/view/ProjectManager/projectHistory/index'),
    },
    //历史项目详情
    { 
      path: '/ProjectManager/projectHistoryDetail',
      name: 'projectHistoryDetail',
      component:() => import('@/view/ProjectManager/projectHistory/projectHistoryDetail'),
    },
    //内部预约试验列表
    { 
      path: '/ProjectManager/InternalAppointment',
      name: 'InternalAppointment',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/InternalAppointment'),
    },
    //预约信息
    { 
      path: '/ProjectManager/AppointmentDetail',
      name: 'AppointmentDetail',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/AppointmentDetail'),
    },
    //试验进度
    { 
      path: '/ProjectManager/scheduleTest',
      name: 'scheduleTest',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/scheduleTest'),
    },
    //项目报告
    { 
      path: '/ProjectManager/projectPaper',
      name: 'projectPaper',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/projectPaper'),
    },
    //试验详情
    {
      path: '/ProjectManager/reportDetail',
      name: 'reportDetail',
      component:() => import('@/view/ProjectManager/projectAppointment/flow/reportDetail'),
    },
    //创建/编辑项目
    { 
      path: '/ProjectManager/addProjectAppoinment',
      name: 'addProjectAppoinment',
      component:() => import('@/view/ProjectManager/projectAppointment/addProjectAppoinment'),
    },
    /**@anem消息通知 */
    { 
      path: '/notification',
      name: 'notification',
      component:() => import('@/components/notification'),
    },
    /**@name 实验室经理 */
    { 
      path: '/LaboratoryManager/LaboratoryManagerIndex',
      name: 'LaboratoryManagerIndex',
      component:() => import('@/view/LaboratoryManager/index/index'),
    },
    //负责项目
    { 
      path: '/LaboratoryManager/principalProject',
      name: 'principalProject',
      component:() => import('@/view/LaboratoryManager/principalProject/index'),
    },
    //我的应用--活跃人数
    { 
      path: '/LaboratoryManager/activeNumber',
      name: 'activeNumber',
      component:() => import('@/view/LaboratoryManager/myApply/activeNumber'),
    },
    //我的应用--设备档案
    { 
      path: '/LaboratoryManager/equipmentArchives',
      name: 'equipmentArchives',
      component:() => import('@/view/LaboratoryManager/myApply/equipmentArchives'),
    },
    //我的应用--设备详情--设备查看流程图
    { 
      path: '/LaboratoryManager/equipmentDetail',
      name: 'equipmentDetail',
      component:() => import('@/view/LaboratoryManager/myApply/equipmentDetail'),
    },
    //我的应用--设备查看流程图--设备文档
    { 
      path: '/LaboratoryManager/LaboratoryDocumentEquipment',
      name: 'LaboratoryDocumentEquipment',
      component:() => import('@/view/LaboratoryManager/myApply/flow/documentEquipment'),
    },
    //我的应用--设备查看流程--设备维修记录列表
    { 
      path: '/LaboratoryManager/LaboratoryMaintenanceRecord',
      name: 'LaboratoryMaintenanceRecord',
      component:() => import('@/view/LaboratoryManager/myApply/flow/maintenanceRecord'),
    },
    //我的应用--设备查看流程--设备维修记录流程
    { 
      path: '/LaboratoryManager/LaboratoryMaintenanceProcess',
      name: 'LaboratoryMaintenanceProcess',
      component:() => import('@/view/LaboratoryManager/myApply/flow/maintenanceProcess'),
    },
    //我的应用--设备查看流程--设备保养记录列表
    { 
      path: '/LaboratoryManager/LaboratoryUpkeepRecord',
      name: 'LaboratoryUpkeepRecord',
      component:() => import('@/view/LaboratoryManager/myApply/flow/upkeepRecord'),
    },
    //我的应用--设备查看流程--设备保养记录流程
    { 
      path: '/LaboratoryManager/LaboratoryUpkeepProcess',
      name: 'LaboratoryUpkeepProcess',
      component:() => import('@/view/LaboratoryManager/myApply/flow/upkeepProcess'),
    },
    // //我的应用--设备查看流程--设备计量记录列表
    // { 
    //   path: '/LaboratoryManager/LaboratoryMeasureRecord',
    //   name: 'LaboratoryMeasureRecord',
    //   component:() => import('@/view/LaboratoryManager/myApply/flow/measureRecord'),
    // },
    // //我的应用--设备查看流程--设备计量记录流程
    // { 
    //   path: '/LaboratoryManager/LaboratoryMeasureProcess',
    //   name: 'LaboratoryMeasureProcess',
    //   component:() => import('@/view/LaboratoryManager/myApply/flow/measureProcess'),
    // },
    //我的应用--项目总数
    { 
      path: '/LaboratoryManager/projectSum',
      name: 'projectSum',
      component:() => import('@/view/LaboratoryManager/myApply/projectSum'),
    },
    //测试报告 
    { 
      path: '/LaboratoryManager/labRrport',
      name: 'labRrport',
      component:() => import('@/view/LaboratoryManager/myApply/labRrport'),
    },
    //我的应用--报警日志
    { 
      path: '/LaboratoryManager/AlarmLog',
      name: 'AlarmLog',
      component:() => import('@/view/LaboratoryManager/myApply/AlarmLog'),
    },
    //我的应用--试验标准
    { 
      path: '/LaboratoryManager/LabTestStandard',
      name: 'LabTestStandard',
      component:() => import('@/view/LaboratoryManager/myApply/testStandard'),
    },
    //设备运行率 
    { 
      path: '/LaboratoryManager/operatinRatio',
      name: 'operatinRatio',
      component:() => import('@/view/LaboratoryManager/operatinRatio/index'),
    },
    //安全库存
    { 
      path: '/LaboratoryManager/safeStock',
      name: 'safeStock',
      component:() => import('@/view/LaboratoryManager/safeStock/index'),
    },
    /**@name产品经理 */
    { 
      path: '/LaboratoryManager/PMenegeIndex',
      name: 'PMenegeIndex',
      component:() => import('@/view/PMenege/index/index'),
    },
    //我的应用--审批
    { 
      path: '/LaboratoryManager/examine',
      name: 'examine',
      component:() => import('@/view/PMenege/examine/index'),
    },
    //我的应用--审批详情
    { 
      path: '/LaboratoryManager/examineDeatil',
      name: 'examineDeatil',
      component:() => import('@/view/PMenege/examine/examineDeatil'),
    },
    //我的应用--试验信息
    { 
      path: '/LaboratoryManager/testInfo',
      name: 'testInfo',
      component:() => import('@/view/PMenege/testInfo/index'),
    },
    //我的应用--试验详情
    { 
      path: '/LaboratoryManager/testInfoDetail',
      name: 'testInfoDetail',
      component:() => import('@/view/PMenege/testInfo/testInfoDetail'),
    },
    //我的应用--支出费用
    { 
      path: '/LaboratoryManager/incurExpense',
      name: 'incurExpense',
      component:() => import('@/view/PMenege/incurExpense/index'),
    },
    //我的应用--项目费用
    { 
      path: '/LaboratoryManager/incurExpenseDetail',
      name: 'incurExpenseDetail',
      component:() => import('@/view/PMenege/incurExpense/incurExpenseDetail'),
    },
    //我的应用--试验费用
    { 
      path: '/LaboratoryManager/incurTest',
      name: 'incurTest',
      component:() => import('@/view/PMenege/incurExpense/incurTest'),
    },
    //我的应用--试验费用
    { 
      path: '/LaboratoryManager/projectInccur',
      name: 'projectInccur',
      component:() => import('@/view/PMenege/incurExpense/projectInccur'),
    },
    //右侧时间图表--详情页
    { 
      path: '/LaboratoryManager/listInfoDetail',
      name: 'listInfoDetail',
      component:() => import('@/view/PMenege/index/listInfoDetail'),
    },
    //产品经理---日历
    { 
      path: '/LaboratoryManager/calendar',
      name: 'calendar',
      component:() => import('@/view/PMenege/index/calendar'),
    },
    //负责项目
    { 
      path: '/LaboratoryManager/LaboratoryPrincipalProject',
      name: 'LaboratoryPrincipalProject',
      component:() => import('@/view/PMenege/index/principalProject'),
    },
  ]
})

