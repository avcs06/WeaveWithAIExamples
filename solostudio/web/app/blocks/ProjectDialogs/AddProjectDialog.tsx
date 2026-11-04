'use client';

import { createProject, type Project } from '@app/entities/project';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { Paragraph } from '@packages/ui/Typography';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProjectForm, type ProjectFormValues } from './ProjectForm';

import type { Client } from '@app/entities/client';

/**
 * D07 Add a project: start a new project for a client. After saving, the
 * designer lands on the projects view.
 */
export function AddProjectDialog({
  open,
  onOpenChange,
  onSaved,
  clients,
  defaultClientId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (project: Project) => void;
  clients: Client[];
  defaultClientId?: string;
}) {
  const formId = useId();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: { name: '', description: '', dueDate: '', client: defaultClientId ?? '' },
  });
  const [saving, setSaving] = useState(false);

  const save = async (values: ProjectFormValues) => {
    setSaving(true);
    try {
      const project = await createProject({
        name: values.name.trim(),
        description: values.description.trim(),
        dueDate: values.dueDate || undefined,
        client: values.client,
      });
      toast({ title: 'Project saved', status: 'success' });
      onSaved(project);
    } catch {
      setError('root.server', { message: 'Saving failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title="Add a project"
      open={open}
      onOpenChange={onOpenChange}
      footer={
        clients.length === 0 ? (
          <Button
            variant="base" // Cancel is the only way out without clients.
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        ) : (
          <>
            <Button
              variant="base" // Cancel is the secondary action beside the main Save.
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form={formId}
              loadingWithReason={saving || isSubmitting ? 'Saving the project' : undefined}
            >
              Save
            </Button>
          </>
        )
      }
    >
      {clients.length === 0 ? (
        <Paragraph>No clients yet. Add a client before starting a project.</Paragraph>
      ) : (
        <ProjectForm
          control={control}
          id={formId}
          onSubmit={(event) => {
            clearErrors('root');
            void handleSubmit(save)(event);
          }}
          error={errors.root?.server?.message}
          clients={clients}
        />
      )}
    </Dialog>
  );
}
