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
    // Postgresql
    postgresql: {
        url: 'postgres://username:password@host:port/database?options...',
        schema: 'this_blog_schema',
        init: function(db) { console.log('Initialize PostgreSQL'); }
    },
    // Comment filter
    comment: {
        rejected: ['offensive', 'words']
    },
    // File settings
    file: {
        privateFolderPath: '/srv/folder/app',
        privateFolderName: 'storage',
        publicFolderName: 'storage', // Will be create in public folder on startup
        maxSize: 30
    }
};

module.exports = config;