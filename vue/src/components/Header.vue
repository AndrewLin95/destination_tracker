<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { geoLocation } from '../utils/interfaces';

  export default defineComponent({
    props: {
      geoLocation: { 
        type: Object as PropType<geoLocation>,
        required: true,
      },
      handleGeoLocationClick: {
        type: Function as PropType<() => void>,
        required: true,
      },
      localTime: {
        type: String as PropType<string>,
          required: true,
      }
    },
    methods: {
      handleClick(): void {
        this.handleGeoLocationClick();
      }
    }
  })
</script>

<template>
    <div className="w-screen h-16 flex flex-row justify-around items-center">
      <div>
        <div className="font-bold">Local Time of Latest Search: </div>
        {{ localTime }}
      </div>
      <button @click="handleClick">Get Current Location</button>
      <div className="pl-8">
        <div className="font-bold">Current Location</div> 
        <div v-if="Object.keys(geoLocation).length !== 0">
          Latitude: {{ geoLocation.lat }} || Longitude: {{ geoLocation.lng }}
        </div>
      </div>
    </div>
</template>
