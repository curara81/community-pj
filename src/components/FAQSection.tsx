
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const faqItems = [
  {
    question: "컴유니티는 어떤 단체인가요?",
    questionEn: "What is Comm.Unity?",
    answer: "컴유니티는 2025년에 설립된 비영리 사단법인으로, 다문화 가정과 취약계층을 위한 돌봄, 교육, 자립지원 활동을 합니다.",
    answerEn: "Comm.Unity is a nonprofit organization established in 2025, providing care, education, and self-reliance support for multicultural families and vulnerable communities.",
  },
  {
    question: "후원금은 어떻게 사용되나요?",
    questionEn: "How are donations used?",
    answer: "후원금은 난민 정착 지원, 취약계층 생활 돌봄, 자립준비청년 교육 프로그램 등에 투명하게 사용됩니다. 재정보고 페이지에서 확인하실 수 있습니다.",
    answerEn: "Donations are transparently used for refugee settlement support, vulnerable community care, and youth education programs. Details are available on our Financial Report page.",
  },
  {
    question: "자원봉사는 어떻게 참여하나요?",
    questionEn: "How can I volunteer?",
    answer: "동참하기 페이지에서 봉사 신청서를 작성해주시면 담당자가 연락드립니다. 번역/통역, 멘토링, 교육, 행정 등 다양한 분야에서 참여 가능합니다.",
    answerEn: "Fill out the volunteer form on our Volunteer page and our team will contact you. You can participate in translation, mentoring, education, administration, and more.",
  },
  {
    question: "기부금 영수증은 어떻게 받나요?",
    questionEn: "How do I get a donation receipt?",
    answer: "국세청 연말정산 간소화 서비스를 통해 자동으로 조회 가능합니다. 상단의 '기부금 영수증' 버튼을 참고해주세요.",
    answerEn: "You can check automatically through the NTS year-end tax settlement service. Please refer to the 'Donation Receipt' button at the top.",
  },
  {
    question: "컴유니티의 주요 사업은 무엇인가요?",
    questionEn: "What are Comm.Unity's main programs?",
    answer: "난민 정착 지원, 취약계층 긴급 돌봄, 자립준비청년 교육 및 멘토링, 지역사회 연대 프로그램 등을 운영하고 있습니다.",
    answerEn: "We operate refugee settlement support, emergency care for vulnerable groups, youth education and mentoring, and community solidarity programs.",
  },
];

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">
          {t("자주 묻는 질문", "Frequently Asked Questions")}
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-background rounded-lg border px-5"
            >
              <AccordionTrigger className="text-left text-sm md:text-base font-medium text-foreground hover:no-underline">
                {t(item.question, item.questionEn)}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(item.answer, item.answerEn)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
