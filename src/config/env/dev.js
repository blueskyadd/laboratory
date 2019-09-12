const winchaingroupApi = "http://10.102.100.34:8001/";


module.exports = {
    /**@name 登录 */
    uesrRegister: winchaingroupApi + 'users/v1/login/',//登录(实验室管理员首页接口1)
    
    
    /**@name 公用（首页） */
    getAbilityintroduce: winchaingroupApi + 'sys/v1/sysintroduce/',//验室能力介绍(实验室管理员首页接口19)实
    getBulletinBoard: winchaingroupApi + 'sys/v1/sysmsg/',//实验室公告栏列表(实验室管理员首页接口56)
    updataFile: winchaingroupApi + 'sys/v1/file/',//文件上传
    /**@name 公共数据接口 */
    getequipmentEngineerList: winchaingroupApi  + 'users/v1/user1/?role=7',//实验室设备工程师列表(实验室管理员首页接口30)
    /**@name 实验室管理员首页接口 */
    getTaskNumber: winchaingroupApi + '',//任务分配 审核个数(实验室管理员首页接口21)
    //实验室管理员任务分配模块
    getItemsAllocation: winchaingroupApi + 'ex/v1/project1/',//项目未分配列表/已分配列表不加status/搜索 search (实验室管理员首页接口74)
    //实验室管理员管理事项模块
    //人员管理
    getpersonnelManagementList: winchaingroupApi + 'users/v1/user/',//人员列表 (实验室管理员首页接口12)
    getCompanyList: winchaingroupApi + 'users/v1/clab/',//创建人员 公司列表（实验室管理员首页接口94）
    getDepartmentList: winchaingroupApi + 'users/v1/cdepartment/?lab=',//创建人员 部门列表（实验室管理员首页接口95）
    createdCompant: winchaingroupApi + 'users/v1/user/',//人员创建 (实验室管理员首页接口13)
    //设备管理
    getequipmentManagementList: winchaingroupApi + 'eq/v1/equipment1',//设备管理(实验室管理员33)
    getunEquipmentList: winchaingroupApi + 'eq/v1/equipment_apply?status=5',//设备申请未录入列表(实验室管理员首页接口28)
    getlaboratoryList: winchaingroupApi + 'eq/v1/room/',//实验室列表 (实验室管理员首页接口29)
    getmeasurementEnginerrList: winchaingroupApi + 'users/v1/user1/?role=6',//计量工程师(实验室管理员首页接口31)
    createdEquipment: winchaingroupApi + 'eq/v1/equipment1/',// 新增设备 (实验室管理员首页接口32)
    SendbackEquipment: winchaingroupApi + 'eq/v1/equipment_apply/',//设备申请未录入 退回 (实验室管理员首页接口100)
    getEquipmentDetail: winchaingroupApi + 'eq/v1/equipment1/',//设备详情(实验室管理员首页接口34)
    editEquipmentInfo: winchaingroupApi + 'eq/v1/equipment1/',//设备信息修改 (实验室管理员首页接口35)
    deleteEquipment: winchaingroupApi + 'eq/v1/equipment1/',//设备删除(实验室管理员首页接口98)
    getEquipmentFlow: winchaingroupApi + 'eq/v1/equipmenthistory1/',//设备流程显示  (实验室管理员首页接口99)
    getEquipmentpurchaseInfo: winchaingroupApi + 'eq/v1/equipmentapplication1/',//设备采购信息(实验室管理员首页接口36)
    getmaintenanceRecordList: winchaingroupApi + 'eq/v1/maintainrecord1/?equipment=',//维修记录列表(实验室管理员首页接口101)
    getmaintenanceRecordDetailInfo: winchaingroupApi + 'eq/v1/maintainrecord1/',//维修记录详情  (实验室管理员首页接口104)
    getupkeepRecordList: winchaingroupApi + 'eq/v1/upkeeprecord1/?equipment=',//保养记录列表(实验室管理员首页接口102)
    getupkeeprecordInfo: winchaingroupApi + 'eq/v1/upkeeprecord1/',//保养记录详情 (实验室管理员首页接口105)
    getmeasureRecordList: winchaingroupApi + 'eq/v1/meterecord/?equipment=',//计量记录列表 
    getmeasureRecordInfo: winchaingroupApi + 'eq/v1/meterecord/',//计量记录详情 (实验室管理员首页接口105)
    //物料管理
    getmaterialList: winchaingroupApi +  'eq/v1/materiel1/',//物料管理列表(实验室管理员首页接口87)
    //实验标准
    gettestManagementList: winchaingroupApi +'sys/v1/standard/',// 试验标准列表   管理事项 (实验室管理员首页接口68)
    deletegettestManagement: winchaingroupApi + 'sys/v1/standard/',//试验标准删除(实验室管理员首页接口70)
    createdtestStandard: winchaingroupApi + 'sys/v1/standard/',//试验标准创建(实验室管理员首页接口69)
    //试验方法
    gettestMethodsList: winchaingroupApi + 'sys/v1/testwaymanage/',//试验方法列表  管理事项(实验室管理员首页接口66)
    deletetestMethods: winchaingroupApi + 'sys/v1/testwaymanage/',// 试验方法删除  管理事项 (实验室管理员首页接口67)
    //历史项目
    gethistoryProjectList: winchaingroupApi + 'ex/v1/finishproject1/',//历史项目列表(实验室管理员首页接口88)
    //工装管理
    getNoentryFrockList: winchaingroupApi + 'eq/v1/infrockapply1/',//工装申请未录入列表 (实验室管理员首页接口43)
    createdFrock: winchaingroupApi + 'eq/v1/infrockapply1/',// 新增工装 (实验室管理员首页接口44)
    getfrockManageList: winchaingroupApi + 'eq/v1/frock1/',//工装列表 (实验室管理员首页接口45)
    getFrockDetailInfo: winchaingroupApi + 'eq/v1/frock1/',//工装详情(实验室管理员首页接口46)
    editFrock: winchaingroupApi + 'eq/v1/frock1/',//工装修改 (实验室管理员首页接口47)
    deletefrock: winchaingroupApi +  'eq/v1/frock1/',// 工装删除 (实验室管理员首页接口48)
    getFrockApplyDetailInfo: winchaingroupApi + 'eq/v1/flow1/?apply=',//工装申请详情(实验室管理员首页接口49)
}
