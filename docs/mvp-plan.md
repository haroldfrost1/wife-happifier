# Wife Happifier - MVP Plan (Reduced Scope)

## Goal Description

Create a simple interface to import St George bank transactions from a CSV file and display them in a list.

## User Review Required

> [!NOTE] > **Scope**: This plan is strictly limited to **Import** and **Display** of transactions. No categorization or analysis features are included.

## Proposed Features

### 1. Import Functionality

- **File Upload**: Simple button to upload a `.csv` file.
- **CSV Parsing**:
  - Support St George CSV format: `Date, Description, Debit, Credit, Balance, Category`.
  - Extract and normalize fields:
    - `Date` (YYYYMMDD format -> Display format)
    - `Description`
    - `Debit` / `Credit` (Combined into a single Amount field or kept separate)
    - `Balance`

### 2. Transaction Display

- **List View**: A table or list showing all imported transactions.
- **Columns**:
  - Date
  - Description
  - Amount (Debit shown as negative, Credit as positive)
  - Balance

## Technical Stack

- **Frontend**: React + Vite + React Router + TailwindCSS + shadcn/ui
- **Backend**: NestJS (Node.js)
- **Database**: PostgreSQL
- **ORM**: TypeORM

## Verification Plan

### Manual Verification

1.  **Import Test**: Upload `examples/stgeorge.csv`.
2.  **Display Test**: Verify that the transactions from the CSV appear on the screen with correct usage of the `Debit` and `Credit` columns.
