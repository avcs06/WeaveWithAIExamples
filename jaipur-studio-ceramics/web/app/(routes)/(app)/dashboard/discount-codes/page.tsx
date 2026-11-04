'use client';

import { rupees } from '@app/blocks/orders';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { PageState } from '@app/components/PageState';
import { useListDiscountCodes } from '@app/entities/discountCode';
import {
  DiscountTypeOptions,
} from '@app/entities/enums';
import { Button } from '@packages/ui/Button';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Time, Paragraph } from '@packages/ui/Typography';
import React from 'react';

type CodeRow = {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed_amount';
  discountValue: number;
  expiryDate: string;
  createdAt: string;
  status: 'active' | 'deactivated';
};

const CodesTable = createTable<CodeRow>();

const typeLabel = (type: CodeRow['discountType']) =>
  DiscountTypeOptions.find((option) => option.key === type)?.label ?? type;

/** Discount codes: every promotion and whether it can still be used. */
export default function DiscountCodesPage() {
  const codes = useListDiscountCodes();

  const all = [...(codes.data ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <>
      <PageHeader
        title="Discount codes"
        description="Every promotion, newest first, with its value and state."
        actions={
          all.length > 0 ? (
            <Button as={NextLink} href="/dashboard/discount-codes/new">
              Create a discount code
            </Button>
          ) : undefined
        }
      />
      <PageState
        loading={codes.loading}
        loadingText="Loading the discount codes."
        errorText={
          codes.error ? 'The discount codes could not be loaded.' : undefined
        }
        onRetry={codes.retry}
      />
      {!codes.loading && !codes.error && all.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph role="status">
            No discount codes yet. Create one for a promotion, such as a
            weekend Instagram offer.
          </Paragraph>
          <Button as={NextLink} href="/dashboard/discount-codes/new">
            Create a discount code
          </Button>
        </div>
      ) : !codes.loading && !codes.error ? (
        <CodesTable
          caption="Discount codes"
          data={all.map((code) => ({
            id: code.id,
            code: code.code,
            discountType: code.discountType,
            discountValue: code.discountValue,
            expiryDate: code.expiryDate,
            createdAt: code.createdAt,
            status: code.status,
          }))}
          rowKey={(code) => code.id}
          onRowClick={(_, click) =>
            click.currentTarget.querySelector('a')?.click()
          }
        >
          <CodesTable.Column
            id="code"
            rowHeader
            title="Code"
            dataKey="code"
            width={200}
          >
            {(code, row) => (
              <NextLink
                href={`/dashboard/discount-codes/${row.id}`}
                className="inline-block max-w-full"
              >
                <Truncate>{code}</Truncate>
              </NextLink>
            )}
          </CodesTable.Column>
          <CodesTable.Column
            id="discountType"
            title="Type"
            dataKey="discountType"
            width={140}
          >
            {(type: CodeRow['discountType']) => typeLabel(type)}
          </CodesTable.Column>
          <CodesTable.Column
            id="discountValue"
            title="Value"
            dataKey="discountValue"
            width={120}
            align="right"
          >
            {(value, row) => (
              <Numeral>
                {row.discountType === 'percentage'
                  ? `${value}%`
                  : rupees.format(value)}
              </Numeral>
            )}
          </CodesTable.Column>
          <CodesTable.Column
            id="expiryDate"
            title="Expiry date"
            dataKey="expiryDate"
            width={140}
          >
            {(date) => <Time value={date} />}
          </CodesTable.Column>
          <CodesTable.Column
            id="createdAt"
            title="Created"
            dataKey="createdAt"
            width={140}
          >
            {(date) => <Time value={date} />}
          </CodesTable.Column>
          <CodesTable.Column
            id="status"
            title="State"
            dataKey="status"
            width={130}
          >
            {(status: CodeRow['status']) =>
              status === 'active' ? (
                <Tag
                  // An active code takes money off, so it reads as success.
                  variant="success"
                >
                  Active
                </Tag>
              ) : (
                <Tag>Deactivated</Tag>
              )
            }
          </CodesTable.Column>
        </CodesTable>
      ) : null}
    </>
  );
}
