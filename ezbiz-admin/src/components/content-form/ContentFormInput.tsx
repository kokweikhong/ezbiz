import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

const ContentFormInput = ({
  children,
  labelText,
}: {
  children: React.ReactNode;
  labelText: string;
}) => {
  return (
    <FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
      <FormLabel className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
        {labelText}
      </FormLabel>
      <FormControl className="mt-2 sm:col-span-2 sm:mt-0">
        {children}
      </FormControl>
    </FormItem>
  );
};

export default ContentFormInput;
