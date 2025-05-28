CREATE OR REPLACE FUNCTION roster_insert_after_shift_group_update_function() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO hr.roster (
        shift_group_uuid, 
        shifts_uuid, 
        effective_date, 
        off_days,
        created_by,
        created_at, 
        updated_at
    ) VALUES (
        OLD.uuid,
        OLD.shifts_uuid,
        OLD.effective_date,
        OLD.off_days,
        OLD.created_by,
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
WHEN (OLD.shifts_uuid IS DISTINCT FROM NEW.shifts_uuid OR OLD.effective_date IS DISTINCT FROM NEW.effective_date OR OLD.off_days IS DISTINCT FROM NEW.off_days)
EXECUTE FUNCTION roster_insert_after_shift_group_update_function();