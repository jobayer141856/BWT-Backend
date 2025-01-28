CREATE OR REPLACE FUNCTION stock_after_purchase_entry_function() RETURNS TRIGGER AS $$

DECLARE 
    warehouse_name TEXT
    