import { Control } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { ScreeningFormValues, stepsConfig } from '@/lib/schema'

export function RenderStep({
  step,
  control,
}: {
  step: number
  control: Control<ScreeningFormValues>
}) {
  const fieldConfig = stepsConfig[step]
  if (!fieldConfig) return null

  return (
    <div className="space-y-6 animate-fade-in flex flex-col justify-center w-full max-w-2xl mx-auto h-full">
      <FormField
        control={control}
        name={fieldConfig.name}
        render={({ field }) => (
          <FormItem className="space-y-8">
            <FormLabel className="text-2xl sm:text-4xl font-bold leading-tight text-center block mb-8 text-primary">
              {fieldConfig.label}
            </FormLabel>
            <FormControl>
              <div className="w-full">
                {fieldConfig.type === 'radio' ? (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as string}
                    value={field.value as string}
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-4"
                  >
                    <FormItem className="flex items-center space-x-4 space-y-0 bg-background hover:bg-muted/60 p-6 rounded-2xl cursor-pointer transition-all border-2 border-muted flex-1 justify-center shadow-sm">
                      <FormControl>
                        <RadioGroupItem value="sim" className="w-6 h-6" />
                      </FormControl>
                      <FormLabel className="font-semibold text-2xl cursor-pointer m-0">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-4 space-y-0 bg-background hover:bg-muted/60 p-6 rounded-2xl cursor-pointer transition-all border-2 border-muted flex-1 justify-center shadow-sm">
                      <FormControl>
                        <RadioGroupItem value="nao" className="w-6 h-6" />
                      </FormControl>
                      <FormLabel className="font-semibold text-2xl cursor-pointer m-0">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                ) : fieldConfig.type === 'textarea' ? (
                  <Textarea
                    placeholder={fieldConfig.placeholder}
                    {...field}
                    className="min-h-[220px] text-xl p-6 rounded-2xl resize-none shadow-sm focus-visible:ring-primary/50 bg-background border-2 border-muted"
                    value={(field.value as string) || ''}
                  />
                ) : (
                  <Input
                    type={fieldConfig.type}
                    placeholder={fieldConfig.placeholder}
                    {...field}
                    className="text-2xl sm:text-3xl py-10 px-8 text-center rounded-2xl shadow-sm focus-visible:ring-primary/50 bg-background border-2 border-muted"
                    value={field.value ?? ''}
                  />
                )}
              </div>
            </FormControl>
            <FormMessage className="text-center text-lg mt-4" />
          </FormItem>
        )}
      />
    </div>
  )
}
