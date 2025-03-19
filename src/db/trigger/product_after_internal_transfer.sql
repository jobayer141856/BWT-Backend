-- inserted into database
CREATE OR REPLACE FUNCTION product_after_internal_transfer_insert_function() RETURNS TRIGGER AS $$
DECLARE 
    from_warehouse_name TEXT;
    to_warehouse_name TEXT;
BEGIN
    SELECT assigned INTO from_warehouse_name FROM store.warehouse WHERE uuid = NEW.from_warehouse_uuid;
    SELECT assigned INTO to_warehouse_name FROM store.warehouse WHERE uuid = NEW.to_warehouse_uuid;
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN from_warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN from_warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN from_warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
    WHERE uuid = NEW.product_uuid;
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN to_warehouse_name = 'warehouse_1' THEN warehouse_1 + NEW.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN to_warehouse_name = 'warehouse_2' THEN warehouse_2 + NEW.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN to_warehouse_name = 'warehouse_3' THEN warehouse_3 + NEW.quantity ELSE warehouse_3 END
    WHERE uuid = NEW.product_uuid;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for delete
CREATE OR REPLACE FUNCTION product_after_internal_transfer_delete_function() RETURNS TRIGGER AS $$
DECLARE 
    from_warehouse_name TEXT;
    to_warehouse_name TEXT;
BEGIN
    SELECT assigned INTO from_warehouse_name FROM store.warehouse WHERE uuid = OLD.from_warehouse_uuid;
    SELECT assigned INTO to_warehouse_name FROM store.warehouse WHERE uuid = OLD.to_warehouse_uuid;
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN from_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN from_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN from_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
    WHERE uuid = OLD.product_uuid;
    
    UPDATE store.product
    SET
        warehouse_1 = CASE WHEN to_warehouse_name = 'warehouse_1' THEN warehouse_1 - OLD.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN to_warehouse_name = 'warehouse_2' THEN warehouse_2 - OLD.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN to_warehouse_name = 'warehouse_3' THEN warehouse_3 - OLD.quantity ELSE warehouse_3 END
    WHERE uuid = OLD.product_uuid;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Trigger for update

CREATE OR REPLACE FUNCTION product_after_internal_transfer_update_function() RETURNS TRIGGER AS $$
DECLARE 
    old_from_warehouse_name TEXT;
    new_from_warehouse_name TEXT;
    old_to_warehouse_name TEXT;
    new_to_warehouse_name TEXT;
BEGIN
    -- Get old and new warehouse names
    SELECT assigned INTO old_from_warehouse_name FROM store.warehouse WHERE uuid = OLD.from_warehouse_uuid;
    SELECT assigned INTO new_from_warehouse_name FROM store.warehouse WHERE uuid = NEW.from_warehouse_uuid;
    SELECT assigned INTO old_to_warehouse_name FROM store.warehouse WHERE uuid = OLD.to_warehouse_uuid;
    SELECT assigned INTO new_to_warehouse_name FROM store.warehouse WHERE uuid = NEW.to_warehouse_uuid;

    IF old_from_warehouse_name <> new_from_warehouse_name THEN
        -- Subtract from old warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_from_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_from_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_from_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
        WHERE uuid = OLD.product_uuid;

        -- Add to new warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN new_from_warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN new_from_warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN new_from_warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;
    ELSE
    -- Update the quantity in the same warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_from_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity - NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_from_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity - NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_from_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity - NEW.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;
          
    END IF;

    IF old_to_warehouse_name <> new_to_warehouse_name THEN
        -- Subtract from old warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_to_warehouse_name = 'warehouse_1' THEN warehouse_1 - OLD.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_to_warehouse_name = 'warehouse_2' THEN warehouse_2 - OLD.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_to_warehouse_name = 'warehouse_3' THEN warehouse_3 - OLD.quantity ELSE warehouse_3 END
        WHERE uuid = OLD.product_uuid;

        -- Add to new warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN new_to_warehouse_name = 'warehouse_1' THEN warehouse_1 + NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN new_to_warehouse_name = 'warehouse_2' THEN warehouse_2 + NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN new_to_warehouse_name = 'warehouse_3' THEN warehouse_3 + NEW.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;
    ELSE
    -- Update the quantity in the same warehouse
        UPDATE store.product
        SET
            warehouse_1 = CASE WHEN old_to_warehouse_name = 'warehouse_1' THEN warehouse_1 - OLD.quantity + NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_to_warehouse_name = 'warehouse_2' THEN warehouse_2 - OLD.quantity + NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_to_warehouse_name = 'warehouse_3' THEN warehouse_3 - OLD.quantity + NEW.quantity ELSE warehouse_3 END
        WHERE uuid = NEW.product_uuid;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for insert
CREATE OR REPLACE TRIGGER product_after_internal_transfer_insert
AFTER INSERT ON store.internal_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_internal_transfer_insert_function();

-- Trigger for delete
CREATE OR REPLACE TRIGGER product_after_internal_transfer_delete
AFTER DELETE ON store.internal_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_internal_transfer_delete_function();

-- Trigger for update
CREATE OR REPLACE TRIGGER product_after_internal_transfer_update
AFTER UPDATE ON store.internal_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_internal_transfer_update_function();

