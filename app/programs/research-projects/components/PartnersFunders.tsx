import React from 'react';
import { Landmark, Handshake, Building2 } from 'lucide-react';

export interface OrgItem {
    name: string;
    logo?: string;
}

function OrgLogoGrid({ items }: { items: OrgItem[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item, i) => item.logo ? (
                <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-2.5 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <div className="h-12 w-full flex items-center justify-center">
                        <img src={item.logo} alt={item.name} className="max-h-12 max-w-full object-contain" />
                    </div>
                    <p className="text-xs text-gray-600 text-center leading-snug line-clamp-2">{item.name}</p>
                </div>
            ) : (
                // No logo: show the full name; spreadsheet-sourced orgs rarely have one.
                <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#021d49]/5">
                        <Building2 className="w-4 h-4 text-[#021d49]/60" />
                    </span>
                    <p className="text-[13px] font-medium text-gray-700 leading-snug">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

interface PartnersFundersProps {
    funders?: OrgItem[];
    partners?: OrgItem[];
}

export default function PartnersFunders({ funders = [], partners = [] }: PartnersFundersProps) {
    return (
        <div className="space-y-10">
            {funders.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-blue-600" /> Funder{funders.length > 1 ? 's' : ''}
                    </h3>
                    <OrgLogoGrid items={funders} />
                </div>
            )}

            {partners.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Handshake className="w-5 h-5 text-blue-600" /> Partners
                    </h3>
                    <OrgLogoGrid items={partners} />
                </div>
            )}
        </div>
    );
}
