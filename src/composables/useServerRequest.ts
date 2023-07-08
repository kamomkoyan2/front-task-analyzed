import { ref } from 'vue';

export function useServerRequest() {
    const responseData = ref(null);
    const error = ref(null);
    const loading = ref(false);

    async function makeRequest(url, options = {}) {
        try {
            loading.value = true;
            const response = await fetch(url, options);
            responseData.value = await response.json();
            return responseData.value
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    return {
        responseData,
        error,
        loading,
        makeRequest,
    };
}
