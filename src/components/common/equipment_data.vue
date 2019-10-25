<template>
    <div class="equipment_data_list" @click="goDetailBat()">
      <h3>{{titleName}}</h3>
      <div class="efficient_data">
        <div class="circle">
          <img
            :style="{'transform': changeRotate}"
            src="../../assets/img/LabManager/index/pointer.png"
            alt
          />
        </div>
        <span>{{operatingNum}}</span>
      </div>
    </div>
</template>
<script>
export default {
    props:{
      titleName: String,
      operatingNum: String
    },
    data(){
        return{
            operating: 1 ,
        }
    },
    computed:{
        changeRotate(operating){
            if(this.operating == 0){
                return 'rotate(-140deg)'
            }else if(this.operating == 1 ){
                return 'rotate(38deg)'
            }else{
                return 'rotate('+ (1-this.operating-0.1 ) * -120 + 'deg)'
            }
        },
    },
    methods:{
      toPoint(){
          if(this.operatingNum){
             this.operating = this.operatingNum.replace("%", "")/100;
          }else{
             this.operating = 0
          }
        },
        goDetailBat(){
          this.$emit('goDetail')
        },
    },
    mounted(){
      this.toPoint();
    }
};
</script>
<style lang="scss" scoped>
.equipment_data {
  width: 45%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.36rem;
  .equipment_data_list {
    width: 50%;
    background: #fff;
    padding-top: 0.01rem;
    cursor: pointer;
    h3 {
      font-size: 0.24rem;
      color: #333333;
      line-height: 0.54rem;
    }
    .efficient_data {
      height: calc(100% - 0.55rem);
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .circle {
        width: 1.7rem;
        height: 1.49rem;
        display: flex;
        margin-right: 0.4rem;
        justify-content: center;
        align-items: flex-end;
        background: url("../../assets/img/LabManager/index/annulus.png") 0 0 / 100% 100%;
        img {
          transform: rotate(-134deg);
          margin-left: 0.57rem;
          transform-origin: 0 0.47rem;
          width: 0.57rem;
          height: 0.47rem;
        }
      }
      span {
        font-size: 0.27rem;
        color: #7e0dde;

        margin-right: 0.4rem;
        font-weight: 700;
      }
    }
    .text_number {
      margin-right: 0.4rem;
      span:first-child {
        font-family: MFShangHei;
        color: #7901dc;
        font-size: 1.29rem;
      }
      span:last-child {
        font-size: 0.4rem;
        color: #434343;
      }
    }
  }
}
</style>