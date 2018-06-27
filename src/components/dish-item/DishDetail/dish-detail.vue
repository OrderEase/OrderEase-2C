<template>
  <div>
    <x-dialog class="dish-detail" v-model="dish.show" hide-on-blur>
      <div class="top-section">
        <img :src="dish.img" />
        <p>
          {{dish.description}}
        </p>
      </div>
      <div class="bottom-section">
        <div class="first-column">
          <div class="title">{{dish.name}}</div>
          <div class="likes">
            <img src="../../../assets/menu/good.png" />
            <span>{{dish.like}}</span>
          </div>
          <div class="price-wrapper">
            ￥<span class="price">{{dish.price}}</span>
          </div>
        </div>
        <div class="second-column">
          <button @click.stop.prevent='addOne' :class="dish.count > 0 ? 'disabled' : 'able'" :disabled="dish.count > 0">{{dish.count > 0 ? '已加入购物车' : '加入购物车'}}</button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {XDialog} from 'vux'
export default {
  components: {
    XDialog
  },
  props: {
    dish: {
      Object
    }
  },
  created () {
    console.log('dish-detail show', this.dish.show)
  },
  data () {
    return {
    }
  },
  methods: {
    addOne () {
      this.$store.commit('increaseCart', {
        dish: this.dish
      })
      this.dish.count = 1
    }
  }
}
</script>

<style lang="scss">
  .dish-detail {
    display: flex;
    flex-direction: column;
    .top-section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      img {
        width: 300px;
        height: 300px;
      }
      p {
        position: absolute;
        width: 280px;
        height: 50px;
        line-height: 17px;
        top: 240px;
        font-size: 12px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        text-overflow:ellipsis;
        overflow:hidden;
        color: white;
        background-color: rgba(29, 29, 29, 0.32);
        text-align: left;
      }
    }
    .bottom-section {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 90px;
      .first-column {
        flex-grow: 1;
        width: 100px;
        height: 100%;

        img {
          width: 12px;
          height: 12px;
        }
        .title {
          flex-grow: 1;
          font-size: 14px;
          margin-top: 5px;
          margin-left: 15px;
          width: 60%;
          text-align: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .likes {
          width: 50px;
          font-size: 12px;
          margin-left: 15px;
          text-align: left;
          color: rgba(116, 120, 129, 1);
        }
        .price-wrapper {
          color: rgba(116, 177, 249, 1);
          // width: 60px;
          margin-left: 12px;
          text-align: left;
          .price {
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
      .second-column {
        width: 110px;
        height: 75px;
        margin-bottom: 10px;
        display: flex;
        align-items: flex-end;
        button {
          width: 95px;
          height: 24px;
          border-radius: 15px;
          border-style: solid;
          border-width: 0px;
          font-size: 13px;
          color: white;
          background-color: rgba(83, 158, 249, 1);
        }
        .disabled {
          background-color: gray;
        }
      }
    }
  }
</style>



