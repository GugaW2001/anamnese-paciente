import { UseFormReturn } from 'react-hook-form'
import { ScreeningFormValues } from '@/lib/schema'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export function ReviewStep({
  form,
  setStep,
}: {
  form: UseFormReturn<ScreeningFormValues>
  setStep: (step: number) => void
}) {
  const values = form.getValues()

  const Section = ({
    title,
    stepIndex,
    children,
  }: {
    title: string
    stepIndex: number
    children: React.ReactNode
  }) => (
    <div className="mb-8 pb-8 border-b border-border/60 last:border-0 last:pb-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl text-primary">{title}</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setStep(stepIndex)}
          className="text-muted-foreground hover:text-primary font-medium"
        >
          <Pencil className="h-4 w-4 mr-2" /> Editar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-base">{children}</div>
    </div>
  )

  const Item = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium capitalize">{value?.toString() || '-'}</span>
    </div>
  )

  return (
    <div className="space-y-4 animate-fade-in w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Revisão dos Dados</h2>

      <div className="bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm">
        <Section title="Dados da Paciente" stepIndex={0}>
          <Item label="Nome Completo" value={values.nome_completo} />
          <Item label="Idade" value={values.idade} />
          <Item label="Motivo do Exame" value={values.motivo_exame} />
        </Section>

        <Section title="Histórico Ginecológico" stepIndex={3}>
          <Item label="Idade Menarca" value={values.idade_menarca} />
          <Item label="Menopausa" value={values.menopausa} />
          {values.menopausa === 'sim' && (
            <Item label="Idade Menopausa" value={values.idade_menopausa} />
          )}
        </Section>

        <Section title="Cirurgia Prévia" stepIndex={6}>
          <Item label="Cirurgia Prévia na Mama" value={values.cirurgia_previa_mama} />
          {values.cirurgia_previa_mama === 'sim' && (
            <Item label="Motivo da Cirurgia" value={values.motivo_cirurgia} />
          )}
        </Section>

        <Section title="Tratamentos Anteriores" stepIndex={8}>
          <Item label="Radioterapia" value={values.radioterapia} />
          {values.radioterapia === 'sim' && (
            <Item label="Período Radioterapia" value={values.periodo_radioterapia} />
          )}
          <Item label="Braquiterapia" value={values.braquiterapia} />
          {values.braquiterapia === 'sim' && (
            <Item label="Período Braquiterapia" value={values.periodo_braquiterapia} />
          )}
          <Item label="Quimioterapia" value={values.quimioterapia} />
          {values.quimioterapia === 'sim' && (
            <Item label="Período Quimioterapia" value={values.periodo_quimioterapia} />
          )}
        </Section>

        <Section title="Hábitos e Medicações" stepIndex={14}>
          <Item label="Tabagismo" value={values.tabagismo} />
          <div className="col-span-1 sm:col-span-2 mt-2">
            <span className="text-muted-foreground text-sm block mb-1">Medicações Atuais</span>
            <p className="font-medium bg-background p-3 rounded-lg border border-border/50">
              {values.medicacoes_atuais || '-'}
            </p>
          </div>
        </Section>

        <Section title="Histórico Familiar" stepIndex={16}>
          <Item label="Câncer de Mama" value={values.historico_familiar_cancer_mama} />
          {values.historico_familiar_cancer_mama === 'sim' && (
            <Item label="Grau de Parentesco" value={values.grau_parentesco} />
          )}
        </Section>

        <Section title="Exames e Observações" stepIndex={18}>
          <Item label="Exames Anteriores" value={values.exames_anteriores} />
          <div className="col-span-1 sm:col-span-2 mt-2">
            <span className="text-muted-foreground text-sm block mb-1">Observações e Queixas</span>
            <p className="bg-background border border-border/50 rounded-lg p-4 whitespace-pre-wrap text-base">
              {values.observacoes || 'Nenhuma observação registrada.'}
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}
