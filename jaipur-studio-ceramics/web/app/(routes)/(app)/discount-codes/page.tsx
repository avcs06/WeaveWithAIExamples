'use client';

// Loads its records through listDiscountCodes.
import { formatINR } from '@app/blocks/money';
import { LoadFailedView, LoadingView } from '@app/components/LoadingView';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import {
  useListDiscountCodes,
  deactivateDiscountCode,
} from '@app/entities/discountCode';
import { DiscountTypeOptions } from '@app/entities/enums';
import { Button, IconButton } from '@packages/ui/Button';
import { Dialog } from '@packages/ui/Dialog';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import { Paragraph, Time } from '@packages/ui/Typography';
import { Ban } from 'lucide-react';
import React, { useState } from 'react';

import type { DiscountCode } from '@app/entities/discountCode';

type DiscountRow = {
  key: string;
  id: string;
  code: string;
  discountType: string;
  discountValue: number;
  expiryDate: string;
  status: string;
};

const DiscountTable = createTable<DiscountRow>();

const discountTypeLabel = (key: string): string =>
  DiscountTypeOptions.find((option) => option.key === key)?.label ?? key;

export default function DiscountCodesPage() {
  const { data, loading, error, retry } = useListDiscountCodes();
  const [target, setTarget] = useState<DiscountCode | null>(null);
  const [saving, setSaving] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);

  if (loading) {
    return (
      <LoadingView title="Discount codes" message="Loading the discount codes…" />
    );
  }

  if (error) {
    return (
      <LoadFailedView
        title="Discount codes"
        message="Something went wrong while loading the discount codes."
        onRetry={retry}
      />
    );
  }

  const codes = [...(data ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  const openDeactivate = (code: DiscountCode) => {
    setDialogError(null);
    setTarget(code);
  };

  const closeDialog = () => {
    setTarget(null);
    setDialogError(null);
    setSaving(false);
  };

  const confirmDeactivate = async () => {
    if (!target) return;
    setDialogError(null);
    setSaving(true);
    try {
      await deactivateDiscountCode(target.id, { status: 'deactivated' });
      toast({
        title: 'Discount code deactivated',
        description: `Code ${target.discountCode} is now deactivated.`,
        status: 'success',
      });
      closeDialog();
    } catch {
      setDialogError('Deactivating failed and the code is still Active.');
      setSaving(false);
    }
  };

  if (codes.length === 0) {
    return (
      <>
        <PageHeader title="Discount codes" />
        <div className="flex-col-gap-4 items-start">
          <Paragraph>
            No discount codes yet. Create one for your next promotion.
          </Paragraph>
          <Button as={NextLink} href="/discount-codes/new">
            Create discount code
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Discount codes"
        actions={
          <Button as={NextLink} href="/discount-codes/new">
            Create discount code
          </Button>
        }
      />
      <DiscountTable
        caption="Discount codes"
        data={codes.map((code) => ({
          key: code.id,
          id: code.id,
          code: code.discountCode ?? '',
          discountType: code.discountType,
          discountValue: code.discountValue,
          expiryDate: code.expiryDate,
          status: code.status,
        }))}
        rowKey={(row) => row.key}
      >
        <DiscountTable.Column
          id="code"
          rowHeader
          title="Code"
          dataKey="code"
          width={160}
        >
          {(code) => code}
        </DiscountTable.Column>
        <DiscountTable.Column
          id="discountType"
          title="Discount type"
          dataKey="discountType"
          width={140}
        >
          {(value) => discountTypeLabel(value)}
        </DiscountTable.Column>
        <DiscountTable.Column
          id="discountValue"
          title="Discount value"
          dataKey="discountValue"
          width={130}
          align="right"
        >
          {(value, row) =>
            row.discountType === 'percentage' ? (
              <Numeral>{`${value}%`}</Numeral>
            ) : (
              <Numeral>{formatINR(value)}</Numeral>
            )
          }
        </DiscountTable.Column>
        <DiscountTable.Column
          id="expiryDate"
          title="Expiry date"
          dataKey="expiryDate"
          width={130}
        >
          {(value) => <Time value={value} />}
        </DiscountTable.Column>
        <DiscountTable.Column
          id="status"
          title="Status"
          dataKey="status"
          width={130}
        >
          {(value) =>
            value === 'active' ? (
              <Tag
                size="xs" // Fits the dense table row without growing it.
                variant="success" // Green reads as usable at a glance.
              >
                Active
              </Tag>
            ) : (
              <Tag
                size="xs" // Fits the dense table row without growing it.
                variant="base"
              >
                Deactivated
              </Tag>
            )
          }
        </DiscountTable.Column>
        <DiscountTable.Column
          id="actions"
          title={<span className="sr-only">Actions</span>}
          width={48}
          align="right"
        >
          {(_rowValue, row) => {
            const code = codes.find((entry) => entry.id === row.id);
            if (!code || code.status !== 'active') return null;
            return (
              <IconButton
                size="xs"
                variant="base" // Quiet ghost row action beside the record.
                look="ghost"
                tooltip="Deactivate"
                aria-label={`Deactivate ${code.discountCode}`}
                onClick={() => openDeactivate(code)}
              >
                <Ban />
              </IconButton>
            );
          }}
        </DiscountTable.Column>
      </DiscountTable>
      <Dialog
        title="Deactivate this code?"
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}
        footer={
          <>
            <Button
              variant="base" // Quiet way out that changes nothing.
              onClick={closeDialog}
            >
              Cancel
            </Button>
            <Button
              variant="danger" // Confirming deactivates the code, so it reads as destructive.
              loadingWithReason={
                saving ? 'Deactivating the code' : undefined
              }
              onClick={confirmDeactivate}
            >
              Deactivate
            </Button>
          </>
        }
      >
        <div className="flex-col-gap-2">
          <Paragraph>
            {target?.discountCode
              ? `Code ${target.discountCode} will no longer work at checkout.`
              : 'This code will no longer work at checkout.'}
          </Paragraph>
          {dialogError ? (
            <div className="flex-row-gap-2 flex-wrap items-center">
              <Paragraph role="alert">{dialogError}</Paragraph>
              <Button
                variant="base" // Quiet retry beside the message it answers.
                onClick={confirmDeactivate}
              >
                Try again
              </Button>
            </div>
          ) : null}
        </div>
      </Dialog>
    </>
  );
}
