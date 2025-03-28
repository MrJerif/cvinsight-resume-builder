import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SummaryForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SummaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData?.summary || "",
    },
  });

  // save changes automatically
  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Professional summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a short introduction for your resume or use AI to generate one
          from your entered data.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
            <FormField 
                control={form.control}
                name="summary"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="sr-only">Professional summary</FormLabel>
                        <FormControl>
                            <Textarea 
                                {...field}
                                placeholder="A brief, engaging text about yourself"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
        </form>
      </Form>
    </div>
  );
}
