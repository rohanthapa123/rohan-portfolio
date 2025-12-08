import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';
import { ProjectData } from '@/types/api';

export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await apiClient.get<ProjectData[]>('/projects');
            return data.filter(project => project.isActive); // Only return active projects
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
    });
};
