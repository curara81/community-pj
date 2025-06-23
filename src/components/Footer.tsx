
import React, { memo } from 'react';
import LocationModal from "./LocationModal";
import CopyrightModal from "./CopyrightModal";
import PrivacyModal from "./PrivacyModal";
import EmailRefusalModal from "./EmailRefusalModal";

const Footer = memo(() => {
  return (
    <footer className="bg-amber-800 text-amber-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">사단법인 컴유니티</h3>
          <p className="text-amber-200 mb-6">
            난민과 취약계층을 위한 돌봄으로 하나 되는 사회를 만들어갑니다
          </p>
          
          {/* 정책 링크들 */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <LocationModal>
              <button className="text-amber-200 hover:text-white text-sm underline">
                찾아오시는 길
              </button>
            </LocationModal>
            <span className="text-amber-400">|</span>
            <CopyrightModal>
              <button className="text-amber-200 hover:text-white text-sm underline">
                저작권정책
              </button>
            </CopyrightModal>
            <span className="text-amber-400">|</span>
            <PrivacyModal>
              <button className="text-amber-200 hover:text-white text-sm underline">
                개인정보처리방침
              </button>
            </PrivacyModal>
            <span className="text-amber-400">|</span>
            <EmailRefusalModal>
              <button className="text-amber-200 hover:text-white text-sm underline">
                이메일무단수신거부
              </button>
            </EmailRefusalModal>
          </div>
          
          {/* 조직 정보 */}
          <div className="space-y-2 text-amber-300 text-sm mb-6">
            <p>고유번호 130-82-19150 | 대표자 박종렬</p>
            <p>주소 서울특별시 서초구 서초대로27길 15 3층</p>
            <p>전화 070-4667-2733 | 팩스 070-8650-2128</p>
            <p>이메일문의 comm@comm-unity.or.kr</p>
          </div>
          
          <p className="text-amber-300 text-sm">
            © 2025 Comm.Unity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
