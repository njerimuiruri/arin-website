"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail, Tag, ExternalLink, Clock, ImageIcon } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { getResearchProject } from '@/services/researchProjectService';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getResearchProject(id as string);
                if (mounted) setProject(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load project');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `https://api.demo.arin-africa.org${img}`;
    };

    const handleBack = () => router.back();
    const handleOpenResource = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

    const getResourceFileName = (url: string, index: number) => {
        const urlParts = url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (url.includes('cloudinary.com')) {
            return decodeURIComponent(fileName.split('?')[0]) || `Resource ${index + 1}`;
        }
        return fileName || `Resource ${index + 1}`;
    };

    const fmt = (d?: string, opts?: Intl.DateTimeFormatOptions) =>
        d ? new Date(d).toLocaleDateString('en-US', opts || { month: 'long', day: 'numeric', year: 'numeric' }) : '—';

    return (
        <>
            <Navbar />

            <div className="p">

                {/* loading */}
                {loading && (
                    <div className="p-loading">
                        <div className="p-spinner" />
                        <span className="p-loading-text">Loading project…</span>
                    </div>
                )}

                {error && <div className="p-error">{error}</div>}

                {project && !loading && !error && (<>

                    {/* ══ TOP BAR ══ */}
                    <div className="p-topbar">
                        <button className="p-back" onClick={handleBack}>
                            <ArrowLeft size={15} />
                            Back to Research Projects
                        </button>
                    </div>

                    {/* ══ BIG CLEAR IMAGE — full width, no overlay ══ */}
                    <div className="p-image-strip">
                        {project.coverImage ? (
                            <img
                                src={buildImageUrl(project.coverImage)}
                                alt={project.title}
                                onError={e => {
                                    const strip = (e.target as HTMLElement).closest('.p-image-strip') as HTMLElement;
                                    if (strip) strip.innerHTML = '<div class="p-image-strip-empty"><span>📷</span></div>';
                                }}
                            />
                        ) : (
                            <div className="p-image-strip-empty">
                                <ImageIcon size={48} />
                            </div>
                        )}
                    </div>

                    {/* ══ BODY ══ */}
                    <div className="p-body">

                        {/* ── MAIN ── */}
                        <main>
                            {/* title */}
                            {project.category && (
                                <div className="p-chip"><Tag size={10} />{project.category}</div>
                            )}
                            <h1 className="p-title">{project.title}</h1>
                            <div className="p-meta">
                                <span className="p-meta-item">
                                    <Calendar size={14} />{fmt(project.date)}
                                </span>
                                {project.projectTeam?.length > 0 && (
                                    <span className="p-meta-item">
                                        <Users size={14} />
                                        {project.projectTeam.length} Team {project.projectTeam.length === 1 ? 'Member' : 'Members'}
                                    </span>
                                )}
                            </div>

                            {/* overview */}
                            <div className="p-label">Project Overview</div>
                            <div
                                className="p-prose"
                                dangerouslySetInnerHTML={{
                                    __html: project.description || '<p style="color:#9ca3af;font-style:italic">No description available.</p>'
                                }}
                            />

                            {/* team */}
                            {Array.isArray(project.projectTeam) && project.projectTeam.length > 0 && (<>
                                <div className="p-label">Meet the Team</div>
                                <div className="p-team-grid">
                                    {project.projectTeam.map((name: string, idx: number) => (
                                        <div key={idx} className="p-team-tile">
                                            <div className="p-avatar">{name.charAt(0).toUpperCase()}</div>
                                            <div className="p-member-name">{name}</div>
                                            <div className="p-member-role">Team Member</div>
                                        </div>
                                    ))}
                                </div>
                            </>)}

                            {/* resources */}
                            {Array.isArray(project.resources) && project.resources.length > 0 && (<>
                                <div className="p-label">Resources</div>
                                <div className="p-res-list">
                                    {project.resources.map((url: string, idx: number) => (
                                        <button key={idx} className="p-res-row" onClick={() => handleOpenResource(url)}>
                                            <div className="p-res-icon">
                                                <FileText size={16} color="#1d4ed8" />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <span className="p-res-name">{getResourceFileName(url, idx)}</span>
                                                <span className="p-res-sub">Click to open</span>
                                            </div>
                                            <ExternalLink size={14} className="p-res-arrow" />
                                        </button>
                                    ))}
                                </div>
                            </>)}
                        </main>

                        {/* ── SIDEBAR ── */}
                        <aside className="p-sidebar">

                            {/* ★ PLAIN IMAGE — large, no cropping, clearly visible ★ */}
                            {project.coverImage && (
                                <div className="p-sidebar-img-wrap">
                                    <div className="p-sidebar-img-label">Project Image</div>
                                    <img
                                        className="p-sidebar-img"
                                        src={buildImageUrl(project.coverImage)}
                                        alt={project.title}
                                        onError={e => {
                                            const wrap = (e.target as HTMLElement).closest('.p-sidebar-img-wrap') as HTMLElement;
                                            if (wrap) wrap.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}

                            {/* project info */}
                            <div className="p-sidebar-info">
                                <div className="p-sidebar-info-header">Project Info</div>

                                {project.category && (
                                    <div className="p-sidebar-row">
                                        <div className="p-sidebar-icon"><Tag size={14} color="#6b7280" /></div>
                                        <div>
                                            <div className="p-sidebar-key">Category</div>
                                            <div className="p-sidebar-val">{project.category}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="p-sidebar-row">
                                    <div className="p-sidebar-icon"><Calendar size={14} color="#6b7280" /></div>
                                    <div>
                                        <div className="p-sidebar-key">Start Date</div>
                                        <div className="p-sidebar-val">{fmt(project.date, { month: 'long', year: 'numeric' })}</div>
                                    </div>
                                </div>
                                {project.status && (
                                    <div className="p-sidebar-row">
                                        <div className="p-sidebar-icon"><Clock size={14} color="#6b7280" /></div>
                                        <div>
                                            <div className="p-sidebar-key">Status</div>
                                            <div className="p-sidebar-val">{project.status}</div>
                                        </div>
                                    </div>
                                )}
                                {project.projectTeam?.length > 0 && (
                                    <div className="p-sidebar-row">
                                        <div className="p-sidebar-icon"><Users size={14} color="#6b7280" /></div>
                                        <div>
                                            <div className="p-sidebar-key">Team Size</div>
                                            <div className="p-sidebar-val">{project.projectTeam.length} Members</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* contact CTA */}
                            <div className="p-sidebar-cta">
                                <h3>Interested in collaborating?</h3>
                                <p>Reach out to learn about partnership and collaboration opportunities.</p>
                                <button><Mail size={13} />Contact Us</button>
                            </div>

                        </aside>
                    </div>
                </>)}
            </div>
        </>
    );
};

export default ProjectDetailPage;