-- Step 1: Create the function
CREATE OR REPLACE FUNCTION add_column_stock_after_warehouse_insert_function()
RETURNS TRIGGER AS $$
DECLARE
    new_column_name TEXT;
    branch_name TEXT;
BEGIN
    -- Get the branch name
    SELECT name INTO branch_name FROM branch WHERE uuid = NEW.branch_uuid;

    -- Construct the new column name
    --new_column_name := branch_name || '_' || NEW.name;
    CONCAT(branch_name, '_', NEW.name) INTO new_column_name;

    -- Add the new column to the stock table
    EXECUTE format('ALTER TABLE store.stock ADD COLUMN %I DECIMAL DEFAULT 0', new_column_name);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Create the trigger
CREATE OR REPLACE TRIGGER add_column_stock_after_warehouse_insert_trigger
AFTER INSERT ON store.warehouse
FOR EACH ROW
EXECUTE FUNCTION add_column_stock_after_warehouse_insert_function();