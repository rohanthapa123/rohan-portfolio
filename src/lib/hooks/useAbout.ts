import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api';
import { AboutData } from '@/types/api';

export const useAbout = () => {
    return useQuery({
        queryKey: ['about'],
        queryFn: async () => {
            const { data } = await apiClient.get<AboutData[]>('/about');
            return data[0]; // Always return the first item
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 2,
    });
};
