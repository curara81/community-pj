
import React, { memo } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

const CEOMessageSection = memo(() => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-gradient-to-br from-accent-lighter to-primary-lighter">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("대표자", "CEO's")} <span className="text-accent">{t("인사말", "Message")}</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="care-card rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="prose prose-xl max-w-none">
              <div className="text-muted-foreground leading-relaxed space-y-8">
                <p className="font-semibold text-xl text-foreground">{t("컴유니티는...", "Comm.Unity is...")}</p>
                
                <p className="text-lg">
                  {t(
                    "아마도 우리가 피부로 체감하고 있는 것은 코로나 팬더믹 이전과 이후의 삶의 구도가 빠르게 달라지고 있는 것일 겁니다. 국제사회 모든 영역에 빠른 변화들은 상상이상의 세계로 진입하도록 하였지만 한편으로는 변화에 떠밀려 나온 사람들의 어려운 삶의 형편이 더욱 심각해지고 있는 실정입니다.",
                    "What we are experiencing firsthand is that the structure of life before and after the COVID pandemic is rapidly changing. Rapid changes in all areas of international society have led us into an unimaginable world, but on the other hand, the difficult living conditions of people displaced by change are becoming more serious."
                  )}
                </p>
                
                <p className="text-lg">
                  {t(
                    "국가 간 분쟁과 내란으로 속출하고 있는 난민 문제는 이제 전 세계적 사회구조 변화의 기폭제가 되었으나 이를 외면하고 있는 상황이 지속된다면 우리 자녀세대의 미래는 더욱 불투명해 질 것입니다.",
                    "The refugee problem emerging from international conflicts and civil wars has now become a catalyst for global social structural change, but if we continue to turn away from this, the future of our children's generation will become even more uncertain."
                  )}
                </p>
                
                <p className="text-lg">
                  {t(
                    "컴유니티는 이런 시대적 현상을 외면할 수 없어 계속해서 발생하는 난민들의 어려움과 그 자녀들의 진로를 도와 국제 사회의 도움이 되는 지도자로 양성하려 합니다. 국내외에 널리 퍼져있는 이주, 난민들을 향한 진정성 있는 교육과 자립지원 돌봄으로 시대에 꼭 필요한 지도자들로 세우고자 합니다. 이제 국내적으로 급격한 인구감소로 인한 인재 부족과 국제적으로 잠재된 위기를 기회로 이끌어내는 노력들이 절실합니다.",
                    "Comm.Unity cannot ignore these contemporary phenomena and aims to help with the ongoing difficulties of refugees and their children's futures, nurturing them as leaders who can help international society. We seek to establish leaders essential for our times through sincere education and independence support care for migrants and refugees spread widely at home and abroad. Now, efforts to turn the domestic talent shortage due to rapid population decline and internationally latent crises into opportunities are urgently needed."
                  )}
                </p>
                
                <p className="text-lg">
                  {t(
                    "저희 컴유니티는 그동안의 경험을 살려 시대가 원하는 다음세대 국내외 지도자들을 양성하도록 하려합니다.",
                    "Our Comm.Unity aims to utilize our accumulated experience to nurture the next generation of domestic and international leaders that our times demand."
                  )}
                </p>
                
                <p className="text-lg">
                  {t("많은 관심과 협력을 부탁드립니다.", "We ask for your interest and cooperation.")}
                </p>
                
                <p className="text-lg mb-8">
                  {t("감사합니다.", "Thank you.")}
                </p>
                
                <div className="flex justify-end mt-8">
                  <img 
                    src="/lovable-uploads/cdab38ae-0da3-4207-ba17-3ee14e487d6c.png" 
                    alt={t("박종렬 대표 서명", "CEO Park Jong-ryeol's signature")}
                    className="h-20 object-contain mix-blend-multiply"
                    style={{ filter: 'contrast(1.2) brightness(0.8)' }}
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
