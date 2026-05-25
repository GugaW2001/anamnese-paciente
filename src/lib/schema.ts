import { z } from 'zod'

export const screeningSchema = z.object({
  nome_completo: z.string().min(3, 'Nome é obrigatório'),
  telefone: z.string().min(8, 'Telefone é obrigatório'),
  data_atendimento: z.string().min(1, 'Data é obrigatória'),
  idade: z.coerce.number().min(1, 'Idade inválida'),
  motivo_exame: z.string().min(3, 'Motivo é obrigatório'),

  amamentou: z.string().optional(),
  idade_menarca: z.string().optional(),
  menopausa: z.string().optional(),
  idade_menopausa: z.string().optional(),

  numero_filhos: z.string().optional(),
  idade_primeiro_filho: z.string().optional(),

  medicacoes_atuais: z.string().optional(),
  cirurgia_previa_mama: z.string().optional(),
  motivo_cirurgia: z.string().optional(),
  radioterapia: z.string().optional(),
  periodo_radioterapia: z.string().optional(),
  quimioterapia: z.string().optional(),
  periodo_quimioterapia: z.string().optional(),
  tabagismo: z.string().optional(),

  historico_familiar_cancer_mama: z.string().optional(),
  grau_parentesco: z.string().optional(),

  exames_anteriores: z.string().optional(),
  observacoes: z.string().optional(),
})

export type ScreeningFormValues = z.infer<typeof screeningSchema>

export const stepFields = [
  ['nome_completo', 'telefone', 'data_atendimento', 'idade', 'motivo_exame'],
  ['amamentou', 'idade_menarca', 'menopausa', 'idade_menopausa'],
  ['numero_filhos', 'idade_primeiro_filho'],
  [
    'medicacoes_atuais',
    'cirurgia_previa_mama',
    'motivo_cirurgia',
    'radioterapia',
    'periodo_radioterapia',
    'quimioterapia',
    'periodo_quimioterapia',
    'tabagismo',
  ],
  ['historico_familiar_cancer_mama', 'grau_parentesco'],
  ['exames_anteriores', 'observacoes'],
] as const

export const defaultValues: Partial<ScreeningFormValues> = {
  nome_completo: '',
  telefone: '',
  data_atendimento: new Date().toISOString().split('T')[0],
  idade: '' as any,
  motivo_exame: '',
  amamentou: '',
  idade_menarca: '',
  menopausa: '',
  idade_menopausa: '',
  numero_filhos: '',
  idade_primeiro_filho: '',
  medicacoes_atuais: '',
  cirurgia_previa_mama: '',
  motivo_cirurgia: '',
  radioterapia: '',
  periodo_radioterapia: '',
  quimioterapia: '',
  periodo_quimioterapia: '',
  tabagismo: '',
  historico_familiar_cancer_mama: '',
  grau_parentesco: '',
  exames_anteriores: '',
  observacoes: '',
}
