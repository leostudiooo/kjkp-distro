import { ProjectsData } from './types';

// 使用R2的get方法直接获取对象并返回临时访问URL
async function generateTemporaryUrl(bucket: R2Bucket, key: string, expiresIn: number): Promise<string> {
  // 检查对象是否存在
  const object = await bucket.get(key);
  if (!object) {
    throw new Error('Object not found');
  }
  
  // 由于R2没有内置签名URL，我们使用Worker作为代理
  // 实际生产环境中应该配置R2的public访问或使用Cloudflare Access
  return `https://kjkp-api.lilingfeng0408.workers.dev/proxy/${encodeURIComponent(key)}`;
}

export interface Env {
  RESOURCES: R2Bucket;
  KJKP_PROJECTS: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }



    // 搜索并获取下载链接
    if (url.pathname === '/api/search' && request.method === 'POST') {
      try {
        const body = await request.json() as { keyword: string, fileType: string };
        const { keyword, fileType } = body;

        if (!keyword || !fileType) {
          return new Response('Missing keyword or file type', { 
            status: 400,
            headers: corsHeaders
          });
        }

        // 验证文件类型
        if (!['wav', 'project', 'others'].includes(fileType)) {
          return new Response('Invalid file type', { 
            status: 400,
            headers: corsHeaders
          });
        }

        // 直接从KV获取单个项目数据
        const projectData = await env.KJKP_PROJECTS.get(keyword);
        if (!projectData) {
          return new Response('Project not found', { 
            status: 404,
            headers: corsHeaders
          });
        }

        const project = JSON.parse(projectData) as { wav: string; project: string; others?: string };
        
        const fileKey = fileType;
        const fileName = project[fileKey];
        
        if (!fileName) {
          return new Response('File not available', { 
            status: 404,
            headers: corsHeaders
          });
        }

        // 生成临时代理URL
        const downloadUrl = `https://kjkp-api.lilingfeng0408.workers.dev/proxy/${encodeURIComponent(fileName)}`;

        return new Response(JSON.stringify({ 
          downloadUrl,
          filename: fileName,
          projectName: keyword,
          fileType
        }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error generating signed URL:', error);
        return new Response('Internal server error', { 
          status: 500,
          headers: corsHeaders
        });
      }
    }

    // 代理R2文件（临时访问，15分钟有效期）
    if (url.pathname.startsWith('/proxy/') && request.method === 'GET') {
      try {
        const objectKey = decodeURIComponent(url.pathname.substring(7));
        
        const object = await env.RESOURCES.get(objectKey);
        if (!object) {
          return new Response('File not found', { 
            status: 404,
            headers: corsHeaders
          });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'private, max-age=900'); // 15分钟缓存
        
        return new Response(object.body, {
          headers: {
            ...Object.fromEntries(headers),
            ...corsHeaders
          }
        });
      } catch (error) {
        return new Response('Internal server error', { 
          status: 500,
          headers: corsHeaders
        });
      }
    }

    return new Response('Not found', { 
      status: 404,
      headers: corsHeaders
    });
  },
};