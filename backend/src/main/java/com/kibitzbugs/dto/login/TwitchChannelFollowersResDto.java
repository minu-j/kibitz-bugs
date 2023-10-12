package com.kibitzbugs.dto.login;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TwitchChannelFollowersResDto {

    private Object[] data;
    private String followed_at;
    private String user_id;
    private String user_login;
    private String user_name;
    private Object pagination;
    private String cursor;
    private long total;

}
