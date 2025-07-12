// File: app/api/blacklist-check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

// Promisify the dns.resolve a so we can use it with async/await
const resolve = promisify(dns.resolve);

// A list of popular DNSBLs to check against.
const dnsbls = [
  "zen.spamhaus.org",
  "bl.spamcop.net",
  "b.barracudacentral.org",
  "dnsbl.sorbs.net",
];

// Define the structure of our response
export interface BlacklistCheckResult {
  dnsbl: string;
  listed: boolean;
  details?: string;
}

// This is the main API function
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip = body.ip;

    // --- Basic IP Validation ---
    if (!ip || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
      return NextResponse.json({ error: 'A valid IPv4 address is required.' }, { status: 400 });
    }

    const reversedIp = ip.split('.').reverse().join('.');

    // Perform all DNS lookups in parallel for better performance
    const promises = dnsbls.map(async (dnsbl): Promise<BlacklistCheckResult> => {
      const queryDomain = `${reversedIp}.${dnsbl}`;
      try {
        await resolve(queryDomain);
        return { dnsbl, listed: true, details: `Listed on ${dnsbl}` };
      } catch (err: unknown) {
        if (typeof err === 'object' && err !== null && 'code' in err) {
            const error = err as { code: string };
            if (error.code === 'ENOTFOUND') {
              return { dnsbl, listed: false };
            }
        }
        return { dnsbl, listed: false, details: `Error checking ${dnsbl}` };
      }
    });

    const results: BlacklistCheckResult[] = await Promise.all(promises);

    return NextResponse.json(results, { status: 200 });

  } catch { // FIX: Removed the unused 'err' variable from the catch block
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}