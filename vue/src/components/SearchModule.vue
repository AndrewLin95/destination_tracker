<template>
  <div className="flex flex-col w-1/5 h-full border border-gray-600">
    <!-- Search bar -->
    <div className="flex flex-row p-4">
      <input 
        className="w-2/3 mr-2 text-white p-2"
        @input="handleSearchTextChange(($event.target as HTMLInputElement).value)"
        :value="searchText"
        @keyup.enter="handleSearchClick()"
      />
      <button
        @click="handleSearchClick()"
      >
        Search
      </button>
    </div>
    <!-- Search Results -->
    <div className="h-full">
      <div className='flex flex-row justify-center items-center p-4 text-2xl'>
        <div className='pr-4 text-lg'>Searched Places</div>
        <button
          @click="handleDeleteSearchHistory()"
          className="text-lg"
        >
          Delete
        </button>
      </div>
      <div className='flex flex-col items-center h-full pb-32'>
        <div v-for="(value, key) in searchHistoryDisplayData" 
          :key="key"
          className="pb-8 w-full flex justify-center items-center"
        >
          <input 
            type="checkbox"
            @click="handleDeleteFlagClick(($event.target as HTMLInputElement).checked, value.id)"
            :checked="value.deleteFlag"
            className="w-14 ml-12"
          />
          <div className="w-full">
            {{ value.location }}
          </div>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div className="flex flex-row justify-center pb-4">
      <button className="w-12 h-12 border" @click="handlePageChange('-')">
        {{ "<" }}
      </button>
      <button v-for="(value, key) in paginationState"
        className="w-12 h-12 border"
        @click="handlePageChange(value)"
        :key="key"
      >
        {{ value }}
      </button>
      <button className="w-12 h-12 border" @click="handlePageChange('+')">
        {{ ">" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      handleSearchText: {
        type: Function,
        required: true,
      },
      searchText: {
        type: String,
        required: true,
      },
      handleSearchClick: {
        type: Function,
        required: true,
      },
      searchHistoryDisplayData: {
        type: Object,
        required: true,
      },
      handlePageChange: {
        type: Function,
        required: true,
      },
      paginationState: {
        type: Object,
        required: true,
      },
      handleDeleteFlagClick: {
        type: Function,
        required: true,
      },
      handleDeleteSearchHistory: {
        type: Function,
        required: true,
      },
    },
    methods: {
      handleSearchTextChange(value: string) {
        this.handleSearchText(value);
      },
      handleSearchClick() {
        this.handleSearchClick();
      },
      handlePageChange(value: string | number) {
        this.handlePageChange(value);
      },
      handleDeleteFlagClick(state: boolean, id: number) {
        this.handleDeleteFlagClick(state, id);
      },
      handleDeleteSearchHistory() {
        this.handleDeleteSearchHistory();
      }
    }
  })
</script>