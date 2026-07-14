import { MaxIcon } from '@/components/brand-icons'

export function MaxBlock() {
  return (
    <div className="rounded-2xl bg-brand-deep p-5 text-card">
      <span className="flex size-11 items-center justify-center rounded-xl bg-card/15">
        <MaxIcon className="size-6" />
      </span>
      <p className="mt-3 text-base font-semibold leading-tight">
        Не знаете, что выбрать?
      </p>
      <p className="mt-1 text-sm leading-relaxed text-card/80">
        Напишите нам в MAX — поможем подобрать сорта под ваш участок и климат.
      </p>
      <a
        href="https://max.ru"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-semibold text-brand-deep transition-opacity hover:opacity-90"
      >
        <MaxIcon className="size-4" />
        Открыть чат в MAX
      </a>
    </div>
  )
}
