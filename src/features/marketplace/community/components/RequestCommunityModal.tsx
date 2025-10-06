"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Users } from "lucide-react";
import { RequestCommunityModalProps, CommunityRequestData } from "../types";
import { RequestCommunityForm } from "./RequestCommunityForm";

export const RequestCommunityModal: React.FC<RequestCommunityModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CommunityRequestData) => {
    setLoading(true);
    setError(null);

    try {
      await onSubmit(data);
      setSuccess(true);

      // Auto-close modal after success message is shown
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setSuccess(false);
    setError(null);
    setLoading(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (!loading) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl text-foreground">
                Request a Community
              </DialogTitle>
              <DialogDescription className="text-base mt-1 text-muted-foreground">
                Propose a new community for knowledge sharing and collaboration
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          {/* Success State */}
          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                <strong>Request submitted successfully!</strong>
                <br />
                We&apos;ll review your community request and get back to you
                soon.
              </AlertDescription>
            </Alert>
          )}

          {/* Error State */}
          {error && (
            <Alert
              variant="destructive"
              className="mb-6 border-destructive/50 bg-destructive/10"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive-foreground">
                <strong>Submission failed:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          {!success && (
            <>
              {/* Information Section */}
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• We&apos;ll review your community proposal</li>
                  <li>• Our team will assess community fit and potential</li>
                  <li>
                    • You&apos;ll receive an update within 3-5 business days
                  </li>
                  <li>
                    • If approved, we&apos;ll help you set up and launch the
                    community
                  </li>
                </ul>
              </div>

              <RequestCommunityForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCommunityModal;
