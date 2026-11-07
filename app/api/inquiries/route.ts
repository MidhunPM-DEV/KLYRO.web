import { NextRequest, NextResponse } from 'next/server';
import { saveInquiry } from '@/src/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, message, type } = body;

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and message are required' },
        { status: 400 }
      );
    }

    const inquiry = saveInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      message: message.trim(),
      type: type || 'general',
    });

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
      message: 'Inquiry received. Our support team will get in touch shortly.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}

