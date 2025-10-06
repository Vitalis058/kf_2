"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import {
  requestCommunitySchema,
  RequestCommunityFormData,
  FORM_CONSTRAINTS,
} from "../schemas/requestCommunitySchema";
import { COMMUNITY_CATEGORIES, RequestCommunityFormProps } from "../types";

export const RequestCommunityForm: React.FC<RequestCommunityFormProps> = ({
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const form = useForm<RequestCommunityFormData>({
    resolver: zodResolver(requestCommunitySchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
    },
  });

  const handleSubmit = (data: RequestCommunityFormData) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
        role="form"
        aria-label="Request a new community"
      >
        {/* Community Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder={FORM_CONSTRAINTS.name.placeholder}
                  maxLength={FORM_CONSTRAINTS.name.maxLength}
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Choose a clear, descriptive name for your community (3-100
                characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={FORM_CONSTRAINTS.category.placeholder}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COMMUNITY_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category that best describes your community&apos;s
                focus
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={FORM_CONSTRAINTS.description.placeholder}
                  maxLength={FORM_CONSTRAINTS.description.maxLength}
                  rows={4}
                  disabled={loading}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe the purpose, goals, and what members can expect from
                this community (20-500 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Character Counter for Description */}
        <div className="text-right">
          <span className="text-xs text-muted-foreground">
            {form.watch("description")?.length || 0} /{" "}
            {FORM_CONSTRAINTS.description.maxLength}
          </span>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={loading}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            className="flex-1 sm:flex-none"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </div>

        {/* Form Status */}
        {form.formState.isSubmitting && (
          <div className="text-center text-sm text-muted-foreground">
            Processing your community request...
          </div>
        )}
      </form>
    </Form>
  );
};

export default RequestCommunityForm;
