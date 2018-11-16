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
          <RecycleScroller class="scroller" :items="items" :item-height="30">
            <div slot-scope="{ item }" class="user">
              {{ item.company }}
            </div>
          </RecycleScroller>
        </td>
        <td>

        </td>
        <td>

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
  import items from "./temp_data/ranking_fake_data.json";


  export default {
    data(){
      return {
        items
      }
    },

    props: {
      list: Array
    }
  };
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
  .scroller {
    height: 300px;
    overflow-y: auto;
  }
  .user {
    height: 32px;
    padding: 0 12px;
    display: flex;
    align-items: center;
  }
</style>
