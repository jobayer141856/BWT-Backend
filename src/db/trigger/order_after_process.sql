-- CREATE OR REPLACE FUNCTION order_after_process_update_function()
-- RETURNS TRIGGER AS $$
-- DECLARE
--     order_uuid UUID;
-- BEGIN
--     SELECT
--         CASE 
--             WHEN process.order_uuid IS NOT NULL THEN process.order_uuid
--             ELSE (SELECT diagnosis.order_uuid FROM store.diagnosis WHERE uuid = process.diagnosis_uuid)
--         END
--     INTO order_uuid
--     FROM store.process 
--     WHERE uuid = NEW.uuid;

--     UPDATE store.order
--     SET 
--         warehouse_uuid = NEW.warehouse_uuid,
--         rack_uuid = NEW.rack_uuid,
--         floor_uuid = NEW.floor_uuid,
--         box_uuid = NEW.box_uuid
--     WHERE uuid = order_uuid;
    
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE TRIGGER order_after_process_update_trigger
-- AFTER UPDATE ON store.process
-- FOR EACH ROW
-- EXECUTE FUNCTION order_after_process_update_function();

CREATE OR REPLACE FUNCTION order_after_process_update_function()
RETURNS TRIGGER AS $$
DECLARE
    order_uuid TEXT;
BEGIN
    SELECT COALESCE(p.order_uuid, d.order_uuid)
    INTO order_uuid
    FROM work.process p
    LEFT JOIN work.diagnosis d ON p.diagnosis_uuid = d.uuid
    WHERE p.uuid = NEW.uuid;

    IF order_uuid IS NULL THEN
        RAISE EXCEPTION 'Could not determine order_uuid for process %', NEW.uuid;
    END IF;

    UPDATE work.order
    SET 
        warehouse_uuid = NEW.warehouse_uuid,
        rack_uuid = NEW.rack_uuid,
        floor_uuid = NEW.floor_uuid,
        box_uuid = NEW.box_uuid
    WHERE uuid = order_uuid;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER order_after_process_update_trigger
AFTER UPDATE ON work.process
FOR EACH ROW
EXECUTE FUNCTION order_after_process_update_function();