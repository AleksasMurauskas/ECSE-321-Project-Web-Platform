<template>
  <div id="Ranking">
    <h2>Rankings</h2>
    <table>
      <thead>
          <th>Top Performing Drivers</th>
          <th>Most Loyal Customers</th>
          <th>Most Common Routes</th>
      </thead>
      <tbody>
        <td>
          <VirtualList :size="50" :remain="6" :bench="44" class="list" :start="startIndex">
            <Item v-for="(udf, index) of items" :index="index" :key="index"></Item>
          </VirtualList>
        </td>
        <td>
          <VirtualList :size="50" :remain="6" :bench="44" class="list" :start="startIndex">
            <Item v-for="(udf, index) of items" :index="index" :key="index"></Item>
          </VirtualList>
        </td>
        <td>
          <VirtualList :size="50" :remain="6" :bench="44" class="list" :start="startIndex">
            <Item v-for="(udf, index) of items" :index="index" :key="index"></Item>
          </VirtualList>
        </td>
      </tbody>
    </table>
    <p>
      <span style="color:red">Error: Message text comes here</span>
    </p>

    <table>
      <tr>
        <td> Select Starting Date: </td>
        <input type="date" id="start" name="startDate"
        value="2018-07-22"
         min="2018-01-01" max="2018-12-31">
        <td> Select Ending Date: </td>
        <input type="date" id="end" name="EndDate"
        value="2018-07-23"
        min="2018-01-01" max="2018-12-31">
        <button type="button">Filter!</button>
      </tr>
    </table>
  </div>
</template>

<script>
  import Item from './item.vue'
  import VirtualList from 'vue-virtual-scroll-list'
  import User from './model/User'



  const getList = () => {
    var user1 = new User(0, 'John')
    return new [user1.toString]
  }

  export default {
    name: 'Ranking',
    components: { Item, VirtualList },
    data () {
      return {
        startIndex: 0,
        items: getList()
      }
    },
    methods: {

    }
  }



</script>


<style>

  #Ranking{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    background: #f2ece8;
  }

  table {
    align:"center";
    margin: auto;
  }

  th, td{
    padding: 50px;
  }
</style>
