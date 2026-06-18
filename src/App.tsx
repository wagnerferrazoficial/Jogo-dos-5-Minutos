import React, { useState, useEffect } from "react";
import { 
  Check, 
  Lock, 
  Award, 
  Heart, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Activity, 
  ShieldCheck, 
  Instagram, 
  Youtube, 
  Facebook, 
  X, 
  QrCode, 
  CreditCard, 
  CheckCircle,
  HelpCircle,
  Coffee,
  Quote
} from "lucide-react";

export default function App() {
  // Price state
  const [ticketPrice] = useState("12,00");

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 59, seconds: 59 });

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"form" | "pix" | "success">("form");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", gateway: "pix" });
  const [pixCopied, setPixCopied] = useState(false);

  // Timer logic
  useEffect(() => {
    const TARGET_KEY = "lt_essential_target_time_v2";
    let targetTime = localStorage.getItem(TARGET_KEY);

    if (!targetTime) {
      const now = Date.now();
      const duration = (1 * 3600 + 59 * 60 + 59) * 1000;
      targetTime = String(now + duration);
      localStorage.setItem(TARGET_KEY, targetTime);
    }

    const timer = setInterval(() => {
      const now = Date.now();
      let diff = Number(targetTime) - now;

      if (diff <= 0) {
        const duration = (1 * 3600 + 59 * 60 + 59) * 1000;
        const newTarget = String(now + duration);
        localStorage.setItem(TARGET_KEY, newTarget);
        diff = duration;
      }

      const totalSec = Math.floor(diff / 1000);
      const hrs = Math.floor(totalSec / 3600);
      const mins = Math.floor((totalSec % 3600) / 60);
      const secs = totalSec % 60;

      setTimeLeft({ hours: hrs, minutes: mins, seconds: secs });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
    setCheckoutStep("form");
    
    try {
      // @ts-ignore
      if (typeof fbq !== "undefined") {
        // @ts-ignore
        fbq("track", "InitiateCheckout", {
          value: parseFloat(ticketPrice.replace(",", ".")),
          currency: "BRL"
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (formData.gateway === "pix") {
      setCheckoutStep("pix");
    } else {
      handleCompletePurchase();
    }
  };

  const handleCompletePurchase = () => {
    setCheckoutStep("success");
    try {
      // @ts-ignore
      if (typeof fbq !== "undefined") {
        // @ts-ignore
        fbq("track", "Purchase", {
          value: parseFloat(ticketPrice.replace(",", ".")),
          currency: "BRL",
          content_name: "Jogo dos 5 Minutos",
          content_category: "Educação Familiar"
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyPix = () => {
    setPixCopied(true);
    navigator.clipboard.writeText("00020101021126580014br.gov.bcb.pix0136cursoswagnerferraz@gmail.com520400005303986540512.005802BR5913MESA_A_DOIS6009RONDONIA62070503***6304D18C");
    setTimeout(() => setPixCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-montserrat text-brand-text antialiased selection:bg-brand-terracotta selection:text-white">
      
      {/* HEADER TIMER BANNER */}
      <div className="w-full bg-brand-sand/50 text-brand-brown py-4 px-4 border-b border-brand-sand/60 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-center">
        <div className="font-montserrat font-bold text-xs sm:text-sm uppercase tracking-wider">
          Esta oferta especial pode expirar em:
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm sm:text-base font-extrabold text-brand-terracotta bg-white/70 px-3 py-1 rounded-full shadow-sm border border-brand-sand">
          <span>{String(timeLeft.hours).padStart(2, "0")}h</span>
          <span className="animate-pulse">:</span>
          <span>{String(timeLeft.minutes).padStart(2, "0")}m</span>
          <span className="animate-pulse">:</span>
          <span>{String(timeLeft.seconds).padStart(2, "0")}s</span>
        </div>
      </div>

      {/* HERO SECTION (PRIMEIRA DOBRA) */}
      <main className="max-w-[1100px] mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: Imagem Ocupando 40% */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative max-w-sm md:max-w-full rounded-2xl overflow-hidden shadow-xl border border-brand-sand/40 aspect-[4/5] md:aspect-auto">
              <img 
                src="/src/assets/images/warm_couple_table_1781815238673.jpg" 
                alt="Casal conversando à mesa" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/60 to-transparent p-6 pt-16 text-center">
                <p className="font-playfair italic font-medium text-brand-bg text-base sm:text-lg md:text-xl tracking-wide select-none drop-shadow-sm">
                  "Uma conversa sincera sobre relacionamento."
                </p>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: Texto Ocupando 60% */}
          <div className="md:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand-sand text-brand-brown px-3 py-1.5 rounded-full font-montserrat font-semibold text-xs tracking-wider uppercase">
                <Heart className="h-3 w-3 text-brand-terracotta fill-brand-terracotta" />
                <span>Protocolo Conversa Sincera</span>
              </div>
              <h1 className="font-playfair font-bold text-brand-brown text-4xl sm:text-5xl lg:text-[48px] leading-tight tracking-tight">
                Vocês ainda moram juntos. <span className="text-brand-terracotta block md:inline">Mas parece que deixaram de se encontrar.</span>
              </h1>
            </div>

            <p className="font-montserrat text-brand-text text-lg sm:text-xl leading-relaxed max-w-2xl">
              Se você sente que seu relacionamento virou rotina, que as conversas desapareceram e que estão vivendo apenas como colegas... o <strong>Jogo dos 5 Minutos</strong> ajuda a reconstruir pequenas conexões diárias em 14 dias.
            </p>

            <div className="space-y-4 pt-2">
              {[
                "Apenas 5 minutos por dia, no seu tempo",
                "Sem discussões dolorosas ou cobranças cansativas",
                "PDF prático para baixar e usar hoje mesmo"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-neutral-700">
                  <span className="bg-brand-terracotta text-white rounded-full p-1 text-xs shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="font-montserrat font-medium text-base sm:text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button 
                onClick={() => scrollToSection("dobra-pricing")}
                className="w-full sm:max-w-[420px] h-[70px] bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-montserrat font-bold text-lg sm:text-xl rounded-xl shadow-md hover:shadow-lg transition-all uppercase tracking-wider flex items-center justify-center cursor-pointer"
              >
                QUERO COMEÇAR HOJE
              </button>
              
              <div className="flex items-center space-x-2 text-xs md:text-sm font-medium text-neutral-500 mt-4">
                <Lock className="h-4 w-4 text-brand-terracotta shrink-0" />
                <span>Acesso imediato e liberado diretamente no e-mail</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* SEÇÃO DA DOR (ALTERNAÇÃO: BRANCO) */}
      <section className="w-full bg-white border-y border-brand-sand/40 py-[70px] md:py-[100px] px-4 text-center">
        <div className="max-w-[1100px] mx-auto space-y-8">
          
          <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[36px] max-w-2xl mx-auto leading-tight">
            Quando foi que vocês deixaram de se olhar?
          </h2>

          <div className="font-montserrat text-brand-text text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto space-y-6">
            <p className="max-w-2xl mx-auto">
              Você olha para trás e percebe que o afastamento não aconteceu por grandes brigas, mas em pequenos silêncios do dia a dia.
            </p>
            <p className="max-w-2xl mx-auto font-medium text-brand-brown">
              Sem notar, as risadas desapareceram. Vocês de fato <strong className="text-brand-terracotta font-semibold">pararam de conversar</strong> e começaram a viver focados apenas na rotina comum de casa.
            </p>
            <p className="max-w-2xl mx-auto">
              Hoje, vocês moram na mesma casa, dormem no mesmo quarto, mas sentem profundamente que <strong className="text-brand-terracotta font-semibold">viraram colegas</strong> dividindo contas.
            </p>
            <p className="max-w-2xl mx-auto font-medium text-brand-brown">
              E o que mais dói é amar muito alguém e ainda assim sentir solidão, mesmo quando vocês <strong className="text-brand-terracotta font-semibold">continuam juntos</strong>.
            </p>
          </div>

          <div className="pt-6">
            <button 
              onClick={() => scrollToSection("dobra-pricing")}
              className="inline-flex items-center space-x-2 text-brand-terracotta hover:text-brand-terracotta-hover font-bold font-montserrat text-base sm:text-lg underline underline-offset-4 tracking-wider transition"
            >
              <span>Quero restaurar nossa cumplicidade</span>
              <Sparkles className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SEÇÃO BIG IDEA (ALTERNAÇÃO: BEGE #F8F4EE) */}
      <section className="w-full bg-brand-bg py-[70px] md:py-[100px] px-4 text-center">
        <div className="max-w-[1100px] mx-auto space-y-10">
          
          <div className="space-y-2">
            <span className="font-montserrat font-bold text-xs tracking-widest text-brand-terracotta uppercase">
              A grande verdade oculta
            </span>
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[40px] tracking-tight">
              A verdade que quase ninguém percebe
            </h2>
          </div>

          <div className="max-w-[800px] mx-auto bg-white border border-brand-sand/60 p-8 sm:p-14 rounded-3xl shadow-md space-y-8 relative overflow-hidden">
            <div className="absolute top-4 left-6 text-brand-sand opacity-30 select-none">
              <Quote className="h-16 w-16 rotate-180" />
            </div>

            <p className="font-playfair text-brand-brown text-3xl sm:text-[44px] leading-tight select-none">
              "O casamento não esfria na cama."
            </p>
            
            <div className="space-y-4">
              <p className="font-montserrat text-brand-text text-sm sm:text-base uppercase tracking-widest font-bold">
                Ele esfria muito antes:
              </p>
              <p className="font-playfair font-black text-brand-terracotta text-4xl sm:text-5xl lg:text-[52px] leading-none">
                Ele esfria na mesa.
              </p>
            </div>

            <div className="text-center font-montserrat text-brand-text text-base sm:text-lg leading-relaxed max-w-xl mx-auto pt-6 border-t border-brand-sand/40 space-y-3">
              <p>Esfria quando vocês param de compartilhar pequenos momentos de qualidade.</p>
              <p>Esfria quando a mesa do café da manhã ou jantar vira um espaço de silêncio ou conversas superficiais.</p>
              <p className="font-bold text-brand-brown">É exatamente aí que nasce a distância emocional.</p>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO MECANISMO (ALTERNAÇÃO: BRANCO) */}
      <section className="w-full bg-white border-y border-brand-sand/40 py-[70px] md:py-[100px] px-4">
        <div className="max-w-[1100px] mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="bg-brand-sand/60 text-[#3D3027] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Conexões Práticas e Seguras
            </span>
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[36px] tracking-tight leading-tight">
              O Método das Microconexões
            </h2>
            <p className="font-montserrat text-brand-text text-base sm:text-lg max-w-2xl mx-auto">
              Como reverter as barreiras invisíveis em apenas 5 minutos diários através de 4 passos simples, acolhedores e impossíveis de falhar:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto py-4">
            {[
              { 
                num: "01", 
                title: "Pergunta do Dia", 
                desc: "Perguntas de tom leve e descontraído para romper o gelo instantaneamente sem gerar qualquer tipo de tensão.",
                icon: HelpCircle 
              },
              { 
                num: "02", 
                title: "Régua Emocional", 
                desc: "Uma forma visual e acolhedora de entender como está a energia e os sentimentos de cada um no momento atual.",
                icon: Activity 
              },
              { 
                num: "03", 
                title: "Frase de Fechamento", 
                desc: "Palavras de validação que silenciosamente resgatam o carinho, a segurança de serem parceiros e a aceitação mútua.",
                icon: Sparkles 
              },
              { 
                num: "04", 
                title: "Tarefa Prática", 
                desc: "Um convite simples e suave para um ato de gentileza que continua agindo de forma imperceptível nas próximas 24 horas.",
                icon: Check 
              }
            ].map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="bg-brand-bg/50 border border-brand-sand/40 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="font-playfair font-bold text-brand-sand text-3xl">{step.num}</span>
                    <IconComp className="h-5 w-5 text-brand-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-bold text-brand-brown text-sm sm:text-base uppercase leading-tight">{step.title}</h4>
                    <p className="font-montserrat text-neutral-600 text-[13px] sm:text-xs mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center font-montserrat text-brand-brown text-base sm:text-lg font-semibold italic max-w-md mx-auto pt-4">
            Livre de DRs. Apenas uma reconexão natural.
          </p>

        </div>
      </section>

      {/* SEÇÃO DOS 14 DIAS (ALTERNAÇÃO: BEGE #F8F4EE) */}
      <section className="w-full bg-brand-bg py-[70px] md:py-[100px] px-4">
        <div className="max-w-[1100px] mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-brand-terracotta uppercase text-xs font-bold tracking-widest block">
              Uma Jornada Suave
            </span>
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[38px] tracking-tight">
              A Jornada de 14 Dias
            </h2>
            <p className="font-montserrat text-brand-text text-base sm:text-lg max-w-2xl mx-auto">
              Veja a estrutura sutil pela qual vocês passarão e que fará o clima em casa mudar rapidamente:
            </p>
          </div>

          {/* TIMELINE SIMPLIFICADA */}
          <div className="max-w-2xl mx-auto space-y-6 relative before:absolute before:inset-y-0 before:left-5 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-brand-sand">
            
            {[
              { 
                days: "DIAS 1 A 3", 
                title: "REAPROXIMAÇÃO", 
                desc: "Atividades criadas para romper o silêncio, dissipar a tensão da rotina e restabelecer um canal de riso e leveza espontânea." 
              },
              { 
                days: "DIAS 4 A 7", 
                title: "RECONHECIMENTO", 
                desc: "Estímulos simples para ajudar o casal a focar novamente nas qualidades reais do outro, que as obrigações diárias acabam escondendo." 
              },
              { 
                days: "DIAS 8 A 11", 
                title: "REVELAÇÃO", 
                desc: "Perguntas de tom emocional que abrem espaço seguro para compartilhar momentos e sentimentos adormecidos de forma leve." 
              },
              { 
                days: "DIAS 12 A 14", 
                title: "PACTO EMOCIONAL", 
                desc: "Um belíssimo diálogo final centrado no acolhimento, nos desejos do casal e nos pilares de união e bem-estar para o futuro." 
              }
            ].map((phase, idx) => (
              <div key={idx} className="relative flex flex-col sm:flex-row items-stretch gap-4 sm:gap-12 text-left">
                
                {/* Visual Dot on Timeline */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 top-4 w-3.5 h-3.5 rounded-full bg-brand-terracotta border-4 border-brand-bg z-10"></div>
                
                {/* Left block (Label on desktop, stacked on mobile) */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:text-right pr-4 pt-1 flex flex-col justify-start">
                  <span className="font-montserrat font-bold text-brand-terracotta text-sm tracking-widest">{phase.days}</span>
                  <h4 className="font-playfair font-bold text-brand-brown text-lg sm:text-xl uppercase mt-1">{phase.title}</h4>
                </div>
                
                {/* Right block (Description) */}
                <div className="w-full sm:w-1/2 pl-12 sm:pl-10 pt-1">
                  <p className="font-montserrat text-brand-text text-sm sm:text-base leading-relaxed max-w-sm">
                    {phase.desc}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SEÇÃO AUTORIDADE (ALTERNAÇÃO: BRANCO) */}
      <section className="w-full bg-white border-y border-brand-sand/40 py-[70px] md:py-[100px] px-4 text-center">
        <div className="max-w-[1100px] mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="font-montserrat font-semibold text-xs text-brand-terracotta uppercase tracking-[0.15em] block">
              Experiência Prática
            </span>
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[36px] tracking-tight">
              Conheça Wagner e Katia Ferraz
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-w-4xl mx-auto pt-4">
            
            {/* Foto Real */}
            <div className="w-[180px] sm:w-[220px] md:w-[260px] flex-shrink-0">
              <div className="aspect-square rounded-full overflow-hidden border-2 border-brand-sand p-1.5 shadow-md">
                <img 
                  src="https://i.postimg.cc/Zq8Rp6nF/LAYTOUT-CRIATIVOS-FEED.png" 
                  alt="Wagner e Katia Ferraz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
            </div>

            {/* Conteúdo Autoridade compactado */}
            <div className="text-left space-y-6 max-w-xl">
              <p className="font-montserrat text-brand-text text-base sm:text-lg leading-relaxed">
                Wagner Ferraz acompanha e orienta casais há mais de 23 anos. Pastor e sargento da polícia militar, dedica sua vida a fortalecer as famílias e blindar lares através de metodologias altamente humanizadas e práticas.
              </p>

              {/* 3 Pilares Visuais Simples */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "👮 Sargento PM" },
                  { label: "✝ Pastor" },
                  { label: "👨‍👩‍👧‍👦 30 Anos de Casados" }
                ].map((pilar, i) => (
                  <div key={i} className="bg-brand-bg border border-brand-sand/50 px-4 py-2 text-center rounded-xl font-montserrat text-[13px] font-bold text-brand-brown text-nowrap">
                    {pilar.label}
                  </div>
                ))}
              </div>

              <p className="font-playfair font-bold text-brand-brown text-lg italic border-l-2 border-brand-terracotta pl-4">
                "Não criamos fórmulas mágicas. Oferecemos apenas um roteiro seguro, simples e extremamente humano para resgatar a conexão diária."
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SEÇÃO OFERTA (ALTERNAÇÃO: BEGE #F8F4EE) */}
      <section id="dobra-pricing" className="w-full bg-brand-bg py-[70px] md:py-[100px] px-4 text-center">
        <div className="max-w-[1100px] mx-auto space-y-10">
          
          <div className="space-y-3">
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[36px] tracking-tight">
              Quanto vale recuperar a conexão?
            </h2>
            <p className="font-montserrat text-brand-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Quanto vale voltar a conversar livre de cobranças, se sentir admirada pela pessoa que você escolheu caminhar junto e ver a solidez voltar ao lar?
            </p>
          </div>

          {/* Box de Compra Central com Largura de 700px */}
          <div className="max-w-[700px] w-full bg-white border border-brand-sand/60 rounded-3xl p-6 sm:p-12 mx-auto shadow-xl space-y-8 text-center text-brand-brown">
            
            <p className="font-montserrat text-brand-text text-base sm:text-lg font-medium">
              Hoje você não precisa investir em mentorias ou terapias complexas de centenas de reais.
            </p>

            {/* FATOR VALORIZAÇÃO: MOCKUP DO LIVRO / JOGO */}
            <div className="my-6 max-w-[280px] sm:max-w-[340px] mx-auto rounded-2xl overflow-hidden border border-brand-sand shadow-inner bg-brand-bg p-3">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-md bg-white">
                <img 
                  src="/src/assets/images/product_mockup_1781816422876.jpg" 
                  alt="Mockup do Livro Jogo dos 5 Minutos" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <span className="block text-[11px] font-montserrat font-extrabold text-brand-terracotta tracking-wider uppercase mt-3">
                📖 MATERIAL DIGITAL EM PDF ENTREGUE NA HORA
              </span>
            </div>

            {/* Itens Incluídos no Box */}
            <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto py-3">
              {[
                "PDF Original Completo",
                "Metodologia 14 Dias",
                "Aplicação Imediata",
                "Garantia Incondicional"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-neutral-700 text-[13px] sm:text-sm font-semibold">
                  <Check className="h-4 w-4 text-brand-terracotta shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Risca preço */}
            <div className="text-neutral-400 font-mono text-xs sm:text-sm line-through space-y-1">
              <p>De R$ 97,00</p>
              <p>Por R$ 27,00</p>
            </div>

            {/* Preço de R$ 12,00 em fonte gigante de 64px e Terracota */}
            <div className="py-2">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-1">Taxa única — Oferta especial de lançamento</span>
              <p className="font-montserrat font-extrabold text-brand-terracotta text-6xl sm:text-[64px] tracking-tight leading-none">
                R$ {ticketPrice}
              </p>
              <p className="text-neutral-400 text-xs mt-3 uppercase tracking-wider font-bold">
                Sem mensalidades ou surpresas adicionais.
              </p>
            </div>

            {/* Botão de Compra Terracota */}
            <div className="pt-2 max-w-md mx-auto">
              <a 
                href="https://pay.kiwify.com.br/IQBNlJu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-[64px] bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-montserrat font-bold text-lg sm:text-xl rounded-2xl shadow-md hover:shadow-lg transition uppercase tracking-wider inline-flex items-center justify-center"
              >
                SIM, QUERO COMEÇAR HOJE
              </a>
            </div>

            {/* Selo Simples de Garantia Exclusivo sem marketing exagerado */}
            <div className="pt-6 border-t border-brand-sand/40 max-w-lg mx-auto flex flex-col sm:flex-row items-center gap-4 text-left text-neutral-600">
              <div className="bg-brand-sand/40 p-2.5 rounded-full text-brand-terracotta uppercase text-xs font-bold shrink-0">
                🛡 GARANTIA
              </div>
              <p className="font-montserrat text-[13px] sm:text-sm leading-relaxed text-neutral-500">
                <strong>Faça os 14 dias completos.</strong> Se não perceber nenhum valor real para a sua relação, solicite o reembolso imediato dentro do prazo de garantia de 14 dias.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA FINAL (ALTERNAÇÃO: BRANCO) */}
      <section className="w-full bg-white py-[70px] md:py-[100px] px-4 text-center">
        <div className="max-w-[1100px] mx-auto space-y-10">
          
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-playfair font-bold text-brand-brown text-3xl sm:text-4xl md:text-[40px] leading-tight max-w-3xl mx-auto">
              Talvez vocês não precisem de uma nova chance.
            </h2>
            <p className="font-playfair text-brand-terracotta text-2xl sm:text-3xl max-w-2xl mx-auto italic font-medium">
              Talvez precisem apenas de um novo momento.
            </p>
          </div>

          <div className="font-montserrat text-brand-text text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto space-y-3 pb-8 border-b border-brand-sand/30">
            <p>Cinco minutos.</p>
            <p>Uma mesa.</p>
            <p>Duas cadeiras.</p>
            <p>Uma pergunta.</p>
            <p className="font-bold text-brand-brown">E a oportunidade preciosa de voltar a se enxergar.</p>
            <p className="font-semibold text-brand-terracotta text-lg sm:text-xl uppercase tracking-wider pt-4">Antes do dia 7 algo muda.</p>
          </div>

          {/* Botão Gigante Terracota */}
          <div className="pt-4 max-w-xl mx-auto">
            <button 
              onClick={() => scrollToSection("dobra-pricing")}
              className="w-full h-[74px] bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-montserrat font-bold text-base sm:text-lg md:text-xl rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer uppercase tracking-wider inline-flex items-center justify-center px-4"
            >
              QUERO RECEBER O JOGO DOS 5 MINUTOS AGORA
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER SEM EMPRESARIAL OU CNPJ, APENAS REDES SOCIAIS E WHATSAPP NO ESTILO CORRETO */}
      <footer className="bg-brand-brown text-brand-bg py-12 px-4 text-center border-t border-brand-sand/20">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6">
          
          {/* Conexão Social */}
          <div className="space-y-4">
            <div className="text-brand-sand font-montserrat uppercase text-xs tracking-widest font-semibold">
              CONECTE-SE NAS REDES:
            </div>
            <div className="flex justify-center items-center space-x-4">
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/wagnerferrazoficial?igsh=MTNwdnFsYTZ1OHQxcA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full hover:text-brand-terracotta transition-colors"
                title="Instagram Oficial"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com/@wagnerferrazoficial?si=rzYUbv35eSbkWl89" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full hover:text-brand-terracotta transition-colors"
                title="Canal do YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/wagnerferrazoficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full hover:text-brand-terracotta transition-colors"
                title="Facebook Oficial"
              >
                <Facebook className="h-5 w-5" />
              </a>

              {/* WhatsApp Support Icon Direct to Support with requested message */}
              <a 
                href="https://wa.me/5569992294953?text=Quero%20saber%20mais%20sobre%20o%20Jogo%20de%205%20Minutos%20para%20Casais%3F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-[#25D366] p-3 rounded-full hover:bg-white/30 transition-colors"
                title="Suporte WhatsApp"
              >
                <MessageCircle className="h-5 w-5 fill-[#25D366] text-[#25D366]" />
              </a>

            </div>
            <p className="font-montserrat text-xs text-brand-sand/60 uppercase tracking-widest mt-1">
              @wagnerferrazoficial
            </p>
          </div>

        </div>
      </footer>

      {/* INTERACTIVE COMPACT SINGLE STEP CHECKOUT DIALOG (Elegante & Premium) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-brand-brown/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-brand-brown rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-brand-sand">
            
            {/* Fechar botão */}
            <button 
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-brand-brown bg-brand-bg p-1.5 rounded-full cursor-pointer transition border border-brand-sand"
            >
              <X className="h-5 w-5" />
            </button>

            {/* HEADER */}
            <div className="p-6 bg-brand-bg border-b border-brand-sand flex items-center space-x-3">
              <span className="p-2 bg-brand-terracotta text-white rounded-xl">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-montserrat font-extrabold text-sm uppercase text-brand-brown tracking-wider">Checkout Seguro & Humano</h3>
                <p className="text-xs text-neutral-500 font-montserrat">Em instantes, receba o Jogo no seu e-mail</p>
              </div>
            </div>

            {/* CONTENT STEP 1: FORM */}
            {checkoutStep === "form" && (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                
                {/* Resumo do Pedido */}
                <div className="bg-brand-bg p-4 rounded-xl border border-brand-sand/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-montserrat font-bold tracking-wider text-neutral-500">Produto selecionado</span>
                    <h5 className="font-montserrat font-bold text-sm text-brand-brown">Jogo dos 5 Minutos</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-montserrat font-bold tracking-wider text-neutral-500">Apenas</span>
                    <h5 className="font-montserrat font-extrabold text-base text-brand-terracotta">R$ {ticketPrice}</h5>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div>
                    <label className="block text-[11px] font-montserrat font-bold uppercase text-neutral-500 mb-1">Nome Completo:</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome" 
                      className="w-full bg-brand-bg/50 border border-brand-sand text-brand-brown rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta font-montserrat"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-montserrat font-bold uppercase text-neutral-500 mb-1">E-mail para entrega:</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ex: seuemail@gmail.com" 
                      className="w-full bg-brand-bg/50 border border-brand-sand text-brand-brown rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta font-montserrat"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-montserrat font-bold uppercase text-neutral-500 mb-1">WhatsApp de Suporte (DDD):</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ex: (69) 99229-4953" 
                      className="w-full bg-brand-bg/50 border border-brand-sand text-brand-brown rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-terracotta font-montserrat"
                    />
                  </div>
                </div>

                {/* Forma de pagamento */}
                <div className="space-y-2 text-left">
                  <label className="block text-[11px] font-montserrat font-bold uppercase text-neutral-500">Forma de Pagamento:</label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Pix Option */}
                    <label className={`border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition ${formData.gateway === "pix" ? "border-brand-terracotta bg-brand-bg text-brand-terracotta" : "border-brand-sand text-brand-brown bg-white"}`}>
                      <div className="flex items-center space-x-2">
                        <QrCode className="h-4 w-4 shrink-0" />
                        <span className="font-montserrat font-bold text-xs uppercase">PIX</span>
                      </div>
                      <input 
                        type="radio" 
                        name="payment-method" 
                        checked={formData.gateway === "pix"} 
                        onChange={() => setFormData({ ...formData, gateway: "pix" })}
                        className="sr-only" 
                      />
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${formData.gateway === "pix" ? "border-brand-terracotta" : "border-neutral-300"}`}>
                        {formData.gateway === "pix" && <div className="h-2 w-2 bg-brand-terracotta rounded-full"></div>}
                      </div>
                    </label>

                    {/* Cartão Option */}
                    <label className={`border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition ${formData.gateway === "card" ? "border-brand-terracotta bg-brand-bg text-brand-terracotta" : "border-brand-sand text-brand-brown bg-white"}`}>
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 shrink-0" />
                        <span className="font-montserrat font-bold text-xs uppercase">Cartão</span>
                      </div>
                      <input 
                        type="radio" 
                        name="payment-method" 
                        checked={formData.gateway === "card"} 
                        onChange={() => setFormData({ ...formData, gateway: "card" })}
                        className="sr-only" 
                      />
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${formData.gateway === "card" ? "border-brand-terracotta" : "border-neutral-300"}`}>
                        {formData.gateway === "card" && <div className="h-2 w-2 bg-brand-terracotta rounded-full"></div>}
                      </div>
                    </label>

                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-montserrat font-bold py-4 rounded-xl shadow-md transition uppercase cursor-pointer text-sm"
                >
                  Confirmar e Finalizar
                </button>

                <p className="text-[10px] text-neutral-400 font-montserrat text-center uppercase tracking-wide">
                  🔐 Proteção de dados e privacidade garantidos
                </p>
              </form>
            )}

            {/* CONTENT STEP 2: PIX */}
            {checkoutStep === "pix" && (
              <div className="p-6 space-y-6 text-center">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-montserrat font-bold text-brand-terracotta">Aguardando Pagamento</span>
                  <h4 className="font-playfair font-bold text-xl text-brand-brown">Efetuar pagamento por PIX</h4>
                </div>

                {/* QR Code */}
                <div className="bg-white p-4 inline-block rounded-2xl shadow-md mx-auto border border-brand-sand/60">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=cursoswagnerferraz@gmail.com`} 
                    alt="QR Code de Pagamento"
                    className="w-40 h-40"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 font-montserrat max-w-sm mx-auto">
                    Copie a chave aleatória Pix abaixo para efetuar o pagamento instantâneo do valor de R$ {ticketPrice} no app de seu banco.
                  </p>
                  
                  {/* Copy input */}
                  <div className="flex bg-brand-bg p-2.5 rounded-xl border border-brand-sand items-center justify-between">
                    <span className="text-xs font-mono font-bold truncate text-brand-brown pr-2 select-all">
                      cursoswagnerferraz@gmail.com
                    </span>
                    <button 
                      type="button" 
                      onClick={handleCopyPix}
                      className="bg-brand-terracotta hover:bg-brand-terracotta-hover text-white font-montserrat font-bold text-xs py-2 px-4 rounded-lg flex-shrink-0 cursor-pointer"
                    >
                      {pixCopied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleCompletePurchase}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-montserrat font-bold text-center py-4 rounded-xl shadow-md uppercase transition cursor-pointer text-sm"
                >
                  Já fiz o pagamento
                </button>
              </div>
            )}

            {/* CONTENT STEP 3: SUCCESS OVERLAY */}
            {checkoutStep === "success" && (
              <div className="p-8 text-center space-y-6">
                <div className="inline-flex bg-brand-bg/80 p-4 rounded-full border border-brand-sand text-brand-terracotta">
                  <CheckCircle className="h-12 w-12 text-brand-terracotta animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-montserrat font-bold text-brand-terracotta tracking-widest uppercase">Pagamento Aprovado!</span>
                  <h3 className="font-playfair font-bold text-2xl text-brand-brown">Parabéns, {formData.name.split(" ")[0]}!</h3>
                  <p className="text-sm text-neutral-600 font-montserrat leading-relaxed max-w-sm mx-auto">
                    O seu acesso completo ao <strong>Jogo dos 5 Minutos</strong> foi gerado e enviado para <strong>{formData.email}</strong>.
                  </p>
                </div>

                <div className="bg-brand-bg p-4 rounded-xl border border-brand-sand space-y-3 text-left leading-relaxed">
                  <h5 className="font-montserrat font-bold text-xs uppercase text-brand-brown">Passos importantes para começar:</h5>
                  <ul className="text-xs text-neutral-500 font-montserrat space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-brand-terracotta font-bold">1.</span>
                      <span>Acesse a sua caixa de entrada e confira também o lixo eletrônico ou spam.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-brand-terracotta font-bold">2.</span>
                      <span>Baixe ou imprima o seu material em PDF para usá-lo com seu parceiro.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <a 
                    href="https://wa.me/5569992294953?text=Quero%20saber%20mais%20sobre%20o%20Jogo%20de%205%20Minutos%20para%20Casais%3F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-3.5 px-4 rounded-xl font-montserrat font-bold text-xs sm:text-sm hover:scale-102 transition inline-flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>DÚVIDAS? SUPORTE</span>
                  </a>
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="flex-1 bg-brand-sand hover:bg-neutral-200 text-brand-brown py-3.5 px-4 rounded-xl font-montserrat font-bold text-xs"
                  >
                    CONCLUÍDO
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
