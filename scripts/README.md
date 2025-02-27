# Database Migration Scripts

This directory contains scripts for database migrations.

## Migration: endDate to contractStartDate

The application has been updated to use `contractStartDate` instead of `endDate` for properties.

### Steps to Migrate

1. **Check current state of properties**

   ```bash
   npm run check:properties
   ```

2. **Run the migration**

   ```bash
   npm run migrate:end-date
   ```

3. **Verify the migration**

   ```bash
   npm run check:properties
   ``` 