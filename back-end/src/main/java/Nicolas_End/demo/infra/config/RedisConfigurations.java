package Nicolas_End.demo.infra.config;


import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.connection.RedisConnectionCommands;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@Configuration
@EnableCaching
@EnableScheduling
public class RedisConfigurations {

    public RedisConfigurations(RedisTemplate redisTemplate, ResponseUtil responseUtil){
        this.redisTemplate = redisTemplate;
        this.responseUtil = responseUtil;
    }
    private final ResponseUtil responseUtil;
    private final RedisTemplate<String, Object> redisTemplate;

    public static final String ITEMS_CACHE = "items";

    public ApiResponse validateRedisConnection() {
        try {


            redisTemplate.execute((RedisCallback<String>) RedisConnectionCommands::ping);

            return this.responseUtil.sucess("REDIS CONECTADO",null, HttpStatus.OK );


        } catch (Exception e) {
            return  this.responseUtil.error("CONEXÃO FALHOU",e.toString(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .disableCachingNullValues()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }


}
