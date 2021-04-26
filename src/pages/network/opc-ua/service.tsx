import request from '@/utils/request';

export async function list(params?: any) {
    return request(`/jetlinks/opc/client/_query`, {
        method: 'GET',
        params: params,
    });
}

export async function listNoPaging(params?: any) {
    return request(`/jetlinks/opc/client/_query/no-paging?paging=false`, {
        method: 'GET',
        params: params,
    });
}

export async function save(params: any) {
    return request(`/jetlinks/opc/client`, {
        method: 'POST',
        data: params,
    });
}

export async function updata(params: any) {
    return request(`/jetlinks/opc/client/${params.id}`, {
        method: 'PUT',
        data: params,
    });
}

export async function remove(id: string) {
    return request(`/jetlinks/opc/client/${id}`, {
        method: 'DELETE',
    });
}

export async function start(id: string) {
    return request(`/jetlinks/opc/client/${id}/_enable`, {
        method: 'POST',
    });
}

export async function stop(id: string) {
    return request(`/jetlinks/opc/client/${id}/_disable`, {
        method: 'POST',
    });
}

export async function getDeviceBindList(params: any) {
    return request(`/jetlinks/opc/device-bind/device-details/_query`, {
        method: 'GET',
        params
    });
}
export async function getDeviceBindListNoPaging(params: any) {
    return request(`/jetlinks/opc/device-bind/device-details/_query/no-paging?paging=false`, {
        method: 'GET',
        params
    });
}

export async function getDevicePointList(params: any) {
    return request(`/jetlinks/opc/device-bind/points/_query`, {
        method: 'GET',
        params
    });
}

export async function removeBind(id: string) {
    return request(`/jetlinks/device-instance/${id}`, {
        method: 'DELETE',
    });
}

export async function startBind(id: string) {
    return request(`/jetlinks/opc/device-bind/${id}/_enable`, {
        method: 'POST',
    });
}

export async function stopBind(id: string) {
    return request(`/jetlinks/opc/device-bind/${id}/_disable`, {
        method: 'POST',
    });
}

export async function savePoint(params: any) {
    return request(`/jetlinks/opc/device-bind/points`, {
        method: 'POST',
        data: params
    });
}

export async function clusterList() {
    return request(`jetlinks/cluster/nodes`, {
        method: 'GET'
    });
}

export async function saveOrUpdate(params: any) {
    return request(`/jetlinks/opc/device-bind/_create`, {
        method: 'PATCH',
        data: params,
    });
}

export async function saveDevice(params: any) {
    return request(`/jetlinks/opc/device-bind/_create`, {
        method: 'POST',
        data: params,
    });
}
