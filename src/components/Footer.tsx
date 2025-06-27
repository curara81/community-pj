
import React, { memo } from 'react';
import LocationModal from "./LocationModal";
import CopyrightModal from "./CopyrightModal";
import PrivacyModal from "./PrivacyModal";
import EmailRefusalModal from "./EmailRefusalModal";

const Footer = memo(() => {
  return (
    <footer className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 text-slate-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">사단법인 컴유니티</h3>
          <p className="text-slate-200 mb-6">
            <span className="hidden md:block">난민과 취약계층을 위한 돌봄으로 하나 되는 사회를 만들어갑니다</span>
            <span className="md:hidden">난민과 취약계층을 위한 돌봄으로<br />하나 되는 사회를 만들어갑니다</span>
          </p>
          
          {/* 정책 링크들 */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <LocationModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                찾아오시는 길
              </button>
            </LocationModal>
            <span className="text-slate-400">|</span>
            <CopyrightModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                저작권정책
              </button>
            </CopyrightModal>
            <span className="text-slate-400">|</span>
            <PrivacyModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                개인정보처리방침
              </button>
            </PrivacyModal>
            <span className="text-slate-400">|</span>
            <EmailRefusalModal>
              <button className="text-slate-300 hover:text-white text-sm underline hover:underline-offset-4 transition-all">
                이메일무단수신거부
              </button>
            </EmailRefusalModal>
          </div>
          
          {/* 조직 정보 */}
          <div className="space-y-2 text-slate-300 text-sm mb-6">
            <p>고유번호 130-82-19150 | 대표자 박종렬</p>
            <p>주소 서울특별시 서초구 서초대로27길 15 3층</p>
            <p>전화 070-4667-2733 | 팩스 070-8650-2128</p>
            <p>이메일문의 comm@comm-unity.or.kr</p>
          </div>
          
          <p className="text-slate-400 text-sm">
            © 2025 Comm.Unity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
