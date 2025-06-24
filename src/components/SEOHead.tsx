
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  structuredData?: object;
}

const SEOHead = ({ title, description, keywords, ogImage, structuredData }: SEOHeadProps) => {
  useEffect(() => {
    // 페이지 제목 설정
    document.title = title;
    
    // 메타 태그 업데이트
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 기본 메타 태그 업데이트
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Open Graph 메타 태그 업데이트
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    if (ogImage) updateMetaTag('og:image', ogImage, true);
    
    // Twitter 메타 태그 업데이트
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) updateMetaTag('twitter:image', ogImage);

    // 구조화된 데이터 추가
    if (structuredData) {
      let structuredDataScript = document.querySelector('#structured-data');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'structured-data';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, structuredData]);

  return null;
};

export default SEOHead;
