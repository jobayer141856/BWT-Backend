CREATE OR REPLACE FUNCTION roster_insert_after_shift_group_update_function() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO hr.roster (
        shift_group_uuid, 
        shifts_uuid, 
        effective_date, 
        created_by,
        created_at, 
        updated_at
    ) VALUES (
        NEW.shift_group_uuid,
        NEW.shifts_uuid,
        NEW.effective_date,
        NEW.created_by,
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for insert operation when shift group is updated
CREATE TRIGGER roster_insert_after_shift_group_update_trigger
AFTER UPDATE OF shifts_uuid, effective_date ON hr.shift_group
FOR EACH ROW
WHEN (OLD.shifts_uuid IS DISTINCT FROM NEW.shifts_uuid OR OLD.effective_date IS DISTINCT FROM NEW.effective_date)
EXECUTE FUNCTION roster_insert_after_shift_group_update_function();