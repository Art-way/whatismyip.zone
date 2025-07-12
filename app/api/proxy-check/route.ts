// app/api/proxy-check/route.ts
import { NextRequest, NextResponse } from 'next/server';

const PROXY_CHECK_API_URL = 'https://proxycheck.io/v2/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip } = body;

    // التحقق من صحة عنوان IP
    if (!ip || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
      return NextResponse.json({ error: 'A valid IPv4 address is required.' }, { status: 400 });
    }

    // بناء رابط الطلب مع إضافة پارامترات إضافية
    // vpn=1 : للتحقق من كونه VPN
    // asn=1 : للحصول على معلومات مزود الخدمة
    const response = await fetch(`${PROXY_CHECK_API_URL}${ip}?vpn=1&asn=1`);
    
    if (!response.ok) {
        throw new Error('Failed to connect to the proxy checking service.');
    }
    
    const data = await response.json();

    // إرجاع البيانات بنجاح
    // سنقوم بتمرير البيانات التي تهمنا فقط
    const result = data[ip];

    return NextResponse.json({
        ip: ip,
        isProxy: result.proxy === 'yes',
        isVpn: result.vpn === 'yes',
        type: result.type,
        provider: result.provider,
        country: result.country,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An internal server error occurred.' }, { status: 500 });
  }
}