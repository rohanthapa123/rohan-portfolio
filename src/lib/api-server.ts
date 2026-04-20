import { AboutData, ProjectData, ResumeData } from '@/types/api';
import { apiClient } from '@/lib/api';
import { unstable_cache } from 'next/cache';

// Fallback data for About section
const defaultAboutData: AboutData = {
    id: "default",
    title: "ABOUT ME",
    description: "Hi!, I am Rohan Thapa. A curious developer who loves building creative web solutions. I enjoy experimenting with new tools, writing clean code, and turning ideas into interactive experiences that users enjoy.",
    image1: "/works/edtraa.png",
    image2: "/works/quasar.png",
    image3: "/works/klixsoft.png",
    image4: "/works/altripmart.png",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

// Fallback data for Projects section
const defaultProjectsData: ProjectData[] = [
    {
        id: "1",
        title: "Edtraa",
        role: "Full Stack Development",
        link: "https://www.edtraa.com",
        image: "/works/edtraa.png",
        isActive: true,
        workedAt: "Edtraa",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Quasar Energy Consultant",
        role: "Full Stack Development",
        link: "https://quasar.rohanthapa.com.np",
        image: "/works/quasar.png",
        isActive: true,
        workedAt: "Quasar",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

/**
 * Fetches About data from the API (server-side only)
 * Falls back to default data if API call fails
 */
export const getAboutData = unstable_cache(
    async (): Promise<AboutData> => {
        try {
            const { data } = await apiClient.get<any>('/about/active');
            const items = Array.isArray(data) ? data : data.data;
            return items?.[0] || defaultAboutData;
        } catch (error) {
            // console.error('Error fetching about data:', error);
            return defaultAboutData;
        }
    },
    ['about-data'],
    { revalidate: 10 }
);

/**
 * Fetches Projects data from the API (server-side only)
 * Falls back to default data if API call fails
 */
export const getProjectsData = unstable_cache(
    async (): Promise<ProjectData[]> => {
        try {
            const { data } = await apiClient.get<any>('/projects/active');
            const items = Array.isArray(data) ? data : data.data;
            return (items || []).filter((project: any) => project.isActive);
        } catch (error) {
            // console.error('Error fetching projects data:', error);
            return defaultProjectsData;
        }
    },
    ['projects-data'],
    { revalidate: 60 }
);

/**
 * Fetches Resume data from the API (server-side only)
 */
export const getResumeData = unstable_cache(
    async (): Promise<ResumeData | undefined> => {
        try {
            const { data } = await apiClient.get<any>('/resume/active');
            const items = Array.isArray(data) ? data : data.data;
            return items?.[0];
        } catch (error) {
            // console.error('Error fetching resume data:', error);
            return undefined;
        }
    },
    ['resume-data'],
    { revalidate: 60 }
);


