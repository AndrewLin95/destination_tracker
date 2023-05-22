<script lang="ts">
import { defineComponent } from 'vue';
// @ts-ignore
import ts from '@mapbox/timespace';
// @ts-ignore
import { GoogleMap, Marker } from 'vue3-google-map';
import { v4 as uuidv4 } from 'uuid';
// import { SET_AUTHENTICATION, SET_USERNAME } from './store/constants';

import Header from './Header.vue';
import SearchModule from './SearchModule.vue';
import { WEATHER_K, GOOGLE_MAPS_API, NUM_RESULTS_PER_PAGE } from '../utils/constant';
import { geoLocation, searchHistoryObject } from '../utils/interfaces';

export default defineComponent({
  components: {
    Header,
    SearchModule,
    GoogleMap,
    Marker,
  },
  
  name: "MainPage",

  data() {
    return {
      GOOGLEMAPSAPIKEY: GOOGLE_MAPS_API as string,
      geoLocation: {} as geoLocation,
      localTime: "" as string,
      timeZone: "" as string,
      searchText: "" as string,
      searchHistory: [] as searchHistoryObject[],
      updateFlag: false as boolean,

      numberOfPages: 1 as number,
      currPage: 1 as number,
      searchHistoryDisplayData: [] as searchHistoryObject[],
      paginationState: [1] as (number | string)[],

      loadingMap: true as boolean,
    }
  },

  methods: {
    handleGeoLocationClick() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      const success = (position: GeolocationPosition) => {
        this.geoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
      const error = (err: GeolocationPositionError) => {
        console.log(`ERROR: ${err.code}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    },

    handleSearchText(value: string) {
      this.searchText = value
    },

    async handleSearchClick() {
      const uid = uuidv4();
    
      let weatherGeocode
      try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${this.searchText}&appid=${WEATHER_K}`, {mode:'cors'})
        weatherGeocode = await response.json();
      } catch (err) {
        window.alert('Oops, something went wrong. Please try again later')
      }

      if (weatherGeocode.length === 0) {
        this.searchText = ""
        return;
      }

      const timestamp = Date.now();
      const point = [weatherGeocode[0].lon, weatherGeocode[0].lat];
      const localTimeAtSearchLocation = ts.getFuzzyLocalTimeFromPoint(timestamp, point);
      
      this.localTime = localTimeAtSearchLocation.toString();

      this.updateFlag = false;

      const searchObject = {
        id: uid,
        location: weatherGeocode[0].name,
        lat: weatherGeocode[0].lat,
        lng: weatherGeocode[0].lon,
        searchTime: new Date(),
        localTimeAtSearch: localTimeAtSearchLocation.toString(),
        deleteFlag: false,
      }

      if (this.searchHistory.length === 0){
        this.numberOfPages = 1;
      } else {
        const _numberOfPages = Math.ceil((this.searchHistory.length + 1) / 10);
        if (_numberOfPages !== this.numberOfPages) {
          this.numberOfPages = _numberOfPages;
        }
      }

      const tempSearchHistory = [...this.searchHistory, searchObject];
      this.searchHistory = tempSearchHistory
      this.searchText = ""
    },

    handlePageChange(value: string | number) {
      if (value === "...") {
        return;
      }
      let indexOfFirstPost: number;
      let indexOfLastPost: number;
      if (value === "+") {
        if ((this.currPage + 1) > this.numberOfPages) {
          return;
        }
        indexOfLastPost = (this.currPage + 1) * NUM_RESULTS_PER_PAGE; 
        indexOfFirstPost = indexOfLastPost - NUM_RESULTS_PER_PAGE;
        this.currPage = this.currPage + 1
      } else if (value === "-") {
        if ((this.currPage - 1) <= 0) {
          return;
        }
        indexOfLastPost = (this.currPage - 1) * NUM_RESULTS_PER_PAGE; 
        indexOfFirstPost = indexOfLastPost - NUM_RESULTS_PER_PAGE;
        this.currPage = this.currPage - 1
      } else {
        indexOfLastPost = Number(value) * NUM_RESULTS_PER_PAGE; 
        indexOfFirstPost = indexOfLastPost - NUM_RESULTS_PER_PAGE;
        this.currPage = Number(value)
      }

      const tempSearchHistory = [...this.searchHistory];
      const filteredSearchHistory = tempSearchHistory.slice(indexOfFirstPost, indexOfLastPost);
      this.searchHistoryDisplayData = filteredSearchHistory;
    },

    handleDeleteFlagClick(checkboxState: boolean, id: string) {
      this.updateFlag = true;
      const itemIndex = this.searchHistory.findIndex(searchItem => searchItem.id === id)
      const tempSearchHistory = [...this.searchHistory];

      if (checkboxState) {
        tempSearchHistory[itemIndex].deleteFlag = true;
      } else {
        tempSearchHistory[itemIndex].deleteFlag = false;
      }
      this.searchHistory = tempSearchHistory;
    },

    handleDeleteSearchHistory() {
      this.updateFlag = true;

      const tempSearchHistory = this.searchHistory.filter(item => !item.deleteFlag);
      const tempDisplayData = this.searchHistoryDisplayData.filter(item => !item.deleteFlag);

      this.searchHistoryDisplayData = tempDisplayData;
      this.searchHistory = tempSearchHistory;
    }
  },

  watch: {
    searchHistory() { 
      if (this.searchHistory.length > 0 && !this.updateFlag) {
        if (this.searchHistoryDisplayData.length <= 9 && this.currPage === this.numberOfPages) {
          this.searchHistoryDisplayData = [...this.searchHistoryDisplayData, this.searchHistory[this.searchHistory.length - 1]]
        }
      }
    },

    numberOfPages() {
      if (this.numberOfPages <= 5) {
        let i = 0;
        const tempPaginationArray = [];
        while (i < this.numberOfPages) {
          tempPaginationArray.push(i + 1);
          i++
        }
        this.paginationState = tempPaginationArray;
      } else {
        if (this.currPage === 1) {
          this.paginationState = [1, 2, "...", this.numberOfPages];
        } else if (this.currPage === 2) {
          this.paginationState = [1, 2, 3, "...", this.numberOfPages];
        } else if (this.currPage === this.numberOfPages) {
          this.paginationState = [1, "...", this.currPage - 1, this.currPage];
        } else if (this.currPage === (this.numberOfPages - 1)) {
          this.paginationState = [1, "...", this.currPage -1, this.currPage, this.numberOfPages];
        } else {
          this.paginationState = [1, "...", this.currPage - 1, this.currPage, this.currPage + 1, "...", this.numberOfPages];
        }
      }
    },

    currPage() {
      if (this.numberOfPages <= 5) {
        let i = 0;
        const tempPaginationArray = [];
        while (i < this.numberOfPages) {
          tempPaginationArray.push(i + 1);
          i++
        }
        this.paginationState = tempPaginationArray;
      } else {
        if (this.currPage === 1) {
          this.paginationState = [1, 2, "...", this.numberOfPages];
        } else if (this.currPage === 2) {
          this.paginationState = [1, 2, 3, "...", this.numberOfPages];
        } else if (this.currPage === this.numberOfPages) {
          this.paginationState = [1, "...", this.currPage - 1, this.currPage];
        } else if (this.currPage === (this.numberOfPages - 1)) {
          this.paginationState = [1, "...", this.currPage -1, this.currPage, this.numberOfPages];
        } else {
          this.paginationState = [1, "...", this.currPage - 1, this.currPage, this.currPage + 1, "...", this.numberOfPages];
        }
      }
    },

    geoLocation() {
      if (Object.keys(this.geoLocation).length !== 0) {
        this.loadingMap = false;
      }
    },  
  }
})
</script>

<template>
  <div className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center">
    <Header 
      :geoLocation="geoLocation" 
      :handleGeoLocationClick="handleGeoLocationClick" 
      :localTime="localTime"
    />
    <div className='flex flex-row w-full h-full'>
      <SearchModule 
        :handleSearchText="handleSearchText"
        :searchText="searchText"
        :handleSearchClick="handleSearchClick"
        :searchHistoryDisplayData="searchHistoryDisplayData"
        :handlePageChange="handlePageChange"
        :paginationState="paginationState"
        :handleDeleteFlagClick="handleDeleteFlagClick"
        :handleDeleteSearchHistory="handleDeleteSearchHistory"
      />
      <div v-if="loadingMap === false" className="h-full w-full">
        <GoogleMap 
          :api-key="GOOGLEMAPSAPIKEY"
          :center="geoLocation"
          :zoom="11"
          style="width: 100%; height: 100%"
        >
          <Marker :options="{position: geoLocation}" />
          <Marker v-for="(value, key) in searchHistoryDisplayData" 
            :key="key"
            :options="{
              position: {
                lat: value.lat,
                lng: value.lng
              }
            }"
          />
        </GoogleMap>
      </div>
      <div v-else className="h-full w-full">
        <div style="width: 100%; height: 100%" className="flex justify-center items-center">
          Please get your current location first!
        </div>
      </div>
    </div>
  </div>
</template>
