import { FileText, Calendar, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { workingPaperSeriesService } from '@/services/workingPaperSeriesService';
import { notFound } from 'next/navigation';

export default async function WorkingPaperDetailPage({ params }: { params: { id: string } }) {
    let paper = null;
    try {
        paper = await workingPaperSeriesService.getById(params.id);
    } catch (e) {
        return notFound();
    }
    if (!paper) return notFound();

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <section className="max-w-[900px] mx-auto px-6 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">{paper.title}</h1>
                        <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-4">
                            {paper.authors && (
                                <span className="flex items-center gap-1"><User className="w-4 h-4 text-[#021d49]" />{paper.authors.join(', ')}</span>
                            )}
                            {paper.datePosted && (
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-[#021d49]" />{new Date(paper.datePosted).toLocaleDateString()}</span>
                            )}
                        </div>
                        {paper.image && (
                            <img src={paper.image.startsWith('http') ? paper.image : `http://localhost:5001${paper.image}`} alt={paper.title} className="w-full max-h-96 object-cover rounded-xl mb-6" />
                        )}
                    </div>
                    <article className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: paper.description || '<em>No description provided.</em>' }} />
                    {paper.availableResources && paper.availableResources.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-2">Resources</h2>
                            <ul className="list-disc ml-6">
                                {paper.availableResources.map((url: string, idx: number) => (
                                    <li key={idx}>
                                        <a href={url.startsWith('http') ? url : `http://localhost:5001${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Resource {idx + 1}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
