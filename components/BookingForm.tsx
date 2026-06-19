'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Dictionary } from '@/lib/i18n/types';
import { LocaleCode } from '@/lib/i18n/config';

interface BookingFormProps {
  dict: Dictionary;
  locale: LocaleCode;
}

interface FormValues {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  postcode: string;
  reason: string;
}

type FieldName = keyof FormValues;
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d\s-]{7,20}$/;

const REQUIRED_FIELDS: FieldName[] = ['firstName', 'lastName', 'email', 'phone', 'reason'];
const FIELD_ORDER: FieldName[] = ['firstName', 'lastName', 'dob', 'email', 'phone', 'postcode', 'reason'];

export default function BookingForm({ dict, locale }: BookingFormProps) {
  const { booking } = dict;

  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    postcode: '',
    reason: booking.reasonOptions[0] || '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{ calendarUrl: string } | null>(null);

  const fieldRefs = useRef<Partial<Record<FieldName, HTMLElement | null>>>({});

  function setField<K extends FieldName>(name: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};

    for (const field of REQUIRED_FIELDS) {
      if (!values[field].trim()) {
        next[field] = booking.errors.required;
      }
    }

    if (!next.email && !EMAIL_REGEX.test(values.email.trim())) {
      next.email = booking.errors.invalidEmail;
    }

    if (!next.phone && !PHONE_REGEX.test(values.phone.trim())) {
      next.phone = booking.errors.invalidPhone;
    }

    if (values.dob.trim()) {
      const dobDate = new Date(values.dob);
      const today = new Date();
      if (Number.isNaN(dobDate.getTime()) || dobDate > today) {
        next.dob = booking.errors.invalidDob;
      }
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
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      setResult({ calendarUrl: data.calendarUrl });
    } catch {
      setSubmitError(booking.errors.generic);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-sand-dark bg-sand p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-black">{booking.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-bark-light">{booking.successMessage}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={result.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-50"
          >
            <span className="text-black">Add to </span>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
            <span className="text-black"> Calendar</span>
          </a>
          <Link
            href="/"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-gray-100"
          >
            {booking.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label={booking.fields.firstName} required error={errors.firstName}>
          <input
            type="text"
            value={values.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
            ref={(el) => (fieldRefs.current.firstName = el)}
            aria-invalid={!!errors.firstName}
            className={inputClass(!!errors.firstName)}
          />
        </Field>

        <Field label={booking.fields.lastName} required error={errors.lastName}>
          <input
            type="text"
            value={values.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
            ref={(el) => (fieldRefs.current.lastName = el)}
            aria-invalid={!!errors.lastName}
            className={inputClass(!!errors.lastName)}
          />
        </Field>

        <Field label={booking.fields.dob} error={errors.dob}>
          <input
            type="date"
            value={values.dob}
            onChange={(e) => setField('dob', e.target.value)}
            ref={(el) => (fieldRefs.current.dob = el)}
            aria-invalid={!!errors.dob}
            max={new Date().toISOString().split('T')[0]}
            className={inputClass(!!errors.dob)}
          />
        </Field>

        <Field label={booking.fields.email} required error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            ref={(el) => (fieldRefs.current.email = el)}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label={booking.fields.phone} required error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => setField('phone', e.target.value)}
            ref={(el) => (fieldRefs.current.phone = el)}
            aria-invalid={!!errors.phone}
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field label={booking.fields.postcode} error={errors.postcode}>
          <input
            type="text"
            value={values.postcode}
            onChange={(e) => setField('postcode', e.target.value)}
            ref={(el) => (fieldRefs.current.postcode = el)}
            aria-invalid={!!errors.postcode}
            className={inputClass(!!errors.postcode)}
          />
        </Field>

        <Field label={booking.fields.reason} required error={errors.reason} className="sm:col-span-2">
          <select
            value={values.reason}
            onChange={(e) => setField('reason', e.target.value)}
            ref={(el) => (fieldRefs.current.reason = el)}
            aria-invalid={!!errors.reason}
            className={inputClass(!!errors.reason)}
          >
            {booking.reasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
        {submitting ? booking.submitting : booking.submit}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-linen px-3 py-2 text-bark focus:outline-none ${
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
      <label className="mb-1 block text-sm font-semibold text-bark">
        {label}
        {required && <span className="text-clay-dark"> *</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 rounded-md bg-red-600 px-2 py-1 text-xs text-white shadow-sm">
          {error}
        </p>
      )}
    </div>
  );
}
