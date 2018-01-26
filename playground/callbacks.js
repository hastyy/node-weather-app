const getUser = (id, callback) => {
    const user = {
        id,
        name: 'Hastyy'
    };
    
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (user) => {
    console.log(user);
});
