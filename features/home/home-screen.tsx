import { LANDING_LINKS } from "@/lib/constants/landing";

const HERO_INFO_CARDS = [
  { label: "Starting point", value: "Ingredients first" },
  { label: "Built for", value: "Quick home cooking" },
  { label: "Output style", value: "Practical recipes" },
] as const;

const PROBLEM_POINTS = [
  "People know what ingredients they have, but not what they can realistically cook.",
  "Most recipe products start from dish names instead of available ingredients.",
  "Users want quick ideas without scrolling through long recipe blogs.",
  "Leftover ingredients often go to waste because the next meal feels unclear.",
] as const;

const FEATURES = [
  {
    title: "Ingredient-first input",
    body: "Start with what is already in your kitchen, then shape the result around your real context.",
    mark: "01",
  },
  {
    title: "AI-powered suggestions",
    body: "Get practical recipe recommendations that balance available ingredients and realistic flavor combinations.",
    mark: "02",
  },
  {
    title: "Useful recipe details",
    body: "See clear servings, timing, and concise guidance so the decision feels easy instead of overwhelming.",
    mark: "03",
  },
  {
    title: "Save for later",
    body: "Keep useful ideas for your next meal so good recommendations stay available when you need them.",
    mark: "04",
  },
] as const;

const HOW_IT_WORKS_STEPS = [
  {
    title: "Enter your ingredients",
    body: "Add the ingredients already in your kitchen in a simple list.",
  },
  {
    title: "Choose cuisine and servings",
    body: "Set the meal direction and portion count for your household.",
  },
  {
    title: "Get practical recipe ideas",
    body: "Receive suggestions designed to be realistic for home cooking.",
  },
  {
    title: "Save useful recipes",
    body: "Bookmark strong options and revisit them when planning your next meal.",
  },
] as const;

const TECH_STACK = ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Recipe API", "AI Integration"];

export function HomeScreen() {
  return (
    <div className="relative overflow-x-clip pb-16">
      <section data-testid="cookable-hero" className="relative overflow-hidden px-4 pb-14 pt-14 md:px-6 md:pb-20 md:pt-18">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-14rem] top-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(176,137,104,0.24),_transparent_68%)]" />
          <div className="absolute right-[-10rem] top-8 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(201,123,99,0.16),_transparent_72%)]" />
          <div className="absolute bottom-[-15rem] left-1/4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(169,139,115,0.22),_transparent_72%)]" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex w-fit rounded-full border border-[#E4D3C3] bg-[#FFFDF9] px-4 py-1.5 text-xs font-semibold tracking-[0.01em] text-[#6F4A36] shadow-[0_8px_20px_rgba(91,58,41,0.08)]">
              AI-powered ingredient-first recipe assistant
            </p>

            <h1 className="mt-6 font-heading text-4xl leading-tight text-[#2E211B] md:text-5xl lg:text-[3.5rem]">
              Cook smarter with
              <span className="block text-[#8A6047]">what you already have.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6B5B52] md:text-lg">
              Cookable AI helps you turn available ingredients into practical recipes with the right cuisine, serving
              size, and useful cooking guidance for real everyday meals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={LANDING_LINKS.demo}
                data-testid="cookable-demo-button"
                className="inline-flex h-11 items-center rounded-2xl bg-[#5B3A29] px-5 text-sm font-semibold text-[#FFF9F4] shadow-[0_12px_28px_rgba(91,58,41,0.26)] transition hover:bg-[#4D3123]"
              >
                View Demo
              </a>
              <a
                href={LANDING_LINKS.github}
                target="_blank"
                rel="noreferrer"
                data-testid="cookable-github-button"
                className="inline-flex h-11 items-center rounded-2xl border border-[#D8C8B7] bg-[#FFFDF9] px-5 text-sm font-semibold text-[#5B3A29] transition hover:bg-[#F5EFE7]"
              >
                View GitHub
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {HERO_INFO_CARDS.map((item) => (
                <article
                  key={item.label}
                  className="rounded-3xl border border-[#E7D8C9] bg-[#FFFDF9] px-4 py-3 shadow-[0_10px_24px_rgba(91,58,41,0.07)]"
                >
                  <p className="text-xs font-medium text-[#8A7668]">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-[#5B3A29]">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border border-[#7E5442] bg-[linear-gradient(170deg,#5A3929_0%,#3B241A_58%,#241510_100%)] p-6 text-[#FFF9F4] shadow-[0_30px_70px_rgba(46,33,27,0.45)] md:p-7">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(201,123,99,0.34),_transparent_72%)]" />
              <div className="absolute -left-18 bottom-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(143,162,122,0.28),_transparent_72%)]" />
            </div>

            <div className="relative space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#DDB8A5]">Suggested recipe</p>
                <h2 className="mt-2 font-heading text-2xl leading-tight md:text-[1.9rem]">Soy Garlic Tofu Rice Bowl</h2>
                <span className="mt-3 inline-flex rounded-full border border-[#C97B63]/50 bg-[#C97B63]/14 px-3 py-1 text-xs font-semibold text-[#F8D9CB]">
                  Smart fit
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#8F6652] bg-[#FFF9F4]/7 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#E5CAB9]">Cuisine</p>
                  <p className="mt-1 text-sm font-semibold">Japanese</p>
                </div>
                <div className="rounded-2xl border border-[#8F6652] bg-[#FFF9F4]/7 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#E5CAB9]">Servings</p>
                  <p className="mt-1 text-sm font-semibold">2 servings</p>
                </div>
                <div className="rounded-2xl border border-[#8F6652] bg-[#FFF9F4]/7 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[#E5CAB9]">Time</p>
                  <p className="mt-1 text-sm font-semibold">25 min</p>
                </div>
              </div>

              <div className="rounded-3xl bg-[#FFF1E8] p-4 text-[#5B3A29] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                <p className="text-xs font-semibold uppercase tracking-[0.08em]">Why this fits</p>
                <p className="mt-2 text-sm leading-6 text-[#6B4D3F]">
                  This recommendation works because you already have the core ingredients, and the flavor profile stays
                  simple, balanced, and realistic for a weekday meal.
                </p>
              </div>

              <div className="rounded-3xl border border-[#8F6652] bg-[#A98B73]/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#F6E5D7]">Smart substitution</p>
                <p className="mt-2 text-sm leading-6 text-[#F3E4D7]">
                  No tofu available? Swap in egg, chicken, or mushrooms while keeping the same base flavor and cooking
                  flow.
                </p>
              </div>

              <div className="rounded-2xl border border-[#8F6652] bg-[#FFF9F4]/7 px-4 py-3 text-sm leading-6 text-[#F0E3D8]">
                <p className="font-semibold">Less waste, more useful ideas</p>
                <p>Built for real ingredients in real kitchens.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="cookable-problem" data-testid="cookable-problem" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-[#E7D8C9] bg-[#FFFDF9] px-4 py-1 text-xs font-semibold text-[#6F4A36]">
              Problem
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-[#2E211B] md:text-4xl">
              Cooking starts with ingredients, but most apps do not.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B5B52]">
              Cookable AI closes the gap between what you have on hand and what you can realistically cook now.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <article className="rounded-[2rem] bg-[linear-gradient(155deg,#6F4A36_0%,#5B3A29_48%,#3F281D_100%)] p-8 text-[#FFF9F4] shadow-[0_22px_45px_rgba(91,58,41,0.26)] md:p-10">
              <h3 className="font-heading text-3xl leading-tight">A smarter starting point for home cooking.</h3>
              <p className="mt-5 text-base leading-7 text-[#F6E8DD]">
                Most people do not need another recipe blog. They need a practical answer to one simple question:
                given what I already have, what can I cook right now?
              </p>
            </article>

            <div className="space-y-4">
              {PROBLEM_POINTS.map((point, index) => (
                <article
                  key={point}
                  className="flex gap-4 rounded-3xl border border-[#E7D8C9] bg-[#FFFDF9] p-4 shadow-[0_10px_24px_rgba(91,58,41,0.07)]"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#F5EFE7] text-sm font-semibold text-[#5B3A29]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-[#5B4B41] md:text-base">{point}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="cookable-features" data-testid="cookable-features" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-[#E7D8C9] bg-[#FFFDF9] px-4 py-1 text-xs font-semibold text-[#6F4A36]">
              Features
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-[#2E211B] md:text-4xl">
              Designed to feel useful quickly.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B5B52]">
              The product stays warm, clean, and focused so you can move from ingredients to meals without unnecessary
              friction.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-3xl border border-[#E7D8C9] bg-[#FFFDF9] p-6 shadow-[0_12px_24px_rgba(91,58,41,0.06)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(91,58,41,0.12)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[#F5EFE7] text-sm font-semibold text-[#5B3A29]">
                  {feature.mark}
                </span>
                <h3 className="mt-5 font-heading text-2xl leading-tight text-[#2E211B]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5B4B41] md:text-base">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cookable-how-it-works" data-testid="cookable-how-it-works" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-[#E7D8C9] bg-[#FFFDF9] px-4 py-1 text-xs font-semibold text-[#6F4A36]">
              How It Works
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-[#2E211B] md:text-4xl">
              A simple flow from ingredients to meals.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B5B52]">
              The journey is lightweight, clear, and practical so meal decisions take minutes, not endless searching.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <article
                key={step.title}
                className="rounded-3xl border border-[#E7D8C9] bg-[#FFFDF9] p-5 shadow-[0_10px_22px_rgba(91,58,41,0.06)]"
              >
                <p className="text-2xl font-semibold tracking-tight text-[#A98B73]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-heading text-xl leading-tight text-[#2E211B]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5B4B41]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cookable-tech-stack" data-testid="cookable-tech-stack" className="px-4 py-14 md:px-6 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-[#E7D8C9] bg-[#FFFDF9] px-4 py-1 text-xs font-semibold text-[#6F4A36]">
              Tech Stack
            </p>
            <h2 className="mt-5 font-heading text-3xl leading-tight text-[#2E211B] md:text-4xl">
              Built with a modern product stack.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#6B5B52]">
              The architecture is clean, scalable, and implementation-friendly for shipping a reliable consumer product.
            </p>
          </div>

          <article className="mx-auto mt-10 max-w-5xl rounded-[2rem] border border-[#E7D8C9] bg-[#FFFDF9] p-6 shadow-[0_14px_30px_rgba(91,58,41,0.08)] md:p-8">
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-[#D8C8B7] bg-[#F5EFE7] px-4 py-2 text-sm font-medium text-[#5B3A29]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section data-testid="cookable-final-cta" className="px-4 pt-8 md:px-6 md:pt-12">
        <div className="mx-auto w-full max-w-6xl rounded-[2.25rem] bg-[linear-gradient(165deg,#5A3929_0%,#2E1E18_62%,#1E1512_100%)] p-8 text-[#FFF9F4] shadow-[0_32px_65px_rgba(46,33,27,0.42)] md:p-12">
          <p className="inline-flex rounded-full border border-[#8F6652] bg-[#FFF9F4]/10 px-4 py-1 text-xs font-semibold text-[#F3DACB]">
            Cookable AI
          </p>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl leading-tight md:text-4xl">
            Ready to cook with what you already have?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#F1E2D7]">
            Start with ingredients on hand, pick your meal direction, and get practical ideas built for real home
            kitchens.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={LANDING_LINKS.demo}
              className="inline-flex h-11 items-center rounded-2xl bg-[#B08968] px-5 text-sm font-semibold text-[#2E211B] transition hover:bg-[#C39A79]"
            >
              Open Demo
            </a>
            <a
              href={LANDING_LINKS.contact}
              className="inline-flex h-11 items-center rounded-2xl border border-[#B08968]/70 px-5 text-sm font-semibold text-[#FFF9F4] transition hover:bg-[#FFF9F4]/10"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto mt-10 w-full max-w-6xl px-4 text-sm text-[#8A7668] md:px-6">
        <p>Cookable AI. Practical, ingredient-first cooking support.</p>
      </footer>
    </div>
  );
}
