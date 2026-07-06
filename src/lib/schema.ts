import { z } from 'zod'

export const screeningSchema = z.object({
  nome_completo: z.string().min(3, 'Nome é obrigatório'),
  data_nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  idade: z.coerce.number({ invalid_type_error: 'Idade inválida' }).min(1, 'Idade é obrigatória'),
  motivo_exame: z.string().min(3, 'Motivo é obrigatório'),

  idade_menarca: z.string().optional(),
  menopausa: z.string().optional(),
  idade_menopausa: z.string().optional(),

  cirurgia_previa_mama: z.string().optional(),
  motivo_cirurgia: z.string().optional(),
  radioterapia: z.string().optional(),
  periodo_radioterapia: z.string().optional(),
  braquiterapia: z.string().optional(),
  periodo_braquiterapia: z.string().optional(),
  quimioterapia: z.string().optional(),
  periodo_quimioterapia: z.string().optional(),

  medicacoes_atuais: z.string().optional(),
  tabagismo: z.string().optional(),

  historico_familiar_cancer_mama: z.string().optional(),
  grau_parentesco: z.string().optional(),

  exames_anteriores: z.string().optional(),
  observacoes: z.string().optional(),
})

export type ScreeningFormValues = z.infer<typeof screeningSchema>

export const defaultValues: Partial<ScreeningFormValues> = {
  nome_completo: '',
  data_nascimento: '',
  idade: undefined,
  motivo_exame: '',
  idade_menarca: '',
  menopausa: '',
  idade_menopausa: '',
  cirurgia_previa_mama: '',
  motivo_cirurgia: '',
  radioterapia: '',
  periodo_radioterapia: '',
  braquiterapia: '',
  periodo_braquiterapia: '',
  quimioterapia: '',
  periodo_quimioterapia: '',
  medicacoes_atuais: '',
  tabagismo: '',
  historico_familiar_cancer_mama: '',
  grau_parentesco: '',
  exames_anteriores: '',
  observacoes: '',
}

export type FieldConfig = {
  name: keyof ScreeningFormValues
  label: string
  type: 'text' | 'number' | 'radio' | 'textarea' | 'date'
  placeholder?: string
  condition?: (getValues: any) => boolean
}

export const stepsConfig: FieldConfig[] = [
  {
    name: 'nome_completo',
    label: 'Qual o nome completo da paciente?',
    type: 'text',
    placeholder: 'Ex: Maria da Silva',
  },
  {
    name: 'data_nascimento',
    label: 'Qual a data de nascimento da paciente?',
    type: 'date',
    placeholder: 'Ex: 15/03/1978',
  },
  { name: 'idade', label: 'Qual a idade da paciente?', type: 'number', placeholder: 'Ex: 45' },
  {
    name: 'motivo_exame',
    label: 'Qual o motivo do exame?',
    type: 'text',
    placeholder: 'Ex: Rotina, Dor, Nódulo',
  },
  {
    name: 'idade_menarca',
    label: 'Idade da Menarca (primeira menstruação)',
    type: 'number',
    placeholder: 'Ex: 12',
  },
  { name: 'menopausa', label: 'Entrou na Menopausa?', type: 'radio' },
  {
    name: 'idade_menopausa',
    label: 'Idade da Menopausa',
    type: 'number',
    placeholder: 'Ex: 50',
    condition: (g) => g('menopausa') === 'sim',
  },
  { name: 'cirurgia_previa_mama', label: 'Cirurgia Prévia na Mama?', type: 'radio' },
  {
    name: 'motivo_cirurgia',
    label: 'Qual o motivo da cirurgia?',
    type: 'text',
    placeholder: 'Descreva o motivo',
    condition: (g) => g('cirurgia_previa_mama') === 'sim',
  },
  { name: 'radioterapia', label: 'Já realizou Radioterapia?', type: 'radio' },
  {
    name: 'periodo_radioterapia',
    label: 'Qual o período da radioterapia?',
    type: 'text',
    placeholder: 'Ex: 2019 - 2020',
    condition: (g) => g('radioterapia') === 'sim',
  },
  { name: 'braquiterapia', label: 'Você já realizou braquiterapia?', type: 'radio' },
  {
    name: 'periodo_braquiterapia',
    label: 'Qual o período da braquiterapia?',
    type: 'text',
    placeholder: 'Ex: 2020 - 2021',
    condition: (g) => g('braquiterapia') === 'sim',
  },
  { name: 'quimioterapia', label: 'Já realizou Quimioterapia?', type: 'radio' },
  {
    name: 'periodo_quimioterapia',
    label: 'Qual o período da quimioterapia?',
    type: 'text',
    placeholder: 'Ex: 2019 - 2020',
    condition: (g) => g('quimioterapia') === 'sim',
  },
  {
    name: 'medicacoes_atuais',
    label: 'Medicações Atuais',
    type: 'textarea',
    placeholder: 'Liste os medicamentos em uso (ou digite "nenhum")',
  },
  { name: 'tabagismo', label: 'Tabagismo?', type: 'radio' },
  {
    name: 'historico_familiar_cancer_mama',
    label: 'Histórico Familiar de Câncer de Mama?',
    type: 'radio',
  },
  {
    name: 'grau_parentesco',
    label: 'Grau de Parentesco',
    type: 'text',
    placeholder: 'Ex: Mãe, Irmã, Tia',
    condition: (g) => g('historico_familiar_cancer_mama') === 'sim',
  },
  {
    name: 'exames_anteriores',
    label: 'Possui exames anteriores (mamografia, ultrassom)?',
    type: 'radio',
  },
  {
    name: 'observacoes',
    label: 'Observações e Queixas Atuais',
    type: 'textarea',
    placeholder: 'Relate quaisquer dores, nódulos palpáveis ou outras queixas...',
  },
]
