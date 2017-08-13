Meteor.methods({
  getWalletAmount() {
    try {
      const wallets = Meteor.user().profile.walletAddresses;
      console.log(wallets);
      if(wallets) {
        const data = [];
        wallets.forEach(wallet => {
          const result = HTTP.call('GET', 'http://api.neonwallet.com/v1/address/balance/' + wallet.address);
          data.push({
            label: wallet.label,
            result: result.data
          })
        });
        console.log(data);
        return data;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },
  getNeoPrice() {
    try {
      const result = HTTP.call('GET', 'https://api.coinmarketcap.com/v1/ticker/neo/?convert=USD');
      return result.data;
    } catch (e) {
      return false;
    }
  },
  getGasPrice() {
    try {
      const result = HTTP.call('GET', 'https://api.coinmarketcap.com/v1/ticker/GAS/?convert=USD');
      return result.data;
    } catch (e) {
      return false;
    }
  }
});