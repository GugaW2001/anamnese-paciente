import { UseFormReturn } from 'react-hook-form'
import { ScreeningFormValues } from '@/lib/schema'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'

export function Step7({
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
    <div className="mb-6 pb-6 border-b border-border last:border-0 last:pb-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-primary">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(stepIndex)}
          className="text-muted-foreground hover:text-primary"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">{children}</div>
    </div>
  )

  const Item = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex flex-col">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value || '-'}</span>
    </div>
  )

  return (
    <div className="space-y-2 animate-fade-in-up">
      <h2 className="text-2xl font-bold mb-6">7. Revisão dos Dados</h2>

      <div className="bg-muted/30 rounded-lg p-4 sm:p-6">
        <Section title="Dados da Paciente" stepIndex={0}>
          <Item label="Nome Completo" value={values.nome_completo} />
          <Item label="Telefone" value={values.telefone} />
          <Item label="Data de Atendimento" value={values.data_atendimento} />
          <Item label="Idade" value={values.idade} />
          <Item label="Motivo do Exame" value={values.motivo_exame} />
        </Section>

        <Section title="Histórico Ginecológico" stepIndex={1}>
          <Item label="Amamentou" value={values.amamentou} />
          <Item label="Idade Menarca" value={values.idade_menarca} />
          <Item label="Menopausa" value={values.menopausa} />
          <Item label="Idade Menopausa" value={values.idade_menopausa} />
        </Section>

        <Section title="Histórico Obstétrico" stepIndex={2}>
          <Item label="Número de Filhos" value={values.numero_filhos} />
          <Item label="Idade no 1º Filho" value={values.idade_primeiro_filho} />
        </Section>

        <Section title="Histórico Médico" stepIndex={3}>
          <Item label="Cirurgia Prévia" value={values.cirurgia_previa_mama} />
          {values.cirurgia_previa_mama === 'sim' && (
            <Item label="Motivo Cirurgia" value={values.motivo_cirurgia} />
          )}
          <Item label="Radioterapia" value={values.radioterapia} />
          {values.radioterapia === 'sim' && (
            <Item label="Período" value={values.periodo_radioterapia} />
          )}
          <Item label="Quimioterapia" value={values.quimioterapia} />
          {values.quimioterapia === 'sim' && (
            <Item label="Período" value={values.periodo_quimioterapia} />
          )}
          <Item label="Tabagismo" value={values.tabagismo} />
          <div className="col-span-1 sm:col-span-2 mt-2">
            <span className="text-muted-foreground block mb-1">Medicações Atuais</span>
            <p className="font-medium">{values.medicacoes_atuais || '-'}</p>
          </div>
        </Section>

        <Section title="Histórico Familiar" stepIndex={4}>
          <Item label="Câncer de Mama" value={values.historico_familiar_cancer_mama} />
          {values.historico_familiar_cancer_mama === 'sim' && (
            <Item label="Grau de Parentesco" value={values.grau_parentesco} />
          )}
        </Section>

        <Section title="Exames Anteriores" stepIndex={5}>
          <Item label="Exames Anteriores" value={values.exames_anteriores} />
          <div className="col-span-1 sm:col-span-2 mt-2">
            <span className="text-muted-foreground block mb-1">Observações</span>
            <p className="bg-background border rounded-md p-3 whitespace-pre-wrap">
              {values.observacoes || 'Nenhuma observação registrada.'}
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}
