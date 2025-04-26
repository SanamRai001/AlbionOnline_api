const axios = require('axios');
const url = 'https://www.albion-online-data.com/api/v2/stats/prices/T5_TITANIUMBAR.json';

async function fetchData(){
    try{
        const response = await axios.get(url);
        const data = response.data;
        const min = data.reduce((minItem, currentItem)=>{
            if(currentItem.sell_price_min > 0 && (minItem.sell_price_min === 0 || currentItem.sell_price_min <minItem.sell_price_min)){
                return currentItem;
            }
            return minItem;
        });
        const max = data.reduce((maxItem, currentItem)=>{
            if(currentItem.sell_price_max >0 && (currentItem.sell_price_max > maxItem.sell_price_max || maxItem.sell_price_max === 0)){
                return currentItem;
            } 
            return maxItem;
        });
         console.log(min);
         console.log(max);
         const profit = max.sell_price_max - min.sell_price_min;
         console.log(`Sell item from ${min.city} to ${max.city} for profit of ${profit}`);
    }
    catch(error){
        console.error("Failed to fetch :",error);
    }
}
fetchData();
