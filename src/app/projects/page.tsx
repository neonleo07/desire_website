import { sanityFetch } from '@/sanity/lib/client'
import { allProjectsQuery } from '@/sanity/lib/queries'
import type { IProject } from '@/types'
import { ProjectsGallery } from '@/components/sections/ProjectsGallery'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Desire Creatives',
  description: 'Engineered results for the technical void. We build high-fidelity digital machines that dominate their markets.',
}

export const revalidate = 60

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    slug: { current: 'aether-financial' },
    title: 'Aether Financial',
    tagline: 'Algorithmic Trading Platform Interface',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c1', name: 'UI/UX', slug: { current: 'ui-ux' } }],
  },
  {
    _id: '2',
    slug: { current: 'nexus-protocol' },
    title: 'Nexus Protocol',
    tagline: 'Infrastructure Visual Identity',
    thumbnail: { url: '/images/project-infrastructure.png' },
    categories: [{ _id: 'c2', name: 'BRANDING', slug: { current: 'branding' } }],
  },
  {
    _id: '3',
    slug: { current: 'sentinel-zero' },
    title: 'Sentinel Zero',
    tagline: 'Threat Detection Dashboard',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c3', name: 'SYSTEMS', slug: { current: 'systems' } }],
  },
  {
    _id: '4',
    slug: { current: 'quantum-metrics' },
    title: 'Quantum Metrics',
    tagline: 'Enterprise Analytics Suite',
    thumbnail: { url: '/images/project-dashboard.png' },
    categories: [{ _id: 'c4', name: 'DATA', slug: { current: 'data' } }],
  },
]

export default async function ProjectsPage() {
  let projects = await sanityFetch<IProject[]>({
    query: allProjectsQuery,
    tags: ['project'],
  })

  // Use fallback data if Sanity is empty (to match Stitch design out of the box)
  if (!projects || projects.length === 0) {
    projects = FALLBACK_PROJECTS as unknown as IProject[]
  }

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-20 pb-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Page Header */}
        <div className="mb-20 max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-on-surface mb-6">
            PROJECTS
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
            Engineered results for the technical void. We build high-fidelity digital machines that dominate their markets.
          </p>
        </div>

        {/* Interactive Gallery (Client Component) */}
        <ProjectsGallery initialProjects={projects} />

        {/* Project Demo Section */}
        <div className="border-t border-outline-variant/20 pt-20 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase text-on-surface mb-4 tracking-tight">PROJECT DEMO</h2>
          <p className="text-sm text-on-surface-variant mb-12">Experience the precision of our engineered interfaces firsthand.</p>
          
          <div className="relative aspect-video w-full bg-surface-container border border-outline-variant/20 rounded-sm flex items-center justify-center group overflow-hidden cursor-pointer">
             {/* Fake code background or similar from design */}
             <div className="absolute inset-0 opacity-20 font-mono text-[8px] text-left p-6 text-on-surface-variant overflow-hidden truncate">
               {`const initProject = async (id: string) => { \n  const data = await fetchSystem(id);\n  renderDOM(data);\n  return { status: "ACTIVE" }; \n}\n\n// INITIALIZING SEQUENCE\ninitProject('nexus-protocol').then(sys => {\n  console.log('SYSTEM ONLINE');\n});`}
             </div>
             
             {/* Play button */}
             <div className="relative z-10 w-16 h-12 bg-primary-container rounded flex items-center justify-center shadow-[0_0_30px_rgba(0,112,243,0.4)] group-hover:scale-110 transition-transform duration-300">
               <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
