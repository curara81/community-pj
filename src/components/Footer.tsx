
import React, { memo } from 'react';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = memo(() => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-slate-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">{t("사단법인 컴유니티", "Comm.Unity")}</h3>
          <p className="text-slate-200 mb-6">
            <span className="hidden md:block">{t("난민과 취약계층을 위한 돌봄으로 하나 되는 사회를 만들어갑니다", "Building a united society through care for refugees and vulnerable groups")}</span>
            <span className="md:hidden">{t("난민과 취약계층을 위한 돌봄으로 하나 되는 사회를 만들어갑니다", "Building a united society through care for refugees and vulnerable groups")}</span>
          </p>
          
          {/* 정책 링크들 - 순서: 이용약관 | 개인정보처리방침 | 저작권정책 | 이메일무단수신거부 */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <LocationModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                {t("찾아오시는 길", "Directions")}
              </button>
            </LocationModal>
            <span className="text-slate-400">|</span>
            <Link to="/terms" className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
              {t("이용약관", "Terms of Service")}
            </Link>
            <span className="text-slate-400">|</span>
            <Link to="/privacy" className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
              {t("개인정보처리방침", "Privacy Policy")}
            </Link>
            <span className="text-slate-400">|</span>
            <CopyrightModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                {t("저작권정책", "Copyright Policy")}
              </button>
            </CopyrightModal>
            <span className="text-slate-400">|</span>
            <EmailRefusalModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                {t("이메일무단수신거부", "Email Opt-out")}
              </button>
            </EmailRefusalModal>
          </div>
          
          {/* 조직 정보 */}
          <div className="space-y-2 text-slate-300 text-sm mb-6">
            <p>{t("고유번호 130-82-19150 | 대표자 박종렬", "Registration No. 130-82-19150 | Representative Park Jong-ryul")}</p>
            <p>{t("주소 서울특별시 서초구 서초대로27길 15 3층", "Address 3F, 15 Seocho-daero 27-gil, Seocho-gu, Seoul, South Korea")}</p>
            <p>{t("전화 070-4667-2733 | 팩스 070-8650-2128", "Phone 070-4667-2733 | Fax 070-8650-2128")}</p>
            <p>{t("이메일문의 comm@comm-unity.or.kr", "Email comm@comm-unity.or.kr")}</p>
          </div>
          
          {/* 소셜미디어 링크 */}
          <div className="flex justify-center gap-5 mb-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube size={22} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors" aria-label="KakaoTalk">
              <MessageCircle size={22} />
            </a>
          </div>
          
          <p className="text-slate-400 text-sm">
            © 2025-2026 Comm.Unity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
