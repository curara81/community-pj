
const Footer = () => {
  return (
    <footer className="bg-amber-800 text-amber-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">사단법인 컴유니티</h3>
          <p className="text-amber-200 mb-6">
            난민과 취약계층을 위한 돌봄으로 하나 되는 사회를 만들어갑니다
          </p>
          
          {/* 조직 정보 */}
          <div className="space-y-2 text-amber-300 text-sm mb-6">
            <p>고유번호 130-82-19150 | 대표자 박종렬</p>
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
};

export default Footer;
