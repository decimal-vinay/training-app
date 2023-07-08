
--                                                             Table "public.account"
--    Column   |           Type           | Collation | Nullable |                  Default                   | Storage  | Stats target | Descripti
-- on
-- ------------+--------------------------+-----------+----------+--------------------------------------------+----------+--------------+----------
-- ---
--  accountno  | integer                  |           | not null | nextval('account_accountno_seq'::regclass) | plain    |              |
--  fullname   | text                     |           | not null |                                            | extended |              |
--  status     | text                     |           | not null | 'Active'::text                             | extended |              |
--  type       | text                     |           | not null |                                            | extended |              |
--  mobile     | text                     |           | not null |                                            | extended |              |
--  city       | text                     |           | not null |                                            | extended |              |
--  state      | text                     |           | not null |                                            | extended |              |
--  branchcode | text                     |           | not null |                                            | extended |              |
--  branchname | text                     |           | not null |                                            | extended |              |
--  createdon  | timestamp with time zone |           | not null |                                            | plain    |              |
--  modifiedon | timestamp with time zone |           |          |                                            | plain    |              |
--  createdby  | integer                  |           |          |                                            | plain    |              |
--  modifiedby | integer                  |           |          |                                            | plain    |              |
-- Indexes:
--     "account_pkey" PRIMARY KEY, btree (accountno)
-- Access method: heap





DROP FUNCTION public.func_accounts;
-- create or replace function public.func_accounts(
--     x_account numeric)
-- returns public.account
-- LANGUAGE plpgsql as
-- $$
-- DECLARE
--     first_account public.account;
-- begin

--         SELECT * INTO first_account
--         FROM public.account
--         WHERE accountno=x_account LIMIT 1;

--         RETURN first_account;

-- end
-- $$;



DROP FUNCTION public.func_accounts;
create or replace function public.func_accounts(
    x_account numeric)
RETURNS refcursor
LANGUAGE plpgsql as
$$
DECLARE
    x_ref refcursor = 'cur';
begin
    OPEN x_ref FOR
        SELECT *
        FROM public.account
        WHERE accountno=x_account LIMIT 1;

    RETURN x_ref;
end;
$$;


CREATE OR REPLACE FUNCTION get_todo_list(
    table_name character varying,
    name character varying,
    limit_val integer,
    sortby character varying,
    sortdirection character varying,
    where_condition character varying
)
RETURNS refcursor AS
$$
DECLARE
    cur_result refcursor;
BEGIN
    OPEN cur_result FOR EXECUTE
    'SELECT * FROM ' || table_name ||
    ' WHERE item LIKE $1 ' ||
    COALESCE(where_condition, '') ||
    ' ORDER BY ' || sortby || ' ' || sortdirection ||
    ' LIMIT ' || limit_val
    USING name;

    RETURN cur_result;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_todo_record(
    table_name character varying,
    name character varying,
    status character varying,
    additional_info character varying
)
RETURNS refcursor AS
$$
DECLARE
    cur_result refcursor;
BEGIN
    OPEN cur_result FOR EXECUTE
    'INSERT INTO ' || table_name || ' (item, status, additional_info) ' ||
    'VALUES ($1, $2, $3::json) RETURNING *'
    USING name, status, additional_info;

    RETURN cur_result;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    item TEXT NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    additional_info JSONB
);

