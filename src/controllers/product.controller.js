const axios = require('axios');
const chalk = require('chalk');
const url = process.env.product_fetch_url
const error = chalk.bold.white.bgRed;
const success =chalk.bgGreen.white.bold;

/**
 * Fetch products and apply filter
 * @param  {object} param The request query parameters
 * @return {object}      The json result set with keys - content,price,size,frequentwords
 */
const filterProductList = async (param) => {
    try {
        const resp = await axios.get(url);
        if (resp.data.products) {
            const products = resp.data.products

            // filter by maxprice, size, highlight words
            filterArr = filterByConditions(products, param)

            //find frequent words used in description
            frequentWords = findFrequentWords(filterArr)

            // get sizes in products
            let size_array = [...new Set(filterArr.map((o) => o.sizes))]
                .reduce((a, b) => a.concat(b)).sort()

            data = {
                content: filterArr,
                price: {
                    min: Math.min(...filterArr.map(item => item.price)),
                    max: Math.max(...filterArr.map(item => item.price))
                },
                size: [...new Set(size_array)],
                frequentWords
            }
            console.log(success("Data: ",data));
            return data
        } else {
            console.log(error('Error : Empty response'));
            throw new Error()
        }
    } catch (err) {
        console.error(error(err));
        throw new Error()
    }
}

/**
 * Filter products based on conditions with price,size,highlights
 * @param  {object} products The products json object
 * @param  {object} param The request query parameters
 * @return {object}      filtered product list
 */
const filterByConditions = (products, param) => {
    try {
        var product_size = param.size ? param.size.split(',') : null;
        var searchKeys = param.highlight ? param.highlight.split(',') : null;
        let filterArr = products.filter(p =>
            (param.maxprice ? p.price <= param.maxprice : true)
            &&
            (product_size ? p.sizes.some(item => product_size.includes(item)) : true)
            &&
            (searchKeys ?
                searchKeys.some(substring =>
                    (p.description.includes(substring) ? p.description = p.description.replace(substring, "<em>" + substring + "</em>") : false)) : true)
        )
        filterArr.sort((a, b) => {
            return a.price - b.price;
        });
        return filterArr
    } catch (err) {
        // Handle Error Here
        console.error(error(err));
    }
}

/**
 * Find frequent words from description in products
 * @param  {object} arrayList The products json object
 * @return {object}      frequent words list
 */
const findFrequentWords = (arrayList) => {
    try {
        let all_description = arrayList.map(e => e.description).join(" ")
        const strArr = all_description.split(' ');
        const map = {};
        strArr.forEach(word => {
            if (map.hasOwnProperty(word)) {
                map[word]++;
            } else {
                map[word] = 1;
            }
        });
        const frequencyArr = Object.keys(map).map(key => [key, map[key]]);
        frequencyArr.sort((a, b) => b[1] - a[1]);
        frequencyArr.splice(0, 5);
        let frequent_words = frequencyArr.slice(0, 10).map(el => el[0]);
        return frequent_words
    } catch (err) {
        // Handle Error Here
        console.error(error(err));
    }
}

module.exports = {
    filterProductList
}