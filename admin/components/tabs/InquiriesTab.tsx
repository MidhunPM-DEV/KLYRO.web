'use client';

import { MessageSquare, Phone, Mail, Clock } from 'lucide-react';
import { Inquiry } from '../AdminDashboard';

interface Props { inquiries: Inquiry[]; }

export default function InquiriesTab({ inquiries }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Customer Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">
          {inquiries.length} message{inquiries.length !== 1 ? 's' : ''} from customers.
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-100 p-16 text-center shadow-sm">
          <MessageSquare size={36} className="mx-auto mb-3 text-gray-200" />
          <p className="text-sm font-semibold text-gray-400">No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-bold uppercase">
                    {inq.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{inq.name}</span>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {inq.type}
                      </span>
                      <span className="text-[10px] text-gray-400">#{inq.id}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{inq.message}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Phone size={11} />{inq.phone}</span>
                      {inq.email && <span className="flex items-center gap-1"><Mail size={11} />{inq.email}</span>}
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {new Date(inq.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
                <a
                  href={`https://wa.me/91${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}, KLYRO Support here. Regarding: "${inq.message.slice(0, 60)}..."`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 rounded-xl bg-[#ecfdf5] px-3 py-2 text-xs font-bold text-[#005E23] hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <MessageSquare size={13} />
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
