{
    selectedMessage: id,

    messages: {
        id: {
            _id: id, text: text, title: title, prettyUrl: url, authorName: name, categories: [{_id: id, name: name}]
        }
    },

    categories: {
        id: {_id: id, name: name}
    }
}