'use client';

import { Mail } from 'lucide-react';
import { Subscriber } from '../AdminDashboard';

interface Props { subscribers: Subscriber[]; }

export default function SubscribersTab({ subscribers }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Subscribers</h1>
        <p className="text-sm text-gray-500 mt-1">
          {subscribers.length} email{subscribers.length !== 1 ? 's' : ''} signed up for KLYRO updates.
        </p>
      </div>

      {subscribers.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-100 p-16 text-center shadow-sm">
          <Mail size={36} className="mx-auto mb-3 text-gray-200" />
          <p className="text-sm font-semibold text-gray-400">No subscribers yet.</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Email Address</th>
                <th className="py-3 px-5">Subscribed On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.map((sub, i) => (
                <tr key={sub.email} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-5 text-gray-300 font-bold text-xs">{i + 1}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ecfdf5] text-[#005E23]">
                        <Mail size={14} />
                      </div>
                      <span className="font-semibold text-gray-800">{sub.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-gray-400 text-xs">
                    {new Date(sub.subscribedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
