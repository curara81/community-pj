
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
  pageType?: 'website' | 'article' | 'profile';
}

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  canonicalUrl,
  structuredData,
  pageType = 'website'
}: SEOHeadProps) => {
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

    // Canonical URL 설정
    const updateCanonicalLink = (url: string) => {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    };

    // Hreflang 설정 (한국어)
    const updateHreflangLink = () => {
      let hreflang = document.querySelector('link[hreflang="ko"]') as HTMLLinkElement;
      if (!hreflang) {
        hreflang = document.createElement('link');
        hreflang.rel = 'alternate';
        hreflang.setAttribute('hreflang', 'ko');
        document.head.appendChild(hreflang);
      }
      hreflang.href = canonicalUrl || window.location.href;
    };

    // 기본 메타 태그 업데이트
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    
    // Open Graph 메타 태그 업데이트
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', pageType, true);
    updateMetaTag('og:url', canonicalUrl || window.location.href, true);
    if (ogImage) updateMetaTag('og:image', ogImage, true);
    
    // Twitter 메타 태그 업데이트
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) updateMetaTag('twitter:image', ogImage);

    // Canonical URL 설정
    if (canonicalUrl) {
      updateCanonicalLink(canonicalUrl);
    }

    // Hreflang 설정
    updateHreflangLink();

    // 구조화된 데이터 추가
    if (structuredData) {
      let structuredDataScript = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'structured-data';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, canonicalUrl, structuredData, pageType]);

  return null;
};

export default SEOHead;
