// app/types/ipinfo.ts
export interface IpInfo {
  ip: string;
  hostname?: string;
  city: string;
  region: string;
  country: string;
  loc: string; // Latitude/Longitude as "lat,lon"
  org: string; // ISP/Organization
  postal?: string;
  timezone?: string;
}