import { AboutData, ProjectData, ResumeData } from '@/types/api';

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
    {
        id: "3",
        title: "Klixsoft",
        role: "Frontend Development",
        link: "https://klixsoft.com",
        image: "/works/klixsoft.png",
        isActive: true,
        workedAt: "Klixsoft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "4",
        title: "Altripmart",
        role: "Frontend Development",
        link: "https://altripmart.com",
        image: "/works/altripmart.png",
        isActive: true,
        workedAt: "Altripmart",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "5",
        title: "Portfolio Website",
        role: "Frontend & Motion Design",
        link: "#",
        image: "/works/portfolio.png",
        isActive: true,
        workedAt: "Personal",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "6",
        title: "Trexmin Advertisement",
        role: "Frontend & Motion Design",
        link: "https://trexmin.rohanthapa.com.np",
        image: "/works/trexmin.png",
        isActive: true,
        workedAt: "Trexmin",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "7",
        title: "Flex Fitness",
        role: "Frontend Development",
        link: "https://flex-fitness.rohanthapa.com.np",
        image: "/works/flex-fitness.png",
        isActive: true,
        workedAt: "Flex Fitness",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "8",
        title: "Ambassador Club Nepal",
        role: "Frontend Development",
        link: "http://ambassadorsclubnepal.com/",
        image: "/works/ambassador.jpg",
        isActive: true,
        workedAt: "Ambassador Club",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "9",
        title: "Dr. Shekhar Koirala",
        role: "Fullstack Development",
        link: "https://drshekharkoirala.com/homepage",
        image: "/works/drshekhar.png",
        isActive: true,
        workedAt: "Dr. Shekhar",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "10",
        title: "Aafnai Immigration",
        role: "Frontend Development",
        link: "https://www.aafnaai.com/",
        image: "/works/aafnai.png",
        isActive: true,
        workedAt: "Aafnai",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "11",
        title: "Public Affairs Nepal",
        role: "Frontend Development",
        link: "https://public-affairs.vercel.app/",
        image: "/works/publicaffairs.png",
        isActive: true,
        workedAt: "Public Affairs",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

/**
 * Fetches About data from the API (server-side only)
 * Falls back to default data if API call fails
 */
export async function getAboutData(): Promise<AboutData> {
    try {
        const res = await fetch('https://portfolio.rohanthapa.com.np/about/active', {
            next: { revalidate: 60 }, // Revalidate every 5 minutes
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            // console.warn(`About API returned ${res.status}, using fallback data`);
            return defaultAboutData;
        }

        const data: AboutData[] = await res.json();
        return data[0] || defaultAboutData;
    } catch (error) {
        // console.error('Error fetching about data:', error);
        return defaultAboutData;
    }
}

/**
 * Fetches Projects data from the API (server-side only)
 * Falls back to default data if API call fails
 */
export async function getProjectsData(): Promise<ProjectData[]> {
    try {
        const res = await fetch('https://portfolio.rohanthapa.com.np/projects/active', {
            next: { revalidate: 60 }, // Revalidate every 5 minutes
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            // console.warn(`Projects API returned ${res.status}, using fallback data`);
            return defaultProjectsData;
        }

        const data: ProjectData[] = await res.json();
        return data.filter(project => project.isActive);
    } catch (error) {
        // console.error('Error fetching projects data:', error);
        return defaultProjectsData;
    }
}

export async function getResumeData(): Promise<ResumeData | undefined> {
    try {
        const res = await fetch('https://portfolio.rohanthapa.com.np/resume/active', {
            next: { revalidate: 60 }, // Revalidate every 5 minutes
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            // console.warn(`Resume API returned ${res.status}, using fallback data`);

        }

        const data: ResumeData[] = await res.json();
        return data[0];
    } catch (error) {
        // console.error('Error fetching resume data:', error);
    }
}
