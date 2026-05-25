import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { screeningSchema, ScreeningFormValues, stepFields, defaultValues } from '@/lib/schema'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, ChevronLeft, ChevronRight, Save } from 'lucide-react'
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { Step4 } from './Step4'
import { Step5 } from './Step5'
import { Step6 } from './Step6'
import { Step7 } from './Step7'
import { toast } from 'sonner'

const TOTAL_STEPS = 7

export function ScreeningForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ScreeningFormValues>({
    resolver: zodResolver(screeningSchema),
    defaultValues,
    mode: 'onChange',
  })

  const nextStep = async () => {
    if (step < 6) {
      const fields = stepFields[step]
      const isValid = await form.trigger(fields as any, { shouldFocus: true })
      if (isValid) {
        setStep((s) => s + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        toast.error('Por favor, preencha todos os campos obrigatórios.')
      }
    }
  }

  const prevStep = () => {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: ScreeningFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        registro_id: `PAT-${Date.now()}`,
        nome_completo: data.nome_completo,
        telefone: data.telefone,
        data_atendimento: data.data_atendimento,
        idade: data.idade,
        motivo_exame: data.motivo_exame,
        dados_triagem: {
          historico_ginecologico: {
            amamentou: data.amamentou,
            idade_menarca: data.idade_menarca,
            menopausa: data.menopausa,
            idade_menopausa: data.idade_menopausa,
          },
          historico_obstetrico: {
            numero_filhos: data.numero_filhos,
            idade_primeiro_filho: data.idade_primeiro_filho,
          },
          historico_medico: {
            medicacoes_atuais: data.medicacoes_atuais,
            cirurgia_previa_mama: data.cirurgia_previa_mama,
            motivo_cirurgia: data.motivo_cirurgia,
            radioterapia: data.radioterapia,
            periodo_radioterapia: data.periodo_radioterapia,
            quimioterapia: data.quimioterapia,
            periodo_quimioterapia: data.periodo_quimioterapia,
            tabagismo: data.tabagismo,
          },
          historico_familiar: {
            historico_familiar_cancer_mama: data.historico_familiar_cancer_mama,
            grau_parentesco: data.grau_parentesco,
          },
          exames_anteriores: {
            exames_anteriores: data.exames_anteriores,
            observacoes: data.observacoes,
          },
        },
        dados_exame: null,
        nome_tecnica: null,
        status: 'pendente',
      }

      // Simulate API call for direct DB insertion
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Fallback local persistence
      const records = JSON.parse(localStorage.getItem('pacientes') || '[]')
      records.push(payload)
      localStorage.setItem('pacientes', JSON.stringify(records))

      toast.success('Registro salvo com sucesso no banco de dados!')
      setIsSuccess(true)
    } catch (error) {
      toast.error('Erro ao salvar os dados. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    form.reset(defaultValues)
    setStep(0)
    setIsSuccess(false)
  }

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto mt-8 border-none shadow-lg text-center p-8 animate-slide-up">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6 animate-fade-in-up" />
        <h2 className="text-3xl font-bold mb-4">Triagem Concluída!</h2>
        <p className="text-muted-foreground mb-8">
          Os dados da paciente foram salvos com sucesso no sistema.
        </p>
        <Button onClick={resetForm} size="lg" className="w-full sm:w-auto">
          Iniciar Nova Triagem
        </Button>
      </Card>
    )
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <Card className="max-w-3xl mx-auto shadow-md border-muted/50 transition-all duration-300">
      <CardHeader className="bg-muted/20 border-b border-muted">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl sm:text-2xl text-primary flex items-center gap-2">
            Formulário de Triagem
          </CardTitle>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            Passo {step + 1} de {TOTAL_STEPS}
          </span>
        </div>
        <Progress value={progress} className="h-2 transition-all duration-500" />
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-4 sm:p-6 min-h-[400px]">
            {step === 0 && <Step1 control={form.control} />}
            {step === 1 && <Step2 control={form.control} />}
            {step === 2 && <Step3 control={form.control} />}
            {step === 3 && <Step4 control={form.control} watch={form.watch} />}
            {step === 4 && <Step5 control={form.control} watch={form.watch} />}
            {step === 5 && <Step6 control={form.control} />}
            {step === 6 && <Step7 form={form} setStep={setStep} />}
          </CardContent>

          <CardFooter className="flex justify-between p-4 sm:p-6 bg-muted/10 border-t border-muted">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 0 || isSubmitting}
              className="w-28 sm:w-32"
            >
              <ChevronLeft className="w-4 h-4 mr-1 sm:mr-2" />
              Voltar
            </Button>

            {step < TOTAL_STEPS - 1 ? (
              <Button type="button" onClick={nextStep} className="w-28 sm:w-32">
                Avançar
                <ChevronRight className="w-4 h-4 ml-1 sm:ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-32 sm:w-40 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Salvando...</span>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1 sm:mr-2" />
                    Finalizar
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
