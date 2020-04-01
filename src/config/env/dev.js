// const winchaingroupApi = "http://47.104.95.206:8010/";
const winchaingroupApi = "https://kungfutimes.cn/";



module.exports = {
    /**@name 登录 */
    uesrRegister: winchaingroupApi + 'users/v1/login/',//登录(实验室管理员接口1)
    
    
    /**@name 公用（首页） */
    getAbilityintroduce: winchaingroupApi + 'sys/v1/sysintroduce/',//验室能力介绍(实验室管理员接口19)
    getBulletinBoard: winchaingroupApi + 'sys/v1/sysmsg/',//实验室公告栏列表(实验室管理员接口56)
    updataFile: winchaingroupApi + 'sys/v1/file/',//文件上传
    search_materialList: winchaingroupApi + 'eq/v1/materialsearch/?search=',//物料检索列表 (试验工程师接口517)
    /**@name 公共数据接口--- */
    getequipmentEngineerList: winchaingroupApi  + 'users/v1/user1/?role=7',//实验室设备工程师列表(实验室管理员接口30)
    getEquipment_userinfoDetail: winchaingroupApi + 'users/v1/userinfo/',//公司部门 (试验工程师接口541)
    getlaboratoryList: winchaingroupApi + 'eq/v1/room/',//实验室列表 (实验室管理员接口29)

    /**@name 实验室管理员首页接口 */
    getTaskNumber: winchaingroupApi + 'ex/v1/num1/',//任务分配 审核个数(实验室管理员接口21)
    //实验室管理员任务分配模块
    getItemsAllocation: winchaingroupApi + 'ex/v1/project1/',//项目未分配列表/已分配列表不加status/搜索 search (实验室管理员接口74)
    getTest_engineerList: winchaingroupApi + 'users/v1/user1/?role=5',//试验工程师列表(实验室管理员接口75)
    getTest_project1: winchaingroupApi + 'ex/v1/project1/',//项目试验工程师分配(实验室管理员接口76)
    getTest_projectDetail: winchaingroupApi + 'ex/v1/project1/',// 项目简介(实验室管理员接口77)
    getTest_experiment: winchaingroupApi + 'ex/v1/experiment1/?experiment_project=',//项目试验列表 (实验室管理员接口78)
    getTest_material_userList: winchaingroupApi + 'users/v1/user1/?role=8',//物料工程师列表(实验室管理员接口79)
    setTest_experiment: winchaingroupApi + 'ex/v1/experiment1/',//分配(实验室管理员接口80)
    getTest_experimentDetail: winchaingroupApi + 'ex/v1/experiment1/',//试验分配详情(实验室管理员接口83)
    closeTest_experiment: winchaingroupApi + 'ex/v1/experiment1/',//关闭项目(实验室管理员接口82)
    /**----------------实验室管理员管理事项模块------------------- */
    //人员管理
    getpersonnelManagementList: winchaingroupApi + 'users/v1/user/',//人员列表 (实验室管理员接口12)
    getpersonnelManagementDetail: winchaingroupApi + 'users/v1/user/',//人员详情(实验室管理员接口14)
    editPersonnelManagement: winchaingroupApi + 'users/v1/user/',//人员修改(实验室管理员接口15)
    deletePersonnelManagement: winchaingroupApi + 'users/v1/user/',//人员删除(实验室管理员接口16)
    getCompanyList: winchaingroupApi + 'users/v1/clab/',//创建人员 公司列表（实验室管理员首页接口94）
    getDepartmentList: winchaingroupApi + 'users/v1/cdepartment/?lab=',//创建人员 部门列表（实验室管理员首页接口95）
    createdCompant: winchaingroupApi + 'users/v1/user/',//人员创建 (实验室管理员接口13)
    //公司
    getcompany_labList: winchaingroupApi + 'users/v1/lab/',//公司列表(实验室管理员接口2)
    createdCompany_lab: winchaingroupApi + 'users/v1/lab/',//公司创建 (实验室管理员接口3)
    getcompany_labDetail: winchaingroupApi + 'users/v1/lab/',//公司详情(实验室管理员接口4)
    editCompany_lab: winchaingroupApi + 'users/v1/lab/',//公司修改(实验室管理员接口5)
    deleteCompany_lab: winchaingroupApi + 'users/v1/lab/',//公司删除(实验室管理员接口6)
    //部门
    department_info: winchaingroupApi + 'users/v1/department/',//公司部门(实验室管理员接口7,8,9,10)
    //设备管理
    getequipmentManagementList: winchaingroupApi + 'eq/v1/equipment1',//设备管理(实验室管理员33)
    getunEquipmentList: winchaingroupApi + 'eq/v1/equipment_apply?status=5',//设备申请未录入列表(实验室管理员接口28)
    getmeasurementEnginerrList: winchaingroupApi + 'users/v1/user1/?role=6',//计量工程师(实验室管理员接口31)
    createdEquipment: winchaingroupApi + 'eq/v1/equipment1/',// 新增设备 (实验室管理员接口32)
    SendbackEquipment: winchaingroupApi + 'eq/v1/equipment_apply/',//设备申请未录入 退回 (实验室管理员接口100)
    getEquipmentDetail: winchaingroupApi + 'eq/v1/equipment1/',//设备详情(实验室管理员接口34)
    editEquipmentInfo: winchaingroupApi + 'eq/v1/equipment1/',//设备信息修改 (实验室管理员接口35)
    deleteEquipment: winchaingroupApi + 'eq/v1/equipment1/',//设备删除(实验室管理员接口98)
    getEquipmentFlow: winchaingroupApi + 'eq/v1/equipmenthistory1/',//设备流程显示  (实验室管理员接口99)
    getEquipmentpurchaseInfo: winchaingroupApi + 'eq/v1/equipmentapplication1/',//设备采购信息(实验室管理员接口36)
    getmaintenanceRecordList: winchaingroupApi + 'eq/v1/maintainrecord1/?equipment=',//维修记录列表(实验室管理员接口101)
    getmaintenanceRecordDetailInfo: winchaingroupApi + 'eq/v1/maintainrecord1/',//维修记录详情  (实验室管理员接口104)
    getupkeepRecordList: winchaingroupApi + 'eq/v1/upkeeprecord1/?equipment=',//保养记录列表(实验室管理员接口102)
    getupkeeprecordInfo: winchaingroupApi + 'eq/v1/upkeeprecord1/',//保养记录详情 (实验室管理员接口105)
    getmeasureRecordList: winchaingroupApi + 'eq/v1/meterecord/?equipment=',//计量记录列表 (实验室管理员接口103)
    getmeasureRecordInfo: winchaingroupApi + 'eq/v1/meterecord/',//计量记录详情 (实验室管理员接口106)
    getmeasure_projectallot: winchaingroupApi + 'ex/v1/projectallot/',// 项目已分配列表 (实验室管理员接口107)
    getmeauserFlowFrockDetail: winchaingroupApi + 'eq/v1/flow1/',//申请工装原因 (实验室管理员接口108)
    getmeasure_finishproject: winchaingroupApi + 'ex/v1/finishproject1/',//历史项目详情(实验室管理员接口112)
    //物料管理
    getmaterialList: winchaingroupApi +  'eq/v1/materiel1/',//物料管理列表(实验室管理员接口87)
    //实验标准
    gettestManagementList: winchaingroupApi +'sys/v1/standard/',// 试验标准列表   管理事项 (实验室管理员接口68)
    deletegettestManagement: winchaingroupApi + 'sys/v1/standard/',//试验标准删除(实验室管理员接口70)
    createdtestStandard: winchaingroupApi + 'sys/v1/standard/',//试验标准创建(实验室管理员接口69)
    //试验方法
    gettestMethodsList: winchaingroupApi + 'sys/v1/testwaymanage/',//试验方法列表  管理事项(实验室管理员接口66)
    deletetestMethods: winchaingroupApi + 'sys/v1/testwaymanage/',// 试验方法删除  管理事项 (实验室管理员接口67)
    //历史项目
    gethistoryProjectList: winchaingroupApi + 'ex/v1/finishproject1/',//历史项目列表(实验室管理员接口88)
    //工装管理
    getNoentryFrockList: winchaingroupApi + 'eq/v1/infrockapply1/',//工装申请未录入列表 (实验室管理员接口43)
    createdFrock: winchaingroupApi + 'eq/v1/infrockapply1/',// 新增工装 (实验室管理员接口44)
    getfrockManageList: winchaingroupApi + 'eq/v1/frock1/',//工装列表 (实验室管理员接口45)
    getFrockDetailInfo: winchaingroupApi + 'eq/v1/frock1/',//工装详情(实验室管理员接口46)
    editFrock: winchaingroupApi + 'eq/v1/frock1/',//工装修改 (实验室管理员接口47)
    deletefrock: winchaingroupApi +  'eq/v1/frock1/',// 工装删除 (实验室管理员接口48)
    getFrockApplyDetailInfo: winchaingroupApi + 'eq/v1/flow1/?apply=',//工装申请详情(实验室管理员接口49)
    getEquipmentfilelist: winchaingroupApi+ 'eq/v1/equipmentfile/',//设备文档(实验室管理员接口50)
    /**----------------信息发布------------------- */
    createdAnnouncement: winchaingroupApi + 'sys/v1/sysmsg/',//实验室公告栏创建(实验室管理员接口55)
    getannouncementList: winchaingroupApi  + 'sys/v1/sysmsg/',//实验室公告栏列表 (实验室管理员接口56)
    deleteAnnouncement: winchaingroupApi + 'sys/v1/sysmsg/',//实验室公告栏删除(实验室管理员接口58)
    //实验室能力介绍
    createdAbilityintroduce: winchaingroupApi + 'sys/v1/sysintroduce/',//实验室能力介绍创建 (实验室管理员接口54)
    //实验室设备图片
    getequipmentImgList: winchaingroupApi + 'sys/v1/introduce/',//实验室设备图列表(实验室管理员接口60)
    createdEquipmentImg: winchaingroupApi + 'sys/v1/introduce/',//实验室设备图创建(实验室管理员接口59)
    deleteEquipmentImg: winchaingroupApi + 'sys/v1/introduce/',//实验室设备图删除(实验室管理员接口62)
    editEquipmentImgInfo: winchaingroupApi + 'sys/v1/introduce/',//实验室设备图修改(实验室管理员接口61)
    /**-----------------任务审核--------------------- */
    //报告
    getReportList: winchaingroupApi + 'ex/v1/projectreport/',//项目报告未审核列表 (实验室管理员接口84)
    getReoprtDetail: winchaingroupApi + 'ex/v1/projectreport/',//项目报告详情(实验室管理员接口85)
    editReportInfo: winchaingroupApi + 'ex/v1/projectreport/',//项目报告审核(实验室管理员接口86)
    //计量
    getMeasureList: winchaingroupApi + 'eq/v1/metering1/',//计量申请列表 (实验室管理员接口89)
    appltMeasure: winchaingroupApi + 'eq/v1/metering1/',//计量申请详情 (实验室管理员接口90)
    editMeasure: winchaingroupApi + 'eq/v1/metering1/',//计量申请审核(实验室管理员接口91)
    getUpdataMeasureeFileDetail: winchaingroupApi + 'eq/v1/metering1/',//计量申请上传合同详情 (实验室管理员接口92)
    updataMeasureFile: winchaingroupApi + 'eq/v1/metering1/',// 计量申请上传合同上传(实验室管理员接口93)
    //物料
    getMaterialList: winchaingroupApi + 'eq/v1/material_application1/',//物料申请列表(实验室管理员接口51 )
    getMaterialDetail: winchaingroupApi + 'eq/v1/material_application1/',//物料申请详情 (实验室管理员接口52)
    applyMateraDetail: winchaingroupApi + 'eq/v1/material_application1/',//物料申请审核(实验室管理员接口53)
    //设备
    getApplyEquipmentList: winchaingroupApi + 'eq/v1/application1/',//设备申请列表(实验室管理员接口22)
    getApplyEquipmentDetail: winchaingroupApi + 'eq/v1/application1/',//设备申请详情(实验室管理员接口23)
    editApplyEquipment: winchaingroupApi + 'eq/v1/application1/',//设备申请审批(实验室管理员接口24)
    updataApplyEquipmentFile: winchaingroupApi + 'eq/v1/application1/',//设备申请合同上传  (实验室管理员接口25)
    //值班
    getApplyWatchList: winchaingroupApi + 'sys/v1/onduty1/',//值班申请列表 (实验室管理员接口71)
    getApplyWatchDetail: winchaingroupApi + 'sys/v1/onduty1/',//值班申请详情(实验室管理员接口72)
    editApplyWatchDetail: winchaingroupApi + 'sys/v1/onduty1/',//值班申请审核 (实验室管理员接口73)
    //试验方法
    getUnTestMethods: winchaingroupApi + 'sys/v1/testway1/',//试验方法待审核列表(实验室管理员接口63)
    getUnTestMethodsDetail: winchaingroupApi + 'sys/v1/testway1/',//试验方法详情 (实验室管理员接口64)
    editUnTestMethodsDetail: winchaingroupApi + 'sys/v1/testway1/',//试验方法审核(实验室管理员接口65)
    //工装申请
    getApplyFrockList: winchaingroupApi + 'eq/v1/frockapply1/',//工装申请列表 (实验室管理员接口39)
    getApplyFrockDetail: winchaingroupApi + 'eq/v1/frockapply1/',//工装申请详情(实验室管理员接口40)
    editApplyFrockDetail: winchaingroupApi + 'eq/v1/frockapply1/',//工装申请详情(实验室管理员接口41)
    updataApplyFrockFile: winchaingroupApi + 'eq/v1/frockapply1/',//工装申请合同上传(实验室管理员接口42)
    //基础设施
    getinfrastructureList: winchaingroupApi + 'eq/v1/servicerecord1/',//所有基础设置保修记录(实验室管理员接口37)
    getinfrastructureDetail: winchaingroupApi +'eq/v1/servicerecord1/',// 基础设置保修详情(实验室管理员接口38)
    /**@name物料管理员 */
    //首页
    statisticsNumber: winchaingroupApi + 'ex/v1/top8/',//顶部数字统计 (物料管理员接口825)
    //物料管理
    creactdMaterria: winchaingroupApi + 'eq/v1/materiel/',//新增物料创建 (物料管理员接口804)
    getMateriaManaeList: winchaingroupApi +'eq/v1/materiel/',// 物料管理列表 (物料管理员接口805)
    getApplyMateriaDetail: winchaingroupApi + 'eq/v1/materiela/',// 物料详情 申请物料  (物料管理员接口806)
    createdApplyMateria: winchaingroupApi + 'eq/v1/material_application/',//申请物料创建(物料管理员接口807)
    getMateriaDetail:  winchaingroupApi + 'eq/v1/materiel/',// 物料详情 申请物料  (物料管理员接口808)
    editMateriaInfo: winchaingroupApi + 'eq/v1/materiel/',//物料修改(物料管理员接口823)
    //物料分配
    getmaterialTestList: winchaingroupApi + 'ex/v1/testallot/',//试验物料试验列表 (物料管理员接口811)
    getTestMaterialList: winchaingroupApi + 'ex/v1/testallot/',//试验物料物料列表 (物料管理员接口812)
    setTestMaterial: winchaingroupApi + 'ex/v1/testallot/',//试验物料出借(物料管理员接口813)
    getmaterialMaintainList: winchaingroupApi + 'eq/v1/maintainallot/',// 维修物料维修列表 (物料管理员接口814)
    getEquipmentMaterialList: winchaingroupApi + 'eq/v1/maintainallot/',//维修物料物料列表(物料管理员接口815)
    setEquipmentMaterial: winchaingroupApi + 'eq/v1/maintainallot/',// 维修物料出借(物料管理员接口816)
    //物料归还
    getruturnMaterialList: winchaingroupApi + 'ex/v1/testback/',//试验物料归还列表 (物料管理员接口817)
    getreturnTestMaterialList: winchaingroupApi + 'ex/v1/testback/',//归还试验物料物料列表 (物料管理员接口818)
    setreturbTestMaterial: winchaingroupApi + 'ex/v1/testback/',// 试验物料归还 (物料管理员接口819)
    getMaintainMaterialList: winchaingroupApi + 'eq/v1/maintainback/',//归还维修物料维修列表(物料管理员接口820)
    getEquipmentMaintainMaterialList: winchaingroupApi + 'eq/v1/maintainback/',// 归还 维修物料物料列表(物料管理员接口821)
    setEquipmentMaintainMaterialList: winchaingroupApi + 'eq/v1/maintainback/',//维修物料归还(物料管理员接口822)
    //物料入库
    getMaterial_application: winchaingroupApi + 'eq/v1/material_application/',// 物料申请列表(物料管理员接口809)
    applyMaterial_application: winchaingroupApi + 'eq/v1/material_application/',//物料申请通过入库  (物料管理员接口810)
    getEquipmentMateriaDetail: winchaingroupApi + 'eq/v1/material_application/',// 申请物料详情 
    //样件确认
    getVerifyList: winchaingroupApi + 'ex/v1/verify/',//项目样件确认列表(物料管理员接口801)
    getVerifyDetail: winchaingroupApi + 'ex/v1/verify/',// 项目样件详情(物料管理员接口802)
    editVerifyInfo: winchaingroupApi + 'ex/v1/verify/',//项目样件确认(物料管理员接口823)
    /**@name设备工程师 */
    //首页
    getEquipmentIndexNumber: winchaingroupApi + 'ex/v1/top7/',//顶部数字统计(设备工程师接口749)
    /**----故障------ */
    getEquipment_maintain: winchaingroupApi + 'eq/v1/maintain/',//设备维修列表 (设备工程师接口719)
    getEquipment_maintainDetail: winchaingroupApi + 'eq/v1/maintain/',//设备修改详情(设备工程师接口720)
    getEquipment_Service: winchaingroupApi + 'eq/v1/service/?service=',//设备维修物料列表(设备工程师接口721)
    deleteEquipment_Service: winchaingroupApi + 'eq/v1/service/',//设备维修物料删除 (设备工程师接口724)
    createdEquipment_material: winchaingroupApi + 'eq/v1/service/',// 设备维修物料添加  (设备工程师接口722)
    getEquipment_materialDetail: winchaingroupApi + 'eq/v1/service/',//设备维修物料详情(设备工程师接口741)
    editEquipment_material: winchaingroupApi + 'eq/v1/service/',//设备维修物料修改 (设备工程师接口723)
    uploadEquipment_material: winchaingroupApi + 'eq/v1/serviceup/',//设备维修物料提交  (设备工程师接口744)
    updataProject_file: winchaingroupApi + 'eq/v1/maintain/',//维修报告上传  (设备工程师接口725)
    //保养
    getEquipment_upkeepList: winchaingroupApi + 'eq/v1/upkeep/',//设备保养列表(设备工程师接口742)
    getEquipment_upkeepDetail: winchaingroupApi + 'eq/v1/upkeep/',//设备保养详情 (设备工程师接口743)
    editEquipment_upkeepDetail: winchaingroupApi + 'eq/v1/upkeep/',//设备保养时间设置(设备工程师接口727)
    getEquipment_upkeepserviceList: winchaingroupApi +  'eq/v1/upkeepservice/?service=',//  设备保养物料列表(设备工程师接口745)
    deleteEquipmentUpkeep: winchaingroupApi + 'eq/v1/upkeepservice/',//设备保养物料删除(设备工程师接口731)
    createdEquipment_upkeep: winchaingroupApi + 'eq/v1/upkeepservice/',//设备保养物料添加(设备工程师接口728)
    editEquipment_upkeep: winchaingroupApi + 'eq/v1/upkeepservice/',//设备保养物料修改(设备工程师接口730)
    getEquipment_upkeepDetailInfo: winchaingroupApi + 'eq/v1/upkeepservice/',//物料申请详情(设备工程师接口746)
    updataProject_upkeepFile: winchaingroupApi + 'eq/v1/upkeepserviceup/',// 设备保养物料提交(设备工程师接口729)
    updataUpkeep_report: winchaingroupApi + 'eq/v1/upkeep/',//  设备保养报告提交 (设备工程师接口732)
    //负责设备数
    getPrincipal_EquipmentList: winchaingroupApi + 'eq/v1/manage/',//负责设备列表 (设备工程师接口711)
    getEquipment_lookreport: winchaingroupApi + 'eq/v1/manage/',//设备查看(设备工程师接口733)
    getEquipment_upkeeprecord: winchaingroupApi + 'eq/v1/upkeeprecord/?equipment=',//设备保养记录(设备工程师接口734)
    getEquipment_maintainrecordList: winchaingroupApi + 'eq/v1/maintainrecord/?equipment=',//设备维修记录(设备工程师接口735)
    getMyequipment_applyNumber: winchaingroupApi + 'eq/v1/application/',//我的设备申请列表(设备工程师接口701)
    getMyequipment_applyNumberDetail: winchaingroupApi + 'eq/v1/application/',//设备申请详情 (设备工程师接口702)
    /*--2019-07-20--*/
    createdEquipment_applycation: winchaingroupApi + 'eq/v1/application/', //申请设备创建 (设备工程师接口700)
    updataEquipment_applyTime: winchaingroupApi + 'eq/v1/application/',//  申请设备 下次保养时间 (设备工程师接口704)
    updataEquipment_applyReport: winchaingroupApi + 'eq/v1/application/',//申请设备上传调试报告 (设备工程师接口703)
    //工装治具
    getMyequipment_frockList: winchaingroupApi + 'eq/v1/frock/',//我的工装(设备工程师接口714)
    getApplyequipment_frockList: winchaingroupApi + 'eq/v1/frockapply/',//我的工装申请列表(设备工程师接口715)
    getApplyequipment_frockDetail: winchaingroupApi + 'eq/v1/frockapply/',//工装申请详情 (设备工程师接口717)
    createdApply_frock: winchaingroupApi + 'eq/v1/frockapply/',//工装申请创建  (设备工程师接口716)
    updataApply_frockReport: winchaingroupApi +  'eq/v1/frockapply/',//工装申请详上传调试报告(设备工程师接口718)
    //设备人员安全指导书
    getEquipmentPerson_applyList: winchaingroupApi + 'eq/v1/safety/',//设备人员安全指导书列表 (设备工程师接口705)
    getEquipment_nosafetyList: winchaingroupApi +  'eq/v1/nosafety/',//设备人员安全指导书未上传列表 (设备工程师接口707)
    createdEquipment_safetyInfo: winchaingroupApi +  'eq/v1/safety/',//设备人员安全指导书上传  (设备工程师接口708)
    getPersonEquipment_safetyDetail: winchaingroupApi + 'eq/v1/safety/',//设备人员安全指导书詳情 (设备工程师接口739)
    editEquipment_safetyInfo: winchaingroupApi + 'eq/v1/safety/',//设备人员安全指导书修改(设备工程师接口740)
    //设备操作指导书
    getEquipmentOperation_applyList: winchaingroupApi + 'eq/v1/operation/',//设备操作指导书 列表(设备工程师接口706)
    getEquipment_nooperationist: winchaingroupApi + 'eq/v1/nooperation/',//设备列表 设备操作指导书创建使用(设备工程师接口709) 
    createdEquipmentOperation: winchaingroupApi + 'eq/v1/operation/',//设备操作指导书上传(设备工程师接口710) 
    getOperationEquipment_safetyDetail: winchaingroupApi + 'eq/v1/operation/',//设备操作指导书详情(设备工程师接口737) 
    editEquipment_operationInfo: winchaingroupApi + 'eq/v1/operation/',//设备操作指导书修改(设备工程师接口738)
    //基础设施管理
    getEquipment_servicerecord: winchaingroupApi + 'eq/v1/servicerecord/',//我的基础设置保修记录 (设备工程师接口712)
    createdEquipment_servicerecord: winchaingroupApi + 'eq/v1/servicerecord/',//基础设置保修创建 (设备工程师接口713)
    /**@name ----试验工程师------ */
    /*--2019-09-23--*/
    //首页
    statisticsTestengineerNumber: winchaingroupApi + 'ex/v1/top5/',// 顶部数字统计 (试验工程师接口540)
    //已完成
    //试验
    getEquipment_finishexperiment: winchaingroupApi + 'ex/v1/finishexperiment/',//已完成试验列表 (试验工程师接口510)
    getEquipment_finishexperimentDetail: winchaingroupApi + 'ex/v1/finishexperiment/',//已完成试验流程  (试验工程师接口527)
    getEquipemnt_experimentList: winchaingroupApi + 'ex/v1/exbom/?experiment=',//试验物料列表 (试验工程师接口516)
    createdEquipment_exbomInfo: winchaingroupApi + 'ex/v1/exbom/',//试验物料添加 (试验工程师接口518)
    deleteEquipment_exbomInfo: winchaingroupApi + 'ex/v1/exbom/',// 试验物料删除(试验工程师接口520)
    getEquipment_exbomInfo: winchaingroupApi + 'ex/v1/exbom/', //试验物料详情 (试验工程师接口519)
    editEquipment_exbomInfo: winchaingroupApi + 'ex/v1/exbom/',//试验物料修改(试验工程师接口521)
    getEquipment_exeqrequired: winchaingroupApi + 'ex/v1/exeqrequired/?experiment=',//试验设备清单 (试验工程师接口522)
    /*--2019-09-24--*/
    getEqupment_exeqrequiredDetail: winchaingroupApi + 'ex/v1/exeqrequired/',//试验方法 (试验工程师接口523)
    editEquipment_exbomInfoDetail: winchaingroupApi + 'ex/v1/exeqrequired/',//试验方法修改(试验工程师接口524)
    getExperimental_result: winchaingroupApi + 'ex/v1/exresult/',//实验结果(试验工程师接口533)
    createdExperimental_result: winchaingroupApi + 'ex/v1/exresult/',//实验结果提交(试验工程师接口537)
    //项目
    getProject_finishprojectList: winchaingroupApi + 'ex/v1/finishproject/',//已完成项目列表(试验工程师接口511)
    getProject_finishprojectDetailList: winchaingroupApi+ '-ex/v1/finishproject/',//项目试验列表 (试验工程师接口513)
    //未完成
    //试验
    getExperimental_myexperimentList: winchaingroupApi + 'ex/v1/myexperiment/',//试验列表 (试验工程师接口514)
    getExperimental_exeqList: winchaingroupApi + 'ex/v1/exeq/?experiment=',//维修设备列表(试验工程师接口531)
    createdEquipment_exeq: winchaingroupApi + 'ex/v1/exeq/',//设备维修创建 (试验工程师接口532)
    getEquipment_myexperiment: winchaingroupApi + 'ex/v1/myexperiment/',//试验流程 (试验工程师接口512)
    //项目
    getEquipment_myprojectList: winchaingroupApi + 'ex/v1/myproject/',// 项目列表(试验工程师接口515)
    getEquipment_myTextprojectList: winchaingroupApi + 'ex/v1/myproject/',//项目验列表(试验工程师接口529)
    updataProject_myTestFile: winchaingroupApi + 'ex/v1/myproject/',//项目文件上传(试验工程师接口530)
    /*--2019-9-25--*/
    setEquipment_testers: winchaingroupApi +'ex/v1/exbomup/',//试验物料提交(534)
    getEquipment_testersDetail: winchaingroupApi + 'ex/v1/testers/',//试验实验员 (试验工程师接口535)
    getTestuserList: winchaingroupApi+ 'users/v1/testuser/',// 试验员列表 (试验工程师接口526)
    createdTestuserInfo: winchaingroupApi + 'ex/v1/testers/',//试验员安排 (试验工程师接口525)
    deleteTesteres: winchaingroupApi + 'ex/v1/testers/',//试验实验员删除 (试验工程师接口536)
    //培养人员管理
    getCultivateList: winchaingroupApi + 'ex/v1/cultivate/',//培养人员(试验工程师接口538)
    getcultivateDetailList: winchaingroupApi + 'ex/v1/cultivate/',//合作试验(试验工程师接口539)
    //值班管理
    getApplywatch_ondutyList:  winchaingroupApi + 'sys/v1/onduty/',//值班申请列表 (试验工程师接口508)
    createdApplywatch_onduty: winchaingroupApi + 'sys/v1/onduty/',//值班申请创建(试验工程师接口509)
    getApplywatch_ondutyDetail: winchaingroupApi +  'sys/v1/onduty/',//值班申请详情
    //试验方法
    getTest_testwayList: winchaingroupApi + 'sys/v1/testway/',// 试验方法列表(试验工程师接口505)
    creatTest_testway: winchaingroupApi+ 'sys/v1/testway/',//试验方法创建(试验工程师接口504)
    getTest_testwayDetail: winchaingroupApi + 'sys/v1/testway/',//试验方法详情(试验工程师接口506)
    editTest_testway: winchaingroupApi+ 'sys/v1/testway/',//试验方法创建(试验工程师接口507)
    //警报
    getalarmList: winchaingroupApi + 'eq/v1/alarm/',//新增报警列表 (试验工程师接口503)
    getsearcheq_seqarch: winchaingroupApi + 'eq/v1/searcheq/?search=',//新增报警设备搜索 (试验工程师接口501)
    createdequipment_alarm: winchaingroupApi + 'eq/v1/alarm/',//新增报警创建(试验工程师接口502)
    /**@naem设备计量员 */
    //首页
    statisGaugerNumber: winchaingroupApi + 'ex/v1/top6/',//顶部数量 (设备计量员601)
    //已过计量期设备数
    getGauger_outmeteringList: winchaingroupApi + 'eq/v1/outmetering/',//计量超时列表 (设备计量员612)
    getGauger_meqList: winchaingroupApi + 'eq/v1/meq/',//负责设备列表(设备计量员602)
    getGauger_meteringhistoryList: winchaingroupApi + 'eq/v1/meteringhistory/?equipment=',//设备计量列表 (设备计量员603)
    /**--2019-9-26--*/
    getGauger_meteringList: winchaingroupApi + 'eq/v1/metering/',//30天设备计量列表 (设备计量员605)
    getGauger_meteringFlow: winchaingroupApi + 'eq/v1/metering/',//设备计量详情  (设备计量员606)
    getGuager_meteringplanList: winchaingroupApi + 'eq/v1/meteringplan/',//计量进度列表(设备计量员613)
    getGuager_meteringDetail: winchaingroupApi + 'eq/v1/metering/',//申请设备计量详情(设备计量员607)
    createdGuager_metering: winchaingroupApi + 'eq/v1/metering/',//申请设备计量申请 (设备计量员608)
    /**@name 产品经理 */
    getUser_infoDetail: winchaingroupApi + 'users/v1/info/1/',//个人信息 (产品经理203)
    editUser_infoDetail: winchaingroupApi + 'users/v1/info/1/',//修改个人信息 (产品经理202)
    /**--2019-09-27--*/
    created_produce: winchaingroupApi + 'ex/v1/produce/',//创建产品(产品经理201)
    getPm_noticeList: winchaingroupApi + 'ex/v1/notice/',//公告栏 (产品经理223)
    getPm_project_myproductList: winchaingroupApi + 'ex/v1/myproduct/',//负责产品(产品经理224)
    updataPm_project_myproductList: winchaingroupApi + 'ex/v1/myproduct/',//产品是否显示(产品经理225)
    getPm_delayedList: winchaingroupApi + 'ex/v1/delayed/',//延时报警 (产品经理222)
    getPm_projectList: winchaingroupApi + 'ex/v1/produce/',//产品列表 (产品经理207)
    getPm_projectpctFlow: winchaingroupApi + 'ex/v1/projectpct/?product=',//产品项目进度 (产品经理219)
    getPm_experiment_project: winchaingroupApi + 'ex/v1/expct/?experiment_project=',//项目试验进度(产品经理220)
    getPm_priject_schedule: winchaingroupApi + 'ex/v1/pruductpct/',//产品进度(产品经理221)
    getPm_project_setting_flow: winchaingroupApi + 'ex/v1/flow/?product=',//产品配置列表 (产品经理208)
    editPm_project_setting_flow: winchaingroupApi + 'ex/v1/flow/',//产品配置修改(产品经理210)
    createdPm_project_setting_flow: winchaingroupApi + 'ex/v1/flow/',// 产品配置创建(产品经理209)
    deletePm_project_setting_flow: winchaingroupApi + 'ex/v1/flow/',//产品配置删除(产品经理211)
    getPm_project_exfailList: winchaingroupApi + 'ex/v1/exfail/',//试验不合格列表 (产品经理212)
    getPm_project_exfailDetail: winchaingroupApi + 'ex/v1/exfail/',//试验详情 (产品经理213)
    setDataPm_exfailDetail: winchaingroupApi + 'ex/v1/exfail/',//发送信息(产品经理214)
    getPm_expendList: winchaingroupApi + 'ex/v1/expend/',//产品支出(产品经理215)
    getPm_expendProject_list: winchaingroupApi + 'ex/v1/expend/',// 项目支出(产品经理216)
    getPm_project_exexpend: winchaingroupApi + 'ex/v1/exexpend/?experiment_project=',//试验支出(产品经理217)
    getPm_project_exexpendDetail: winchaingroupApi + 'ex/v1/exexpend/',// 试验详情 (产品经理218)
    getPm_project_productFlow: winchaingroupApi + 'ex/v1/order/?product=',//产品流程 展示(产品经理206)
    getPm_project_orderList: winchaingroupApi + 'ex/v1/order/',//产品流程 修改(产品经理205)
    editPm_project_orderDetail: winchaingroupApi + 'ex/v1/order/',//修改流程 (产品经理204)
    /**@name项目经理 */
    getProject_topNumber: winchaingroupApi + 'ex/v1/top4/',//顶部统计(项目经理424)
    getProject_test_standard: winchaingroupApi + 'sys/v1/standard4',//试验标准列表(项目经理423)
    getProject_Project_appointment: winchaingroupApi + 'ex/v1/project/',// 项目列表(项目经理403)
    deleteProject_Project_appointment: winchaingroupApi + 'ex/v1/project/',//项目删除 (项目经理411)
    getProject_appointinfoFlow: winchaingroupApi + 'ex/v1/appointinfo/',//项目预约 (项目经理404)
    getProject_experiment: winchaingroupApi + 'ex/v1/experiment/?experiment_project=',//项目试验列表 (项目经理405)
    deleteProject_experiment: winchaingroupApi + 'ex/v1/experiment/',//项目试验删除(项目经理412)
    createdProject_experiment: winchaingroupApi + 'ex/v1/experiment/',//项目试验创建(项目经理406)
    getProjeect_eqsearchList: winchaingroupApi + 'eq/v1/eqsearch/',//项目试验创建 实验实设备搜索 (项目经理407)
    searchingProject_eqsearch: winchaingroupApi + 'eq/v1/eqsearch/',//  确认设备 (项目经理408)
    getProject_eqsearchDetail: winchaingroupApi + 'ex/v1/experiment/',//项目试验详情 (项目经理409)
    editProject_experiment: winchaingroupApi + 'ex/v1/experiment/',//项目试验编辑 (项目经理410)
    getProject_appointList: winchaingroupApi + 'ex/v1/appoint/?experiment_project=',//项目试验预约列表 (项目经理413)
    setProject_appointDetail: winchaingroupApi + 'ex/v1/appoint/',//项目试验预约(项目经理421)
    getProject_appointDetail: winchaingroupApi + 'ex/v1/appoint/',//项目试验预约详情(项目经理414)
    getProject_experiment_project: winchaingroupApi + 'ex/v1/plan/?experiment_project=',//项目试验进度列表(项目经理415)
    getProject_projectPaperList: winchaingroupApi + 'ex/v1/report/?experiment_project=',// 项目试验报告列表 (项目经理416)
    getProject_reportDetail: winchaingroupApi + 'ex/v1/report/',//项目试验结果 (项目经理425)
    sentProject_report: winchaingroupApi + 'ex/v1/report/',// 经理回应(项目经理426)
    getProject_projectDetail: winchaingroupApi + 'ex/v1/project/',// 项目详情(项目经理418)
    getProject_produceList: winchaingroupApi + 'ex/v1/produce4/',//产品列表(项目经理422)
    getProject_users: winchaingroupApi + 'users/v1/info/',//用户公司部门 (项目经理401)
    createdProject_prodect: winchaingroupApi + 'ex/v1/project/',//创建项目 (项目经理402)
    editProject_prodect: winchaingroupApi + 'ex/v1/project/',//修改项目  (项目经理417)
    getProject_history_finishproject: winchaingroupApi + 'ex/v1/finishproject4/?project_type=',//项目历史列表 (项目经理419)
    getProject_history_finishproject_Detail: winchaingroupApi + 'ex/v1/finishproject4/',//项目试验详情(项目经理420)
    /**@name实验室经理 */
    getLaboratory_drawLine: winchaingroupApi + 'eq/v1/stat/',//工时统计(项目经理304)
    getLaboratory_topNumber: winchaingroupApi + 'ex/v1/top/',//百分比 (项目经理317)
    getLaboratory_alarm: winchaingroupApi + 'eq/v1/alarm3/',//异常事件 (项目经理313)
    getLaboratory_project: winchaingroupApi + 'ex/v1/project3/?status=',//负责项目  (项目经理301)
    getLaboratory_user: winchaingroupApi + 'users/v1/user3',//活跃人员(项目经理306)
    getLaboratory_eq: winchaingroupApi + 'eq/v1/eq3/',//设备档案 (项目经理307)
    getLaboratory_standard: winchaingroupApi + 'sys/v1/standard3/',//试验标准 (项目经理309)
    getLaboratory_finishproject3: winchaingroupApi + 'ex/v1/finishproject3/',//试验项目(项目经理311)
    getLaboratory_finishproject3Detail: winchaingroupApi + 'ex/v1/finishproject3/',//试验项目报告(项目经理312)
    getLaboratory_AlarmLog: winchaingroupApi + 'eq/v1/alert/?date=',//报警日志(项目经理310)
    getLaboratory_operatinRatio: winchaingroupApi + 'eq/v1/eqpct/',//设备运行率(项目经理315)
    getLaboratory_warehousepct: winchaingroupApi + 'eq/v1/warehousepct/',//物料安全库存量(项目经理314)
    /**@naem通知 */
    getSystem_msg: winchaingroupApi + 'sys/v1/msg/',//通知(109)
    setSystem_msg: winchaingroupApi + 'sys/v1/msg/',// 通知修改 (110)
    deleteSystem_msg: winchaingroupApi + 'sys/v1/msg/',// 通知删除(111)
    getSystem_number: winchaingroupApi + 'sys/v1/msgnum/',//通知数量 (20)
}
