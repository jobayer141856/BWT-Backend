CREATE OR REPLACE FUNCTION insert_user_before_order_function()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_new_customer  THEN
        -- Insert into the user table
        INSERT INTO hr.users (
            uuid,
            name,
            phone,
            user_type,
            pass,
            department_uuid,
            designation_uuid,
            email,
            ext,
            created_at
           
        ) VALUES (
            NEW.user_uuid,
            NEW.name,
            NEW.phone,
            'customer',
            NEW.phone,
            NULL,
            NULL,
            NEW.user_uuid || '@bwt.com',
            '+880',
            NEW.created_at
            
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER insert_user_before_order
BEFORE INSERT ON work.order
FOR EACH ROW
EXECUTE FUNCTION insert_user_before_order_function();