
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
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">박종렬 대표</h3>
              <p className="text-blue-600 font-medium">사단법인 컴유니티</p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p className="font-semibold text-lg text-gray-800">컴유니티는...</p>
                
                <p>
                  아마도 우리가 피부로 체감하고 있는 것은 코로나 팬더믹 이전과 
                  이후의 삶의 구도가 빠르게 달라지고 있는 것일 겁니다. 
                  국제사회 모든 영역에 빠른 변화들은 상상이상의 세계로 진입하도록 하였지만 
                  한편으로는 변화에 떠밀려 나온 사람들의 어려운 삶의 형편이 더욱 심각해지고 있는 
                  실정입니다.
                </p>
                
                <p>
                  국가 간 분쟁과 내란으로 속출하고 있는 난민 문제는 
                  이제 전 세계적 사회구조 변화의 기폭제가 되었으나 이를 외면하고 있는 상황이 지속된다면 우리 자녀세대의 미래는 더욱 불투명해 질 것입니다.
                </p>
                
                <p>
                  컴유니티는 이런 시대적 현상을 외면할 수 없어 계속해서 발생하는 난민들의 어려움과 그 자녀들의 진로를 도와 국제 사회의 도움이 되는 지도자로 양성하려 합니다. 
                  국내외에 널리 퍼져있는 이주, 난민들을 향한 진정성 있는 교육과 자립지원 돌봄으로 
                  시대에 꼭 필요한 지도자들로 세우고자 합니다. 
                  이제 국내적으로 급격한 인구감소로 인한 인재 부족과 국제적으로 잠재된 위기를 기회로 이끌어내는 노력들이 절실합니다.
                </p>
                
                <p>
                  저희 컴유니티는 그동안의 경험을 살려 시대가 원하는 다음세대 국내외 지도자들을 양성하도록 하려합니다.
                </p>
                
                <p>
                  많은 관심과 협력을 부탁드립니다.
                </p>
                
                <p className="mb-8">
                  감사합니다.
                </p>
                
                <div className="flex flex-col items-end mt-8">
                  <p className="text-gray-800 font-medium mb-2">대표자 박종렬</p>
                  <img 
                    src="/lovable-uploads/a6a6644d-12fb-40f2-9a22-c01f779b0973.png" 
                    alt="박종렬 대표 서명" 
                    className="h-12 object-contain"
                  />
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
