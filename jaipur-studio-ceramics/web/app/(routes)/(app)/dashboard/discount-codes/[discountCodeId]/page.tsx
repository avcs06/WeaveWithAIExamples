'use client';

import { rupees } from '@app/blocks/orders';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import {
  deactivateDiscountCode,
  useGetDiscountCode,
} from '@app/entities/discountCode';
import { DiscountTypeOptions } from '@app/entities/enums';
import { Button } from '@packages/ui/Button';
import {
  DialogResult,
  openConfirmationDialog,
} from '@packages/ui/Dialog';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Paragraph,
  Time,
} from '@packages/ui/Typography';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

/** One discount code: its value, expiry and state, then stop it if active. */
export default function DiscountCodeDetailPage() {
  const { discountCodeId } = useParams<{ discountCodeId: string }>();
  const router = useRouter();
  const code = useGetDiscountCode(discountCodeId);
  const [deactivating, setDeactivating] = useState(false);

  if (code.loading || code.error) {
    return (
      <PageState
        loading={code.loading}
        loadingText="Loading the discount code."
        errorText={
          code.error ? 'The discount code could not be loaded.' : undefined
        }
        onRetry={code.retry}
      />
    );
  }

  const record = code.data;
  if (!record) {
    return (
      <NotFound
        title="Discount code not found"
        description="This code is gone."
        back={{ label: 'Back to discount codes', href: '/dashboard/discount-codes' }}
      />
    );
  }

  const deactivate = async () => {
    if (deactivating) return;
    const result = await openConfirmationDialog({
      title: 'Deactivate this code?',
      content: `Buyers will no longer be able to use ${record.code} at checkout.`,
      // Deactivating stops the promotion, so the confirm reads as danger.
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            // Keeping the code is the quiet way out of the confirm.
            variant="base"
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            // Deactivating is the confirm's filled danger button.
            variant="danger"
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Deactivate
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setDeactivating(true);
    try {
      await deactivateDiscountCode(record.id, { status: 'deactivated' });
      toast({ title: 'Discount code deactivated', status: 'success' });
      router.push('/dashboard/discount-codes');
    } catch {
      toast({
        title: 'Deactivating the code failed',
        description: 'Try again.',
        status: 'error',
      });
    } finally {
      setDeactivating(false);
    }
  };

  return (
    <>
      <PageHeader
        title={record.code}
        breadcrumb={[
          { label: 'Discount codes', href: '/dashboard/discount-codes' },
        ]}
        actions={
          record.status === 'active' ? (
            <Button
              // Deactivating stops the promotion, so it reads as danger.
              variant="danger"
              loadingWithReason={deactivating ? 'Deactivating the code' : undefined}
              onClick={deactivate}
            >
              Deactivate code
            </Button>
          ) : undefined
        }
      />
      <DescriptionList>
        <div>
          <DescriptionTerm>Code</DescriptionTerm>
          <DescriptionDetails>{record.code}</DescriptionDetails>
        </div>
        <div>
          <DescriptionTerm>Discount type</DescriptionTerm>
          <DescriptionDetails>
            {DiscountTypeOptions.find(
              (option) => option.key === record.discountType,
            )?.label ?? record.discountType}
          </DescriptionDetails>
        </div>
        <div>
          <DescriptionTerm>Discount value</DescriptionTerm>
          <DescriptionDetails>
            <Numeral>
              {record.discountType === 'percentage'
                ? `${record.discountValue}%`
                : rupees.format(record.discountValue)}
            </Numeral>
          </DescriptionDetails>
        </div>
        <div>
          <DescriptionTerm>Expiry date</DescriptionTerm>
          <DescriptionDetails>
            <Time value={record.expiryDate} />
          </DescriptionDetails>
        </div>
        <div>
          <DescriptionTerm>State</DescriptionTerm>
          <DescriptionDetails>
            {record.status === 'active' ? (
              <Tag
                // An active code takes money off, so it reads as success.
                variant="success"
              >
                Active
              </Tag>
            ) : (
              <Tag>Deactivated</Tag>
            )}
          </DescriptionDetails>
        </div>
      </DescriptionList>
      {record.status === 'deactivated' ? (
        <Paragraph color="muted">
          This code is deactivated and will be rejected at checkout.
        </Paragraph>
      ) : null}
    </>
  );
}
