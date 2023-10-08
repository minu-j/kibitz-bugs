package com.kibitzbugs.config;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class JwtConfig {

    @Bean(name = "jwt")
    public PropertiesFactoryBean propertiesFactoryBean() {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        ClassPathResource classPathResource = new ClassPathResource("private.properties");
        propertiesFactoryBean.setLocation(classPathResource);
        return propertiesFactoryBean;
    }

}
