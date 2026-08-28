import SubmitArticleForm from '../components/SubmitArticleForm';

export default function SubmitArticle() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-line bg-plum-deep text-paper">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-20">
          <div className="eyebrow !text-gold">
            <span className="before:bg-gold">Contribute</span>
          </div>
          <h1 className="text-4xl sm:text-5xl mt-4 text-paper">Submit an Article</h1>
          <p className="mt-4 text-lg opacity-75 max-w-lg">
            Share your research, perspectives, and stories with an international
            audience of young thinkers.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-14 items-start">
          {/* Intro */}
          <div>
            <div className="eyebrow mb-3">In Your Words</div>
            <h2 className="text-2xl sm:text-3xl mb-4">
              Share your perspective
            </h2>
            <p className="text-[15.5px] opacity-80 max-w-[40ch] mb-6 leading-relaxed">
              The Journal of Youth Perspectives welcomes submissions from young
              writers, researchers, and thinkers worldwide. Whether you're
              exploring human rights, ecology, or gender equality — we want to
              hear from you.
            </p>

            <ul className="list-none space-y-0">
              <li className="text-[14.5px] opacity-85 py-2.5 pl-6 relative border-t border-line first:border-t-0 before:content-['—'] before:absolute before:left-0 before:text-gold before:font-semibold">
                All submissions are reviewed before publication
              </li>
              <li className="text-[14.5px] opacity-85 py-2.5 pl-6 relative border-t border-line before:content-['—'] before:absolute before:left-0 before:text-gold before:font-semibold">
                We'll contact you via email with our decision
              </li>
              <li className="text-[14.5px] opacity-85 py-2.5 pl-6 relative border-t border-line before:content-['—'] before:absolute before:left-0 before:text-gold before:font-semibold">
                Your name and email are saved locally for convenience
              </li>
              <li className="text-[14.5px] opacity-85 py-2.5 pl-6 relative border-t border-line before:content-['—'] before:absolute before:left-0 before:text-gold before:font-semibold">
                Articles should be original and thoughtful
              </li>
            </ul>
          </div>

          {/* Form */}
          <SubmitArticleForm />
        </div>
      </div>
    </div>
  );
}
