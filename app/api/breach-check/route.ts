// app/api/breach-check/route.ts
import { NextRequest, NextResponse } from 'next/server';

const HIBP_API_URL = 'https://haveibeenpwned.com/api/v3/breachedaccount/';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // التحقق من صحة البريد الإلكتروني
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    // --- !! هام جدًا !! ---
    // يجب إضافة مفتاح API الخاص بك هنا عند الانتقال إلى الإنتاج
    // ستحصل عليه من: haveibeenpwned.com/API/Key
    const HIBP_API_KEY = process.env.HIBP_API_KEY || ''; // اتركه فارغًا للتطوير المبدئي

    const response = await fetch(`${HIBP_API_URL}${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': HIBP_API_KEY,
        'user-agent': 'whatismyip.zone-Breach-Checker', // يوصى بإرسال user-agent
      },
    });

    // إذا كان الرد 404، فهذا يعني أن البريد الإلكتروني لم يتم العثور عليه (وهو خبر جيد)
    if (response.status === 404) {
      return NextResponse.json({ found: false, breaches: [] }, { status: 200 });
    }

    if (!response.ok) {
      // التعامل مع أخطاء أخرى مثل 401 (مفتاح API غير صالح) أو 429 (تجاوز الحد)
      throw new Error(`HIBP API Error: ${response.statusText}`);
    }
    
    const data = await response.json();

    // إرجاع قائمة الاختراقات التي تم العثور عليها
    return NextResponse.json({ found: true, breaches: data }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An internal server error occurred.' }, { status: 500 });
  }
}