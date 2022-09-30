################################################################################
'''
                        Write user list into Postgres
'''
################################################################################

# Libraries

import os
import pandas as pd
import psycopg2 as pg

# Logger
import sys
import logging
logging.basicConfig(
    format='%(asctime)s %(levelname)s - %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S',
    stream=sys.stdout,
)
logger = logging.getLogger()


# Globals

# Postgres authentication.
POSTGRES_DB = 'dash_app_auth'
POSTGRES_HOST = os.environ.get('POSTGRES_HOST')
POSTGRES_USER = os.environ.get('POSTGRES_USER')
POSTGRES_PWD = os.environ.get('POSTGRES_PWD')

# Columns to be inserted into the database.
DB_COLUMNS = [
    'id',
    'title',
    'description',
    'routing_extension',
    'logo',
]

################################################################################
#############################  Helper Functions  ###############################

def postgreSQL(query):
    '''
    Read from Postgres with Pandas.
    '''
    engine = pg.connect(
        f"dbname='{POSTGRES_DB}'"
        f"user='{POSTGRES_USER}'"
        f"host='{POSTGRES_HOST}'"
        f"password='{POSTGRES_PWD}'",
    )

    # Try to run the query.
    try:
        df = pd.read_sql(query, con=engine)
        engine.close()
    except Exception as exception:
        logger.info('Error with database. Closing connection.')
        logger.info('NB: The report_server profile must be in your environment')
        engine.close()
        raise exception

    return df

def list_to_pgstr(x):
        '''
        Takes a python list and converts brackets to parentheses.
        '''
        return str(x).replace('[', '(').replace(']', ')')

################################################################################
###############################  Main Method  ##################################

def main():

    logger.info(f'Using postgres profile: {POSTGRES_USER}')

    ############################################################################
    # Read in the CSV file of users.

    logger.info('Loading user file.')
    try:
        users = pd.read_csv('./app_descriptions.csv')

    except Exception as exception:
        logger.info('Failed to load file.')
        raise exception

    ############################################################################

    # Check which primary keys exist already.
    ids = users['id'].tolist()

    already_exists_query = f'''
    SELECT id
    FROM app_description
    WHERE id in {list_to_pgstr(ids)}
    '''

    already_exists = (
        postgreSQL(already_exists_query)
        ['id']
        .tolist()
    )
    
    new_users = list(set(ids) - set(already_exists))

    if already_exists != []:
        logger.info('The following app ids already exist and will not be added:')
        logger.info(already_exists)

    if new_users == []:
        logger.info('No apps to add.')
        return None
    else:
        logger.info('These entries will be added to the database:')
        logger.info(new_users)


    ############################################################################
    # Insert the new users into PG.

    # Convert dataframe into list of lists row-wise.
    new_user_list = (
        users
        .loc[users.id.isin(new_users), DB_COLUMNS]
        .to_numpy()
        .tolist()
    )

    # Convert each sub-list to a postgres list (parentheses instead of brackets),
    # end each value entry with a comma, and end the whole statement with ;.
    values = [list_to_pgstr(x) for x in new_user_list]
    rows_to_add = ',\n'.join(values) + ';'

    # Remove the apostrophes wrapping column names.    
    cols = list_to_pgstr(DB_COLUMNS).replace("'", "")

    insert_query = (
        "INSERT INTO app_description\n"
        f"{cols}\n"
        "VALUES\n"
        f"{rows_to_add}\n"
    )

    logger.info('Running query:\n')
    print(insert_query)

    # Insert into database
    logger.info('Connecting to Postgres...')
    engine = pg.connect(
        f"dbname='{POSTGRES_DB}'"
        f"user='{POSTGRES_USER}'"
        f"host='{POSTGRES_HOST}'"
        f"password='{POSTGRES_PWD}'",
    )

    try:
        cur = engine.cursor()
        cur.execute(insert_query)
        engine.commit()
        cur.close()
        engine.close()
        logger.info('Successfully added users.')
    except Exception as exception:
        logger.info('Error with database. Closing connection.')
        engine.close()
    
    ###########################################################################
    # Check that the new users are now in the database

    logger.info('Checking that new entries have been added to database.')
    check_query = f'''
    SELECT id
    FROM app_description
    WHERE id in  {list_to_pgstr(new_users)}
    '''
    check_list = (
        postgreSQL(check_query)
        ['id']
        .tolist()
    )
    check_status = set(check_list) == set(new_users)

    if check_status is True:
        logger.info('SUCCESS. New entries found.')
    else:
        logger.info('FAILED. New entries not found.')

    return None

if __name__ == "__main__":
    main()