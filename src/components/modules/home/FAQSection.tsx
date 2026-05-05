import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need a prescription to buy medicines?",
    answer: "For prescription-only medicines, you must upload a valid prescription from a registered medical practitioner. Over-the-counter (OTC) medicines can be purchased without a prescription.",
  },
  {
    question: "How long does delivery take?",
    answer: "We offer 24/7 express delivery in major cities which typically takes 2-4 hours. Standard delivery takes 1-2 business days depending on your location.",
  },
  {
    question: "Are the medicines genuine?",
    answer: "Yes, 100%. We source all our medicines directly from authorized manufacturers and verified distributors to ensure complete authenticity and safety.",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 7 days of delivery for unopened and undamaged items. Please note that certain temperature-sensitive medicines cannot be returned for safety reasons.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you will receive a tracking link via email and SMS. You can also track your order status in real-time from your account dashboard.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Have questions? We're here to help. Check out our most common inquiries below.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border/50 rounded-2xl px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
