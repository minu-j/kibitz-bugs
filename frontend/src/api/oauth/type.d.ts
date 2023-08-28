/**
 * Authorization code로 access token 받아오기 위한 body
 */
export interface IAuthorizationBody {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
  redirect_uri: string;
}
