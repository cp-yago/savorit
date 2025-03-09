import { z } from "zod";

const createBookFormSchema = z.object({
  name: z.string().min(1, "O nome deve ter no mínimo 1 caractere"),
});

type CreateBookFormValues = z.infer<typeof createBookFormSchema>;

export default function AddRecipeToBook() {
  // const {
  //   register,
  //   handleSubmit,
  //   trigger,
  //   formState: { errors, isSubmitting },
  // } = useForm<CreateBookFormValues>({
  //   resolver: zodResolver(createBookFormSchema),
  // });

  // const onSubmit = async (values: CreateBookFormValues) => {
  //   console.log("errors", errors.name);
  //   console.log("values", values);
  //   await createBook(values);
  // };

  return (
    <form>
      <h1>TESTEE</h1>
      {/* <div className="gap-4 py-4">
        <motion.div
          className="w-full"
          animate={errors.name ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Input
            id="name"
            placeholder="Ex: Sobremesas, Café da manhã..."
            className={cn(
              "h-12 w-full",
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500",
            )}
            {...register("name")}
            onBlur={() => trigger("name")}
          />
        </motion.div>
        {errors.name && (
          <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>
        )}
      </div>
      <DialogFooter>
        <Button
          type="submit"
          className="bg-emerald shadow-md hover-scale rounded-xl border-fog-gray p-2 w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Criando...</span>
            </>
          ) : (
            <span>Criar</span>
          )}
        </Button>
      </DialogFooter> */}
    </form>
  );
}
