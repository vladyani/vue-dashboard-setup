<template>
  <div class="wrapper">
    <div class="search">
      <label for="search"></label>
      <input
        id="search"
        name="search"
        v-model="searchValue"
        @input="handleInputChange"
      />
      <ul>
        <li v-for="item in results" :key="item.data[0].nasa_id">
          <p>{{item.data[0].description}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import nasaRestApiService from '../services/NasaRestApiService';
  import debounce from 'lodash/debounce';

  export default {
    name: 'Search',
    data() {
      return {
        searchValue: '',
        results: []
      };
    },
    methods: {
      handleInputChange: debounce(function () {
        nasaRestApiService.getImages(`?q=${this.searchValue}&media_type=image`)
          .then(({ data }) => {
            this.results = data.collection.items;
          })
          .catch(err => console.log(err));
      }, 500),
    }
  }
  ;
</script>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 30px;
    width: 100%;
  }

  .search {
    display: flex;
    flex-direction: column;
    width: 250px;

    label {
      font-family: Montserrat, sans-serif;
    }

    input {
      height: 30px;
      border: 0;
      border-bottom: 1px solid #111111;
    }
  }
</style>
