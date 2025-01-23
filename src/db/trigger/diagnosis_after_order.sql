
CREATE OR REPLACE FUNCTION generate_15_digit_uuid()
RETURNS VARCHAR AS $$
DECLARE
    result VARCHAR;
BEGIN
    SELECT substring(md5(random()::text), 1, 15) INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_diagnosis_after_order()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_product_received = true THEN
        INSERT INTO work.diagnosis (order_uuid, uuid, created_at, updated_at)
        VALUES (NEW.uuid, generate_15_digit_uuid(), new.created_at, new.updated_at);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE TRIGGER after_order_insert_update
AFTER INSERT OR UPDATE ON work.order
FOR EACH ROW
EXECUTE FUNCTION insert_diagnosis_after_order();