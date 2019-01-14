import getConfig from 'next/config';
import moment from 'moment';

// get config
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const formatTimestamp = (timestamp) => {
  const date = moment(timestamp*1000);
  return `${date.format('MM/DD/YYYY, hh:mm:ss')} ${date.fromNow()}`
}

export const formatBytes = (a, b) => {
  if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
}

export const getReadableDifficultyString = (difficulty, precision) => {
		if (isNaN(parseFloat(difficulty)) || !isFinite(difficulty)) return 0;
		if (typeof precision === 'undefined') precision = 2;
		var units = ['', 'k', 'M', 'G', 'T', 'P'],
            number = Math.floor(Math.log(difficulty) / Math.log(1000));
		if (units[number] === undefined || units[number] === null) {
            return 0
        }
    return (difficulty / Math.pow(1000, Math.floor(number))).toFixed(precision) + ' ' +  units[number];
}

export const getReadableCoins = (coins, digits, withoutSymbol) => {
    var amount = (parseInt(coins || 0) / publicRuntimeConfig.coinUnits).toFixed(digits || publicRuntimeConfig.coinUnits.toString().length - 1);
    return amount + (withoutSymbol ? '' : (' ' + publicRuntimeConfig.symbol));
}

export const getReadableCoinsServer = (coins) => {
    var amount = (parseInt(coins || 0) / serverRuntimeConfig.coinUnits).toFixed(serverRuntimeConfig.coinUnits.toString().length - 1);
    return amount;
}
