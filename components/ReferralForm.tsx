'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Dictionary } from '@/lib/i18n/types';

interface ReferralFormProps {
  dict: Dictionary;
}

interface FormValues {
  referrerFirstName: string;
  referrerLastName: string;
  referrerEmail: string;
  referrerPhone: string;
  patientName: string;
}

type FieldName = keyof FormValues;
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;
const REQUIRED_FIELDS: FieldName[] = ['referrerFirstName', 'referrerLastName', 'referrerEmail', 'patientName'];
const FIELD_ORDER: FieldName[] = ['referrerFirstName', 'referrerLastName', 'referrerEmail', 'referrerPhone', 'patientName'];

export default function ReferralForm({ dict }: ReferralFormProps) {
  const { referral } = dict;

  const [values, setValues] = useState<FormValues>({
    referrerFirstName: '',
    referrerLastName: '',
    referrerEmail: '',
    referrerPhone: '',
    patientName: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  function setField<K extends FieldName>(name: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};

    for (const field of REQUIRED_FIELDS) {
      if (!values[field].trim()) {
        next[field] = referral.errors.required;
      }
    }

    if (!next.referrerEmail && !EMAIL_REGEX.test(values.referrerEmail.trim())) {
      next.referrerEmail = referral.errors.invalidEmail;
    }

    if (values.referrerPhone.trim() && !PHONE_REGEX.test(values.referrerPhone.trim())) {
      next.referrerPhone = referral.errors.invalidPhone;
    }

    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const nextErrors = validate();
    setErrors(nextErrors);

    const firstErrorField = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstErrorField) {
      const el = fieldRefs.current[firstErrorField];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Request failed');

      setSuccess(true);
    } catch {
      setSubmitError(referral.errors.generic);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-sand-dark bg-sand p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-black">{referral.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-bark-light">{referral.successMessage}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-gray-100"
          >
            {referral.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label={referral.fields.referrerFirstName} required error={errors.referrerFirstName}>
          <input
            type="text"
            value={values.referrerFirstName}
            onChange={(e) => setField('referrerFirstName', e.target.value)}
            ref={(el) => (fieldRefs.current.referrerFirstName = el)}
            aria-invalid={!!errors.referrerFirstName}
            className={inputClass(!!errors.referrerFirstName)}
          />
        </Field>

        <Field label={referral.fields.referrerLastName} required error={errors.referrerLastName}>
          <input
            type="text"
            value={values.referrerLastName}
            onChange={(e) => setField('referrerLastName', e.target.value)}
            ref={(el) => (fieldRefs.current.referrerLastName = el)}
            aria-invalid={!!errors.referrerLastName}
            className={inputClass(!!errors.referrerLastName)}
          />
        </Field>

        <Field label={referral.fields.referrerEmail} required error={errors.referrerEmail}>
          <input
            type="email"
            value={values.referrerEmail}
            onChange={(e) => setField('referrerEmail', e.target.value)}
            ref={(el) => (fieldRefs.current.referrerEmail = el)}
            aria-invalid={!!errors.referrerEmail}
            className={inputClass(!!errors.referrerEmail)}
          />
        </Field>

        <Field label={referral.fields.referrerPhone} error={errors.referrerPhone}>
          <input
            type="tel"
            value={values.referrerPhone}
            onChange={(e) => setField('referrerPhone', e.target.value)}
            ref={(el) => (fieldRefs.current.referrerPhone = el)}
            aria-invalid={!!errors.referrerPhone}
            className={inputClass(!!errors.referrerPhone)}
          />
        </Field>

        <Field label={referral.fields.patientName} required error={errors.patientName} className="sm:col-span-2">
          <input
            type="text"
            value={values.patientName}
            onChange={(e) => setField('patientName', e.target.value)}
            ref={(el) => (fieldRefs.current.patientName = el)}
            aria-invalid={!!errors.patientName}
            className={inputClass(!!errors.patientName)}
          />
        </Field>
      </div>

      {submitError && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-clay px-6 py-3 text-base font-semibold text-linen transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitting ? referral.submitting : referral.submit}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-linen px-3 py-2 font-normal text-bark focus:outline-none ${
    hasError ? 'border-red-500' : 'border-sand-dark'
  }`;
}

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, required, error, className = '', children }: FieldProps) {
  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-semibold text-bark">
        <span className="mb-1 block">
          {label}
          {required && <span className="text-clay-dark"> *</span>}
        </span>
        {children}
      </label>
      {error && (
        <p role="alert" className="mt-1 rounded-md bg-red-600 px-2 py-1 text-xs text-white shadow-sm">
          {error}
        </p>
      )}
    </div>
  );
}
