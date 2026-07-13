package Nicolas_End.demo.infra.config;


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
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@Configuration
@EnableCaching
@EnableScheduling
public class RedisConfigurations {

    public RedisConfigurations(RedisTemplate redisTemplate){
        this.redisTemplate = redisTemplate;
    }

    private final RedisTemplate<String, Object> redisTemplate;

    public static final String ITEMS_CACHE = "items";

    @Scheduled(initialDelay = 5000, fixedDelay = 60000)
    public void validateRedisConnection() {
        try {
            String pong = redisTemplate.execute((RedisCallback<String>) RedisConnectionCommands::ping);

            log.info("Redis conectado! Resposta: {}", pong);
        } catch (Exception e) {
            log.error("Erro ao conectar ao Redis", e);
        }
    }

    @Bean
    public RedisCacheConfiguration cacheConfiguration() {
        return RedisCacheConfiguration.defaultCacheConfig()
                .disableCachingNullValues()
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));
    }


}
