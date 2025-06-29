/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../axios';
import type { AxiosResponse } from 'axios';

export const getSummaryByCallId = async (callId: string): Promise<ApiResponse<Summary>> => {
    try {
        const response: AxiosResponse<ApiResponse<Summary>> = await axios.get(`/summary/${callId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching summary');
    }
};

export const createSummary = async (callId: string, content: string): Promise<ApiResponse<Summary>> => {
    try {
        const response: AxiosResponse<ApiResponse<Summary>> = await axios.post(`/summary/create`, {
            callId,
            content,
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error creating summary');
    }
};

export const deleteSummary = async (callId: string): Promise<ApiResponse<null>> => {
    try {
        const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`/summary/delete/${callId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error deleting summary');
    }
};
