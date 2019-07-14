<template>
  <div :class="[{flexStart: step === 1}, 'wrapper']">
    <transition name="slide">
      <img
        src="./assets/logo.png"
        width="40"
        class="logo"
        alt="logo"
        v-if="step === 1"
      />
    </transition>
    <transition name="fade">
      <HeroImage v-if="step === 0"/>
    </transition>
    <Claim v-if="step === 0"/>
    <SearchInput
      v-model="searchValue"
      :searchValue="searchValue"
      @input="handleInputChange"
      :dark="step === 1"
    />
    <div class="results" v-if="results && !loading && step === 1">
      <Item
        v-for="item in results" :key="item.data[0].nasa_id"
        :item="item"
        @click.native="handleModalOpen(item)"
      />
    </div>
    <Loader v-if="step === 1 && loading"/>
    <Modal
      v-if="modalOpen"
      @closeModal="modalOpen = false"
      :item="modalItem"
    />
  </div>
</template>

<script>
  import nasaRestApiService from './services/NasaRestApiService';
  import debounce from 'lodash/debounce';
  import Claim from '@/components/Claim';
  import SearchInput from '@/components/SearchInput';
  import HeroImage from '@/components/HeroImage';
  import Item from '@/components/Item';
  import Modal from '@/components/Modal';
  import Loader from '@/components/Loader';

  export default {
    name: 'App',
    components: {
      Loader,
      Modal,
      Item,
      HeroImage,
      SearchInput,
      Claim,
    },
    data() {
      return {
        modalOpen: false,
        modalItem: null,
        loading: false,
        step: 0,
        searchValue: '',
        results: []
      };
    },
    methods: {
      handleInputChange: debounce(function () {
        this.loading = true;
        console.log(this.searchValue);
        nasaRestApiService.getImages(`?q=${this.searchValue}&media_type=image`)
          .then(({ data }) => {
            this.loading = false;
            this.step = 1;
            this.results = data.collection.items;
          })
          .catch(err => {
            this.loading = false;
          });
      }, 500),
      handleModalOpen(item) {
        this.modalOpen = true;
        this.modalItem = item;
      }
    }
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    padding: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: margin-top .3s ease;
  }

  .slide-enter, .slide-leave-to {
    margin-top: 50px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 30px;
    width: 100%;
    height: 100vh;
    min-height: 100vh;

    &.flexStart {
      justify-content: flex-start;
      margin-top: 50px;
    }
  }

  .logo {
    position: absolute;
    top: 30px;
  }

  .results {
    margin-top: 20px;
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    @media(min-width: 768px) {
      width: 90%;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
