export interface AboutData {
    id: string;
    title: string;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectData {
    id: string;
    title: string;
    role: string;
    image: string;
    link: string;
    isActive: boolean;
    workedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface ResumeData {
    id: string;
    title: string;
    pdfFile: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}