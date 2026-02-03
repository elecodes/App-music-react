import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from './authService';

describe('AuthService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        global.fetch = vi.fn();
    });

    it('register calls the correct endpoint and returns data on success', async () => {
        const mockResponse = { data: { id: '123' } };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const userData = { email: 'test@test.com', password: '123' };
        const result = await authService.register(userData);

        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:3001/api/auth/register',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify(userData),
            })
        );
        expect(result).toEqual(mockResponse);
    });

    it('login calls the correct endpoint and returns data on success', async () => {
         const mockResponse = { data: { token: 'abc' } };
         global.fetch.mockResolvedValueOnce({
             ok: true,
             json: async () => mockResponse,
         });
 
         const credentials = { email: 'test@test.com', password: '123' };
         const result = await authService.login(credentials);
 
         expect(global.fetch).toHaveBeenCalledWith(
             'http://localhost:3001/api/auth/login',
             expect.objectContaining({
                 method: 'POST',
                 body: JSON.stringify(credentials),
             })
         );
         expect(result).toEqual(mockResponse);
    });

    it('throws standardized error when API returns non-ok status', async () => {
        const mockErrorResponse = { message: 'Invalid credentials', errors: [] };
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        });

        await expect(authService.login({ email: 'a', password: 'b' }))
            .rejects
            .toThrow('Invalid credentials');
    });

    it('throws error with details when provided', async () => {
        const mockErrorResponse = { 
            message: 'Validation failed', 
            errors: [{ field: 'email', message: 'bad' }] 
        };
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => mockErrorResponse,
        });

        try {
            await authService.register({});
        } catch (error) {
            expect(error.message).toBe('Validation failed');
            expect(error.details).toEqual(mockErrorResponse.errors);
        }
    });

    it('uses default error message and details if missing in response', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({}), // Empty object
        });

        try {
            await authService.login({});
        } catch (error) {
            expect(error.message).toBe('Request failed');
            expect(error.details).toEqual([]);
        }
    });

    it('logs error to console when request fails completely', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch.mockRejectedValueOnce(new Error('Network Error'));

        await expect(authService.login({})).rejects.toThrow('Network Error');
        expect(consoleSpy).toHaveBeenCalledWith('Auth Service Error:', expect.any(Error));
    });
});
