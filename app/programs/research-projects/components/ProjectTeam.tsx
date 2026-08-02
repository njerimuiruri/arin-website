import React from 'react';

interface ProjectTeamProps {
    teamMembers?: string[];
}

export default function ProjectTeam({ teamMembers = [] }: ProjectTeamProps) {
    if (teamMembers.length === 0) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {teamMembers.map((name, idx) => (
                <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#021d49] to-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Team Member</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
