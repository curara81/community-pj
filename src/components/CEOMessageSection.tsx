
import React, { memo } from 'react';

const CEOMessageSection = memo(() => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              대표자 <span className="text-blue-700">인사말</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="care-card rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 대표자 사진 영역 */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm text-center">
                    대표자<br />사진
                  </span>
                </div>
              </div>
              
              {/* 인사말 내용 */}
              <div className="flex-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">박종렬 대표</h3>
                  <p className="text-blue-600 font-medium">사단법인 컴유니티</p>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <em className="text-gray-500 text-sm">
                      * 대표자 인사말이 준비 중입니다. 곧 따뜻한 메시지로 찾아뵙겠습니다.
                    </em>
                  </p>
                  
                  {/* 임시 인사말 공간 */}
                  <div className="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                    <p className="text-gray-600 italic">
                      "여기에 대표자 인사말이 들어갈 예정입니다. 컴유니티의 비전과 사명, 그리고 난민과 취약계층을 향한 따뜻한 마음을 담은 메시지가 곧 업데이트됩니다."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CEOMessageSection.displayName = 'CEOMessageSection';

export default CEOMessageSection;
