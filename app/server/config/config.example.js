var config = {
    // Your site config
    site: {
        title: 'My Fancy Website',
        author: 'You...or me ?'
    },
    // MongoDb config
    mongodb: {
        url: 'mongodb://username:password@host:port/database?options...',
        init: function() { console.log('Initialize mongodb'); }
    },
    // Comment filter
    comment: {
        rejected: ['offensive', 'words']
    }
};

module.exports = config;