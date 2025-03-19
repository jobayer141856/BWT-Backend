--inserted into database
CREATE OR REPLACE FUNCTION product_after_purchase_return_entry_insert_function() RETURNS TRIGGER AS $$
DECLARE 
    warehouse_name TEXT;
BEGIN
    SELECT name INTO warehouse_name FROM store.warehouse WHERE uuid = (SELECT warehouse_uuid FROM store.purchase_return WHERE uuid = NEW.purchase_return_uuid);
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
    WHERE uuid = NEW.product_uuid;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Delete Trigger
CREATE OR REPLACE FUNCTION product_after_purchase_return_entry_delete_function() RETURNS TRIGGER AS $$
DECLARE 
    warehouse_name TEXT;
BEGIN
    SELECT name INTO warehouse_name FROM store.warehouse WHERE uuid = (SELECT warehouse_uuid FROM store.purchase_return WHERE uuid = OLD.purchase_return_uuid);
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
    WHERE uuid = OLD.product_uuid;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Update Trigger (handles warehouse changes)
CREATE OR REPLACE FUNCTION product_after_purchase_return_entry_update_function() RETURNS TRIGGER AS $$
DECLARE 
    old_warehouse_name TEXT;
    new_warehouse_name TEXT;
BEGIN
    -- Get old and new warehouse names
    SELECT name INTO old_warehouse_name FROM store.warehouse WHERE uuid = (SELECT warehouse_uuid FROM store.purchase_return WHERE uuid = OLD.purchase_return_uuid);
    SELECT name INTO new_warehouse_name FROM store.warehouse WHERE uuid = (SELECT warehouse_uuid FROM store.purchase_return WHERE uuid = NEW.purchase_return_uuid);

    IF old_warehouse_name <> new_warehouse_name THEN
        -- Subtract from old warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
        WHERE uuid = OLD.product_uuid;

        -- Add to new warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN new_warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN new_warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN new_warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;
    ELSE
        -- Update the quantity in the same warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_warehouse_name = 'warehouse_1' THEN warehouse_1 - OLD.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_warehouse_name = 'warehouse_2' THEN warehouse_2 - OLD.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_warehouse_name = 'warehouse_3' THEN warehouse_3 - OLD.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE OR REPLACE TRIGGER product_after_purchase_return_entry_insert_trigger
AFTER INSERT ON store.purchase_return_entry
FOR EACH ROW
EXECUTE FUNCTION product_after_purchase_return_entry_insert_function();

CREATE OR REPLACE TRIGGER product_after_purchase_return_entry_delete_trigger
AFTER DELETE ON store.purchase_return_entry
FOR EACH ROW
EXECUTE FUNCTION product_after_purchase_return_entry_delete_function();

CREATE OR REPLACE TRIGGER product_after_purchase_return_entry_update_trigger
AFTER UPDATE ON store.purchase_return_entry
FOR EACH ROW
EXECUTE FUNCTION product_after_purchase_return_entry_update_function();