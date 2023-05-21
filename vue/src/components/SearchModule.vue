<template>
  <div className="flex flex-col w-1/5 h-full border border-gray-600">
    <!-- Search bar -->
    <div className="flex flex-row p-4">
      <input 
        className="w-2/3 mr-2 text-white p-2"
        @input="handleSearchTextChangeAction(($event.target as HTMLInputElement).value)"
        :value="searchText"
        @keyup.enter="handleSearchClickAction()"
      />
      <button
        @click="handleSearchClickAction()"
      >
        Search
      </button>
    </div>
    <!-- Search Results -->
    <div className="h-full">
      <div className='flex flex-row justify-center items-center p-4 text-2xl'>
        <div className='pr-4 text-lg'>Searched Places</div>
        <button
          @click="handleDeleteSearchHistoryAction()"
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
            @click="handleDeleteFlagClickAction(($event.target as HTMLInputElement).checked, value.id)"
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
      <button className="w-12 h-12 border" @click="handlePageChangeAction('-')">
        {{ "<" }}
      </button>
      <button v-for="(value, key) in paginationState"
        className="w-12 h-12 border"
        @click="handlePageChangeAction(value)"
        :key="key"
      >
        {{ value }}
      </button>
      <button className="w-12 h-12 border" @click="handlePageChangeAction('+')">
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
      handleSearchTextChangeAction(value: string) {
        this.handleSearchText(value);
      },
      handleSearchClickAction() {
        this.handleSearchClick();
      },
      handlePageChangeAction(value: string | number) {
        this.handlePageChange(value);
      },
      handleDeleteFlagClickAction(state: boolean, id: number) {
        this.handleDeleteFlagClick(state, id);
      },
      handleDeleteSearchHistoryAction() {
        this.handleDeleteSearchHistory();
      }
    }
  })
</script>