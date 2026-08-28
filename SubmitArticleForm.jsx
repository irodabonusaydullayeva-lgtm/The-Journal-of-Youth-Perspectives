import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CATEGORIES, STORAGE_KEYS, isValidEmail, isValidUrl } from '../utils/constants';

export default function SubmitArticleForm({ onSuccess }) {
  const [authorName, setAuthorName] = useLocalStorage(STORAGE_KEYS.AUTHOR_NAME);
  const [email, setEmail] = useLocalStorage(STORAGE_KEYS.AUTHOR_EMAIL);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  function validate() {
    const newErrors = {};

    if (!authorName.trim()) newErrors.authorName = 'Author name is required.';
    if (!email.trim()) {
      newErrors.email = 'Contact email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!title.trim()) newErrors.title = 'Article title is required.';
    if (!category) newErrors.category = 'Please select a category.';
    if (!content.trim()) newErrors.content = 'Article content is required.';
    if (imageUrl && !isValidUrl(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate() || submitting) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error: supabaseError } = await supabase.from('articles').insert([
        {
          author_name: authorName.trim(),
          email: email.trim(),
          title: title.trim(),
          category,
          image_url: imageUrl.trim() || null,
          content: content.trim(),
        },
      ]);

      if (supabaseError) throw supabaseError;

      setSubmitStatus('success');

      // Reset article-specific fields but keep author info
      setTitle('');
      setCategory('');
      setImageUrl('');
      setContent('');
      setErrors({});

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="bg-white border border-line rounded-md p-6 md:p-8"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Success message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-[15px]" role="alert">
          <strong className="font-semibold">Article submitted successfully!</strong>{' '}
          Thank you for your contribution. Your article is now under review.
        </div>
      )}

      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-[15px]" role="alert">
          <strong className="font-semibold">Submission failed.</strong>{' '}
          Please try again. If the problem persists, check your connection.
        </div>
      )}

      {/* Author Name & Email */}
      <div className="flex flex-col sm:flex-row gap-4 mb-5">
        <div className="flex-1">
          <label
            htmlFor="author_name"
            className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
          >
            Your Name <span className="text-rose">*</span>
          </label>
          <input
            id="author_name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors ${
              errors.authorName ? 'border-red-400' : 'border-line'
            }`}
            placeholder="Jane Doe"
            autoComplete="name"
          />
          {errors.authorName && (
            <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.authorName}</p>
          )}
        </div>

        <div className="flex-1">
          <label
            htmlFor="email"
            className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
          >
            Contact Email <span className="text-rose">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors ${
              errors.email ? 'border-red-400' : 'border-line'
            }`}
            placeholder="jane@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
        >
          Article Title <span className="text-rose">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors ${
            errors.title ? 'border-red-400' : 'border-line'
          }`}
          placeholder="e.g. Rethinking Climate Education in the Global South"
        />
        {errors.title && (
          <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.title}</p>
        )}
      </div>

      {/* Category */}
      <div className="mb-5">
        <label
          htmlFor="category"
          className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
        >
          Category <span className="text-rose">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors cursor-pointer ${
            errors.category ? 'border-red-400' : 'border-line'
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.category}</p>
        )}
      </div>

      {/* Cover Image URL */}
      <div className="mb-5">
        <label
          htmlFor="image_url"
          className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
        >
          Cover Image URL <span className="text-plum/40 normal-case">(optional)</span>
        </label>
        <input
          id="image_url"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors ${
            errors.imageUrl ? 'border-red-400' : 'border-line'
          }`}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && (
          <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.imageUrl}</p>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        <label
          htmlFor="content"
          className="block font-mono text-[13px] font-semibold tracking-wider uppercase text-plum mb-2"
        >
          Article Content <span className="text-rose">*</span>
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className={`w-full border-[1.5px] rounded px-3.5 py-3 font-sans text-[15px] bg-paper text-ink focus:outline-none focus:border-rose transition-colors resize-y ${
            errors.content ? 'border-red-400' : 'border-line'
          }`}
          placeholder="Write your article here. Share your research, perspectives, and insights…"
        />
        {errors.content && (
          <p className="mt-1.5 text-[13px] text-red-600" role="alert">{errors.content}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-plum text-paper rounded font-mono font-semibold text-[15px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-plum/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Submitting…
          </>
        ) : (
          'Submit Your Article'
        )}
      </button>

      <p className="text-[13px] opacity-55 mt-3.5 text-center">
        Submissions are reviewed before publication. We'll contact you via email.
      </p>
    </form>
  );
}
