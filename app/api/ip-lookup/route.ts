// app/api/ip-lookup/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip } = body;

    // التحقق من صحة عنوان IP
    if (!ip || !/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
      return NextResponse.json({ error: 'A valid IPv4 address is required.' }, { status: 400 });
    }

    // استدعاء API خارجي (ipinfo.io) للحصول على البيانات
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    
    if (!response.ok) {
        const errorData = await response.json();
        // تمرير رسالة الخطأ من الخدمة الخارجية إذا كانت متوفرة
        throw new Error(errorData.error?.message || 'Failed to fetch IP information.');
    }
    
    const data = await response.json();

    // إرجاع البيانات بنجاح
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An internal server error occurred.' }, { status: 500 });
  }
}