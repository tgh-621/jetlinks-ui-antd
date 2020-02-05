import request from "@/utils/request";

export async function debug(params: any) {
    return request('/jetlinks/rule-engine/debug', {
        method: 'POST',
        data: params,
    });
}

export async function debugNode(id: string, params: any) {
    return request(`/jetlinks/rule-engine/debug/${id}`, {
        method: 'POST',
        data: params,
    });
}

export async function debugResult(id: string, result: string, params: any) {
    return request(`/jetlinks/rule-engine/debug/${id}/${result}`, {
        method: 'POST',
        data: params,
    });
}

export async function closeDebug(id: string) {
    return request(`/jetlinks/rule-engine/debug/${id}`, {
        method: 'DELETE',
    });
}

export async function debugContext(id: string) {
    return request(`/jetlinks/rule-engine/debug/${id}/contexts`, {
        method: 'GET',
    });
}

export async function stopNodeDebug(id: string, nodeId: string) {
    return request(`/jetlinks/rule-engine/debug/${id}/${nodeId}`, {
        method: 'DELETE',
    });
}