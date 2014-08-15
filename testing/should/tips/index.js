/**
 * Add percentage to array elements.
 * @param prices
 * @param percentage
 * @returns {Array|*}
 */
exports.addPercentageToEach = function (prices, percentage) {
    return prices.map(function (total) {
        total = parseFloat(total);
        return total + (total * percentage);
    });
};

/**
 * Calculate sum of array elements.
 * @param prices
 * @returns {Object|*}
 */
exports.sum = function (prices) {
    return prices.reduce(function (currentSum, currentValue) {
        return parseFloat(currentSum) + parseFloat((currentValue));
    });
};

/**
 * Format percentage for display.
 * @param percentage
 * @returns {string}
 */
exports.percentFormat = function (percentage) {
    return parseFloat(percentage) * 100 + '%';
};

/**
 * Format dollar value for display.
 * @param number
 * @returns {string}
 */
exports.dollarFormat = function (number) {
    return '$' + parseFloat(number).toFixed(2);
};