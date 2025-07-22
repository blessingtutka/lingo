/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '../axios';
import type { AxiosResponse } from 'axios';

export const getCall = async (id: string): Promise<ApiResponse<Call>> => {
    try {
        const response: AxiosResponse<ApiResponse<Call>> = await axios.get(`/call/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching call');
    }
};

export const getUserCalls = async (): Promise<ApiResponse<Call[]>> => {
    try {
        const response: AxiosResponse<ApiResponse<Call[]>> = await axios.get(`/call/user/all`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching user calls');
    }
};

export const getUserContactCalls = async (contactId: string): Promise<ApiResponse<Call[]>> => {
    try {
        const response: AxiosResponse<ApiResponse<Call[]>> = await axios.get(`/call/user/contact/${contactId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching user-contact calls');
    }
};

export const getCallsByCaller = async (): Promise<ApiResponse<Call[]>> => {
    try {
        const response: AxiosResponse<ApiResponse<Call[]>> = await axios.get(`/call/user/caller`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching caller calls');
    }
};

export const getAllCalls = async (): Promise<ApiResponse<Call[]>> => {
    try {
        const response: AxiosResponse<ApiResponse<Call[]>> = await axios.get(`/call/`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error fetching all calls');
    }
};

export const deleteCall = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response: AxiosResponse<ApiResponse<null>> = await axios.delete(`/call/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error?.message || 'Error deleting call');
    }
};
