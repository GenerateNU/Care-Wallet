export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  pfp_s3_url: string;
  device_id: string;
  push_notification_enabled: boolean;
}
