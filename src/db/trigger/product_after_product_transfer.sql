--inserted into database
CREATE OR REPLACE FUNCTION product_after_product_transfer_insert_function()
RETURNS TRIGGER AS $$
BEGIN
   UPDATE
        store.product
    SET
        warehouse_1 = warehouse_1 - CASE WHEN warehouse_1_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END,
        warehouse_2 = warehouse_2 - CASE WHEN warehouse_2_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END,
        warehouse_3 = warehouse_3 - CASE WHEN warehouse_3_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END
    WHERE
        uuid = NEW.product_uuid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION product_after_product_transfer_update_function()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE
        store.product
    SET
        warehouse_1 = warehouse_1 - CASE WHEN warehouse_1_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END + CASE WHEN warehouse_1_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END,
        warehouse_2 = warehouse_2 - CASE WHEN warehouse_2_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END + CASE WHEN warehouse_2_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END,
        warehouse_3 = warehouse_3 - CASE WHEN warehouse_3_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END + CASE WHEN warehouse_3_uuid = NEW.warehouse_uuid THEN NEW.quantity ELSE 0 END
    WHERE
        uuid = NEW.product_uuid;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION product_after_product_transfer_delete_function()
RETURNS TRIGGER AS $$

BEGIN
    UPDATE
        store.product
    SET
        warehouse_1 = warehouse_1 + CASE WHEN warehouse_1_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END,
        warehouse_2 = warehouse_2 + CASE WHEN warehouse_2_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END,
        warehouse_3 = warehouse_3 + CASE WHEN warehouse_3_uuid = OLD.warehouse_uuid THEN OLD.quantity ELSE 0 END
    WHERE
        uuid = OLD.product_uuid;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

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