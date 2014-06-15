var redis = require('redis');


var client = redis.createClient(6379, 'localhost');

client.on('error', function (err) {
    console.log('Error ' + err);
});

// Simple variable
client.set('color', 'red', redis.print);
client.get('color', function (err, value) {
    if (err) throw err;
    console.log('Got: ' + value);
});

// Hash table
client.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function (err, value) {
    if (err) throw err;
    console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', function (err, keys) {
    if (err) throw err;
    keys.forEach(function (key, i) {
        console.log(' ' + key);
    });
});


//List
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, 2, function (err, items) {
    if (err) throw err;
    items.forEach(function (item, i) {
        console.log(' ' + item);
    });
});

// Sets
var SET_IP_ADDRESSES = 'ip_addresses';
client.sadd(SET_IP_ADDRESSES, '204.10.37.96', redis.print);
client.sadd(SET_IP_ADDRESSES, '204.10.37.96', redis.print);
client.sadd(SET_IP_ADDRESSES, '72.32.231.8', redis.print);
client.smembers(SET_IP_ADDRESSES, function (err, members) {
    if (err) throw err;
    console.log(members);
});

