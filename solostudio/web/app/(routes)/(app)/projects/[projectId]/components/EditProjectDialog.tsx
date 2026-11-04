'use client';

import { ProjectForm, type ProjectFormValues } from '@app/blocks/ProjectDialogs/ProjectForm';
import { getProject, updateProject, type Project } from '@app/entities/project';
import { Button } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { toast } from '@packages/ui/Toast';
import { useRouter } from 'next/navigation';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';


import type { Client } from '@app/entities/client';

/** D08 Edit project: change a project's details or move it to another client. */
export function EditProjectDialog({
  project,
  onOpenChange,
  clients,
}: {
  project: Project;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
}) {
  const router = useRouter();
  const formId = useId();
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      name: project.name,
      description: project.description,
      dueDate: project.dueDate ?? '',
      client: project.client,
    },
  });
  const [saving, setSaving] = useState(false);
  const [gone, setGone] = useState(false);

  const cancel = () => {
    onOpenChange(false);
    if (gone) router.push('/projects');
  };

  const save = async (values: ProjectFormValues) => {
    setSaving(true);
    try {
      const current = await getProject(project.id);
      if (!current) {
        setGone(true);
        setError('root.server', { message: 'This project is gone.' });
        return;
      }
      await updateProject(project.id, {
        name: values.name.trim(),
        description: values.description.trim(),
        dueDate: values.dueDate || undefined,
        client: values.client,
      });
      toast({ title: 'Project updated', status: 'success' });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        setGone(true);
        setError('root.server', { message: 'This project is gone.' });
      } else {
        setError('root.server', { message: 'Saving failed. Try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      title={`Edit ${project.name}`}
      open
      onOpenChange={onOpenChange}
      footer={
        <>
          <Button
            variant="base" // Cancel is the secondary action beside the main Save.
            onClick={cancel}
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
      }
    >
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
    </Dialog>
  );
}
