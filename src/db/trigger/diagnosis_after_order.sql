--inserted into the database
-- CREATE OR REPLACE FUNCTION generate_15_digit_uuid()
-- RETURNS VARCHAR AS $$
-- DECLARE
--     result VARCHAR;
-- BEGIN
--     SELECT substring(md5(random()::text), 1, 15) INTO result;
--     RETURN result;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION insert_diagnosis_after_order()
-- RETURNS TRIGGER AS $$
-- BEGIN
--     IF NEW.is_diagnosis_need = true THEN
--         INSERT INTO work.diagnosis (order_uuid, uuid, created_by, created_at, updated_at)
--         VALUES (NEW.uuid, generate_15_digit_uuid(), new.created_by, new.created_at, new.updated_at);
--     END IF;
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;



-- CREATE OR REPLACE TRIGGER after_order_insert_update
-- AFTER INSERT OR UPDATE ON work.order
-- FOR EACH ROW
-- EXECUTE FUNCTION insert_diagnosis_after_order();


CREATE OR REPLACE FUNCTION insert_diagnosis_after_order()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete diagnosis if transitioning from true to false
    IF TG_OP = 'UPDATE' AND OLD.is_diagnosis_need = TRUE AND NEW.is_diagnosis_need = FALSE THEN
        DELETE FROM work.diagnosis WHERE order_uuid = NEW.uuid;
    END IF;

    -- Insert new diagnosis if is_product_received is true (on insert or update)
    IF NEW.is_diagnosis_need = true THEN
        INSERT INTO work.diagnosis (order_uuid, uuid, created_by, created_at, updated_at)
        VALUES (NEW.uuid, generate_15_digit_uuid(), NEW.created_by, NEW.created_at, NEW.updated_at);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Keep the existing trigger definition
CREATE OR REPLACE TRIGGER after_order_insert_update
AFTER INSERT OR UPDATE ON work.order
FOR EACH ROW
EXECUTE FUNCTION insert_diagnosis_after_order();