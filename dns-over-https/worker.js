// SPDX-License-Identifier: 0BSD

const doh = 'https://security.cloudflare-dns.com/dns-query';
const contype = 'application/dns-message';
const jstontype = 'application/dns-json';
const r404 = new Response(null, { status: 404 });

export default {
    async fetch(request) {
        return handleRequest(request);
    },
};

async function handleRequest(request) {
    let response = r404;
    const { method, headers, url } = request;
    const searchParams = new URL(url).searchParams;
    
    if (method === 'GET' && searchParams.has('dns')) {
        const dohUrl = new URL(doh);
        dohUrl.searchParams.append('dns', searchParams.get('dns'));
        response = await fetch(dohUrl, { method: 'GET', headers: { 'Accept': contype } });
    } else if (method === 'POST' && headers.get('content-type') === contype) {
        const requestBody = await request.arrayBuffer();
        response = await fetch(doh, {
            method: 'POST',
            headers: {
                'Accept': contype,
                'Content-Type': contype,
            },
            body: requestBody,
        });
    } else if (method === 'GET' && headers.get('Accept') === jstontype) {
        const dohJsonUrl = new URL(doh);
        dohJsonUrl.search = url.search;
        response = await fetch(dohJsonUrl, { method: 'GET', headers: { 'Accept': jstontype } });
    }
    
    return response;
}