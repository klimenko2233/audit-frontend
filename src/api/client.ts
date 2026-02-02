import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const auditService = {
    auditCode: async (code: string, contractName?: string) => {
        try {
            const response = await apiClient.post('/audit/code', {
                code,
                contractName,
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Ошибка сервера');
            } else if (error.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка при отправке запроса');
            }
        }
    },

    auditDeFiCode: async (code: string, contractName?: string) => {
        try {
            const response = await apiClient.post('/audit/defi', {
                code,
                contractName,
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Ошибка сервера');
            } else if (error.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка при отправке запроса');
            }
        }
    },

    auditFile: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await apiClient.post('/audit/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Ошибка сервера');
            } else if (error.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка при отправке файла');
            }
        }
    },

    getAuditHistory: async (page: number = 1, limit: number = 10) => {
        try {
            const response = await apiClient.get('/audit/history', {
                params: { page, limit },
            });
            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(error.response.data.message || 'Ошибка сервера');
            } else if (error.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка при получении истории');
            }
        }
    },
};