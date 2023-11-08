"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const formSchema = z.object({
  name: z.string().min(3),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      // console.log(response.data);

      toast.success("Store created successfully, Redirecting to dashboard...");
      
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a store in seconds"
      description="Add new store to manage products"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="E-commerece" 
                              {...field}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                    <Button
                        disabled={loading} 
                        onClick={storeModal.onClose}>
                            Cancel
                    </Button>
                    <Button
                        disabled={loading} 
                        type="submit">
                        Continue
                    </Button>
                </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
