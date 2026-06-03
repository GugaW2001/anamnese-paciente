import { Control, UseFormWatch } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScreeningFormValues } from '@/lib/schema'

export function Step4({
  control,
  watch,
}: {
  control: Control<ScreeningFormValues>
  watch: UseFormWatch<ScreeningFormValues>
}) {
  const cirurgiaPrevia = watch('cirurgia_previa_mama') === 'sim'
  const radioterapia = watch('radioterapia') === 'sim'
  const quimioterapia = watch('quimioterapia') === 'sim'

  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-xl font-semibold mb-4">4. Histórico Médico</h2>

      <FormField
        control={control}
        name="medicacoes_atuais"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medicações Atuais</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Liste os medicamentos em uso (ou digite 'nenhum')"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <FormField
            control={control}
            name="cirurgia_previa_mama"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Cirurgia Prévia na Mama?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {cirurgiaPrevia && (
            <FormField
              control={control}
              name="motivo_cirurgia"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Motivo da Cirurgia</FormLabel>
                  <FormControl>
                    <Input placeholder="Descreva o motivo" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={control}
            name="radioterapia"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Radioterapia?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {radioterapia && (
            <FormField
              control={control}
              name="periodo_radioterapia"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Período da Radioterapia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2019 - 2020" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={control}
            name="quimioterapia"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Quimioterapia?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {quimioterapia && (
            <FormField
              control={control}
              name="periodo_quimioterapia"
              render={({ field }) => (
                <FormItem className="animate-fade-in">
                  <FormLabel>Período da Quimioterapia</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2019 - 2020" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={control}
          name="tabagismo"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tabagismo?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sim" />
                    </FormControl>
                    <FormLabel className="font-normal">Sim</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nao" />
                    </FormControl>
                    <FormLabel className="font-normal">Não</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
