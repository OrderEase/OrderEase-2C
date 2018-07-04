<template>
  <div>
    <x-dialog v-model="bus.show" @on-show='changeBScroll' hide-on-blur>
      <div class="detail-wrapper">
        <div class="bg">
        </div>
        <div class="top-section">
          <div class="left-section">
            <img :src="bs.img">
          </div>
          <div class="right-section">
            <div class="bs-name">
              {{bs.name}}
            </div>
            <div class="bs-time">
              营业时间:{{bs.open}}-{{bs.close}}
            </div>
          </div>
        </div>
        <div class="bottom-section" ref="bottomWrapper">
          <div class="contents">
            <div class="activity-wrapper">
              <div class="activity-name">
                活动
              </div>
              <div class="activity-list">
                <div v-for="promotion in promotions" :key="promotion.id" class="activity-intro" :class="promotion.show === true ? '' : 'not-first'">
                  <div :class="promotion.show === true ? 'activity-type' : 'disappear'">
                    {{promotion.type}}
                  </div>
                  <div class="activity-details">
                    {{promotion.data}}
                  </div>
                </div>
              </div>
              <div class="divide-line">
              </div>
            </div>
            <div class="description-wrapper">
              <div class="description-name">
                公告
              </div>
              <div class="description">
                {{bs.description}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import { XDialog } from 'vux'
export default {
  components: {
    XDialog
  },
  props: {
    bus: {
      Object
    }
  },
  created () {
    console.log('create bs-detail show', this.bus.show)
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  computed: {
    ...mapState({
      bs: state => state.restaurant.restaurant,
      promotions: state => state.promotion.promotions
    })
  },
  methods: {
    changeBScroll () {
      if (this.bus.show) {
        this.$nextTick(() => {
          if (!this.bottomWrapper) {
            this._initScroll()
          } else {
            this.bottomWrapper.refresh()
            console.log('bottom wrapper', this.bottomWrapper)
          }
        })
      }
      return this.bus.show
    },
    _initScroll () {
      this.bottomWrapper = new BScroll(this.$refs.bottomWrapper, {
        scrollY: true,
        click: true
      })
      console.log('bottom wrapper', this.bottomWrapper)
    }
  }
}
</script>

<style lang="scss">
.detail-wrapper {
  display: flex;
  flex-direction: column;
  .bg {
    position: absolute;
    z-index: 0;
    background-color: rgba(97, 97, 97, 1);
    height: 80px;
    width: 100%;
    opacity: 0.44;
  }
  .top-section {
    // left: 40px;
    // top: 138px;
    background: url('../../../assets/bs.jpeg') no-repeat;
    width: 300px;
    height: 80px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    line-height: 20px;
    // opacity: 0.44;
    border-radius: 5px 5px 0px 0px;
    background-color: rgba(97, 97, 97, 1);
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    .left-section {
      position: relative;
      z-index: 1;
      margin-top: 10px;
      margin-left: 10px;      
      img {
        width: 60px;
        height: 60px;
        border-radius: 5px;
      }
    }
    .right-section {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      margin-left: 10px;
      .bs-name {
        // left: 120px;
        // top: 148px;
        width: 71px;
        height: 23px;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: left;
        font-family: Arial;
      }
      .bs-time {
        // left: 120px;
        // top: 173px;
        margin-top: 2px;
        width: 255px;
        height: 17px;
        line-height: 17px;
        color: rgba(227, 227, 227, 1);
        font-size: 12px;
        text-align: left;
        font-family: Arial;
      }
    }
  }
  .bottom-section {
    display: flex;
    flex-direction: column;
    height: 310px;
    overflow: hidden;
    .activity-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // overflow: hidden;
      .activity-name {
        // left: 59px;
        // top: 231px;
        margin-top: 13px;
        margin-bottom: 19px;
        margin-left: 19px;
        width: 46px;
        height: 21px;
        line-height: 20px;
        border-radius: 5px;
        background-color: rgba(83, 158, 249, 1);
        color: white;
        font-size: 14px;
        text-align: center;
        box-shadow: 0px 8px 16px 0px rgba(202, 225, 254, 1);
        font-family: Arial;
        border: 1px solid rgba(255, 255, 255, 0);
      }
      .not-first {
        margin-top: -4px;
      }
      .activity-intro {
        display: flex;
        flex-direction: row;
        // margin-top: 17px;
        // height: 30px;
        .activity-type {
          margin-left: 21px;
          width: 16px;
          height: 16px;
          line-height: 17px;
          border-radius: 2px;
          background-color: rgba(246, 249, 255, 1);
          color: rgba(83, 158, 249, 1);
          font-size: 12px;
          text-align: center;
          box-shadow: 0px 0px 0px 0px rgba(172, 90, 90, 1);
          font-family: Arial;
          border: 1px solid rgba(83, 158, 249, 1);
        }
        .disappear {
          margin-left: 21px;
          width: 16px;
          height: 16px;
          line-height: 17px;
          
          border-radius: 2px;
          background-color: rgba(246, 249, 255, 1);
          color: rgba(83, 158, 249, 1);
          font-size: 12px;
          text-align: center;
          box-shadow: 0px 0px 0px 0px rgba(172, 90, 90, 1);
          font-family: Arial;
          border: 1px solid rgba(83, 158, 249, 1);
          opacity: 0;
        }
        .activity-details {
          margin-left: 10px;
          // width: 100%;
          height: 23px;
          line-height: 23px;
          vertical-align: middle;
          color: rgba(87, 87, 87, 1);
          font-size: 12px;
          text-align: left;
          font-family: Arial;
        }
      }
      .divide-line {
        margin-top: 16px;
        margin-left: 19px;
        margin-right: 21px;
        height: 1px;
        background-color: #c0c0c0;
      }
    }
    .description-wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 19px;
      // height: 50%;
      .description-name {
        margin-left: 19px;
        width: 46px;
        height: 21px;
        line-height: 20px;
        border-radius: 5px;
        background-color: rgba(83, 158, 249, 1);
        color: white;
        font-size: 14px;
        text-align: center;
        box-shadow: 0px 8px 16px 0px rgba(202, 225, 254, 1);
        font-family: Arial;
        border: 1px solid rgba(255, 255, 255, 0);
      }
      .description {
        width: 248px;
        height: 51px;
        margin-left: 23px;
        margin-top: 16px;
        line-height: 17px;
        color: rgba(87, 87, 87, 1);
        font-size: 12px;
        text-align: left;
        font-family: Arial;
      }
    }
  }
}
</style>
