import redis from 'redis';

export const client = redis.createClient({
    url:process.env.REDIS_URL,
    retry_strategy: function(options){
        if(options.attempt < 5) {
            return options.attempt * 3000;
        }
    }
});

client.on("ready", function() {
    console.log("Redis Client ready");
});
