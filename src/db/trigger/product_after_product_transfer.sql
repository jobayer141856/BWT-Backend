--inserted into database
CREATE OR REPLACE FUNCTION product_after_product_transfer_insert_function()
RETURNS TRIGGER AS $$

DECLARE 
    warehouse_name TEXT;
BEGIN
   SELECT assigned INTO warehouse_name FROM store.warehouse WHERE uuid = NEW.warehouse_uuid;
   UPDATE
        store.product
    SET
        
        warehouse_1 = CASE WHEN warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
  
    WHERE
        uuid = NEW.product_uuid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION product_after_product_transfer_update_function()
RETURNS TRIGGER AS $$

DECLARE 
    old_warehouse_name TEXT;
    new_warehouse_name TEXT;
BEGIN
    SELECT assigned INTO old_warehouse_name FROM store.warehouse WHERE uuid = OLD.warehouse_uuid;
    SELECT assigned INTO new_warehouse_name FROM store.warehouse WHERE uuid = NEW.warehouse_uuid;
    IF old_warehouse_name <> new_warehouse_name THEN
        UPDATE
            store.product
        SET
            warehouse_1 = CASE WHEN old_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
        WHERE
            uuid = OLD.product_uuid;
        UPDATE
            store.product
        SET
            warehouse_1 = CASE WHEN new_warehouse_name = 'warehouse_1' THEN warehouse_1 - NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN new_warehouse_name = 'warehouse_2' THEN warehouse_2 - NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN new_warehouse_name = 'warehouse_3' THEN warehouse_3 - NEW.quantity ELSE warehouse_3 END
        WHERE
            uuid = NEW.product_uuid;

    ELSE
        UPDATE
            store.product
        SET
            warehouse_1 = CASE WHEN old_warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity - NEW.quantity ELSE warehouse_1 END,
            warehouse_2 = CASE WHEN old_warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity - NEW.quantity ELSE warehouse_2 END,
            warehouse_3 = CASE WHEN old_warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity - NEW.quantity ELSE warehouse_3 END
        WHERE
            uuid = OLD.product_uuid;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION product_after_product_transfer_delete_function()
RETURNS TRIGGER AS $$

DECLARE 
    warehouse_name TEXT;
BEGIN
    SELECT assigned INTO warehouse_name FROM store.warehouse WHERE uuid = OLD.warehouse_uuid;
    UPDATE
        store.product
    SET
        warehouse_1 = CASE WHEN warehouse_name = 'warehouse_1' THEN warehouse_1 + OLD.quantity ELSE warehouse_1 END,
        warehouse_2 = CASE WHEN warehouse_name = 'warehouse_2' THEN warehouse_2 + OLD.quantity ELSE warehouse_2 END,
        warehouse_3 = CASE WHEN warehouse_name = 'warehouse_3' THEN warehouse_3 + OLD.quantity ELSE warehouse_3 END
    WHERE
        uuid = OLD.product_uuid;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;


-- Trigger

CREATE OR REPLACE TRIGGER product_after_product_transfer_insert
AFTER INSERT ON store.product_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_product_transfer_insert_function();

CREATE OR REPLACE TRIGGER product_after_product_transfer_update
AFTER UPDATE ON store.product_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_product_transfer_update_function();

CREATE OR REPLACE TRIGGER product_after_product_transfer_delete
AFTER DELETE ON store.product_transfer
FOR EACH ROW
EXECUTE FUNCTION product_after_product_transfer_delete_function();


