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
    /**@name 信息发布 */
    {
      path: '/informationPublish',
      name: 'informationPublish',
      component:() => import('@/view/LabManager/informationPublish/index'),
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
  ]
})
